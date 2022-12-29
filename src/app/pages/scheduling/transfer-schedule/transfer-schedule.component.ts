import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  EventSettingsModel,
  ActionEventArgs,
  PopupOpenEventArgs,
  View,
  CellClickEventArgs,
  ScheduleComponent,
  TimeScaleModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
} from '@syncfusion/ej2-angular-schedule';
import { Observable, of } from 'rxjs';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { MedicalDiaryDaysService } from '../../../business-controller/medical_diary_days.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { extend } from '@syncfusion/ej2-base';
import { AssistanceProcedureService } from '../../../business-controller/assistance-procedure.service';
import { map, startWith } from 'rxjs/operators';
import { AssistanceService } from '../../../business-controller/assistance.service';
import { User } from '../../../models/user';
import { ProcedureService } from '../../../business-controller/procedure.service';
import { Procedure } from '../../../models/procedure';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormTransferScheduleComponent } from './form-transfer-schedule/form-transfer-schedule.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-transfer-schedule',
  templateUrl: './transfer-schedule.component.html',
  styleUrls: ['./transfer-schedule.component.scss'],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
  ],
})
export class TransferScheduleComponent implements OnInit {

  public title = 'Transferir agenda';
  public loading = true;
  public today = null;
  public max_day = null;
  public isSubmitted = false;
  public assistance: any[] = [];
  public assistance_id: number;
  public scheduleData: Object[] = [];
  public form: FormGroup;
  public data;
  public id;
  public procedure_id;
  public medical_diary: any[] = [];
  public messageError: string = null;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @ViewChild('schedule') schedule: ScheduleComponent;
  public schedulerDate = new Date();
  public scheduleObj: ScheduleComponent;
  public currentView: View = 'Week';
  public eventSettings: EventSettingsModel;
  public rowAutoHeight: boolean = true;
  public timeScale: TimeScaleModel = {
    enable: true,
    interval: 60,
    slotCount: 3,
  };

  public user: User;
  private users: User[];

  public procedure: Procedure;
  private procedures: Procedure[];

  public filteredProcedureOptions$: Procedure[];
  public filteredProcedureOptionsApplied: Procedure[];
  public filteredAssistanceOptions$: User[];
  public filteredAssistanceOptionsApplied: User[]

  constructor(private toastService: NbToastrService,
    private medicalDiaryDaysS: MedicalDiaryDaysService,
    private formBuilder: FormBuilder,
    private assistanceS: AssistanceService,
    private procedureS: ProcedureService,
    private dialogFormService: NbDialogService,
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {

    this.today = new Date();
    this.max_day = new Date(this.today.getFullYear() + 2, this.today.getMonth(), this.today.getDate());
    this.today = this.datePipe.transform(this.today, "yyyy-MM-dd");
    this.max_day = this.datePipe.transform(this.max_day, "yyyy-MM-dd");
    if (!this.data) {
      this.data = {
        procedure_id: null,
        assistance_id: null,
        start_date: null,
        finish_date: null,
        status_id: null,
        campus_id: null,
        start_hour: null,
        finish_hour: null
      };
    }
    this.loading = false;
    this.form = this.formBuilder.group({
      procedure_id: [this.data.procedure_id, Validators.compose([Validators.required])],
      assistance_id: [this.data.assistance_id, Validators.compose([Validators.required])],
      start_date: [this.data.start_date, Validators.compose([Validators.required])],
      finish_date: [this.data.finish_date, Validators.compose([Validators.required])],
      start_hour: [this.data.start_hour, Validators.compose([Validators.required])],
      finish_hour: [this.data.finish_hour, Validators.compose([Validators.required])],
    });

    this.form.controls.assistance_id.valueChanges.subscribe(val => {
      this.filterAssistances(val);
    })

    this.form.controls.procedure_id.valueChanges.subscribe(val => {
      this.filterProcedures(val);
    })

    this.loadAssistances();
  }

  onSelectionChange($event, identifier) {

    switch (identifier) {
      case 'assistance':
        this.user = this.users.find((user) => this.getCompleteName(user) == $event);
        this.loadProcedures(this.user.id);
        break;
      case 'procedure':
        this.procedure = this.procedures.find((procedure) => (procedure.id + ' - ' + procedure.name) == $event);
        break;
    }

  }

  onEventRendered(args): void {
    const categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor =
        categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  public onCellDoubleClick(args: CellClickEventArgs): void {
    args.cancel = true;
    // You can use your custom dialog
  }

  chargeCalendar() {
    this.eventSettings = {
      dataSource: <Object[]>extend([], this.scheduleData, null, true),
      enableTooltip: true,
      allowAdding: false,
      allowEditing: false,
      allowDeleting: false
    };
  }

  getCompleteName(user) {
    return ((user.firstname == null) ? '' : user.firstname) + ' ' + ((user.middlefirstname == null) ? '' : user.middlefirstname) + ' ' + ((user.lastname == null) ? '' : user.lastname) + ' ' + ((user.middlelastname == null) ? '' : user.middlelastname);
  }

  private loadProcedures(userId) {
    this.procedureS.GetByUser(userId)
      .then((procedures) => {
        this.procedures = procedures;
        this.filteredProcedureOptions$ = procedures;
        this.filteredProcedureOptionsApplied = this.filteredProcedureOptions$;
      })
  }

  private filterProcedures(val) {

    this.filteredProcedureOptionsApplied = this.filteredProcedureOptions$.filter((procedure) => (procedure.code + ' - ' + procedure.equivalent + ' - ' + procedure.name).includes(val.toUpperCase()));

  }

  private loadAssistances() {
    this.assistanceS.GetExternalAssistanceUsers()
      .then((users) => {
        this.users = users;
        this.filteredAssistanceOptions$ = this.users;
        this.filteredAssistanceOptionsApplied = this.filteredAssistanceOptions$;
      });
  }

  private filterAssistances(val) {

    this.filteredAssistanceOptionsApplied = this.filteredAssistanceOptions$.filter((user) => (this.getCompleteName(user) + ' - ' + user.identification).includes(val.toUpperCase()));

  }

  submit($event) {

    let startDateInDate = new Date(this.form.controls.start_date.value);
    let finishDateInDate = new Date(this.form.controls.finish_date.value);
    let minDateInDate = new Date(this.today);
    let maxDateInDate = new Date(this.max_day);

    this.isSubmitted = true;
    if (!this.form.invalid) {

      if (!this.form.invalid) {
        if (startDateInDate < minDateInDate) {
          this.toastService.warning('', "La fecha de inicio no puede ser anterior a la de hoy.");
          return;
        }
        else if (startDateInDate > maxDateInDate) {
          this.toastService.warning('', "La fecha de inicio no puede ser superior a 2 años desde hoy.");
          return;
        }
        else if (finishDateInDate < minDateInDate) {
          this.toastService.warning('', "La fecha final no puede ser anterior a la de hoy.");
          return;
        } else if (finishDateInDate > maxDateInDate) {
          this.toastService.warning('', "La fecha final no puede ser superior a 2 años desde hoy.");
          return;
        }

        this.loading = true;
        let nameSource = $event.submitter.name;
        switch (nameSource) {
          case "calendarButton":
            this.loadSchedule();
            break;
          case "scheduleButton":
            this.dialogFormService.open(FormTransferScheduleComponent, {
              context: {
                title: 'Transferir agenda',
                userOrigin: this.user,
                procedure: this.procedure,
                startDate: this.form.controls.start_date.value,
                finishDate: this.form.controls.finish_date.value,
                startHour: this.form.controls.start_hour.value,
                finishHour: this.form.controls.finish_hour.value
              }
            })
            break;
        }
        this.loading = false;
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }

    }
  }

  onActionComplete(args: ActionEventArgs): void {
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
  }

  private loadSchedule() {
    this.scheduleData = [];
    this.medicalDiaryDaysS.GetByUserAndProcedure({
      userId: this.user.id,
      procedureId: this.procedure.id,
      init_date: this.form.controls.start_date.value,
      finish_date: this.form.controls.finish_date.value,
      init_hour: this.form.controls.start_hour.value,
      finish_hour: this.form.controls.finish_hour.value,
    }).then((x) => {
      this.medical_diary = x;
      this.messageError = null;
      if (this.medical_diary.length > 0) {

        this.scheduleData = x;

        this.chargeCalendar();
      } else {
        this.messageError =
          'Usuario sin itinerario para el procedimiento seleccionado en las fechas delimitadas';
        this.toastService.warning('', this.messageError);
      }
    });

  }
}

import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NonWorkingDaysService } from '../../../business-controller/non-working-days.service';
import { NbToastrService, NbDialogService, NbDialogRef } from '@nebular/theme';
import { FormHealthcareItineraryComponent } from './form-healtcare-itinerary/form-healthcare-itinerary.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
  ScheduleComponent,
  EventSettingsModel,
  View,
  ResizeService,
  DragAndDropService,
  ActionEventArgs,
  PopupOpenEventArgs,
  TimeScaleModel,
  EventFieldsMapping,
  CellClickEventArgs,
} from '@syncfusion/ej2-angular-schedule';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import {
  remove,
  addClass,
  closest,
  Browser,
  L10n,
  Internationalization,
  extend,
  isNullOrUndefined,
  createElement,
} from '@syncfusion/ej2-base';
import { MedicalDiaryService } from '../../../business-controller/medical-diary.service';
import { AuthService } from '../../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProcedureService } from '../../../business-controller/procedure.service';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AssistanceProcedureService } from '../../../business-controller/assistance-procedure.service';
import { PatientCheckComponent } from './patient-check.component';
import { FormPatientComponent } from './form-patient/form-patient.component';
import { FormHealthcareItineraryAgendantComponent } from './form-healtcare-itinerary-agendant/form-healtcare-itinerary-agendant.component';
import { CampusService } from '../../../business-controller/campus.service';
import { Campus } from '../../../models/campus';
import { MedicalDiaryDaysService } from '../../../business-controller/medical_diary_days.service';
import { MedicalStatusService } from '../../../business-controller/medical_status.service';
import { DatePipe } from '@angular/common';
import { User } from '../../../models/user';

// import { ActionsDaysComponent } from './actions.component';

@Component({
  selector: 'ngx-healthcare-itinerary',
  templateUrl: './healthcare-itinerary.component.html',
  styleUrls: ['./healthcare-itinerary.component.scss'],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
  ],
})
export class HealthcareItineraryComponent implements OnInit {
  @Input() isRescheduling = false;
  @Input() medical_diary_id;
  @Input() medical_diary_day_id;
  @Output() messageEvent = new EventEmitter<any>();;
  @Input() campus_id;

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Listado de pacientes';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Dia', 'Descripción'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public show;
  public data;
  public dialog;
  public schedulerDate = new Date();
  public currentView: View = 'Week';
  public medical_diary: any[] = [];
  public timeScale: TimeScaleModel = {
    enable: true,
    interval: 60,
    slotCount: 3,
  };
  public scheduleData: Object[] = [];
  public user;
  public assistance_id: number;
  public form: FormGroup;
  public eventSettings: EventSettingsModel;
  public done: boolean = false;
  public procedure_id;
  public id;
  public procedure: any[] = [];
  public campus: Campus[] = [];
  public assistance: any[] = [];
  public filteredProcedureOptions$: Observable<any[]>;
  public filteredAssistanceOptions$: Observable<any[]>;
  public user_id;
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];
  public patient_data: any;
  public today = null;
  public max_day = null;
  public rowAutoHeight: boolean = true;
  public datafi;
  public isChangingDate = false;
  //It's only loaded when is rescheduling
  public procedureIdValue;



  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @ViewChild('schedule') schedule: ScheduleComponent;
  public scheduleObj: ScheduleComponent;

  // public settings = {
  //   columns: {
  //     actions: {
  //       title: 'Acciones',
  //       type: 'custom',
  //       valuePrepareFunction: (value, row) => {
  //         // DATA FROM HERE GOES TO renderComponent
  //         return {
  //           data: row,
  //           valid: !this.selectedOptions2.includes(row.id) ? false : true,
  //           selection: (event, row: any) => this.eventSelections(event, row),
  //         };
  //       },
  //       renderComponent: PatientCheckComponent,
  //     },
  //     'identification_type.name': {
  //       title: this.headerFields[0],
  //       type: 'string',
  //       // sort: false,
  //       valuePrepareFunction(value, row) {
  //         return row.identification_type?.name;
  //       },
  //     },
  //     identification: {
  //       title: this.headerFields[1],
  //       type: 'string',
  //     },
  //     nombre_completo: {
  //       title: this.headerFields[2],
  //       type: 'string',
  //     },
  //     email: {
  //       title: this.headerFields[3],
  //       type: 'string',
  //     },
  //   },
  // };

  public routes = [
    {
      name: 'Días no laborales',
      route: '../../setting/non-working-days',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    // protected dialogRef: NbDialogRef<any>,
    private NonWorkingDaysS: NonWorkingDaysService,
    // private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private medicalDiaryS: MedicalDiaryService,
    private AuthS: AuthService,
    private toastService: NbToastrService,
    private procedureS: ProcedureService,
    private campusS: CampusService,
    private medicalStatusS: MedicalStatusService,
    private medicalDiaryDaysS: MedicalDiaryDaysService,
    private assistanceProcedureS: AssistanceProcedureService,
    private datePipe: DatePipe
  ) { }

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
        campus_id: this.campus_id
      };
    }

    this.form = this.formBuilder.group({
      procedure_id: [this.data.procedure_id],
      assistance_id: [this.data.assistance_id],
      campus_id: [this.data.campus_id],
      start_date: [this.data.start_date],
      finish_date: [this.data.finish_date],
      status_id: [this.data.status_id],
    });

    this.procedureS.GetCollection().then((x) => {
      this.procedure = x;
      this.filteredProcedureOptions$ = of(this.procedure);
      this.onFilter();
    });

    this.campusS.GetCollection({}).then((x) => {
      this.campus = x;
    });

    if (this.isRescheduling) {
      this.loadProcedureName();
    }

    this.form.controls.procedure_id.valueChanges.subscribe(x => {
      let assistanceInput = document.getElementById("assistance_input") as HTMLInputElement;
      assistanceInput.value = "";
      this.filteredAssistanceOptions$ = of([]);
      let procedure = this.procedure.find(procedure => (procedure.id + " - " + procedure.name) == x)
      if (procedure == null) return;
      this.id = procedure.id;
      this.procedure_id = procedure;
      this.getAssistance(procedure.id);
    })

    this.form.controls.start_date.valueChanges.subscribe(x => {
      this.isChangingDate = true;
      this.onSelectionChange(null, 2);
      this.isChangingDate = false;
    })

    this.form.controls.finish_date.valueChanges.subscribe(x => {
      this.isChangingDate = true;
      this.onSelectionChange(null, 2);
      this.isChangingDate = false;
    })

    this.form.controls.assistance_id.valueChanges.subscribe(x => {
      this.filteredAssistanceOptions$.subscribe(users => {
        let user = users.find(user => user.nombre_completo == x)
        if (user == null) return;
        this.assistance_id = user.assistance_id;
        this.user = user;
        this.getSchedule(this.assistance_id);
      })
    })

    this.onChanges();
  }

  onFilter() {
    this.filteredProcedureOptions$ = this.form
      .get('procedure_id')
      .valueChanges.pipe(
        startWith(''),
        map((filterString) => this.filter(filterString, 1))
      );
  }

  private filter(value: string, type): string[] {
    const filterValue = value?.toUpperCase();
    if (type == 1) {
      return this.procedure.filter(
        (optionValue) =>
          optionValue.code.includes(filterValue) ||
          optionValue.equivalent.includes(filterValue) ||
          optionValue.name.includes(filterValue)
      );
    } else {
      return this.assistance.filter(
        (optionValue) =>
          optionValue.nombre_completo.includes(filterValue) ||
          optionValue.assistance.user.identification.includes(filterValue)
      );
    }
  }

  onChanges() {
    this.form.get('campus_id').valueChanges.subscribe((val) => {
      let procedureName = this.form.controls.procedure_id.value;
      if (procedureName) {
        let id = this.form.controls.procedure_id.value.split('-')[0];
        this.getAssistance(id);
      }
    })
  }

  checkProcedure($event, value) {
    if ($event.relatedTarget != null && $event.relatedTarget.className.includes("procedureAutocompleteOption")) {
      return;
    }
    if (this.form.controls.procedure_id.value == null || this.form.controls.procedure_id.value == '') {
      return;
    }
    var filter = this.procedure.find((procedureOne) => (procedureOne.id + ' - ' + procedureOne.name) == value);
    if (!filter) {
      this.form.controls.procedure_id.setValue('');
    }
  }

  checkAssistance($event, value) {
    if ($event.relatedTarget != null && $event.relatedTarget.className.includes("assistanceAutocompleteOption")) {
      return;
    }
    if (this.form.controls.assistance_id.value == null || this.form.controls.assistance_id.value == '') {
      return;
    }
    var filter = this.assistance.find((assistanceOne) => assistanceOne.nombre_completo == value);
    if (!filter) {
      this.form.controls.assistance_id.setValue('');
    }
  }

  onSelectionChange($event, e) {

    var localidentify;


    if (e == 1) {

      var id = $event == '' ? $event : Number($event.split('-').at(0));
      localidentify = this.procedure.find((item) => item.id == id);
      this.id = id;
      if (localidentify) {
        this.procedure_id = localidentify;
        this.getAssistance(this.procedure_id.id);
      } else {
        let inputProcedure = document.getElementById("inputProcedure") as HTMLInputElement;
        inputProcedure.value = "";
        this.procedure_id = null;
        this.assistance = [];
        this.filteredAssistanceOptions$ = of(this.assistance);
        //this.toastService.warning('', 'Debe seleccionar un item de la lista');
      }
    } else if (e == 2) {

      let startDateInDate = new Date(this.form.controls.start_date.value);
      let finishDateInDate = new Date(this.form.controls.finish_date.value);
      let minDateInDate = new Date(this.today);
      let maxDateInDate = new Date(this.max_day);

      if (this.form.controls.start_date.value != null) {
        if (startDateInDate < minDateInDate) {
          this.toastService.warning('', "La fecha de inicio no puede ser anterior a la de hoy.");
          return;
        }
        else if (startDateInDate > maxDateInDate) {
          this.toastService.warning('', "La fecha de inicio no puede ser superior a 2 años desde hoy.");
          return;
        }
      }
      if (this.form.controls.finish_date.value != null) {
        if (finishDateInDate < minDateInDate) {
          this.toastService.warning('', "La fecha final no puede ser anterior a la de hoy.");
          return;
        } else if (finishDateInDate > maxDateInDate) {
          this.toastService.warning('', "La fecha final no puede ser superior a 2 años desde hoy.");
          return;
        }
      }

      localidentify = this.assistance.find(
        (item) => item.nombre_completo == $event
      );

      if ($event == null) {
        localidentify = this.user;
      }

      if (localidentify) {
        this.assistance_id = localidentify.assistance_id;
        this.user = localidentify;
        this.getSchedule(this.assistance_id);
      } else {
        this.assistance_id = null;
        this.scheduleData = [];
        this.eventSettings = undefined;
        if (!this.isChangingDate) {
          //this.toastService.warning('', 'Debe seleccionar un item de la lista');
        }
      }
    }
  }

  loadProcedureName() {
    this.procedureS.GetByMedicalDiary(this.medical_diary_id).then(
      (procedure) => {
        this.procedureIdValue = procedure.id;
        this.form.patchValue({ procedure_id: procedure.id + " - " + procedure.name });
        this.procedure_id = procedure;
        this.id = procedure.id;
        this.getAssistance(this.id);
      }
    ).catch((procedure) => { });
  }

  getSchedule(assistance_id) {
    // this.user = this.AuthS.GetUser();
    // this.scheduleObj.locale = 'es';
    this.scheduleData = [];
    this.eventSettings = undefined;

    this.medicalDiaryDaysS
      .GetCollection({
        assistance_id: assistance_id,
        campus_id: this.form.controls.campus_id.value,
        init_date: this.form.controls.start_date.value,
        finish_date: this.form.controls.finish_date.value,
        medical_status_id: this.isRescheduling ? 1 : this.form.value.status_id,
        procedure_id: this.id,
      })
      .then((x) => {
        this.medical_diary = x;
        this.messageError = null;
        if (this.medical_diary.length > 0) {
          // this.assistance_id = this.medical_diary[0].assistance_id;
          // var done = false;
          // this.medical_diary.forEach((x) => {
          //   var data = {
          //     Id: x.id,
          //     Subject:
          //       x.medical_status_id == 1
          //         ? 'Libre'
          //         : x.medical_status_id == 2
          //         ? 'Reservada por ' + x.patient.nombre_completo
          //         : x.medical_status_id == 3
          //         ? 'Confirmada por ' + x.patient.nombre_completo
          //         : x.medical_status_id == 4
          //         ? 'Facturada'
          //         : 'Cancelada',
          //     StartTime: new Date(x.start_hour),
          //     EndTime: new Date(x.finish_hour),
          //     CategoryColor: x.medical_status_id == 1
          //     ? '#37B24D'
          //     : x.medical_status_id == 2
          //     ? '#D8E926'
          //     : x.medical_status_id == 3
          //     ? '#09DBD4'
          //     : x.medical_status_id == 4
          //     ? '#F44C01'
          //     : '#7309DB',
          //     IsReadonly: false,
          //     data: x,
          //     assistance_id: assistance_id,
          //   };
          //   this.scheduleData.push(data);
          // });

          this.scheduleData = x;

          this.charge();
        } else {
          this.messageError =
            'Usuario sin itinerario asignado para: ' + this.procedure_id.name;
        }
      });
  }

  getAssistance(procedure_id) {
    this.assistanceProcedureS
      .GetCollection({
        procedure_id: procedure_id,
        campus_id: this.form.controls.campus_id.value,
        init_date: this.form.controls.start_date.value,
        finish_date: this.form.controls.finish_date.value,
        medical_status_id: 1,
      })
      .then((x) => {
        this.assistance = x;
        this.filteredAssistanceOptions$ = of(this.assistance);
        this.filteredAssistanceOptions$ = this.form
          .get('assistance_id')
          .valueChanges.pipe(
            startWith(''),
            map((filterString) => this.filter(filterString, 2))
          );
        if (this.assistance.length > 0) {
        } else {
          this.scheduleData = [];
          this.eventSettings = undefined;
        }
      });
  }

  charge() {
    this.eventSettings = {
      dataSource: <Object[]>extend([], this.scheduleData, null, true),
      enableTooltip: true,
    };
    // console.log(this.eventSettings);
  }

  onActionComplete(args: ActionEventArgs): void {
    // console.log(args);
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

  public executeReschedule(data) {
    return this.medicalDiaryDaysS.Transfer(data).then(x => {
      this.messageEvent.emit(true);
      return Promise.resolve(x.message);
    })
      .catch(x => {
        throw x;
      });
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    // console.log(args);
    // var resultArray = Object.keys(args.data).map(function (personNamedIndex) {
    //   let person = args.data[personNamedIndex];
    //   // do something with person
    //   return person;
    // });

    if (args.type == 'Editor') {
      args.cancel = true;

      if (!this.isRescheduling) {
        this.dialogFormService.open(FormHealthcareItineraryAgendantComponent, {
          context: {
            data: args.data,
            assistance: this.user,
            onlyView: false,
            cups_selected_id: this.procedure_id.id,
            saved: this.RefreshData.bind(this),
          },
        });
      } else {
        this.dialogFormService.open(ConfirmDialogComponent, {
          context: {
            title: 'Confirmar traslado',
            body: '¿ESTÁ SEGURO QUE DESEA TRASLADAR ESTA CONSULTA?',
            textConfirm: 'TRASLADAR',
            data: { oldId: this.medical_diary_day_id, newId: args.data["id"] },
            delete: this.executeReschedule.bind(this)
          },
        });
      }
    } else if (args.type == 'EventContainer') {
    } else {
      args.cancel = true;
    }

    // var arg = args;

    // args.element.ej2_instances[0].headerEle.firstChild.textContent = 'nueva cita';

    // if (args.type === 'Editor') {
    //   console.log(args);
    //   // if(args.data){
    //   //   // let eventData: { [key: string]: Object } = args.data[0] as { [key: string]: Object };
    //   //   // let eventField: EventFieldsMapping = scheduleObj.eventFields;
    //   //   // let startDate: Date = eventData[eventField.startTime] as Date;
    //   //   // let endDate: Date = eventData[eventField.endTime] as Date;
    //   //   args.cancel = true;
    //   // }
    //   // if(!this.done){
    //   //   var element;
    //   //   var element2;
    //   //   var buttons;

    //   //   element = args.element.querySelector(".e-dlg-header-content");
    //   //   // element.style.display = 'none';
    //   //   element2 = args.element.querySelector(".e-footer-content");
    //   //   // document.getElementById('principal').getElementsByClassName('prueba');
    //   //   buttons = document.querySelector('.e-footer-content').getElementsByClassName('e-btn');
    //   //   buttons[0].innerHTML = 'Borrar';
    //   //   buttons[0].style.display = 'none';

    //   //   buttons[1].innerHTML = 'Guardar';
    //   //   buttons[1].setAttribute('nbbutton', "");
    //   //   buttons[1].classList.remove('e-control');
    //   //   // buttons[1].classList.remove('e-btn');
    //   //   buttons[1].classList.remove('e-lib');
    //   //   buttons[1].classList.remove('e-primary');
    //   //   buttons[1].classList.remove('e-event-save');// funcion guardar
    //   //   buttons[1].classList.remove('e-flat');
    //   //   buttons[1].classList.add('appearance-filled');
    //   //   buttons[1].classList.add('size-medium');
    //   //   buttons[1].classList.add('status-danger');
    //   //   buttons[1].classList.add('shape-rectangle');
    //   //   buttons[1].classList.add('nb-transition');

    //   //   // , 'appearance-filled size-medium status-danger shape-rectangle nb-transition');

    //   //   buttons[2].innerHTML = 'Cancelar';
    //   //   buttons[2].setAttribute('nbbutton', "");
    //   //   // buttons[2].classList.replace('e-control e-btn e-lib e-event-cancel e-flat', 'appearance-filled size-medium shape-rectangle nb-transition');
    //   //   buttons[2].classList.remove('e-control');
    //   //   // buttons[2].classList.remove('e-btn');
    //   //   buttons[2].classList.remove('e-lib');
    //   //   buttons[2].classList.remove('e-event-cancel');
    //   //   buttons[2].classList.remove('e-flat');
    //   //   buttons[2].classList.add('appearance-filled');
    //   //   buttons[2].classList.add('size-medium');
    //   //   buttons[2].classList.add('shape-rectangle');
    //   //   buttons[2].classList.add('nb-transition');

    //   //   // element2.style.display = 'none';
    //   //   this.done=true;
    //   // }
    //   // args.element.querySelector(".e-dlg-header-content").innerHTML = 'Nuevo agendamiento';
    //   // e-all-day-time-zone-row
    // }

    // if (args.type === 'Editor') {

    // }
    // if (args.type === 'QuickInfo') {
    //   if (args.target.classList.contains('e-work-cells') || args.target.classList.contains('e-header-cells')) {
    //     this.scheduleObj.closeQuickInfoPopup();
    //     args.cancel = true;
    //   } else if (args.target.classList.contains('e-appointment')) {
    //     (args.element as HTMLElement).style.boxShadow = `1px 2px 5px 0 ${(args.target as HTMLElement).style.backgroundColor}`;
    //   }
    // }
    // if (args.type === 'EventContainer') {
    //   const eventElements: NodeListOf<HTMLElement> = args.element.querySelectorAll('.e-appointment');
    //   eventElements.forEach((element: HTMLElement) => { (element.querySelector('.e-subject') as HTMLElement).style.color = '#fff'; });
    // }
  }

  RefreshData() {
    this.form.patchValue({
      procedure_id: null,
      assistance_id: null,
      start_date: null,
      finish_date: null,
      status_id: null,
    });

    this.scheduleData = [];
    this.eventSettings = undefined;

    // this.getSchedule(this.assistance_id);
    // this.table.refresh();
  }

  close() {
    // this.dialogRef.close();
    window.close();
  }

  NewPatient() {
    this.dialogFormService.open(FormPatientComponent, {
      context: {
        title: 'Nuevo paciente',
        // saved: this.RefreshData.bind(this),
      },
    });
  }

  EditNonWorkingDays(data) {
    this.dialogFormService.open(FormHealthcareItineraryComponent, {
      context: {
        title: 'Editar tipo de profesional',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmNonWorkingDays(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteTypeProfessional.bind(this),
      },
    });
  }

  DeleteTypeProfessional(data) {
    return this.NonWorkingDaysS.Delete(data.id)
      .then((x) => {
        this.table.refresh();
        return Promise.resolve(x.message);
      })
      .catch((x) => {
        throw x;
      });
  }

  tablock(tab) {
    switch (tab.tabTitle) {
      case 'AGENDAMIENTOS': {
        this.show = 1;
        break;
      }
      case 'FACTURACIÓN': {
        this.show = 2;
        break;
      }
      case 'ADMITIDOS': {
        this.show = 3;
        break;
      }
    }
  }
}

import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PatientCheckComponent } from '../patient-check.component';
import { UserPharmacyStockService } from '../../../../business-controller/user-pharmacy-stock.service';
import { UserRoleBusinessService } from '../../../../business-controller/user-role-business.service';
import { AssistanceProcedureService } from '../../../../business-controller/assistance-procedure.service';
import { ProcedureService } from '../../../../business-controller/procedure.service';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { id } from '@swimlane/ngx-charts';
import { ActionsSchedulingComponent } from './actions-scheduling.component';
import { EditPatientComponent } from '../../edit-patient/edit-patient.component';
import { FormConfirmDisabledComponent } from '../../copay_category/form-confirm-disabled/form-confirm-disabled.component';
import { MedicalDiaryDaysService } from '../../../../business-controller/medical_diary_days.service';
import { FormAdmissionsPatientComponent } from '../../../admissions/admissions-patient/form-admissions-patient/form-admissions-patient.component';
import { HealthcareItineraryComponent } from '../healthcare-itinerary.component';

@Component({
  selector: 'ngx-scheduling-table',
  templateUrl: './scheduling-table.component.html',
  styleUrls: ['./scheduling-table.component.scss'],
})
export class SchedulingTableComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  public messageError = null;

  public form: FormGroup;
  public title = 'Facturación';
  public subtitle = '';
  public headerFields: any[] = [
    'Estado',
    'Tipo de documento',
    'Documento',
    'Nombre',
    'Profesional',
    'Consultorio',
    'Procedimiento',
    'Inicio',
    'Finalización',
    'Piso',
    'Pabellon'
  ];
  public routes = [];
  public row;
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];
  public emit: any[] = [];
  public data: any = [];
  public dialog;
  public procedure: any[] = [];
  public assistance: any[] = [];

  public inscriptionstatus = 0;
  public selectedRows: any;
  public inscriptionId;
  public entity;
  public customData;
  public users;
  public saved: any = null;
  public filteredProcedureOptions$: Observable<string[]>;
  public filteredAssistanceOptions$: Observable<string[]>;
  public assistance_id: any;
  public procedure_id: any;

  public procedure_package_id: number;
  public done = false;
  public today = new Date();
  public min_day = null;
  public values = {
    status_id: null,
    start_date: null,
    finish_date: null,
    assistance_id: null,
    procedure_id: null,
  };

  public settings = {
    columns: {
      select: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'editP': this.editPatient.bind(this),
            'confirmScheduling': this.confirmScheduling.bind(this),
            'check_in': this.checkIn.bind(this),
            'cancelScheduling': this.cancelScheduling.bind(this),
            'copayPDF': this.generatePdf.bind(this),
            'refreshTable': this.RefreshData.bind(this),
          };
        },
        renderComponent: ActionsSchedulingComponent,
      },
      medical_status: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value, row) {
          return value?.name;
        },
      },
      'patient.identification_type': {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction(value, row) {
          if(row.patient){
            return row.patient?.identification_type.name;
          } else {
            return '--';
          }
        },
      },
      'patient.identification': {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value, row) {
          if(row.patient){
            return row.patient?.identification;
          } else {
            return '--'
          }
        },
      },
      'patient.nombre_completo': {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction(value, row) {
          if(row.patient){
            return row.patient?.nombre_completo;
          } else {
            return '--'
          }
        },
      },
      'medical_diary.assistance.user': {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value, row) {
          if(row.medical_diary){
            return row.medical_diary.assistance.user.nombre_completo
          } else {
            return '--'
          }
        },
      },
      'medical_diary.office.pavilion.flat.name': {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction(value, row) {
          if(row.medical_diary){
            return row.medical_diary.office.pavilion.flat.name;
          } else {
            return '--'
          }
        },
      },
      'medical_diary.office.pavilion.name': {
        title: this.headerFields[10],
        type: 'string',
        valuePrepareFunction(value, row) {
          if(row.medical_diary){
            return row.medical_diary.office.pavilion.name;
          } else {
            return '--'
          }
        },
      },
      'medical_diary.office.name': {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value, row) {
          if(row.medical_diary){
            return row.medical_diary.office.name;
          } else {
            return '--'
          }
        },
      },
      'services_briefcase.manual_price.procedure': {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction(value, row) {
          if(row.services_briefcase){
            return row.services_briefcase.manual_price.procedure.name;
          } else {
            return '--'
          }
        },
      },
      start_hour: {
        title: this.headerFields[7],
        type: 'string',
      },
      finish_hour: {
        title: this.headerFields[8],
        type: 'string',
      },
    },
  };

  constructor(
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder,
    private procedureS: ProcedureService,
    private toastS: NbToastrService,
    private UserPharmacyStockS: UserPharmacyStockService,
    private userRoleS: UserRoleBusinessService,
    private AssistanceProcedureS: AssistanceProcedureService,
    private medicalDiaryDaysS: MedicalDiaryDaysService,
  ) {}

  async ngOnInit(): Promise<void> {
    if (!this.data) {
      this.data = {
        procedure_id: null,
        assistance_id: null,
        start_date: null,
        finish_date: null,
        status_id: null,
      };
    }

    this.form = this.formBuilder.group({
      procedure_id: [this.data.office_id],
      assistance_id: [this.data.assistance_id],
      start_date: [this.data.start_date],
      finish_date: [this.data.finish_date],
      status_id: [this.data.status_id],
    });

    this.procedureS.GetCollection().then((x) => {
      this.procedure = x;
      this.filteredProcedureOptions$ = of(this.procedure);
      this.onFilter();
    });

    this.onChange();
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
    const filterValue = value.toUpperCase();
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

  onSelectionChange($event, e) {
    // console.log($event)
    var localidentify;

    if (e == 1) {
      localidentify = this.procedure.find((item) => item.name == $event);

      if (localidentify) {
        this.procedure_id = localidentify;
        this.getAssistance(this.procedure_id.id);
      } else {
        this.procedure_id = null;
        this.assistance = [];
        this.toastS.warning('', 'Debe seleccionar un item de la lista');
      }
      this.values.procedure_id = this.procedure_id?.id;
      this.FilterAuth();
    } else if (e == 2) {
      localidentify = this.assistance.find(
        (item) => item.nombre_completo == $event
      );

      if (localidentify) {
        this.assistance_id = localidentify.assistance_id;
      } else {
        this.assistance_id = null;
        this.toastS.warning('', 'Debe seleccionar un asistencial de la lista');
      }
      this.values.assistance_id = this.assistance_id;
      this.FilterAuth();
    }
  }

  onChange() {
    this.form.get('status_id').valueChanges.subscribe((val) => {
      this.values.status_id = val;
      this.FilterAuth();
    });

    this.form.get('start_date').valueChanges.subscribe((val) => {
      this.values.start_date = val;
      this.min_day = val;
      this.FilterAuth();
    });

    this.form.get('finish_date').valueChanges.subscribe((val) => {
      this.values.finish_date = val;
      this.FilterAuth();
    });
  }

  FilterAuth() {
    this.table.changeEntity(
      `medical_diary_days?pagination=true&medical_status_id=${this.values.status_id}&init_date=${this.values.start_date}&finish_date=${this.values.finish_date}&procedure_id=${this.values.procedure_id}&assistance_id=${this.values.assistance_id}&scheduling=true`,
      'medical_diary_days'
    );
  }

  getAssistance(procedure_id) {
    this.AssistanceProcedureS.GetCollection({
      procedure_id: procedure_id,
      campus_id: this.form.value.campus_id,
      init_date: this.form.value.start_date,
      finish_date: this.form.value.finish_date,
    }).then((x) => {
      this.assistance = x;
      if (this.assistance.length > 0) {
        this.filteredAssistanceOptions$ = this.form
          .get('assistance_id')
          .valueChanges.pipe(
            startWith(''),
            map((filterString) => this.filter(filterString, 2))
          );
      }
    });
  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions2.push(row.id);
    } else {
      let i = this.selectedOptions2.indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
    }
    this.selectedOptions = this.selectedOptions2;
  }
  // RefreshData() {
  //   this.table.refresh();
  // }

  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }
  saveGroup() {
    if (!this.selectedOptions.length) {
      this.toastS.danger(null, 'Debe seleccionar al menos un item');
    } else {
      this.AssistanceProcedureS.UpdateProcedures({
        assistance_id: this.data.assistance_id,
        procedure: JSON.stringify(this.selectedOptions),
      })
        .then((x) => {
          this.toastS.success(x.message, 'Correcto');
          if (this.saved) {
            this.saved();
          }
        })
        .catch((x) => {});
    }
  }

  confirmScheduling(data){
    this.medicalDiaryDaysS.ChangeStatus(data.id, {status_id: 3}).then(x =>{
      this.toastS.success('', x.message);
      this.RefreshData();
    });
  }

  checkIn(data){
    this.dialogService.open(FormAdmissionsPatientComponent, {
      context: {
        data: data,
        user_id: data.patient_id,
        admissions_id: 0,
        // CancelScheduling: this.cancel.bind(this),
        ambolatory: true,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  cancelScheduling(data){
    this.dialogService.open(FormConfirmDisabledComponent, {
      context: {
        data: data,
        CancelScheduling: this.RefreshData.bind(this),
        // saved: this.RefreshData.bind(this),
      },
    });
  }

  // cancel(){

  //   // this.medicalDiaryDaysS.ChangeStatus(data.id, 5).then(x =>{
  //   //   this.toastS.success('', x.message);
  //     this.RefreshData();
  //   // });

  // }

  generatePdf(data) {
    this.medicalDiaryDaysS.GeneratePdf({
      id: data.id,
    }).then(x => {
      this.toastS.success('Archivo generado con exito', 'Exito');
      window.open(x['url'], '_blank');
    }).catch(x => {
      this.toastS.danger('Error al generar archivo: ' + x, 'Error');
    });
  }

  editPatient(data){
    this.dialogService.open(EditPatientComponent, {
      context: {
        id: data.patient.id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

  RefreshData() {

    this.table.refresh();
  }
}

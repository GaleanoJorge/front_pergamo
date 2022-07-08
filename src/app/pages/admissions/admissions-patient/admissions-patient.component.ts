import { AdmissionsService } from '../../../business-controller/admissions.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import {Component, OnInit,Input,TemplateRef,ViewChild} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Actions2Component } from './actions.component';
import { FormAdmissionsPatientComponent } from './form-admissions-patient/form-admissions-patient.component';
import {ActivatedRoute, Router} from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormPatientDataComponent } from '../patient-data/form-admissions-patient/form-patient-data.component';
import { Patient } from '../../../models/patient';
import { PatientService } from '../../../business-controller/patient.service';


@Component({
  selector: 'ngx-admissions-patient',
  templateUrl: './admissions-patient.component.html',
  styleUrls: ['./admissions-patient.component.scss'],
})
export class AdmissionsPatientComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public messageError = null;
  public title;
  public subtitle = 'Por usuario';
  public headerFields: any[] =  ['Consecutivo de ingreso', 'Ruta','Ambito','Programa','Sede', 'Piso','Pabellón','Cama/Consultorio','Contrato','Portafolio','Fecha Ingreso','Fecha Egreso','Salida Medica'];
  public routes = [];
  public course;
  public data= [];
  public user_id;
  public patient_id;
  public date_end:boolean = true;
  public cont=0;
  public ambit;
  public program;
  public flat;
  public bed;
  public bed_id;
  public pavilion;
  public patient;
  public admission_route_id;
  public admission_id;




  public settings = {
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditAdmissions.bind(this),
            'delete': this.DeleteConfirmAdmissions.bind(this),
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: Actions2Component,
      },
      consecutive: {
        title: this.headerFields[0],
        width: '5%',
      },
      location: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          this.admission_id=value[value.length - 1].id;
          this.admission_route_id=value[value.length - 1].admission_route_id;
          this.ambit=value[value.length - 1].scope_of_attention.name;
          this.program=value[value.length - 1].program.name;
          if(value[value.length - 1].pavilion){
          this.flat=value[value.length - 1].flat.name;
          this.pavilion=value[value.length - 1].pavilion.name;
          this.bed=value[value.length - 1].bed.name;
          this.bed_id=value[value.length - 1].bed.id;
          }else{
            this.flat='';
            this.pavilion='';
            this.bed='';
          }
          return value[value.length - 1].admission_route.name;
        },
      },
      scope_of_attention: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.ambit;
        },
      },
      program: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.program;
        },
      },
      campus: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      flat: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.flat;
        },
      },
      pavilion: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.pavilion;
        },
      },
      bed: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.bed;
        },
      },
      contract: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      briefcase: {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      entry_date: {
        title: this.headerFields[10],
        type: 'date',
      },      
      discharge_date: {
        title: this.headerFields[11],
        type: 'date',
        valuePrepareFunction: (value, row) => {
          if(value=='0000-00-00 00:00:00' && this.cont!=1){
            this.date_end = false;
            this.cont = + 1;
          }else if(this.cont==0){
            this.date_end = true;
          }
          return value;
        },
      },
      medical_date: {
        title: this.headerFields[12],
        type: 'date',
      },     
    },
  };

  constructor(
    private route: ActivatedRoute,
    private admissionsS: AdmissionsService,
    private router: Router,
    private dialogFormService: NbDialogService,
    private UserBS: UserBusinessService,
    private PatientBS: PatientService,
    private deleteConfirmService: NbDialogService,
  ) {
    this.routes = [
      {
        name: 'Pacientes',
        route: '../../list',
      },
      {
        name: 'Admisiones del paciente',
        route: '../../admissions-patient/' + this.route.snapshot.params.user_id,
      },
    ];
    
  }

  GetParams() {
    return {
      patient_id: this.route.snapshot.params.patient_id,
    };
  }

   ngOnInit(): void {
    this.patient_id= this.route.snapshot.params.patient_id;


    this.PatientBS.GetUserById(this.patient_id).then(x => {
      if(x){
        this.patient = x;
        this.title= 'Admisiones de paciente: '+ this.patient.firstname  + ' ' + this.patient.lastname ;
      }
    });
  }

  RefreshData() {

    this.table.refresh();
  }

  NewAdmissions() {
    this.dialogFormService.open(FormPatientDataComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Crear nuevo ingreso',
        user_id: this.patient_id,
        admission_id:this.admission_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAdmissions(data) {
    this.dialogFormService.open(FormAdmissionsPatientComponent, {
      context: {
        title: 'Editar tipo de ingreso',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  // ChangeState(data) {
  //   // data.status_id = data.status_id === 1 ? 2 : 1;

  //   this.toastrService.info('', 'Cambiando estado');

  //   this.regionS.Update(data).then((x) => {
  //     this.toastrService.success('', x.message);
  //     this.table.refresh();
  //   }).catch((x) => {
  //     this.toastrService.danger(x.message);
  //   });
  // }

  DeleteConfirmAdmissions(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteAdmissions.bind(this),
      },
    });
  }

  DeleteAdmissions(data) {
    return this.admissionsS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

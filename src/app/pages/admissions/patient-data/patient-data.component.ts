import { PatientDataService } from '../../../business-controller/patient-data.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import {Component, OnInit,Input,TemplateRef,ViewChild} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Actions2Component } from './actions.component';
import { FormPatientDataComponent } from './form-admissions-patient/form-patient-data.component';
import {ActivatedRoute, Router} from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss'],
})
export class PatientDataComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public messageError = null;
  public title;
  public headerFields: any[] =  ['Tipo de acompañante', 'Tipo identificación', 'Identificación', 'Nombres', 'Correo', 'Dirección', 'Numero'];
  public routes = [];
  public data= [];
  public user_id;
  public date_end:boolean=true;
  public cont=0;
  public identification_caregiver_id;
  public program;
  public flat;
  public bed;
  public bed_id;
  public patient_data_identification;
  public entity:string;
  public showDiv:boolean;



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
      patient_data_type: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        }
      },
      identification_caregiver_id: {
        title: this.headerFields[1],
        type: 'string',
      },
      patient_data_identification: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.patient_data_identification;
        },
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private PatienDataS: PatientDataService,
    private router: Router,
    private dialogFormService: NbDialogService,
    private UserBS: UserBusinessService,
    private deleteConfirmService: NbDialogService,
  ) {
    this.routes = [
      {
        name: 'Pacientes',
        route: '../../../../admissions/list',
      },
      {
        name: 'Admisiones del paciente',
        route: '../../../../admissions/admissions-patient/' + this.route.snapshot.params.user_id,
      },
    ];
    
  }

  GetParams() {
    return {
      user_id: this.route.snapshot.params.user_id,
    };
  }

   ngOnInit(): void {
    this.user_id= this.route.snapshot.params.user_id;

    if (this.user_id){
      this.showDiv=true;
      this.entity="admissions/ByPacient/{{user_id}}";
    }else{
      this.showDiv=false;
    }


    this.UserBS.GetUserById(this.user_id).then(x => {
      var user = x;
      this.title= 'Admisiones de paciente: '+ user.firstname  + ' ' + user.lastname ;
    });
  }

  RefreshData() {

    this.table.refresh();
  }

  NewAdmissions() {
    this.dialogFormService.open(FormPatientDataComponent, {
      context: {
        title: 'Crear nuevo tipo de afiliado',
        user_id:this.user_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAdmissions(data) {
    this.dialogFormService.open(FormPatientDataComponent, {
      context: {
        title: 'Editar tipo de afiliado',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

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
    return this.PatienDataS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

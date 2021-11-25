import { AdmissionsService } from '../../../business-controller/admissions.service';
import {Component, OnInit,Input,TemplateRef,ViewChild} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../../setting/sectional-council/actions.component';
import { FormAdmissionsPatientComponent } from './form-admissions-patient/form-admissions-patient.component';
import {ActivatedRoute, Router} from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-admissions-patient',
  templateUrl: './admissions-patient.component.html',
  styleUrls: ['./admissions-patient.component.scss'],
})
export class AdmissionsPatientComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public messageError = null;
  public title = 'Admisiones';
  public subtitle = 'por usuario';
  public headerFields: any[] =  ['Código', 'Ruta','Ambito','Programa','Sede', 'Piso','Pabellón','Cama/Consultorio','Contrato','Fecha Ingreso','Fecha Egreso','Salida Medica'];
  public routes = [];
  public course;
  public data= [];
  public user_id;
  public date_end;
  public cont=0;

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditAdmissions.bind(this),
            'delete': this.DeleteConfirmAdmissions.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        width: '5%',
      },
      admission_route: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      scope_of_attention: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      program: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
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
          return value.name;
        },
      },
      pavilion: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      bed: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      contract: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      entry_date: {
        title: this.headerFields[9],
        type: 'date',
      },      
      discharge_date: {
        title: this.headerFields[10],
        type: 'date',
        valuePrepareFunction: (value, row) => {
          if(value=='0000-00-00 00:00:00' && this.cont!=1){
            this.date_end=true;
            this.cont=+1;
          }else if(this.cont==0){
            this.date_end=false;
          }
          return value;
        },
      },
      medical_date: {
        title: this.headerFields[11],
        type: 'date',
      },
      
    },
  };

  constructor(
    private route: ActivatedRoute,
    private admissionsS: AdmissionsService,
    private router: Router,
    private dialogFormService: NbDialogService,
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
  }

  RefreshData() {

    this.table.refresh();
  }

  NewAdmissions() {
    this.dialogFormService.open(FormAdmissionsPatientComponent, {
      context: {
        title: 'Crear nuevo tipo de afiliado',
        user_id:this.user_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAdmissions(data) {
    this.dialogFormService.open(FormAdmissionsPatientComponent, {
      context: {
        title: 'Editar tipo de afiliado',
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

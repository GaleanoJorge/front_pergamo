import { Component, ViewChild } from '@angular/core';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ActionsComponent } from './actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { AuthService } from '../../../services/auth.service';
import { DbPwaService } from '../../../services/authPouch.service';


@Component({
  selector: 'ngx-admissions-list',
  templateUrl: 'admissions-list.component.html',
  styleUrls: ['admissions-list.component.scss'],
})

export class AdmissionsListComponent {
  public data: any[] = [];
  public messageError: string = null;
  public dialog;
  public title = 'Tablero de Pacientes';
  public headerFields: any[] = ['Tipo identificación', 'Identificación', 'Nombres', 'Correo', 'Estado'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public subtitle = 'Admisiones';
  public datain;
  public admissions:any[];
  public status;
  public currentRole;
  public show = true;
  public all_changes:any[];
  public own_user: any = null;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public routes = [
    {
      name: 'Pacientes',
      route: '../../admissions/list',
    },
  ];

  public settings = {

    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          this.datain=row;
          return {
            'data': row,
            'all_changes': this.all_changes,
            // 'edit': this.EditPatient.bind(this),
            'delete': this.DeleteConfirmPatient.bind(this),
            'reset_password': this.UpdateResetPassword.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      'identification_type.name': {
        title: this.headerFields[0],
        type: 'string',
        // sort: false,
        valuePrepareFunction(value, row) {
          return row.identification_type?.name;
        },
      },
      identification: {
        title: this.headerFields[1],
        type: 'string',
      },
      nombre_completo: {
        title: this.headerFields[2],
        type: 'string',
      },
      email: {
        title: this.headerFields[3],
        type: 'string',
      },
      admissions: {
        title: this.headerFields[4],
        type: 'string',
        width: '10%',
        valuePrepareFunction: (value, row) => {
          if(value.length==0){
            return "No admitido"
          }else if(value[value.length - 1].discharge_date == '0000-00-00 00:00:00' ){
            return "Admitido"
          }else{
            return "No admitido"
          }         
        },
      },
    },
  };

  constructor(
    private userS: UserBusinessService,
    private toastrService: NbToastrService,
    private deleteConfirmService: NbDialogService,
    public AdmissionsS: AdmissionsService,
    public userChangeS: UserChangeService,
    private authService: AuthService,
    private dbPouch: DbPwaService,
  ) {

  }
  async ngOnInit() {
    this.dbPouch.getData(this.own_user.id)
   
    await this.userChangeS.GetCollection().then(x =>{
      this.all_changes = x;
      // this.dbPouch.createPatient(this.title,this.all_changes);
    });
  
    this.own_user = this.authService.GetUser();
    var curr = this.authService.GetRole();
    this.currentRole = this.own_user.roles.find(x => {
      return x.id == curr;
    });
    this.show = (
      this.currentRole.role_type_id == 23 || // PAD - GESTOR
      this.currentRole.role_type_id == 26 || // PAD - GESTOR PHD
      this.currentRole.role_type_id == 27 || // PAD - ANALISTA ADMIN
      this.currentRole.role_type_id == 28 || // PAD - CORDINADOR NACIONAL
      this.currentRole.role_type_id == 29 || // PAD - JEFE DE PLANEACIÓN
      this.currentRole.role_type_id == 30 || // PAD - DIRECCIÓN
      this.currentRole.role_type_id == 31 || // PAD - JEFE BUSQUEDA ACTIVA
      this.currentRole.role_type_id == 32) ? // PAD - CORDINADOR CONVENIOS
      false : true;
    }

  RefreshData() {
    this.table.refresh();
  }

  ChangeState(data) {
    this.userS.ChangeStatus(data.id, this.own_user.id).then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    }).catch((x) => {
      // this.toastrService.danger(x.message);
    });
  }

  UpdateResetPassword(data) {
    this.userS.ChangeForceresetPassword(data.id, !data.force_reset_password).then(x => {
      this.toastrService.success('', x.message);
      this.table.refresh();
    }).catch((x) => {
      // this.toastrService.danger(x.message);
    });
  }

  DeleteConfirmPatient(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.firstname,
        data: data,
        delete: this.DeletePatient.bind(this),
      },
    });
  }

  DeletePatient(data) {
    return this.userS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

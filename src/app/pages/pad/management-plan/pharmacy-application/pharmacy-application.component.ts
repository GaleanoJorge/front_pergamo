import { Component, ViewChild } from '@angular/core';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Actions3Component } from './actions.component';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { AdmissionsService } from '../../../../business-controller/admissions.service';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'ngx-pharmacy-application',
  templateUrl: 'pharmacy-application.component.html',
  styleUrls: ['pharmacy-application.component.scss'],
})

export class PharmacyApplicationComponent {
  public data: any[] = [];
  public messageError: string = null;
  public dialog;
  public title = 'Solicitudes a Farmacia';
  public headerFields: any[] = ['Medicamento','Identificación','Nombre del paciente','Cantidad' ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public subtitle = 'Gestión';
  public datain;
  public admissions:any[];
  public status;
  public own_user: any = null;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public routes = [
    {
      name: 'Plan de manejo',
      route: '../../management-plan',
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
            // 'edit': this.EditPatient.bind(this),
            'delete': this.DeleteConfirmPatient.bind(this),
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: Actions3Component,
      },
      service_briefcase: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.manual_price.name    
      },
      },
      'admissions.patients': {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
            return row.admissions.patients.identification    
        },
      },
      'admissions': {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
            return row.admissions.patients.firstname + ' ' +  row.admissions.patients.lastname;
        },
      },
      number_doses: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
            return value;
        },
      },
    },
  };

  constructor(
    private userS: UserBusinessService,
    private toastrService: NbToastrService,
    private deleteConfirmService: NbDialogService,
    public AdmissionsS: AdmissionsService,
    private authService: AuthService,
  ) {

  }
  async ngOnInit() {
    this.own_user = this.authService.GetUser();
  
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

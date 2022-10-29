import { Component, ViewChild } from '@angular/core';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Actions3Component } from './actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'ngx-bed-management',
  templateUrl: 'bed-management.component.html',
  styleUrls: ['bed-management.component.scss'],
})

export class BedManagementComponent {
  public data: any[] = [];
  public messageError: string = null;
  public dialog;
  public title = 'Manejo de camas';
  public headerFields: any[] = ['Código', 'Cama / Consultorio', 'Estado', 'Paciente',];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public subtitle = 'Admisiones';
  public datain;
  public admissions: any[];
  public status;
  public own_user: any = null;
  public campus_id;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public routes = [
    {
      name: 'Pacientes',
      route: '../../admissions/bed-management',
    },
  ];

  public settings = {

    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          this.datain = row;
          if (row.reservation_date) {
            var c = new Date(row.reservation_date).getTime();
            var d = new Date().getTime();
            var e = (d - c) / (60 * 60 * 1000);
            var show = e <= 6 ? true : false;
            if (show) {
              row.status_bed_id = 6;
              row.status_bed.name = 'Reservada';
            } else {
              row.status_bed_id = 1;
              row.status_bed.name = 'Libre';
            }
          }

          return {
            'data': row,
            // 'edit': this.EditPatient.bind(this),
            'delete': this.DeleteConfirmPatient.bind(this),
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: Actions3Component,
      },
      code: {
        title: this.headerFields[0],
        type: 'string',
        // sort: false,
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      status_bed: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name
        },
      },
      location: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.status_bed_id == 1 || row.status_bed_id == 3 || row.status_bed_id == 4 || row.status_bed_id == 5) {
            return 'Sin paciente'
          } else if (row.status_bed_id == 6) {
            return row.reference[row.reference.length - 1].firstname + ' ' + row.reference[row.reference.length - 1].lastname
          } else {
            return value[value.length - 1].admissions.patients.firstname + ' ' + value[value.length - 1].admissions.patients.lastname
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
    private authService: AuthService,
  ) {

  }
  async ngOnInit() {
    this.own_user = this.authService.GetUser();
    this.campus_id = +localStorage.getItem('campus');
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

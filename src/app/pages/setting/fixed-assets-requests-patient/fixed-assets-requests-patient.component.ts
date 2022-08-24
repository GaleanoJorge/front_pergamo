import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FixedAddService } from '../../../business-controller/fixed-add.service';
import { FixedAssetsService } from '../../../business-controller/fixed-assets.service';
import { AuthService } from '../../../services/auth.service';

import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ActionsAssReqPatientComponent } from './actions.component';
import { FormFixedAssetsRequestsPatientComponent } from './form-fixed-assets-requests-patient/form-fixed-assets-requests-patient.component';

@Component({
  selector: 'ngx-fixed-assets-requests-patient',
  templateUrl: './fixed-assets-requests-patient.component.html',
  styleUrls: ['./fixed-assets-requests-patient.component.scss']
})
export class FixedAssetsRequestsPatientComponent implements OnInit {
  @Input() parentData: any;
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'LISTA DE ACTIVOS SOLICITADOS';
  public subtitle: string = '';
  public headerFields: any[] = ['ELEMENTO', 'CANTIDAD', 'SOLICITADO POR', 'PACIENTE'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public validator;
  public entity;
  public user;
  public my_fixed_id;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },

    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditPharmacy.bind(this),
          };
        },
        renderComponent: ActionsAssReqPatientComponent,
      },
      fixed_nom_product: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      request_amount: {
        title: this.headerFields[1],
        type: 'string',
      },
      own_fixed_user: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.own_fixed_user.firstname + " - " + row.own_fixed_user.lastname;
        },
      },
      admissions: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.admissions.patients.identification + " - " + row.admissions.patients.firstname + " " + row.admissions.patients.lastname;
        },
      },
    },
  };

  constructor(
    private FixedAddS: FixedAddService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private authService: AuthService,
    private FixedAssetsS: FixedAssetsService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    // this.validator = this.parentData;
    this.user = this.authService.GetUser();   
    this.FixedAssetsS.getFixedByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_fixed_id = x[0].id;
        // this.entity = 'fixed_add/?pagination=true&status=PATIENT';
        this.title = 'LISTA DE ACTIVOS SOLICITADOS  PARA PACIENTE A:  ' + x[0]['fixed_stock']['fixed_type']['name'];
      }else {
        this.toastService.info('Usuario sin tipo de activo asociadas', 'Información');
       }
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  NewPharmacy() {
    this.dialogFormService.open(FormFixedAssetsRequestsPatientComponent, {
      context: {
        title: 'Crear nueva Solicitud',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

  EditPharmacy(data) {
    this.dialogFormService.open(FormFixedAssetsRequestsPatientComponent, {
      context: {
        title: '',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmPharmacy(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePharmacy.bind(this),
      },
    });
  }

  DeletePharmacy(data) {
    return this.FixedAddS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

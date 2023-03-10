import { Component, OnInit, ViewChild } from '@angular/core';
import { RegionService } from '../../../business-controller/region.service';
import { CampusService } from '../../../business-controller/campus.service';
import { StatusFieldComponent } from '.././sectional-council/status-field.component';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCampusComponent } from './form-campus/form-campus.component';
import { ActionsComponent } from '.././sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormTariffConfirmDisabledComponent } from '../tariff/form-tariff-confirm-disabled/form-tariff-confirm-disabled.component';


@Component({
  selector: 'ngx-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss']
})
export class CampusComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Sedes';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Dirección', 'Código habilitación', 'Prefijo facturación', 'Región', 'Municipio', 'Estado', 'Prefijo nota crédito'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];

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
            'edit': this.EditCampus.bind(this),
            'delete': this.DeleteConfirmCampus.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      address: {
        title: this.headerFields[2],
        type: 'string',
      },
      enable_code: {
        title: this.headerFields[3],
        type: 'string',
      },
      billing_pad_prefix_id: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.billing_pad_prefix.name;
        }
      },
      billing_pad_credit_note_prefix_id: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (row.billing_pad_credit_note_prefix) {
            return row.billing_pad_credit_note_prefix.name;
          } else {
            return '--'
          }
        }
      },
      region_id: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.region.name;
        }
      },
      municipality_id: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.municipality.name;
        }
      },

      status_id: {
        title: this.headerFields[7],
        type: 'custom',
        width: '10%',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'changeState': this.ConfirmDisabled.bind(this),
          };
        },
        renderComponent: StatusFieldComponent,
      },
    },
  };

  public routes = [
    {
      name: 'Sede',
      route: '../../setting/campus',
    },
  ];

  constructor(
    private regionS: RegionService,
    private campusS: CampusService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private dialogService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  NewCampus() {
    this.dialogFormService.open(FormCampusComponent, {
      context: {
        title: 'Crear nueva Sede',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCampus(data) {
    this.dialogFormService.open(FormCampusComponent, {
      context: {
        title: 'Editar Sede',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ConfirmDisabled(dataUser) {
    this.dialogService.open(FormTariffConfirmDisabledComponent, {
      context: {
        data: dataUser,
        desable: this.ChangeState.bind(this),
      },
    });
  }

  ChangeState(data) {
    this.campusS.ChangeStatus(data.id).then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    }).catch((x) => {
      // this.toastrService.danger(x.message);
    });
  }

  DeleteConfirmCampus(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCampus.bind(this),
      },
    });
  }

  DeleteCampus(data) {
    return this.campusS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

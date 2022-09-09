import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { Router } from '@angular/router';
import { FormTariffComponent } from './form-tariff/form-tariff.component';
import { TariffService } from '../../../business-controller/tariff.service';
import { CurrencyPipe } from '@angular/common';
import { FormTariffConfirmDisabledComponent } from './form-tariff-confirm-disabled/form-tariff-confirm-disabled.component';

@Component({
  selector: 'ngx-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss'],
})
export class TariffComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'TARIFAS DE MÉDICOS';
  public subtitle: string = 'TARIFAS';
  public headerFields: any[] = ['NOMBRE', 'ZONA', 'EXTRA DOSIS', 'TELECONSULTA', 'PROGRAMA', 'HORAS ATENCIÓN', 'ESTADO', 'TIPO DE ATENCIÓN', 'HONORARIOS', 'FALLIDA', 'ADMISIÓN', 'CON CARRO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];


  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditTariff.bind(this),
            'delete': this.DeleteConfirmTariff.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      name: {
        title: this.headerFields[0],
        type: 'string',
      },
      pad_risk_id: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.pad_risk_id) {
            return row.pad_risk.name;
          } else {
            return 'NO APLICA';
          }
        },
      },
      extra_dose: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value != null) {
            if (value == 1) {
              return 'SI';
            } else {
              return 'NO';
            }
          } else {
            return 'NO APLICA';
          }
        },
      },
      phone_consult: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value != null) {
            if (value == 1) {
              return 'SI';
            } else {
              return 'NO';
            }
          } else {
            return 'NO APLICA';
          }
        },
      },
      program_id: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.program) {
            return row.program.name;
          } else {
            return 'NO APLICA';
          }
        },
      },
      quantity: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value != null) {
            if (value == 1) {
              return value + ' HORA';

            } else {
              return value + ' HORAS';
            }
          } else {
            return 'NO APLICA';
          }
        },
      },

      type_of_attention_id: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.type_of_attention) {
            return row.type_of_attention.name;
          } else {
            return 'NO APLICA';
          }
        },
      },
      has_car: {
        title: this.headerFields[11],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value != null) {
            if (value == 1) {
              return 'SI';
            } else {
              return 'NO';
            }
          } else {
            return 'NO APLICA';
          }
        },
      },
      failed: {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value != null) {
            if (value == 1) {
              return 'SI';
            } else {
              return 'NO';
            }
          } else {
            return 'NO APLICA';
          }
        },
      },
      admissions_id: {
        title: this.headerFields[10],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.admissions) {
            return row.nombre_completo;
          } else {
            return 'NO APLICA';
          }
        },
      },
      amount: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
      },
      status_id: {
        title: this.headerFields[6],
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
      name: 'Tarifas',
      route: '../../setting/tariff',
    },
  ];

  constructor(
    private tariffS: TariffService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private currency: CurrencyPipe,
    private dialogService: NbDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {
    this.table.refresh();
  }

  NewTariff() {
    this.dialogFormService.open(FormTariffComponent, {
      context: {
        title: 'CREAR NUEVA TARIFA',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditTariff(data) {
    this.dialogFormService.open(FormTariffComponent, {
      context: {
        title: 'EDITAR TARIFA',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }



  DeleteConfirmTariff(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteTariff.bind(this),
      },
    });
  }

  DeleteTariff(data) {
    return this.tariffS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
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
    this.tariffS.ChangeStatus(data.id).then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    }).catch((x) => {
      // this.toastrService.danger(x.message);
    });
  }
}

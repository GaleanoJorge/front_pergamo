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
import { FormBuilder, FormGroup } from '@angular/forms';
import { PadRiskService } from '../../../business-controller/pad-risk.service';
import { ProgramService } from '../../../business-controller/program.service';
import { TypeOfAttentionService } from '../../../business-controller/type-of-attention.service';

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
  public pad_risk;
  public program;
  public type_of_attention;
  public form: FormGroup;

  public yes_not = [
    { id: 2, name: 'Si' },
    { id: 1, name: 'NO' },
  ];

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
    private PadRiskS: PadRiskService,
    private ProgramS: ProgramService,
    private TypeOfAttentionS: TypeOfAttentionService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    
    this.PadRiskS.GetCollection().then(x => {
      this.pad_risk = x;
    });
    this.ProgramS.GetCollection().then(x => {
      this.program = x;
    });
    this.TypeOfAttentionS.GetCollection().then(x => {
      this.type_of_attention = x;
    });

    this.form = this.formBuilder.group({
      pad_risk_id: [''],
      extra_dose: [''],
      phone_consult: [''],
      program_id: [''],
      quantity: [''],
      type_of_attention_id: [''],
      has_car: [''],
      failed: [''],
      status_id: [''],
    });

    this.onChange();
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

  onChange() {
    this.form.get('pad_risk_id').valueChanges.subscribe(val => {
      this.changeEntity(val);
    });
    this.form.get('extra_dose').valueChanges.subscribe(val => {
      this.changeEntity(val);
    });
    this.form.get('phone_consult').valueChanges.subscribe(val => {
      this.changeEntity(val);
    });
    this.form.get('program_id').valueChanges.subscribe(val => {
      this.changeEntity(val);
    });
    this.form.get('quantity').valueChanges.subscribe(val => {
      this.changeEntity(val);
    });
    this.form.get('type_of_attention_id').valueChanges.subscribe(val => {
      this.changeEntity(val);
    });
    this.form.get('has_car').valueChanges.subscribe(val => {
      this.changeEntity(val);
    });
    this.form.get('failed').valueChanges.subscribe(val => {
      this.changeEntity(val);
    });
    this.form.get('status_id').valueChanges.subscribe(val => {
      this.changeEntity(val);
    });
  }

  changeEntity(val) {
    this.table.changeEntity('tariff?pad_risk_id=' + this.form.controls.pad_risk_id.value + '&extra_dose=' + this.form.controls.extra_dose.value + '&phone_consult=' + this.form.controls.phone_consult.value + '&program_id=' + this.form.controls.program_id.value + '&quantity=' + this.form.controls.quantity.value + '&type_of_attention_id=' + this.form.controls.type_of_attention_id.value + '&has_car=' + this.form.controls.has_car.value + '&failed=' + this.form.controls.failed.value + '&status_id=' + this.form.controls.status_id.value + '', 'tariff');
  }
}

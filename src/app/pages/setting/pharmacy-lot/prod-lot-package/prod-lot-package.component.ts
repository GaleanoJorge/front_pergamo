import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { PharmacyLotStockService } from '../../../../business-controller/pharmacy-lot-stock.service';
import { SelectPharmacyLotComponent } from './select-prod-lot.component';
import { AmountComponent } from './amount.component';
import { LotComponent } from './lot.component';
import { DateComponent } from './date.component';
import { BillingService } from '../../../../business-controller/billing.service';

@Component({
  selector: 'ngx-prod-lot-package',
  templateUrl: './prod-lot-package.component.html',
  styleUrls: ['./prod-lot-package.component.scss'],
})
export class ProdLotPackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  public messageError = null;


  public form: FormGroup;
  public title = 'Selección de medicamentos: ';
  public subtitle = 'medicamentos a ingresar: ';
  public headerFields: any[] = ['Medicamento', 'Descripción generico', 'Cantidad ordenada', 'Cantidad ingresar', 'Lote', 'Fecha vencimiento'];
  public routes = [];
  public row;
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];
  public emit: any[] = [];
  public data = [];
  public dialog;
  public inscriptionstatus = 0;
  public selectedRows: any;
  public inscriptionId;
  public campus;
  public entity;
  public billing_id: any[];
  public customData;

  public component_package_id: number;
  public done = false;
  public settings;
  public billing_stock_id;
  public show: boolean = false;



  public settings_supplies = {
    columns: {
      select: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (!this.done) {
            this.selectedOptions = this.parentData.selectedOptions;
            this.emit = this.parentData.selectedOptions;
            this.parentData.selectedOptions.forEach(x => {
              this.selectedOptions2.push(x.billing_stock_id);
            });
            this.done = true;
          }
          return {
            'data': row,
            'valid': (!this.selectedOptions2.includes(row.id)) ? false : true,
            'selection': (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: SelectPharmacyLotComponent,
      },
      product: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.product.name;
        },
      },
      product_generic: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.product.product_generic.description;
        },
      },
      amount: {
        title: this.headerFields[2],
        type: 'string',
      },
      amount_total: {
        title: this.headerFields[3],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          var amo;
          this.parentData.selectedOptions.forEach(x => {
            if (x.billing_stock_id == row.id) {
              amo = x.amount_total;
            }
          });
          return {
            'data': row,
            'enabled': !this.selectedOptions2.includes(row.id),
            'amount_total': amo ? amo : '',
            'onchange': (input, row: any) => this.onAmountChange(input, row),
          };
        },
        renderComponent: AmountComponent,
      },

      lot: {
        title: this.headerFields[4],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          var amo;
          this.parentData.selectedOptions.forEach(x => {
            if (x.billing_stock_id == row.id) {
              amo = x.lot;
            }
          });
          return {
            'data': row,
            'enabled': !this.selectedOptions2.includes(row.id),
            'lot': amo ? amo : '',
            'onchange': (input, row: any) => this.onLotChange(input, row),
          };
        },
        renderComponent: LotComponent,
      },


      expiration_date: {
        title: this.headerFields[5],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          var amo;
          this.parentData.selectedOptions.forEach(x => {
            if (x.billing_stock_id == row.id) {
              amo = x.expiration_date;
            }
          });
          return {
            'data': row,
            'enabled': !this.selectedOptions2.includes(row.id),
            'expiration_date': amo ? amo : '',
            'onchange': (input, row: any) => this.onDateChange(input, row),
          };
        },
        renderComponent: DateComponent,
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private lotStockS: PharmacyLotStockService,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private formBuilder: FormBuilder,
    private billingS: BillingService,
    private e: ElementRef
  ) {
  }


  async ngOnInit(): Promise<void> {
    this.component_package_id = this.route.snapshot.params.id;
    this.selectedOptions = this.parentData.parentData;
    this.settings = this.settings_supplies;
    this.entity = this.parentData.entity;
    this.customData = this.parentData.customData;

    await this.billingS.GetCollection().then(x => {
      this.billing_id = x;
    });

    this.routes = [
      {
        name: 'Insumos',
        route: '../../component',
      },
      {
        name: 'Paquete de Insumos',
        route: '../../contract/briefcase',
      },
    ];
  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions2.push(row.id);
      var diet = {
        billing_stock_id: row.id,
        amount_total: 0,
        lot: 0,
        expiration_date: 0,
        billing_id: this.billing_stock_id,
      };
      this.emit.push(diet);
    } else {
      this.emit = [];
      let i = this.selectedOptions2.indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
      var j = 0;
      this.selectedOptions.forEach(element => {
        if (this.selectedOptions2.includes(element.billing_stock_id)) {
          this.emit.push(element);
        }
        j++;
      });
    }
    this.selectedOptions = this.emit;
    this.messageEvent.emit(this.selectedOptions);
    this.RefreshData();
  }

  onAmountChange(input, row) {
    var i = 0;
    var mientras = this.selectedOptions;
    this.selectedOptions.forEach(element => {
      if (element.billing_stock_id == row.id) {
        mientras[i].amount_total = input.target.value;
      }
      i++
    });
    this.selectedOptions = mientras;
    this.messageEvent.emit(this.selectedOptions);
  }

  onLotChange(input, row) {
    var i = 0;
    var mientras = this.selectedOptions;
    this.selectedOptions.forEach(element => {
      if (element.billing_stock_id == row.id) {
        mientras[i].lot = input.target.value;
      }
      i++
    });
    this.selectedOptions = mientras;
    this.messageEvent.emit(this.selectedOptions);
  }

  onDateChange(input, row) {
    var i = 0;
    var mientras = this.selectedOptions;
    this.selectedOptions.forEach(element => {
      if (element.billing_stock_id == row.id) {
        mientras[i].expiration_date = input.target.value;
      }
      i++
    });
    this.selectedOptions = mientras;
    this.messageEvent.emit(this.selectedOptions);
  }



  ChangeManual(inscriptionstatus) {
    this.inscriptionstatus = inscriptionstatus;
    this.table.changeEntity(`inscriptionsByCourse/${this.inscriptionstatus}`);
  }

  RefreshData() {
    this.table.refresh();
  }

  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }
  saveGroup() {
    var contador = 0;
    var err = 0;
    if (!this.selectedOptions.length) {
      this.toastS.danger(null, 'Debe seleccionar al menos un medicamento');
    }
    else {
      var dta = {
        component_package_id: null,
        component_id: null,
      };
      this.selectedOptions.forEach(element => {
        dta.component_package_id = this.component_package_id;
        dta.component_id = element.id;
        this.lotStockS.Save(dta).then(x => {
        }).catch(x => {
          err++;
        });
        contador++;
      });
      if (contador > 0) {
        this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos');
      } else if (err > 0) {
        this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
      }
      this.RefreshData();
      this.selectedOptions = [];
    }
  }

  ChangeBilling(event) {
    if (event != "") {
      this.entity = 'billing_stock?billing_id=' + event;
      this.customData = 'billing_stock';
      if (!this.show) {
        this.show = true;
      } else {
        this.RefreshData();
      }
    } else {
      this.show = false;
    }
  }
}

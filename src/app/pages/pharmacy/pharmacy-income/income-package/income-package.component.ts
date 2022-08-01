import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { SelectIncomeComponent } from './select-income.component';
import { AmountIncomeComponent } from './amountIncome.component';
import { AmountDamagedComponent } from './amountdamaged.component';
import { PharmacyRequestShippingService } from '../../../../business-controller/pharmacy-request-shipping.service';

@Component({
  selector: 'ngx-income-package',
  templateUrl: './income-package.component.html',
  styleUrls: ['./income-package.component.scss'],
})
export class IncomePackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  public messageError = null;


  public form: FormGroup;
  public title = 'MEDICAMENTOS';
  public subtitle = '';
  public headerFields: any[] = ['MEDICAMENTO COMERCIAL', 'MEDICAMENTO GENERICO', 'LOTE', 'CANTIDAD A RECIBIR', 'CANTIDAD CON DAÑOS', 'CANTIDAD ENVIADA'];
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
  public entity;
  public billing_id: any[];
  public customData;

  public component_package_id: number;
  public done = false;
  public settings;
  public pharmacy_request_shipping;
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
              this.selectedOptions2.push(x.pharmacy_request_shipping);
            });
            this.done = true;
          }
          return {
            'data': row,
            'valid': (!this.selectedOptions2.includes(row.id)) ? false : true,
            'selection': (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: SelectIncomeComponent,
      },
      product: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.pharmacy_lot_stock.billing_stock.product) {
            return row.pharmacy_lot_stock.billing_stock.product.name;
          } else {
            return row.pharmacy_lot_stock.billing_stock.product_supplies_com.name;
          }

        },
      },
      product_generic: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.pharmacy_product_request.product_generic) {
            return row.pharmacy_product_request.product_generic.description;
          } else {
            return row.pharmacy_product_request.product_supplies.description;
          }
        },
      },

      amount_provition: {
        title: this.headerFields[5],
        type: 'string',
        // valuePrepareFunction: (value, row) => {
        //   return row.pharmacy_product_request.product_generic.description;
        // },
      },
      lot: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.pharmacy_lot_stock.lot;
        },
      },
      amount: {
        title: this.headerFields[3],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          var amo;
          this.parentData.selectedOptions.forEach(x => {
            if (x.pharmacy_request_shipping == row.id) {
              amo = x.amount;
            }
          });
          return {
            'data': row,
            'enabled': !this.selectedOptions2.includes(row.id),
            'amount': amo ? amo : '',
            'onchange': (input, row: any) => this.onAmountChange(input, row),
          };
        },
        renderComponent: AmountIncomeComponent,
      },

      amount_damaged: {
        title: this.headerFields[4],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          var amo;
          this.parentData.selectedOptions.forEach(x => {
            if (x.pharmacy_request_shipping == row.id) {
              amo = x.amount_damaged;
            }
          });
          return {
            'data': row,
            'enabled': !this.selectedOptions2.includes(row.id),
            'amount_damaged': amo ? amo : '',
            'onchange': (input, row: any) => this.onAmountDamagedChange(input, row),
          };
        },
        renderComponent: AmountDamagedComponent,
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private e: ElementRef,
    private shippingS: PharmacyRequestShippingService,
  ) {
  }


  async ngOnInit(): Promise<void> {
    this.component_package_id = this.route.snapshot.params.id;
    this.selectedOptions = this.parentData.parentData;
    this.settings = this.settings_supplies;
    this.entity = this.parentData.entity;
    this.customData = this.parentData.customData;

  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions2.push(row.id);
      var diet = {
        pharmacy_request_shipping_id: row.id,
        pharmacy_lot_stock_id: row.pharmacy_lot_stock_id,
        amount: 0,
        amount_damaged: 0,
        amount_provition: row.amount_provition,
      };
      this.emit.push(diet);
    } else {
      this.emit = [];
      let i = this.selectedOptions2.indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
      var j = 0;
      this.selectedOptions.forEach(element => {
        if (this.selectedOptions2.includes(element.pharmacy_request_shipping)) {
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
      if (element.pharmacy_request_shipping_id == row.id) {
        mientras[i].amount = input.target.valueAsNumber;
      }
      i++
    });
    this.selectedOptions = mientras;
    this.messageEvent.emit(this.selectedOptions);
  }

  onAmountDamagedChange(input, row) {
    var i = 0;
    var mientras = this.selectedOptions;
    this.selectedOptions.forEach(element => {
      if (element.pharmacy_request_shipping_id == row.id) {
        mientras[i].amount_damaged = input.target.valueAsNumber;
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
        this.shippingS.Save(dta).then(x => {
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
}

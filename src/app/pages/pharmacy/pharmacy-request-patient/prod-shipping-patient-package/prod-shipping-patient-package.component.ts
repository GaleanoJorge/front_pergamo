import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';
import { SelectProductPatientShippingComponent } from './select-prod-patient-shipping.component';
import { AmountShippingPatientComponent } from './amount-shipping-patient.component';
import { threadId } from 'worker_threads';
import { ActionSemaphoComponent } from './action-semapho.component';

@Component({
  selector: 'ngx-prod-shipping-patient-package',
  templateUrl: './prod-shipping-patient-package.component.html',
  styleUrls: ['./prod-shipping-patient-package.component.scss'],
})
export class ProdShippingPatientPackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  @Input() title: any = [];
  public messageError = null;
  @Input() request_amount: any;

  public InscriptionForm: FormGroup;
  public subtitle = ' ';
  public headerFields: any[] = ['PRODUCTO COMERCIAL', 'PRODUCTO GENERICO', 'CANTIDAD ACTUAL STOCK', 'CANTIDAD A ENVIAR', 'LOTE', 'FECHA DE VENCIMIENTO'];
  public routes = [];
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];
  public emit: any[] = [];
  public data = [];
  public dialog;
  public selectedRows: any;
  public inscriptionId;
  public entity;
  public validate = false;
  public customData;

  public component_package_id: number;
  public done = false;
  public settings;

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
              this.selectedOptions2.push(x.pharmacy_lot_stock_id);
            });
            this.done = true;
          }
          return {
            'data': row,
            'valid': (!this.selectedOptions2.includes(row.id)) ? false : true,
            'selection': (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: SelectProductPatientShippingComponent,
      },
      semaphore: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
          };
        },
        renderComponent: ActionSemaphoComponent,
      },
      product: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.billing_stock.product) {
            return row.billing_stock.product.name + ' - ' + row.billing_stock.product.factory.name;
          } else {
            return row.billing_stock.product_supplies_com.name + ' - ' + row.billing_stock.product_supplies_com.factory.name;
          }
        }
      },
      product_generic: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.billing_stock.product) {
            return row.billing_stock.product.product_generic.description;
          } else {
            return row.billing_stock.product_supplies_com.product_supplies.description;
          }
        },
      },
      actual_amount: {
        title: this.headerFields[2],
        type: 'string',
      },
      amount: {
        title: this.headerFields[3],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          var amo;
          this.parentData.selectedOptions.forEach(x => {
            if (x.pharmacy_lot_stock_id == row.id) {
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
        renderComponent: AmountShippingPatientComponent,
      },
      lot: {
        title: this.headerFields[4],
        type: 'string',
      },
      expiration_date: {
        title: this.headerFields[5],
        type: 'string',
      },
      // user_request: {
      //   title: this.headerFields[11],
      //   type: 'custom',
      //   valuePrepareFunction: (value, row) => {
      //     // this.disableCheck();
      //     // if (row.auth_status_id == 2) {
      //     //   this.show = true;
      //     // } else {
      //     //   this.show = false;
      //     // }
      //     return {
      //       'data': row,
      //       'show': true,
      //       'select': this.user_request_id,
      //       'status': (event, row: any) => this.SaveStatus(event, row),
      //     };
      //   },
      //   renderComponent: UserResponsibleComponent,
      // },
    },
  };
  mientras: any;

  constructor(
    private route: ActivatedRoute,
    private pharProdReqS: PharmacyProductRequestService,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private e: ElementRef,
    // private UserRoleBusinessS: UserBusinessService,

  ) {
  }

  ngOnInit(): void {
    this.component_package_id = this.route.snapshot.params.id;
    this.selectedOptions = this.parentData.parentData;
    this.settings = this.settings_supplies;
    this.entity = this.parentData.entity;
    this.customData = this.parentData.customData;

    // this.UserRoleBusinessS.GetCollection().then(x => {
    //   this.user_request_id = x;
    // });

  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions2.push(row.id);
      var diet = {
        pharmacy_lot_stock_id: row.id,
        amount: 0,
        actual_amount: row.actual_amount,
      };
      this.emit.push(diet);
    } else {
      this.emit = [];
      let i = this.selectedOptions2.indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
      var j = 0;
      this.selectedOptions.forEach(element => {
        if (this.selectedOptions2.includes(element.pharmacy_lot_stock_id)) {
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
    var sub = 0;
    var i = 0;
    this.mientras = [];
    this.mientras = this.selectedOptions;
    this.selectedOptions.forEach(element => {
      if (element.pharmacy_lot_stock_id == row.id) {
        this.mientras[i].amount = input.target.valueAsNumber;
        if (this.mientras[i].actual_amount < this.mientras[i].amount) {
          this.toastS.danger("", "La cantidad a entregar no debe superar la cantidad que se encuentra en stock")
        }
      }
      i++
    });
    this.selectedOptions = this.mientras;
    if (this.mientras.length > 0) {
      this.mientras.forEach(element => {
        sub += element.amount;
      });
    }
    if (sub > Number(this.request_amount)) {
      this.validate = false;
      this.toastS.danger("", "La cantidad a entregar no debe superar la cantidad ordenada")
    } else {
      this.validate = true;
    }
    this.selectedOptions = this.mientras;
    this.messageEvent.emit(this.selectedOptions);
  }

  // onAmountChange(input, row) {
  //   if (Number(input.target.valueAsNumber) > Number(this.request_amount)) {
  //     this.toastS.danger("", "La cantidad a entregar no debe superar la cantidad ordenada")
  //   } else {
  //     var i = 0;
  //     var mientras = this.selectedOptions;
  //     this.selectedOptions.forEach(element => {
  //       if (element.pharmacy_lot_stock_id == row.id) {
  //         mientras[i].amount = input.target.valueAsNumber;
  //       }
  //       i++
  //     });
  //     this.selectedOptions = mientras;
  //     this.messageEvent.emit(this.selectedOptions);
  //   }
  // }

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
    } else if (!this.validate) {
      this.toastS.danger(null, 'La cantidad por enviar es mayor a la slicitada');
    }
    else {
      var dta = {
        component_package_id: null,
        component_id: null,
      };
      this.selectedOptions.forEach(element => {
        dta.component_package_id = this.component_package_id;
        dta.component_id = element.id;
        this.pharProdReqS.Save(dta).then(x => {
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

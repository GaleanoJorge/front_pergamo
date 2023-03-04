import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { SelectProdPharmacyLoadComponent } from './select-prod-pharmacy-load.component';
import { AmountPharmacyLoadComponent } from './amount-pharmacy-load.component';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';

@Component({
  selector: 'ngx-prod-pharmacy-load-package',
  templateUrl: './prod-pharmacy-load-package.component.html',
  styleUrls: ['./prod-pharmacy-load-package.component.scss'],
})
export class ProdPharmacyLoadPackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  public messageError = null;

  public InscriptionForm: FormGroup;
  public title = 'Selección de Productos: ';
  public subtitle = '';
  public headerFields: any[] = ['PRODUCTO - PRODUCTO GENERICO', 'FABRICANTE', 'CANTIDAD ACTUAL','CANTIDAD A ENVIAR', 'LOTE', 'FECHA DE VENCIMIENTO'];
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
  public customData;
  public user;
  public my_pharmacy_id;

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
        renderComponent: SelectProdPharmacyLoadComponent,
      },
      product: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.billing_stock.product) {
            return row.billing_stock.product.name + ' - ' + row.billing_stock.product.product_generic.description;
          } else {
            return row.billing_stock.product_supplies_com.name + ' - ' + row.billing_stock.product_supplies_com.product_supplies.description;
          }
        },
      },
      factory: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.billing_stock.product_id != null) {
            return row.billing_stock.product.factory.name;
          } else {
            return row.billing_stock.product_supplies_com.factory.name;
          }
        },
      },
      actual_amount: {
        title: this.headerFields[2],
        type: 'string',
      },
      amount_provition: {
        title: this.headerFields[3],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          var amo;
          this.parentData.selectedOptions.forEach(x => {
            if (x.pharmacy_lot_stock_id == row.id) {
              amo = x.amount_provition;
            }
          });
          return {
            'data': row,
            'enabled': !this.selectedOptions2.includes(row.id),
            'amount_provition': amo ? amo : '',
            'onchange': (input, row: any) => this.onAmountChange(input, row),
          };
        },
        renderComponent: AmountPharmacyLoadComponent,
      },
      lot: {
        title: this.headerFields[4],
        type: 'string',
      },
      expiration_date: {
        title: this.headerFields[5],
        type: 'string',
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private pharProdReqS: PharmacyProductRequestService,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
  ) {
  }


  ngOnInit(): void {
    
    this.component_package_id = this.route.snapshot.params.id;
    this.selectedOptions = this.parentData.parentData;
    this.settings = this.settings_supplies;
    this.entity = this.parentData.entity;
    this.customData = this.parentData.customData;

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
        pharmacy_lot_stock_id: row.id,
        amount_provition: 0,
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
    var i = 0;
    var mientras = this.selectedOptions;
    this.selectedOptions.forEach(element => {
      if (element.pharmacy_lot_stock_id == row.id) {
        mientras[i].amount_provition = input.target.valueAsNumber;
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
        this.pharProdReqS.updateInventoryByLot(dta).then(x => {
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
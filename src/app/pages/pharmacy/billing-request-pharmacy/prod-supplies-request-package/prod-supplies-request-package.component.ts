import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { BillingStockService } from '../../../../business-controller/billing-stock.service';
import { AmountSuppliesRequestComponent } from './amount-supplies-request.component';
import { SelectProductSuppliesRequestComponent } from './select-prod-supplies-request.component';
import { BillingStockRequestService } from '../../../../business-controller/billing-stock-request.service';

@Component({
  selector: 'ngx-prod-supplies-request-package',
  templateUrl: './prod-supplies-request-package.component.html',
  styleUrls: ['./prod-supplies-request-package.component.scss'],
})
export class ProdSuppliesRequestPackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  public messageError = null;


  public InscriptionForm: FormGroup;
  public title = 'Selección de insumos: ';
  public subtitle = 'Insumos a comprar: ';
  public headerFields: any[] = ['Descripción generico', 'Cantidad ordenada'];
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

  public manual_price: any[] = [];
  public package: any[] = [];
  public type_briefcase: any[] = [];
  public component_package_id: number;
  public filter: any[] = [];
  public units: any[] = [];
  public filter2;
  public done = false;
  public settings;


  public settings_supplies = {
    columns: {
      select: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (!this.done) {
            this.selectedOptions = this.parentData.selectedOptions1;
            this.emit = this.parentData.selectedOptions1;
            this.parentData.selectedOptions1.forEach(x => {
              this.selectedOptions2.push(x.product_supplies_id);
            });
            this.done = true;
          }
          return {
            'data': row,
            'valid': (!this.selectedOptions2.includes(row.id)) ? false : true,
            'selection': (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: SelectProductSuppliesRequestComponent,
      },
      product_supplies: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.description;
        },
      },
      amount: {
        title: this.headerFields[1],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          var amo;
          this.parentData.selectedOptions1.forEach(x => {
            if (x.product_supplies_id == row.id) {
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
        renderComponent: AmountSuppliesRequestComponent,
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private billS: BillingStockRequestService,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private e: ElementRef
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
        product_supplies_id: row.id,
        amount: 0,
      };
      this.emit.push(diet);
    } else {
      this.emit = [];
      let i = this.selectedOptions2.indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
      var j = 0;
      this.selectedOptions.forEach(element => {
        if (this.selectedOptions2.includes(element.product_supplies_id)) {
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
      if (element.product_supplies_id == row.id) {
        mientras[i].amount = input.target.valueAsNumber;
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
      this.toastS.danger(null, 'Debe seleccionar al menos un insumo');
    }
    else {
      var dta = {
        component_package_id: null,
        component_id: null,
      };
      this.selectedOptions.forEach(element => {
        dta.component_package_id = this.component_package_id;
        dta.component_id = element.id;
        this.billS.Save(dta).then(x => {
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

import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';
import { SelectRentReliefPackageComponent } from './select-rent-relief-package.component';
import { DietComponentService } from '../../../../../business-controller/diet-componet.service';
import { MeasurementUnitsService } from '../../../../../business-controller/measurement-units.service';
import { AmountRentReliefPackageComponent } from './amount-rent-relief-package.component';
import { DietDishStockService } from '../../../../../business-controller/diet-dish-stock.service';
import { DietDishStock } from '../../../../../models/diet-dish-stock';
import { AuthService } from '../../../../../services/auth.service';
import { FileRentReliefPackageComponent } from './file-rent-relief-package.component';
import { environment } from '../../../../../../environments/environment.prod';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'ngx-rent-relief-package',
  templateUrl: './rent-relief-package.component.html',
  styleUrls: ['./rent-relief-package.component.scss'],
})
export class RentReliefPackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  public messageError = null;


  public InscriptionForm: FormGroup;
  public title = 'ALIVIOS DE RENTA: ';
  public subtitle = 'Alivios:';
  public headerFields: any[] = ['TIPO DE ALIVIO','ALIVIO', 'PAGO','ARCHIVO SOPORTE'];
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
  public user;
  public entity;
  public customData;
  
  public package: any[] = [];
  public type_briefcase: any[] = [];
  public component_package_id: number;
  public filter: any[] = [];
  public units: any[] = [];
  public filter2;
  public done = false;
  public update_file = true;
  public settings;



  public settings_update = {
    columns: {
      select: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (!this.done) {
            this.selectedOptions = this.parentData.selectedOptions;
            this.emit = this.parentData.selectedOptions;
            this.selectedOptions.forEach(x => {
              this.selectedOptions2.push(x.source_retention_type_id);
            });
            this.done = true;
          }
          var enabled = false;
          this.selectedOptions.forEach(x => {
            if (x.source_retention_type_id == row.id && x.file != '') {
              enabled = true;
            }
          });
          return {
            'data': row,
            'enabled': enabled,
            'valid': (!this.selectedOptions2.includes(row.id)) ? false : true,
            'selection': (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: SelectRentReliefPackageComponent,
      },
      type: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      amount: {
        title: this.headerFields[2],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          var amo;
          this.selectedOptions.forEach(x => {
            if (x.source_retention_type_id == row.id) {
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
        renderComponent: AmountRentReliefPackageComponent,
      },
      file: {
        title: this.headerFields[3],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          var with_file = false;
          var file_path = '';
          this.selectedOptions.forEach(x => {
            if (x.source_retention_type_id == row.id && x.file != '') {
              with_file = true;
              file_path = x.file;
            }
          });
          return {
            'data': row,
            'with_file': !with_file,
            'procedence': this.parentData.procedence,
            'preview_file': environment.storage + file_path,
            'update_file': this.update_file,
            'enabled': this.selectedOptions2.includes(row.id),
            'file': this.changeFile.bind(this),
            'onchange': (input, row: any) => this.onAmountChange(input, row),
          };
        },
        renderComponent: FileRentReliefPackageComponent,
      },
    },
  };

  public settings_show = {
    columns: {
      type: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.source_retention_type.type;
        },
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.source_retention_type.name;
        },
      },
      value: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(row.value);
        },
      },
      file: {
        title: this.headerFields[3],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          var path = environment.storage + row.file;
          return {
            'data': row,
            'procedence': this.parentData.procedence,
            'with_file': !false,
            'preview_file': path,
            'update_file': this.update_file,
            'enabled': this.selectedOptions2.includes(row.id),
            'file': this.changeFile.bind(this),
            'onchange': (input, row: any) => this.onAmountChange(input, row),
          };
        },
        renderComponent: FileRentReliefPackageComponent,
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private dietComponentS: DietComponentService,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private e: ElementRef,
    private currency: CurrencyPipe,
    private authService: AuthService,
  ) {
  }


  ngOnInit(): void {

    this.user = this.authService.GetUser();
    this.entity = this.parentData.entity;
    this.customData = this.parentData.customData;

    if (this.parentData.procedence == 0) {
      this.settings = this.settings_update;
    } else {
      this.settings = this.settings_show;
    }
    // this.component_package_id = this.route.snapshot.params.id;
    
    this.selectedOptions = this.parentData;
    //   this.selectedOptions = this.parentData.id;
    //  this.selectedOptions2 = this.parentData.amount;

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
        source_retention_type_id: row.id,
        amount: 0,
        file: '',
      };
      this.emit.push(diet);
    } else {
      this.emit = [];
      let i = this.selectedOptions2.indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
      var j = 0;
      this.selectedOptions.forEach(element => {
        if (this.selectedOptions2.includes(element.source_retention_type_id)) {
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
      if (element.source_retention_type_id == row.id) {
        mientras[i].amount = input.target.valueAsNumber;
      }
      i++
    });
    this.selectedOptions = mientras;
    this.messageEvent.emit(this.selectedOptions);
  }

  RefreshData() {
    this.table.refresh();
  }

  async changeFile(files, row) {
    if (!files.length) return false;

    const file = await this.toBase64(files[0]);

    var i = 0;
    var mientras = this.selectedOptions;
    this.selectedOptions.forEach(element => {
      if (element.source_retention_type_id == row.id) {
        mientras[i].file = files[0];
      }
      i++
    });
    this.selectedOptions = mientras;
    this.messageEvent.emit(this.selectedOptions);
    this.RefreshData();
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
}


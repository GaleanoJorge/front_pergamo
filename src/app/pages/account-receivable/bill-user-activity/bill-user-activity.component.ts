import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { DietComponentService } from '../../../business-controller/diet-componet.service';
import { MeasurementUnitsService } from '../../../business-controller/measurement-units.service';
import { DietDishStockService } from '../../../business-controller/diet-dish-stock.service';
import { DietDishStock } from '../../../models/diet-dish-stock';
import { UserActivityService } from '../../../business-controller/user-activity.service';
import { AuthService } from '../../../services/auth.service';
import { CurrencyPipe } from '@angular/common';
import { ActionsBillComponent } from './actions.component';
import { BillUserActivityService } from '../../../business-controller/bill-user-activity.service';


@Component({
  selector: 'ngx-bill-user-activity',
  templateUrl: './bill-user-activity.component.html',
  styleUrls: ['./bill-user-activity.component.scss'],
})
export class BillUserActivityComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  public messageError = null;


  public InscriptionForm: FormGroup;
  public title = 'Actividades realizadas: ';
  public subtitle = '';
  public headerFields: any[] = ['PROCEDIMIENTO', 'VALOR', 'ESTADO', 'OBSERVACIÓN'];
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
  public role_type;
  public entity: string;

  public package: any[] = [];
  public type_briefcase: any[] = [];
  public component_package_id: number;
  public filter: any[] = [];
  public units: any[] = [];
  public account;
  public done = false;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;




  public settings = {
    //selectMode: 'multi',

    columns: {
      actions: {
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {

          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'role_type': this.role_type,
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: ActionsBillComponent,
      },
      procedure: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.manual_price.name;
        },
      },

      tariff_id: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(row.tariff.amount);
        },
      },
      status: {
        title: this.headerFields[2],
        type: 'string',
      },
      observation: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction(value) {
          return value != null ? value : '';
        }
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private dietComponentS: DietComponentService,
    private dialogService: NbDialogService,
    private UserActivityS: UserActivityService,
    private toastService: NbToastrService,
    private billUserActivityS: BillUserActivityService,
    private authService: AuthService,
    private currency: CurrencyPipe,
  ) {
  }


  ngOnInit(): void {
    this.account = this.route.snapshot.params.id;
    this.user = this.authService.GetUser();
    this.role_type = this.user.roles[0].role_type_id;
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


  RefreshData() {
    this.table.refresh();
  }


}


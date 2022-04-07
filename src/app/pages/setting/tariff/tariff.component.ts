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
  public headerFields: any[] = ['NOMBRE', 'TARIFA', 'ROL', 'AMBITO DE ATENCIÓN', 'PRECIO'];
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
      pad_risk: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      role: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      scope_of_attention: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      amount: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
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
    private datepipe: DateFormatPipe,
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
}

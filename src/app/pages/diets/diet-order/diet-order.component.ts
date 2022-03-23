import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Actions2Component } from './actions.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormDietOrderComponent } from './form-diet-order/form-diet-order.component';
import { DietMenuService } from '../../../business-controller/diet-menu.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { Router } from '@angular/router';
import { FormAdmissionsComponent } from './form-admissions/form-admissions.component';

@Component({
  selector: 'ngx-diet-order',
  templateUrl: './diet-order.component.html',
  styleUrls: ['./diet-order.component.scss'],
})
export class DietOrderComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'DESPACHOS';
  public subtitle: string = 'DESPACHO DE MENÚS A ADMISIONES';
  public headerFields: any[] = ['NOMBRE', 'DIETA TERAPEUTICA', 'TIPO MENÚ', 'DÍA', 'SEMANA'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];


  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditDiet.bind(this),
            'delete': this.EditAdmissions.bind(this),
          };
        },
        renderComponent: Actions2Component,
      },
      name: {
        title: this.headerFields[0],
        type: 'string',
      },
      diet_consistency: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      diet_menu_type: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      diet_week: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      diet_day: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Contratos',
      route: '../diet/list',
    },
  ];

  constructor(
    private dietS: DietMenuService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
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

  NewDiet() {
    this.dialogFormService.open(FormDietOrderComponent, {
      context: {
        title: 'CREAR NUEVO MENÚ',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDiet(data) {
    this.dialogFormService.open(FormDietOrderComponent, {
      context: {
        title: 'PLATOS ASOCIADOS',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAdmissions(data) {
    this.dialogFormService.open(FormAdmissionsComponent, {
      context: {
        title: 'PACIENTES ASOCIADOS',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }



  DeleteConfirmDiet(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDiet.bind(this),
      },
    });
  }

  DeleteDiet(data) {
    return this.dietS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

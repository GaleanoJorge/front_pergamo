import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Actions2Component } from './actions.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { DietMenuService } from '../../../business-controller/diet-menu.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { Router } from '@angular/router';
import { FormDietMenuComponent } from './form-diet-menu/form-diet-menu.component';
import { DietMenuDishService } from '../../../business-controller/diet-menu-dish.service';

@Component({
  selector: 'ngx-diet-menu',
  templateUrl: './diet-menu.component.html',
  styleUrls: ['./diet-menu.component.scss'],
})
export class DietMenuComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'MENÚS DE DIETAS';
  public subtitle: string = 'MENÚS';
  public headerFields: any[] = ['NOMBRE', 'DITA TERAPEUTICA', 'TIPO MENÚ', 'SEMANA', 'DÍA'];
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
            'edit': this.EditMenu.bind(this),
            'delete': this.DeleteConfirmMenu.bind(this),
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
      name: 'Menús',
      route: '../../setting/diet-menu',
    },
  ];

  constructor(
    private dietMenuS: DietMenuService,
    private dietMenuDishS: DietMenuDishService,
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

  NewMenu() {
    this.dialogFormService.open(FormDietMenuComponent, {
      context: {
        title: 'CREAR NUEVO MENÚ',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditMenu(data) {
    this.dialogFormService.open(FormDietMenuComponent, {
      context: {
        title: 'EDITAR MENÚ',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }



  DeleteConfirmMenu(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteMenu.bind(this),
      },
    });
  }

  DeleteMenu(data) {
    return this.dietMenuS.Delete(data.id).then(x => {
      this.table.refresh();
      this.dietMenuDishS.Delete(data.id);
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

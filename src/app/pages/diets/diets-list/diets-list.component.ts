import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-diets-list',
  templateUrl: './diets-list.component.html',
  styleUrls: ['./diets-list.component.scss'],
})
export class DietsListComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'INVENTARIO';
  public subtitle: string = 'INVENTARIO';
  public headerFields: any[] = ['INSUMO', 'CANTIDAD', 'SEDE'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public entity: string;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      // actions: {
      //   title: 'ACCIONES',
      //   type: 'custom',
      //   valuePrepareFunction: (value, row) => {
      //     // DATA FROM HERE GOES TO renderComponent
      //     return {
      //       'data': row,
      //       'edit': this.EditDietsList.bind(this),
      //       'delete': this.DeleteConfirmDietsList.bind(this),
      //     };
      //   },
      //   renderComponent: ActionsComponent,
      // },
      // id: {
      //   title: this.headerFields[0],
      //   type: 'string',
      // },
      diet_supplies: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      amount: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value + ' ' + row.diet_supplies.measurement_units.code;
        },
      },
      campus: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      // measurement_units:{
      //   title: this.headerFields[3],
      //   type: 'string',
      //   valuePrepareFunction: (value, row) => {
      //     return row.diet_supplies.measurement_units.code;
      //   },
      // }
    },
  };

  public routes = [
    {
      name: 'Inventario',
      route: '../../setting/diet-stock',
    },
  ];

  constructor(
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    var campus =+ localStorage.getItem('campus');
    this.entity = `diet_stock/?pagination=true&campus_id=${campus}`
  }

  RefreshData() {

    this.table.refresh();
  }

}

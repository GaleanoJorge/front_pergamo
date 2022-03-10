import { Component, OnInit, ViewChild } from '@angular/core';
import { DietSuppliesOutputService } from '../../../business-controller/diet-supplies-output.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { DietSuppliesOutputMenuService } from '../../../business-controller/diet-supplies-output-menu.service';
import { FormDietSuppliesOutputComponent } from './form-diet-supplies-output/form-diet-supplies-output.component';
import { ActionsDietSuppliesOutputComponent } from './actions.component';



@Component({
  selector: 'ngx-diet-supplies-output',
  templateUrl: './diet-supplies-output.component.html',
  styleUrls: ['./diet-supplies-output.component.scss']
})
export class DietSuppliesOutputComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'SALIDAS DE INSUMOS';
  public subtitle: string = 'SALIDAS DE INSUMOS';
  public headerFields: any[] = ['ID', 'FECHA SALIDA'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditDietSuppliesOutput.bind(this),
            'delete': this.DeleteConfirmDietSuppliesOutput.bind(this),
          };
        },
        renderComponent: ActionsDietSuppliesOutputComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      created_at: {
        title: this.headerFields[1],
        type: 'string',
        // valuePrepareFunction: (value, row) => {
        //   return value.name;
        // },
      },
    },
  };

  public routes = [
    {
      name: 'SALIDAS DE INSUMOS',
      route: '../../setting/diet-supplies-output',
    },
  ];

  constructor(
    private DietSuppliesOutputS: DietSuppliesOutputService,
    private dietTherapeuticComponentS: DietSuppliesOutputMenuService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  NewDietSuppliesOutput() {
    this.dialogFormService.open(FormDietSuppliesOutputComponent, {
      context: {
        title: 'Crear nueva salida de insumo',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDietSuppliesOutput(data) {
    this.dialogFormService.open(FormDietSuppliesOutputComponent, {
      context: {
        title: 'Editar salida de insumo',
        data: data,
        show: true,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmDietSuppliesOutput(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDietSuppliesOutput.bind(this),
      },
    });
  }

  DeleteDietSuppliesOutput(data) {
    return this.DietSuppliesOutputS.Delete(data.id).then(x => {
      this.table.refresh();
      this.dietTherapeuticComponentS.Delete(data.id);
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

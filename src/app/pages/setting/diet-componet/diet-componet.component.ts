import { Component, OnInit, ViewChild } from '@angular/core';
import { DietComponentService } from '../../../business-controller/diet-componet.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDietComponentComponent } from './form-diet-componet/form-diet-componet.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-diet-componet',
  templateUrl: './diet-componet.component.html',
  styleUrls: ['./diet-componet.component.scss']
})
export class DietComponentComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'COMPONENTE DE DIETAS';
  public subtitle: string = 'COMPONENTE';
  public headerFields: any[] = ['ID', 'NOMBRE','DESCRIPCIÓN'];
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
            'edit': this.EditDietComponent.bind(this),
            'delete': this.DeleteConfirmDietComponent.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      description: {
        title: this.headerFields[2],
        type: 'string',
    },
    },
  };

  public routes = [
    {
      name: 'Componentes de dietas',
      route: '../../setting/diet-componet',
    },
  ];

  constructor(
    private DietComponentS: DietComponentService,
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

  NewDietComponent() {
    this.dialogFormService.open(FormDietComponentComponent, {
      context: {
        title: 'Crear nuevo componente de dietas',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDietComponent(data) {
    this.dialogFormService.open(FormDietComponentComponent, {
      context: {
        title: 'Editar componente de dietas',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmDietComponent(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDietComponent.bind(this),
      },
    });
  }

  DeleteDietComponent(data) {
    return this.DietComponentS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

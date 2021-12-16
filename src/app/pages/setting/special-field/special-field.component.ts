import { Component, OnInit, ViewChild } from '@angular/core';
import { SpecialFieldService } from '../../../business-controller/special-field.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormSpecialFieldComponent } from './form-special-field/form-special-field.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-special-field',
  templateUrl: './special-field.component.html',
  styleUrls: ['./special-field.component.scss']
})
export class SpecialFieldComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Especialización ';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Nombre'];
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
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditSpecialField.bind(this),
            'delete': this.DeleteConfirmSpecialField.bind(this),
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
    },
  };

  public routes = [
    {
      name: 'Tipo de profesional',
      route: '../../setting/type-professional',
    },
  ];

  constructor(
    private SpecialFieldS: SpecialFieldService,
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

  NewSpecialField() {
    this.dialogFormService.open(FormSpecialFieldComponent, {
      context: {
        title: 'Crear nueva especialización',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditSpecialField(data) {
    this.dialogFormService.open(FormSpecialFieldComponent, {
      context: {
        title: 'Editar ruta de especialización',
        data,

        saved: this.RefreshData.bind(this),
      },
    });
  }

  // ChangeState(data) {
  //   // data.status_id = data.status_id === 1 ? 2 : 1;

  //   this.toastrService.info('', 'Cambiando estado');

  //   this.regionS.Update(data).then((x) => {
  //     this.toastrService.success('', x.message);
  //     this.table.refresh();
  //   }).catch((x) => {
  //     this.toastrService.danger(x.message);
  //   });
  // }

  DeleteConfirmSpecialField(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteSpecialField.bind(this),
      },
    });
  }

  DeleteSpecialField(data) {
    return this.SpecialFieldS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { SpecialAttentionService } from '../../../business-controller/special-attention.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormSpecialAttentionComponent } from './form-special-attention/form-special-attention.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-special-attention',
  templateUrl: './special-attention.component.html',
  styleUrls: ['./special-attention.component.scss']
})
export class SpecialAttentionComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Atención especial';
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
            'edit': this.EditSpecialAttention.bind(this),
            'delete': this.DeleteConfirmSpecialAttention.bind(this),
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
      name: 'Atención especial',
      route: '../../setting/special-attention',
    },
  ];

  constructor(
    private SpecialAttentionS: SpecialAttentionService,
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

  NewSpecialAttention() {
    this.dialogFormService.open(FormSpecialAttentionComponent, {
      context: {
        title: 'Crear nueva Atención especial',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditSpecialAttention(data) {
    this.dialogFormService.open(FormSpecialAttentionComponent, {
      context: {
        title: 'Editar Atención especial',
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

  DeleteConfirmSpecialAttention(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteSpecialAttention.bind(this),
      },
    });
  }

  DeleteSpecialAttention(data) {
    return this.SpecialAttentionS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

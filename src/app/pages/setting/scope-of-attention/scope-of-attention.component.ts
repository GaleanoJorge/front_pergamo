import { Component, OnInit, ViewChild } from '@angular/core';
import { ScopeOfAttentionService } from '../../../business-controller/scope-of-attention.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormScopeOfAttentionComponent } from './form-scope-of-attention/form-scope-of-attention.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-scope-of-attention',
  templateUrl: './scope-of-attention.component.html',
  styleUrls: ['./scope-of-attention.component.scss']
})
export class ScopeOfAttentionComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Alcance de la Atención';
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
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditScopeOfAttention.bind(this),
            'delete': this.DeleteConfirmScopeOfAttention.bind(this),
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
      name: 'Alcance de la atención',
      route: '../../setting/scope-of-attention',
    },
  ];

  constructor(
    private ScopeOfAttentionS: ScopeOfAttentionService,
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

  NewScopeOfAttention() {
    this.dialogFormService.open(FormScopeOfAttentionComponent, {
      context: {
        title: 'Crear nuevo Alcance de la atención',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditScopeOfAttention(data) {
    this.dialogFormService.open(FormScopeOfAttentionComponent, {
      context: {
        title: 'Editar Alcance de la atención',
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

  DeleteConfirmScopeOfAttention(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteScopeOfAttention.bind(this),
      },
    });
  }

  DeleteScopeOfAttention(data) {
    return this.ScopeOfAttentionS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

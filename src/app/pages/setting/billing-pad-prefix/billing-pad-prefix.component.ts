import { Component, OnInit, ViewChild } from '@angular/core';
import { BillingPadPrefixService } from '../../../business-controller/billing-pad-prefix.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormBillingPadPrefixComponent } from './form-billing-pad-prefix/form-billing-pad-prefix.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-billing-pad-prefix',
  templateUrl: './billing-pad-prefix.component.html',
  styleUrls: ['./billing-pad-prefix.component.scss']
})
export class BillingPadPrefixComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'PREFIJOS DE FACTURACIÓN';
  public subtitle: string = 'PREFIJOS';
  public headerFields: any[] = ['ID', 'NOMBRE'];
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
          return {
            'data': row,
            'edit': this.EditBillingPadPrefix.bind(this),
            'delete': this.DeleteConfirmBillingPadPrefix.bind(this),
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
      name: 'Prefijos de Facturación',
      route: '../../setting/billing-pad-prefix',
    },
  ];

  constructor(
    private BillingPadPrefixS: BillingPadPrefixService,
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

  NewBillingPadPrefix() {
    this.dialogFormService.open(FormBillingPadPrefixComponent, {
      context: {
        title: 'Crear nuevo prefijo',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditBillingPadPrefix(data) {
    this.dialogFormService.open(FormBillingPadPrefixComponent, {
      context: {
        title: 'Editar prefijo',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmBillingPadPrefix(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteBillingPadPrefix.bind(this),
      },
    });
  }

  DeleteBillingPadPrefix(data) {
    return this.BillingPadPrefixS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

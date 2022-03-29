import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '../../../business-controller/document.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDocumentComponent } from './form-document/form-document.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { StatusFieldComponent } from '../../components/status-field/status-field.component';


@Component({
  selector: 'ngx-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Documentos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre','Estado'];
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
            'edit': this.EditDocument.bind(this),
            'delete': this.DeleteConfirmDocument.bind(this),
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
      status_id: {
        title: this.headerFields[4],
        type: 'custom',
        width: '10%',
        valuePrepareFunction: (value, row) => {
            return {
                'data': row,
                'changeState': this.ChangeState.bind(this),
            };
        },
        renderComponent: StatusFieldComponent,
    },
    },
  };

  public routes = [
    {
      name: 'Documentos',
      route: '../../setting/document',
    },
  ];

  constructor(
    private documentS: DocumentService,
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

  NewDocument() {
    this.dialogFormService.open(FormDocumentComponent, {
      context: {
        title: 'Crear nuevo documento contable',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDocument(data) {
    this.dialogFormService.open(FormDocumentComponent, {
      context: {
        title: 'Editar documentos contables',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    this.documentS.ChangeStatus(data.id).then((x) => {
        this.toastrService.success('', x.message);
        this.RefreshData();
    }).catch((x) => {
        // this.toastrService.danger(x.message);
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

  DeleteConfirmDocument(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDocument.bind(this),
      },
    });
  }

  DeleteDocument(data) {
    return this.documentS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

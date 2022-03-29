import { Component, OnInit, ViewChild } from '@angular/core';
// import { ObjetionCodeResponseService } from '../../../business-controller/type-briefcase.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormObjetionCodeResponseComponent } from './form-objetion-code-response/form-objetion-code-response.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ObjetionCodeResponseService } from '../../../business-controller/objetion-code-response.service';


@Component({
  selector: 'ngx-objetion-code-response',
  templateUrl: './objetion-code-response.component.html',
  styleUrls: ['./objetion-code-response.component.scss']
})
export class ObjetionCodeResponseComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Codigo de respuesta objeción de glosas';
  public subtitle: string = 'Respuesta';
  public headerFields: any[] = ['ID','Código','Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
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
            'edit': this.EditObjetionCodeResponse.bind(this),
            'delete': this.DeleteConfirmObjetionCodeResponse.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      code: {
        title: this.headerFields[1],
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
      name: 'Código de Respuesta Objeción',
      route: '../../setting/objetion-code-response',
    },
  ];

  constructor(
    private ObjetionCodeResponseS: ObjetionCodeResponseService,
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

  NewObjetionCodeResponse() {
    this.dialogFormService.open(FormObjetionCodeResponseComponent, {
      context: {
        title: 'Crear nuevo código de respuesta de Objeción',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditObjetionCodeResponse(data) {
    this.dialogFormService.open(FormObjetionCodeResponseComponent, {
      context: {
        title: 'Editar código de respuesta de Objeción',
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

  DeleteConfirmObjetionCodeResponse(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteObjetionCodeResponse.bind(this),
      },
    });
  }

  DeleteObjetionCodeResponse(data) {
    return this.ObjetionCodeResponseS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

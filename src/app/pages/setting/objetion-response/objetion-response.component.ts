import { Component, OnInit, ViewChild } from '@angular/core';
// import { ObjetionResponseService } from '../../../business-controller/type-briefcase.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormObjetionResponseComponent } from './form-objetion-response/form-objetion-response.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ObjetionResponseService } from '../../../business-controller/objetion-response.service';


@Component({
  selector: 'ngx-objetion-response',
  templateUrl: './objetion-response.component.html',
  styleUrls: ['./objetion-response.component.scss']
})
export class ObjetionResponseComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Respuestas de objeción de glosas';
  public subtitle: string = 'Respuestas';
  public headerFields: any[] = ['ID', 'Nombre'];
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
            'edit': this.EditObjetionResponse.bind(this),
            'delete': this.DeleteConfirmObjetionResponse.bind(this),
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
      name: 'Respuesta de Objeción',
      route: '../../setting/objetion-response',
    },
  ];

  constructor(
    private ObjetionResponseS: ObjetionResponseService,
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

  NewObjetionResponse() {
    this.dialogFormService.open(FormObjetionResponseComponent, {
      context: {
        title: 'Crear nueva respuesta de Objeción',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditObjetionResponse(data) {
    this.dialogFormService.open(FormObjetionResponseComponent, {
      context: {
        title: 'Editar respuesta de objeción',
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

  DeleteConfirmObjetionResponse(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteObjetionResponse.bind(this),
      },
    });
  }

  DeleteObjetionResponse(data) {
    return this.ObjetionResponseS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

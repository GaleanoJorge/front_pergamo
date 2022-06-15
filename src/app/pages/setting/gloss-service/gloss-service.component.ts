import { Component, OnInit, ViewChild } from '@angular/core';
import { GlossServiceService } from '../../../business-controller/gloss-service.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormGlossServiceComponent } from './form-gloss-service/form-gloss-service.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { StatusFieldComponent } from '../../components/status-field/status-field.component';


@Component({
  selector: 'ngx-gloss-service',
  templateUrl: './gloss-service.component.html',
  styleUrls: ['./gloss-service.component.scss']
})
export class GlossServiceComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Servicio de Glosas';
  public subtitle: string = 'Servicio';
  public headerFields: any[] = ['ID', 'Nombre', 'Estado', 'Ambito'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[3]}`;
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
            'edit': this.EditGlossService.bind(this),
            'delete': this.DeleteConfirmGlossService.bind(this),
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
      status: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      gloss_ambit: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Servicio de Glosas',
      route: '../../setting/gloss-service',
    },
  ];

  constructor(
    private GlossServiceS: GlossServiceService,
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

  NewGlossService() {
    this.dialogFormService.open(FormGlossServiceComponent, {
      context: {
        title: 'Crear nuevo servicio de glosa',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditGlossService(data) {
    this.dialogFormService.open(FormGlossServiceComponent, {
      context: {
        title: 'Editar servicio de glosa',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    this.GlossServiceS.ChangeStatus(data.id).then((x) => {
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

  DeleteConfirmGlossService(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteGlossService.bind(this),
      },
    });
  }

  DeleteGlossService(data) {
    return this.GlossServiceS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

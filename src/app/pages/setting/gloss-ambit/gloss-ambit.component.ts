import { Component, OnInit, ViewChild } from '@angular/core';
import { GlossAmbitService } from '../../../business-controller/gloss-ambit.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormGlossAmbitComponent } from './form-gloss-ambit/form-gloss-ambit.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { StatusFieldComponent } from '../../components/status-field/status-field.component';


@Component({
  selector: 'ngx-gloss-ambit',
  templateUrl: './gloss-ambit.component.html',
  styleUrls: ['./gloss-ambit.component.scss']
})
export class GlossAmbitComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Ambito de Glosas';
  public subtitle: string = 'Ambito';
  public headerFields: any[] = ['ID', 'Nombre', 'Estado', 'Modalidad'];
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
            'edit': this.EditGlossAmbit.bind(this),
            'delete': this.DeleteConfirmGlossAmbit.bind(this),
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
      gloss_modality: {
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
      name: 'Ambito de glosas',
      route: '../../setting/gloss-ambit',
    },
  ];

  constructor(
    private GlossAmbitS: GlossAmbitService,
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

  NewGlossAmbit() {
    this.dialogFormService.open(FormGlossAmbitComponent, {
      context: {
        title: 'Crear nuevo ambito de glosa',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditGlossAmbit(data) {
    this.dialogFormService.open(FormGlossAmbitComponent, {
      context: {
        title: 'Editar ambito de glosa',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    this.GlossAmbitS.ChangeStatus(data.id).then((x) => {
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

  DeleteConfirmGlossAmbit(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteGlossAmbit.bind(this),
      },
    });
  }

  DeleteGlossAmbit(data) {
    return this.GlossAmbitS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

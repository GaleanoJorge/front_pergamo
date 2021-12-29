import { Component, OnInit, ViewChild } from '@angular/core';
import { GlossModalityService } from '../../../business-controller/gloss-modality.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormGlossModalityComponent } from './form-gloss-modality/form-gloss-modality.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { StatusFieldComponent } from '../../components/status-field/status-field.component';


@Component({
  selector: 'ngx-gloss-modality',
  templateUrl: './gloss-modality.component.html',
  styleUrls: ['./gloss-modality.component.scss']
})
export class GlossModalityComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Modalidad de glosas';
  public subtitle: string = 'Modalidad';
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
            'edit': this.EditGlossModality.bind(this),
            'delete': this.DeleteConfirmGlossModality.bind(this),
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
    },
  };

  public routes = [
    {
      name: 'Modalidad de glosas',
      route: '../../setting/gloss-modality',
    },
  ];

  constructor(
    private GlossModalityS: GlossModalityService,
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

  NewGlossModality() {
    this.dialogFormService.open(FormGlossModalityComponent, {
      context: {
        title: 'Crear nueva modalidad de glosa',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditGlossModality(data) {
    this.dialogFormService.open(FormGlossModalityComponent, {
      context: {
        title: 'Editar modalidad de glosa',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    this.GlossModalityS.ChangeStatus(data.id).then((x) => {
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

  DeleteConfirmGlossModality(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteGlossModality.bind(this),
      },
    });
  }

  DeleteGlossModality(data) {
    return this.GlossModalityS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

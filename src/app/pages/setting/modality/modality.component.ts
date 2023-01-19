import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalityService } from '../../../business-controller/modality.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormModalityComponent } from './form-modality/form-modality.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-modality',
  templateUrl: './modality.component.html',
  styleUrls: ['./modality.component.scss']
})
export class ModalityComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Modalidad del Contrato';
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
            'edit': this.EditModality.bind(this),
            'delete': this.DeleteConfirmModality.bind(this),
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
      name: 'Modalidad del contrato',
      route: '../../setting/modality',
    },
  ];

  constructor(
    private ModalityS: ModalityService,
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

  NewModality() {
    this.dialogFormService.open(FormModalityComponent, {
      context: {
        title: 'Crear nueva modalidad',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditModality(data) {
    this.dialogFormService.open(FormModalityComponent, {
      context: {
        title: 'Editar modalidad',
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

  DeleteConfirmModality(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteModality.bind(this),
      },
    });
  }

  DeleteModality(data) {
    return this.ModalityS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

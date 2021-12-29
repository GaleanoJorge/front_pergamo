import { Component, OnInit, ViewChild } from '@angular/core';
import { ObservationNoveltyService } from '../../../business-controller/observation-novelty.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormObservationNoveltyComponent } from './form-observation-novelty/form-observation-novelty.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-observation-novelty',
  templateUrl: './observation-novelty.component.html',
  styleUrls: ['./observation-novelty.component.scss']
})
export class ObservationNoveltyComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Observación de novedades';
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
            'edit': this.EditObservationNovelty.bind(this),
            'delete': this.DeleteConfirmObservationNovelty.bind(this),
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
      name: 'Observación de novedades',
      route: '../../setting/observation-novelty',
    },
  ];

  constructor(
    private ObservationNoveltyS: ObservationNoveltyService,
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

  NewObservationNovelty() {
    this.dialogFormService.open(FormObservationNoveltyComponent, {
      context: {
        title: 'Crear nueva observación de novedades',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditObservationNovelty(data) {
    this.dialogFormService.open(FormObservationNoveltyComponent, {
      context: {
        title: 'Editar observación de novedades',
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

  DeleteConfirmObservationNovelty(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteObservationNovelty.bind(this),
      },
    });
  }

  DeleteObservationNovelty(data) {
    return this.ObservationNoveltyS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

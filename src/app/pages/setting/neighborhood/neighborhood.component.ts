import {Component, OnInit, ViewChild} from '@angular/core';
import {StatusFieldComponent} from '../sectional-council/status-field.component';
import {NbToastrService, NbDialogService} from '@nebular/theme';
import {FormNeighborhoodOrResidenceComponent} from './form-neighborhood/form-neighborhood.component';
import {ActionsComponent} from '../sectional-council/actions.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import { NeighborhoodOrResidenceService } from '../../../business-controller/neighborhood-or-residence.service';

@Component({
  selector: 'ngx-neighborhood',
  templateUrl: './neighborhood.component.html',
  styleUrls: ['./neighborhood.component.scss'],
})
export class NeighborhoodOrResidenceComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Barrios';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Riesgo', 'Localidad'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditNeighborhoodOrResidence.bind(this),
            'delete': this.DeleteConfirmNeighborhoodOrResidence.bind(this),
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
      pad_risk: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value) {
          return value.name;
        },
      },
      locality: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction(value) {
          return value.name;
        },
      },
      // status_id: {
      //   title: 'Estado',
      //   type: 'custom',
      //   width: '10%',
      //   valuePrepareFunction: (value, row) => {
      //     // DATA FROM HERE GOES TO renderComponent
      //     return {
      //       'data': row,
      //       'changeState': this.ChangeState.bind(this),
      //     };
      //   },
      //   renderComponent: StatusFieldComponent,
      // },
    },
  };

  public routes = [
    {
      name: 'Barrios',
      route: '../../setting/locality',
    },
  ];

  constructor(
    private NeighborhoodOrResidenceS: NeighborhoodOrResidenceService,
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

  NewNeighborhoodOrResidence() {
    this.dialogFormService.open(FormNeighborhoodOrResidenceComponent, {
      context: {
        title: 'Crear nuevo barrio',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditNeighborhoodOrResidence(data) {
    this.dialogFormService.open(FormNeighborhoodOrResidenceComponent, {
      context: {
        title: 'Editar barrrio',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  // ChangeState(data) {
  //   // data.status_id = data.status_id === 1 ? 2 : 1;

  //   this.toastrService.info('', 'Cambiando estado');

  //   this.NeighborhoodOrResidenceS.Update(data).then((x) => {
  //     this.toastrService.success('', x.message);
  //     this.table.refresh();
  //   }).catch((x) => {
  //     this.toastrService.danger(x.message);
  //   });
  // }

  DeleteConfirmNeighborhoodOrResidence(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteNeighborhoodOrResidence.bind(this),
      },
    });
  }

  DeleteNeighborhoodOrResidence(data) {
    return this.NeighborhoodOrResidenceS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

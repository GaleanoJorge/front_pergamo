import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalityService} from '../../../business-controller/locality.service';
import {StatusFieldComponent} from '../sectional-council/status-field.component';
import {NbToastrService, NbDialogService} from '@nebular/theme';
import {FormLocalityComponent} from './form-locality/form-locality.component';
import {ActionsComponent} from '../sectional-council/actions.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {BaseTableComponent} from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-locality',
  templateUrl: './locality.component.html',
  styleUrls: ['./locality.component.scss'],
})
export class LocalityComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Localidades';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Municipio'];
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
            'edit': this.EditLocality.bind(this),
            'delete': this.DeleteConfirmLocality.bind(this),
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
      municipality: {
        title: this.headerFields[2],
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
      name: 'Localidades',
      route: '../../setting/locality',
    },
  ];

  constructor(
    private localityS: LocalityService,
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

  NewLocality() {
    this.dialogFormService.open(FormLocalityComponent, {
      context: {
        title: 'Crear nueva localidad',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditLocality(data) {
    this.dialogFormService.open(FormLocalityComponent, {
      context: {
        title: 'Editar localidad',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  // ChangeState(data) {
  //   // data.status_id = data.status_id === 1 ? 2 : 1;

  //   this.toastrService.info('', 'Cambiando estado');

  //   this.localityS.Update(data).then((x) => {
  //     this.toastrService.success('', x.message);
  //     this.table.refresh();
  //   }).catch((x) => {
  //     this.toastrService.danger(x.message);
  //   });
  // }

  DeleteConfirmLocality(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteLocality.bind(this),
      },
    });
  }

  DeleteLocality(data) {
    return this.localityS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

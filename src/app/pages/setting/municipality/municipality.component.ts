import {Component, OnInit, ViewChild} from '@angular/core';
import {MunicipalityService} from '../../../business-controller/municipality.service';
import {StatusFieldComponent} from '.././sectional-council/status-field.component';
import {NbToastrService, NbDialogService} from '@nebular/theme';
import {FormMunicipalityComponent} from './form-municipality/form-municipality.component';
import {ActionsComponent} from '.././sectional-council/actions.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {BaseTableComponent} from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-municipality',
  templateUrl: './municipality.component.html',
  styleUrls: ['./municipality.component.scss'],
})
export class MunicipalityComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Ciudades';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Departamento', 'Circuito'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditMunicipality.bind(this),
            'delete': this.DeleteMunicipality.bind(this),
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
      region: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value) {
          return value.name;
        },
      },
      circuit: {
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
      name: 'Ciudades',
      route: '../../setting/municipality',
    },
  ];

  constructor(
    private municipalityS: MunicipalityService,
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

  NewMunicipality() {
    this.dialogFormService.open(FormMunicipalityComponent, {
      context: {
        title: 'Crear nueva ciudad',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditMunicipality(data) {
    this.dialogFormService.open(FormMunicipalityComponent, {
      context: {
        title: 'Editar ciudad',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  // ChangeState(data) {
  //   // data.status_id = data.status_id === 1 ? 2 : 1;

  //   this.toastrService.info('', 'Cambiando estado');

  //   this.municipalityS.Update(data).then((x) => {
  //     this.toastrService.success('', x.message);
  //     this.table.refresh();
  //   }).catch((x) => {
  //     this.toastrService.danger(x.message);
  //   });
  // }

  DeleteConfirmMunicipality(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteMunicipality.bind(this),
      },
    });
  }

  DeleteMunicipality(data) {
    return this.municipalityS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

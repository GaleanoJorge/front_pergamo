import { Component, OnInit, ViewChild } from '@angular/core';
import { MunicipalityIcaService } from '../../../business-controller/municipality-ica.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormMunicipalityIcaComponent } from './form-municipality-ica/form-municipality-ica.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-municipality-ica',
  templateUrl: './municipality-ica.component.html',
  styleUrls: ['./municipality-ica.component.scss']
})
export class MunicipalityIcaComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'RETE ICA POR MUNICIPIO';
  public subtitle: string = 'RETE ICA';
  public headerFields: any[] = ['MUNICIPIO', 'VALOR'];
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
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'edit': this.EditMunicipalityIca.bind(this),
            'delete': this.DeleteConfirmMunicipalityIca.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      municipality_id: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.municipality.name;
        }
      },
      value: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.value + ' * 1000';
        }
      },
    },
  };

  public routes = [
    {
      name: 'Rete Ica por Municipio',
      route: '../../setting/municipality-ica',
    },
  ];

  constructor(
    private MunicipalityIcaS: MunicipalityIcaService,
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

  NewMunicipalityIca() {
    this.dialogFormService.open(FormMunicipalityIcaComponent, {
      context: {
        title: 'Crear nuevo rete ica',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditMunicipalityIca(data) {
    this.dialogFormService.open(FormMunicipalityIcaComponent, {
      context: {
        title: 'Editar rete ica',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmMunicipalityIca(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteMunicipalityIca.bind(this),
      },
    });
  }

  DeleteMunicipalityIca(data) {
    return this.MunicipalityIcaS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

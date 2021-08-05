import { Component, OnInit, ViewChild } from '@angular/core';
import { DistrictService } from '../../../business-controller/district.service';
import { StatusFieldComponent } from '.././sectional-council/status-field.component';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDistrictComponent } from './form-district/form-district.component';
import { ActionsComponent } from '.././sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Distritos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Consejo Seccional', 'Estado'];
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
            'edit': this.EditDistrict.bind(this),
            'delete': this.DeleteConfirmDistrict.bind(this),
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
      sectional_council: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value) {
          return value.name;
        },
      },
      status_id: {
        title: this.headerFields[3],
        type: 'custom',
        width: '10%',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'changeState': this.ChangeState.bind(this),
          };
        },
        renderComponent: StatusFieldComponent,
      },
    },
  };

  public routes = [
    {
      name: 'Distrito',
      route: '../../setting/district',
    },
  ];

  constructor(
    private districtS: DistrictService,
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

  NewDistrict() {
    this.dialogFormService.open(FormDistrictComponent, {
      context: {
        title: 'Crear nuevo distrito',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDistrict(data) {
    this.dialogFormService.open(FormDistrictComponent, {
      context: {
        title: 'Crear nuevo distrito',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    data.status_id = data.status_id === 1 ? 2 : 1;

    this.toastrService.info('', 'Cambiando estado');

    this.districtS.Update(data).then((x) => {
      this.toastrService.success('', x.message);
      this.table.refresh();
    }).catch((x) => {
      this.toastrService.danger(x.message);
    });
  }

  DeleteConfirmDistrict(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDistrict.bind(this),
      },
    });
  }

  DeleteDistrict(data) {
    return this.districtS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

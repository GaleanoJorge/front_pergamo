import { Component, OnInit, ViewChild } from '@angular/core';
import { RegionService } from '../../../business-controller/region.service';
import { StatusFieldComponent } from '.././sectional-council/status-field.component';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormRegionComponent } from './form-region/form-region.component';
import { ActionsComponent } from '.././sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Departamentos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'País'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
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
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditRegion.bind(this),
            'delete': this.DeleteConfirmRegion.bind(this),
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
      country: {
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
      name: 'Departamento',
      route: '../../setting/region',
    },
  ];

  constructor(
    private regionS: RegionService,
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

  NewRegion() {
    this.dialogFormService.open(FormRegionComponent, {
      context: {
        title: 'Crear nuevo departamento',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditRegion(data) {
    this.dialogFormService.open(FormRegionComponent, {
      context: {
        title: 'Editar departamento',
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

  DeleteConfirmRegion(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteRegion.bind(this),
      },
    });
  }

  DeleteRegion(data) {
    return this.regionS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaService } from '../../../business-controller/area.service';
import { StatusFieldComponent } from '../../setting/sectional-council/status-field.component';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormAreaComponent } from './form-area/form-area.component';
import { ActionsComponent } from '../../setting/sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Área';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Descripción'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
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
            'edit': this.EditArea.bind(this),
            'delete': this.DeleteConfirmArea.bind(this),
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
      description: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Área',
      route: '../../setting/area',
    },
  ];

  constructor(
    private areaS: AreaService,
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

  NewArea() {
    this.dialogFormService.open(FormAreaComponent, {
      context: {
        title: 'Crear nueva área',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditArea(data) {
    this.dialogFormService.open(FormAreaComponent, {
      context: {
        title: 'Editar área',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  // ChangeState(data) {
  //   // data.status_id = data.status_id === 1 ? 2 : 1;

  //   this.toastrService.info('', 'Cambiando estado');

  //   this.areaS.Update(data).then((x) => {
  //     this.toastrService.success('', x.message);
  //     this.table.refresh();
  //   }).catch((x) => {
  //     this.toastrService.danger(x.message);
  //   });
  // }

  DeleteConfirmArea(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteArea.bind(this),
      },
    });
  }

  DeleteArea(data) {
    return this.areaS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}


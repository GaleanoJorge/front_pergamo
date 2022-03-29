import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormSectionalCouncilComponent } from './form-sectional-council/form-sectional-council.component';
import { ActionsComponent } from './actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-sectional-council',
  templateUrl: './sectional-council.component.html',
  styleUrls: ['./sectional-council.component.scss'],
})
export class SectionalCouncilComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Consejo seccional';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Estado'];
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
            'edit': this.EditSectional.bind(this),
            'delete': this.DeleteConfirmSectional.bind(this),
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
      status_id: {
        title: this.headerFields[2],
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
      name: 'Consejo seccional',
      route: '../../setting/sectional-council',
    },
  ];

  constructor(
    private sectionalCS: SectionalCouncilService,
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

  NewSectional() {
    this.dialogFormService.open(FormSectionalCouncilComponent, {
      context: {
        title: 'Crear nuevo consejo seccional',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditSectional(data) {
    this.dialogFormService.open(FormSectionalCouncilComponent, {
      context: {
        title: 'Crear nuevo consejo seccional',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    data.status_id = data.status_id === 1 ? 2 : 1;

    // this.toastrService.info('', 'Cambiando estado');

    this.sectionalCS.Update(data).then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    }).catch((x) => {
      this.toastrService.danger(x.message);
    });
  }

  DeleteConfirmSectional(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteSectional.bind(this),
      },
    });
  }

  DeleteSectional(data) {
    return this.sectionalCS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

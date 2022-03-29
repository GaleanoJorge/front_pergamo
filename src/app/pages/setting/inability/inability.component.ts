import { Component, OnInit, ViewChild } from '@angular/core';
import { InabilityService } from '../../../business-controller/inability.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormInabilityComponent } from './form-inability/form-inability.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-inability',
  templateUrl: './inability.component.html',
  styleUrls: ['./inability.component.scss']
})
export class InabilityComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Discapacidad';
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
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditInability.bind(this),
            'delete': this.DeleteConfirmInability.bind(this),
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
      name: 'Discapacidad',
      route: '../../setting/inability',
    },
  ];

  constructor(
    private InabilityS: InabilityService,
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

  NewInability() {
    this.dialogFormService.open(FormInabilityComponent, {
      context: {
        title: 'Crear nueva discapacidad',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditInability(data) {
    this.dialogFormService.open(FormInabilityComponent, {
      context: {
        title: 'Editar discapacidad',
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

  DeleteConfirmInability(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteInability.bind(this),
      },
    });
  }

  DeleteInability(data) {
    return this.InabilityS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

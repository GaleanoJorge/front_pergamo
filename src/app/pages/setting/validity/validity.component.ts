import { Component, OnInit, ViewChild } from '@angular/core';
import { ValidityService } from '../../../business-controller/validity.service';
import { StatusFieldComponent } from '.././sectional-council/status-field.component';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormValidityComponent } from './form-validity/form-validity.component';
import { ActionsComponent } from '.././sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-validity',
  templateUrl: './validity.component.html',
  styleUrls: ['./validity.component.scss']
})
export class ValidityComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Vigencia';
  public subtitle: string = 'Gestión';
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
            'edit': this.EditValidity.bind(this),
            'delete': this.DeleteValidity.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: 'ID',
        type: 'string',
      },
      name: {
        title: 'Nombre',
        type: 'string',
      },
      description: {
        title: 'Descripción',
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Vigencia',
      route: '../../setting/validity',
    },
  ];

  constructor(
    private validityS: ValidityService,
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

  NewValidity() {
    this.dialogFormService.open(FormValidityComponent, {
      context: {
        title: 'Crear nueva vigencia',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditValidity(data) {
    this.dialogFormService.open(FormValidityComponent, {
      context: {
        title: 'Editar vigencia',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  // ChangeState(data) {
  //   // data.status_id = data.status_id === 1 ? 2 : 1;

  //   this.toastrService.info('', 'Cambiando estado');

  //   this.validityS.Update(data).then((x) => {
  //     this.toastrService.success('', x.message);
  //     this.table.refresh();
  //   }).catch((x) => {
  //     this.toastrService.danger(x.message);
  //   });
  // }

  DeleteConfirmValidity(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteValidity.bind(this),
      },
    });
  }

  DeleteValidity(data) {
    return this.validityS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FirmsService } from '../../../business-controller/firms.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormFirmsComponent } from './form-firms/form-firms.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-firms',
  templateUrl: './firms.component.html',
  styleUrls: ['./firms.component.scss']
})
export class FirmsComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Firmas';
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
            'edit': this.EditFirms.bind(this),
            'delete': this.DeleteConfirmFirms.bind(this),
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
      name: 'Firmas',
      route: '../../setting/firms',
    },
  ];

  constructor(
    private FirmsS: FirmsService,
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

  NewFirms() {
    this.dialogFormService.open(FormFirmsComponent, {
      context: {
        title: 'Crear nueva firma',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditFirms(data) {
    this.dialogFormService.open(FormFirmsComponent, {
      context: {
        title: 'Editar firma',
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

  DeleteConfirmFirms(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteFirms.bind(this),
      },
    });
  }

  DeleteFirms(data) {
    return this.FirmsS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

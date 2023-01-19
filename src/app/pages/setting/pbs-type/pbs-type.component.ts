import { Component, OnInit, ViewChild } from '@angular/core';
import { PbsTypeService } from '../../../business-controller/pbs-type.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormPbsTypeComponent } from './form-pbs-type/form-pbs-type.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-pbs-type',
  templateUrl: './pbs-type.component.html',
  styleUrls: ['./pbs-type.component.scss']
})
export class PbsTypeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipo de PBS';
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
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditPbsType.bind(this),
            'delete': this.DeleteConfirmPbsType.bind(this),
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
      name: 'Tipo de Pbs',
      route: '../../setting/pbs-type',
    },
  ];

  constructor(
    private PbsTypeS: PbsTypeService,
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

  NewPbsType() {
    this.dialogFormService.open(FormPbsTypeComponent, {
      context: {
        title: 'Crear nuevo tipo de pbs',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditPbsType(data) {
    this.dialogFormService.open(FormPbsTypeComponent, {
      context: {
        title: 'Editar tipo de pbs',
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

  DeleteConfirmPbsType(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePbsType.bind(this),
      },
    });
  }

  DeletePbsType(data) {
    return this.PbsTypeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

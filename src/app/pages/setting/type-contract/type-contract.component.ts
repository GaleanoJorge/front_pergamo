import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeContractService } from '../../../business-controller/type-contract.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormTypeContractComponent } from './form-type-contract/form-type-contract.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-type-contract',
  templateUrl: './type-contract.component.html',
  styleUrls: ['./type-contract.component.scss']
})
export class TypeContractComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipo de Contrato';
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
            'edit': this.EditTypeContract.bind(this),
            'delete': this.DeleteConfirmTypeContract.bind(this),
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
      name: 'Tipo de Contrato',
      route: '../../setting/type-contract',
    },
  ];

  constructor(
    private TypeContractS: TypeContractService,
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

  NewTypeContract() {
    this.dialogFormService.open(FormTypeContractComponent, {
      context: {
        title: 'Crear nuevo tipo de contrato',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditTypeContract(data) {
    this.dialogFormService.open(FormTypeContractComponent, {
      context: {
        title: 'Editar tipo de contrato',
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

  DeleteConfirmTypeContract(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteTypeContract.bind(this),
      },
    });
  }

  DeleteTypeContract(data) {
    return this.TypeContractS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

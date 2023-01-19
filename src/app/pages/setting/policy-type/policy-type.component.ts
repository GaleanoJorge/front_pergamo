import { Component, OnInit, ViewChild } from '@angular/core';
import { PolicyTypeService } from '../../../business-controller/policy-type.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormPolicyTypeComponent } from './form-policy-type/form-policy-type.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-policy-type',
  templateUrl: './policy-type.component.html',
  styleUrls: ['./policy-type.component.scss']
})
export class PolicyTypeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipos de Póliza';
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
            'edit': this.EditPolicyType.bind(this),
            'delete': this.DeleteConfirmPolicyType.bind(this),
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
      name: 'Tipos de póliza',
      route: '../../setting/policy-type',
    },
  ];

  constructor(
    private PolicyTypeS: PolicyTypeService,
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

  NewPolicyType() {
    this.dialogFormService.open(FormPolicyTypeComponent, {
      context: {
        title: 'Crear nuevo tipo de póliza',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditPolicyType(data) {
    this.dialogFormService.open(FormPolicyTypeComponent, {
      context: {
        title: 'Editar tipo de póliza',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }


  DeleteConfirmPolicyType(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePolicyType.bind(this),
      },
    });
  }

  DeletePolicyType(data) {
    return this.PolicyTypeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

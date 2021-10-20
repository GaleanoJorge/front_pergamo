import { Component, OnInit, ViewChild } from '@angular/core';
import { InsuranceCarrierService } from '../../../business-controller/insurance-carrier.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormInsuranceCarrierComponent } from './form-insurance-carrier/form-insurance-carrier.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-insurance-carrier',
  templateUrl: './insurance-carrier.component.html',
  styleUrls: ['./insurance-carrier.component.scss']
})
export class InsuranceCarrierComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Aseguradoras';
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
            'edit': this.EditInsuranceCarrier.bind(this),
            'delete': this.DeleteConfirmInsuranceCarrier.bind(this),
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
      name: 'Aseguradoras',
      route: '../../setting/insurance-carrier',
    },
  ];

  constructor(
    private InsuranceCarrierS: InsuranceCarrierService,
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

  NewInsuranceCarrier() {
    this.dialogFormService.open(FormInsuranceCarrierComponent, {
      context: {
        title: 'Crear nueva aseguradora',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditInsuranceCarrier(data) {
    this.dialogFormService.open(FormInsuranceCarrierComponent, {
      context: {
        title: 'Editar aseguradora',
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

  DeleteConfirmInsuranceCarrier(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteInsuranceCarrier.bind(this),
      },
    });
  }

  DeleteInsuranceCarrier(data) {
    return this.InsuranceCarrierS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

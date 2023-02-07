import { Component, OnInit, ViewChild } from '@angular/core';
import { FactoryService } from '../../../business-controller/factory.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormPharmacyAdjustmentComponent } from './form-pharmacy-adjustment/form-pharmacy-adjustment.component';
import { PharmacyAdjustmentService } from '../../../business-controller/pharmacy-adjustment.service';


@Component({
  selector: 'ngx-pharmacy-adjustment',
  templateUrl: './pharmacy-adjustment.component.html',
  styleUrls: ['./pharmacy-adjustment.component.scss']
})
export class PharmacyAdjustmentComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Lista ajustes de inventario';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Nombre'];
  public messageToltip: string = `Búsqueda por:${this.headerFields[1]}`;
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
            'edit': this.EditFactory.bind(this),
            'delete': this.DeleteConfirmFactory.bind(this),
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

   constructor(
    private PharmacyAdjustmentS: PharmacyAdjustmentService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  NewFactory() {
    this.dialogFormService.open(FormPharmacyAdjustmentComponent, {
      context: {
        title: 'Crear fabricantes',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditFactory(data) {
    this.dialogFormService.open(FormPharmacyAdjustmentComponent, {
      context: {
        title: 'Editar fabricantes',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmFactory(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteFactory.bind(this),
      },
    });
  }

  DeleteFactory(data) {
    return this.PharmacyAdjustmentS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

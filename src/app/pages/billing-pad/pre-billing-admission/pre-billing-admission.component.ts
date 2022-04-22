import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormPreBillingAdmissionComponent } from './form-pre-billing-admission/form-pre-billing-admission.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActionsComponent } from '../../setting/sectional-council/actions.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-pre-billing-admission',
  templateUrl: './pre-billing-admission.component.html',
  styleUrls: ['./pre-billing-admission.component.scss']
})
export class PreBillingAdmissionComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'SERVICIOS';
  public subtitle: string = 'GESTIÓN';
  public headerFields: any[] = ['ID', 'NOMBRE'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public admission_id;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'edit': this.EditPreBillingAdmission.bind(this),
            'delete': this.DeleteConfirmPreBillingAdmission.bind(this),
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
      name: 'Días de dietas',
      route: '../../setting/pre-billing-admission',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    this.admission_id = this.route.snapshot.params.admissions_id;
  }

  RefreshData() {

    this.table.refresh();
  }

  NewPreBillingAdmission() {
    this.dialogFormService.open(FormPreBillingAdmissionComponent, {
      context: {
        title: 'Crear nuevo día de dietas',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditPreBillingAdmission(data) {
    this.dialogFormService.open(FormPreBillingAdmissionComponent, {
      context: {
        title: 'Editar día de dietas',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmPreBillingAdmission(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePreBillingAdmission.bind(this),
      },
    });
  }

  DeletePreBillingAdmission(data) {
    // return this.PreBillingAdmissionS.Delete(data.id).then(x => {
    //   this.table.refresh();
    //   return Promise.resolve(x.message);
    // }).catch(x => {
    //   throw x;
    // });
  }

}

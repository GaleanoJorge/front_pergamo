import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActionsPadProcedureComponent } from '../../billing-pad-procedure/actions-pad-procedure.component';
import { FormBillingPadComponent } from '../../billing-pad-procedure/form-billing-pad/form-billing-pad.component';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'ngx-form-show-billing-pad',
  templateUrl: './form-show-billing-pad.component.html',
  styleUrls: ['./form-show-billing-pad.component.scss']
})
export class FormShowBillingPadComponent implements OnInit {

  @Input() title: string;
  @Input() data:any = null;
  @Input() billing_pad_pgp_id: number = null;

  public form: FormGroup;
  public subtitle: string = 'Servicios';
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public headerFields: any[] = ['ACCIONES', 'PROCEDIMIENTO', 'VALOR', 'EPS', 'FECHA DE EJECUCIÓN'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public entity;

  constructor(
    private dialogFormService: NbDialogService,
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    public datePipe: DateFormatPipe,
    private currency: CurrencyPipe,
  ) {
  }

  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: this.headerFields[0],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'show': this.ShowPackageContent.bind(this),
          };
        },
        renderComponent: ActionsPadProcedureComponent,
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.services_briefcase.manual_price.name;
        },
      },
      value: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(row.services_briefcase.value);
        },
      },
      assigned_management_plan_id: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.assigned_management_plan != null){
            return this.datePipe.transform3(row.assigned_management_plan.execution_date);
          } else {
            return '';
          }
        }
      },
    },
  };

  ngOnInit(): void {
    if (this.billing_pad_pgp_id == null) {
      this.entity = 'billing_pad/getAuthorizedProcedures/' + this.data.admissions_id + '?billing_id=' + this.data.id+'&show=1';
    } else {
      this.entity = 'billing_pad/getAuthorizedProcedures/' + this.data.id + '?billing_pad_pgp_id=' + this.billing_pad_pgp_id;
    }

  }
  

  close() {
    this.dialogRef.close();
  }

  ShowPackageContent(data) {
    this.dialogFormService.open(FormBillingPadComponent, {
      context: {
        title: 'Contenido de Paquete',
        data,
      },
    });
  }


}

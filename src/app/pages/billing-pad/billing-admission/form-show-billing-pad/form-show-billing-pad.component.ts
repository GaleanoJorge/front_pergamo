import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActionsPadProcedureComponent } from '../../billing-pad-procedure/actions-pad-procedure.component';
import { FormBillingPadComponent } from '../../billing-pad-procedure/form-billing-pad/form-billing-pad.component';


@Component({
  selector: 'ngx-form-show-billing-pad',
  templateUrl: './form-show-billing-pad.component.html',
  styleUrls: ['./form-show-billing-pad.component.scss']
})
export class FormShowBillingPadComponent implements OnInit {

  @Input() title: string;
  @Input() data:any = null;

  public form: FormGroup;
  public subtitle: string = 'Servicios';
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public headerFields: any[] = ['ACCIONES', 'PROCEDIMIENTO', 'VALOR', 'EPS'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public entity;

  constructor(
    private dialogFormService: NbDialogService,
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
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
          if (row.assigned_management_plan){
            return row.assigned_management_plan.management_plan.procedure.name;
          } else if (row.manual_price) {
            return row.manual_price.name;
          }
        },
      },
    },
  };

  ngOnInit(): void {
    this.entity = 'billing_pad/getAuthorizedProcedures/' + this.data.admissions_id + '?billing_id=' + this.data.id;

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

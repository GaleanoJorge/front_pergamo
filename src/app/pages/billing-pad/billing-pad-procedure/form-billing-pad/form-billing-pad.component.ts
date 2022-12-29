import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';


@Component({
  selector: 'ngx-form-billing-pad',
  templateUrl: './form-billing-pad.component.html',
  styleUrls: ['./form-billing-pad.component.scss']
})
export class FormBillingPadComponent implements OnInit {

  @Input() title: string;
  @Input() data:any = null;
  @Input() route:any = null;
  @Input() billing_id:any = null;

  public form: FormGroup;
  public subtitle: string = 'Servicios';
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public auth_package_id;
  public headerFields: any[] = ['ACCIONES', 'PROCEDIMIENTO', 'VALOR', 'EPS', 'FECHA DE EJECUCIÓN', 'VERIFICADO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    public datePipe: DateFormatPipe,
  ) {
  }

  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      name: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.services_briefcase.manual_price.name;
        },
      },
      assigned_management_plan_id: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.assigned_management_plan != null) {
            if (row.assigned_management_plan.execution_date != "0000-00-00 00:00:00") {
              return this.datePipe.transform4(row.assigned_management_plan.execution_date);
            } else {
              return 'Sin ejecutar';
            }
          } else if (row.ch_interconsultation != null) {
            var a = row.ch_interconsultation.many_ch_record;
            var b = a.find(item => item.created_at == row.created_at)
            if (b && !row.open_date) {
              if (b.date_finish == "0000-00-00 00:00:00") {
                return 'Sin ejecutar';
              } else {
                return this.datePipe.transform4(b.date_finish);
              }
            } else if (row.location != null) {
              return this.datePipe.transform4(row.open_date) + ' - ' + this.datePipe.transform4(/*row.location.discharge_date != "0000-00-00 00:00:00" ? row.location.discharge_date :*/ row.close_date ? row.close_date : new Date());
            } else {
              return '';
            }
          } else {
            return '';
          }
        }
      },
      assigned_management_plan: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.assigned_management_plan != null) {
            if (row.assigned_management_plan.approved == 1) {
              return 'Aprobado';
            } else {
              return 'Sin aprobar';
            }
          } else {
            return '';
          }
          
        }
      },
    },
  };

  ngOnInit(): void {
    this.auth_package_id = this.data.id;
  }
  

  close() {
    this.dialogRef.close();
  }


}

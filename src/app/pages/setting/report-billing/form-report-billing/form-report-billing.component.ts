import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { CompanyService } from '../../../../business-controller/company.service';
import { ReportBillingService } from '../../../../business-controller/report-billing.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
@Component({
  selector: 'ngx-form-report-billing',
  templateUrl: './form-report-billing.component.html',
  styleUrls: ['./form-report-billing.component.scss'],
})
export class FormReportBillingComponent implements OnInit {
  @Input() title: string;
  // @Output() messageEvent = new EventEmitter<any>();
  @Input() data: any = null;
  @Input() saved: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public loading: boolean = false;
  public disabled: boolean = false;
  public user_id;
  public company: any[];
  public company_id;
  // public entity;
  // public customData;
  public show: boolean = false;

  public today = null;

  constructor(
    private ReportBillingS: ReportBillingService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private UserBusinessS: UserBusinessService,
    private CompanyS: CompanyService
  ) { }

  async ngOnInit() {
    //? Sin uso hasta el momento
    // this.entity = this.entity;
    // this.customData = this.customData;
    this.today = new Date();
    this.today = this.today.toISOString().split('T')[0];
    if (!this.data) {
      this.data = {
        initial_report: '',
        final_report: '',
        company_id: '',
      };
    }

    this.form = this.formBuilder.group({
      initial_report: [this.data.initial_report, Validators.compose([Validators.required]),],
      final_report: [this.data.final_report, Validators.compose([Validators.required]),],
      company_id: [this.data.company_id, Validators.compose([Validators.required]),],
    });

    await this.CompanyS.GetCollection({ company_category_id: 1 }).then((x) => {
      this.company = x;
    });
    await this.UserBusinessS.GetUser().then((x) => {
      this.user_id = x;
    });
  }

  saveCode(e): void {
    var localidentify = this.company.find((item) => item.name == e
    );
    if (localidentify) {
      this.company_id = localidentify.id;
    } else {
      this.company_id = null;
      this.toastService.warning('', 'Seleccione EPS en lista');
    }
  }

  exportAsXLSX(): void {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.ReportBillingS.GetExportBilling(this.company_id, {
        id: this.company_id,
        company_id: this.company_id,
        initial_report: this.form.controls.initial_report.value,
        final_report: this.form.controls.final_report.value,
      }).then((x) => {
        if (x.h1.length > 0 || x.h2.length > 0 || x.h3.length > 0) {
          this.ReportBillingS.exportAsExcelFile(x, 'reporte_facturación_' +
            this.form.controls.company_id.value + '_entre_[' +
            this.form.controls.initial_report.value + ']-[' +
            this.form.controls.final_report.value + ']_del_[' +
            this.today + '][');
        } else {
          this.toastService.warning('', 'No Existen Registros');
        }
      }).catch(x => {
        this.isSubmitted = false;
      });
    } else {
      this.toastService.warning('', 'Seleccione EPS y Rango de Fechas');
    }
  }

  onDatechange1($event) {
    var date = new Date($event.target.value);
    var now_date = new Date();
    if (date > now_date) {
      this.form.controls.final_report.setErrors({ incorrect: true });
      this.toastService.danger(null, 'Fecha Mayor a la Actual');
    } else {
      this.form.controls.final_report.setErrors(null);
    }
  }
}
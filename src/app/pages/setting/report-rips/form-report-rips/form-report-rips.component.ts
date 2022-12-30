import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { CompanyService } from '../../../../business-controller/company.service';
import { ReportRipsService } from '../../../../business-controller/report-rips.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'ngx-form-report-rips',
  templateUrl: './form-report-rips.component.html',
  styleUrls: ['./form-report-rips.component.scss']
})
export class FormReportRipsComponent implements OnInit {

  @Input() title: string;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() data: any = null;
  @Input() saved: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public loading: boolean = false;
  public disabled: boolean = false;
  public user_id;
  public company: any[];

  public today = null;
  public company_id;

  constructor(
    private excelService: ReportRipsService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private UserBusinessS: UserBusinessService,
    private CompanyS: CompanyService,
  ) {
  }

  async ngOnInit() {
    this.today = new Date();
    this.today = this.today.toISOString().split('T')[0];
    // this.today = this.today.toISOString().replace(/T.*/,'').split('-').reverse().join('-');
    if (!this.data) {
      this.data = {
        initial_report: '',
        final_report: '',
        company_id: '',
      };
    }

    this.form = this.formBuilder.group({
      initial_report: [this.data.initial_report, Validators.compose([Validators.required])],
      final_report: [this.data.final_report, Validators.compose([Validators.required])],
      company_id: [this.data.company_id, Validators.compose([Validators.required])],
    });

    await this.CompanyS.GetCollection({ company_category_id: 1 }).then(x => {
      this.company = x;
    });

    await this.UserBusinessS.GetUser().then(x => {
      this.user_id = x;
    });
  }

  saveCode(e): void {
    var localidentify = this.company.find(item => item.name == e);
    if (localidentify) {
      this.company_id = localidentify.id;
    } else {
      this.company_id = null;
      this.toastService.warning('', 'Debe seleccionar una EPS de la lista');
    }
  }
  
  exportAsXLSX(): void {
    if (!this.form.invalid) {
      this.excelService.GetExportRips(this.company_id, {
        initial_report: this.form.controls.initial_report.value,
        final_report: this.form.controls.final_report.value,
      }).then(x => {
        // if (x['h1'].length > 0) {
          this.excelService.exportAsExcelFile(x['h1'], "reporte_rips_de_[" + this.form.controls.initial_report.value + "]_a_[" + this.form.controls.final_report.value + "]");
          // this.excelService.exportAsExcelFile(x['h2'], 'h2');
          // this.excelService.exportAsExcelFile(x['h3'], 'h3');
          // this.excelService.exportAsExcelFile(x['h4'], 'h4');
          // this.excelService.exportAsExcelFile(x['h5'], 'h5');
          // this.excelService.exportAsExcelFile(x['h6'], 'h6');
          // this.excelService.exportAsExcelFile(x['h7'], 'h7');
          // this.excelService.exportAsExcelFile(x['h8'], 'h8');
        // } else {
        //   this.toastService.warning('', 'No se encontraron datos');
        // }
      });
    }
  }

  onDatechange1($event) {
    var date = new Date($event.target.value);
    var now_date = new Date;
    if (date > now_date) {
      this.form.controls.final_report.setErrors({ 'incorrect': true });
      this.toastService.danger(null, 'La fecha no puede ser mayor a la actual');
    } else {
      this.form.controls.final_report.setErrors(null);
    }
  }
}



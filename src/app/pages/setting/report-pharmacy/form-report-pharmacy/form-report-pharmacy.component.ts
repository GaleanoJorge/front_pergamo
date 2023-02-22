import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { PharmacyLotStockService } from '../../../../business-controller/pharmacy-lot-stock.service';
import { PharmacyStockService } from '../../../../business-controller/pharmacy-stock.service';
import { ReportPharmacyService } from '../../../../business-controller/report-pharmacy.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'ngx-form-report-pharmacy',
  templateUrl: './form-report-pharmacy.component.html',
  styleUrls: ['./form-report-pharmacy.component.scss'],
})
export class FormReportPharmacyComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() saved: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public loading: boolean = false;
  public disabled: boolean = false;
  public user_id;
  public pharmacy_stock: any[];
  public pharmacy_stock_id;
  public show: boolean = false;
  public user;

  public today = null;

  constructor(
    private ReportPharmacyS: ReportPharmacyService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private UserBusinessS: UserBusinessService,
    private authService: AuthService,
    private PharmacyStockS: PharmacyStockService,
    private PharmacyLotStockS: PharmacyLotStockService
  ) { }

  async ngOnInit() {
    this.today = new Date();
    this.today = this.today.toISOString().split('T')[0];
    if (!this.data) {
      this.data = {
        initial_report: '',
        final_report: '',
        pharmacy_stock_id: '',
        status: '',
      };
    }

    this.form = this.formBuilder.group({
      initial_report: [this.data.initial_report, Validators.compose([Validators.required]),],
      final_report: [this.data.final_report, Validators.compose([Validators.required])],
      pharmacy_stock_id: [this.data.pharmacy_stock_id, Validators.compose([Validators.required])],
      status: [this.data.status, Validators.compose([Validators.required])],
    });
    this.user = this.authService.GetUser();

    this.PharmacyStockS.GetCollection().then((x) => {
      this.pharmacy_stock = x;
    });

    this.UserBusinessS.GetUser().then((x) => {
      this.user_id = x;
    });
  }

  saveCode(e): void {
    var localidentify = this.pharmacy_stock.find((item) => item.name == e);
    if (localidentify) {
      this.pharmacy_stock_id = localidentify.id;
    } else {
      this.pharmacy_stock_id = null;
      this.toastService.warning('', 'Selecciona una EPS de la lista');
    }
  }

  // Export Paso 1
  exportAsXLSX(): void {
    if (!this.form.invalid) {
      this.ReportPharmacyS.GetExportPharmacy(this.pharmacy_stock_id, {
        initial_report: this.form.controls.initial_report.value,
        final_report: this.form.controls.final_report.value,
        status: this.form.controls.status.value,
        pharmacy_stock_id: this.pharmacy_stock_id,
      }).then((x) => {
        if (x.length > 0) {
        this.ReportPharmacyS.exportAsExcelFile(x, 'reporte_stock_' +
          this.form.controls.pharmacy_stock_id.value + '_' +
          this.form.controls.status.value + '_de_[' +
          this.form.controls.initial_report.value + ']-[' +
          this.form.controls.final_report.value + ']');
        } else {
          this.toastService.warning('', 'No Existen Registros');
        }
      });
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

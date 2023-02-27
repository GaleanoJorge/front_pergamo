import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { CampusService } from '../../../../business-controller/campus.service';
import { ReportExternalQueryService } from '../../../../business-controller/report-external.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'ngx-form-report-external-query',
  templateUrl: './form-report-external-query.component.html',
  styleUrls: ['./form-report-external-query.component.scss'],
})
export class FormReportExternalQueryComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() saved: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public loading: boolean = false;
  public disabled: boolean = false;
  public user_id;
  public campus: any[];
  public campus_id;
  public show: boolean = false;
  public user;

  public today = null;

  constructor(
    private ReportExternalQueryS: ReportExternalQueryService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private UserBusinessS: UserBusinessService,
    private authService: AuthService,
    private CampusS: CampusService,
  ) { }

  async ngOnInit() {
    this.today = new Date();
    this.today = this.today.toISOString().split('T')[0];
    if (!this.data) {
      this.data = {
        initial_report: '',
        final_report: '',
        campus_id: '',
        status: '',
      };
    }

    this.form = this.formBuilder.group({
      initial_report: [this.data.initial_report, Validators.compose([Validators.required])],
      final_report: [this.data.final_report, Validators.compose([Validators.required])],
      campus_id: [this.data.campus_id, Validators.compose([Validators.required])],
      status: [this.data.status, Validators.compose([Validators.required])],
    });
    this.user = this.authService.GetUser();

    this.CampusS.GetCollection().then((x) => {
      this.campus = x;
    });

    this.UserBusinessS.GetUser().then((x) => {
      this.user_id = x;
    });
  }

  saveCode(e): void {
    var localidentify = this.campus.find((item) => item.name == e);
    if (localidentify) {
      this.campus_id = localidentify.id;
    } else {
      this.campus_id = null;
      this.toastService.warning('', 'Seleccione Sede en Lista');
    }
  }

  // Export Paso 1
  exportAsXLSX(): void {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.ReportExternalQueryS.GetExportPharmacy(this.campus_id, {
        initial_report: this.form.controls.initial_report.value,
        final_report: this.form.controls.final_report.value,
        status: this.form.controls.status.value,
        campus_id: this.campus_id,
      }).then((x) => {
        if (x.length > 0) {
          this.ReportExternalQueryS.exportAsExcelFile(x, 'reporte_consulta_externa_' +
            this.form.controls.campus_id.value + '_' +
            this.form.controls.status.value + '_entre_[' +
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
      this.toastService.warning('', 'Seleccione Sede, Estado y Rango de Fechas');
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
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { CampusService } from '../../../../business-controller/campus.service';
import { ReportGlossService } from '../../../../business-controller/report-gloss.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';

@Component({
  selector: 'ngx-form-report-gloss',
  templateUrl: './form-report-gloss.component.html',
  styleUrls: ['./form-report-gloss.component.scss'],
})
export class FormReportGlossComponent implements OnInit {
  @Input() title: string;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() data: any = null;
  @Input() saved: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public loading: boolean = false;
  public disabled: boolean = false;
  public user_id;
  public campus: any[];
  public campus_id;
  public entity;
  public customData;
  public show: boolean = false;

  public today = null;
  public pharmacy_product_request_id;

  constructor(
    private ReportGlossS: ReportGlossService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private UserBusinessS: UserBusinessService,
    private CampusS: CampusService,
  ) { }

  async ngOnInit() {
    this.entity = this.entity;
    this.customData = this.customData;
    this.today = new Date();
    this.today = this.today.toISOString().split('T')[0];
    if (!this.data) {
      this.data = {
        initial_report: '',
        final_report: '',
        campus_id: '',
      };
    }

    this.form = this.formBuilder.group({
      // initial_report: [this.data.initial_report, Validators.compose([Validators.required]),],
      // final_report: [this.data.final_report, Validators.compose([Validators.required]),],
      campus_id: [this.data.campus_id, Validators.compose([Validators.required]),],
    });

    await this.CampusS.GetCollection().then((x) => {
      this.campus = x;
    });

    await this.UserBusinessS.GetUser().then((x) => {
      this.user_id = x;
    });
  }

  saveCampus(e): void {
    var localidentify = this.campus_id.find((item) => item.name == e);
    if (localidentify) {
      this.campus_id = localidentify.id;
    } else {
      this.campus_id = null;
      this.toastService.warning('', 'Seleccione Sede en Lista');
    }
  }

  exportAsXLSX(): void {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.ReportGlossS.exportGloss(this.form.value.campus_id, {
        id: this.form.controls.campus_id.value,
      }).then((x) => {
        if (x.length > 0) {
          this.ReportGlossS.exportAsExcelFile(x, 'reporte_glosas_del_[' +
            this.today + ']_a_las_[');
        } else {
          this.toastService.warning('', 'No Existen Registros');
        }
      }).catch(x => {
        this.isSubmitted = false;
      });
    } else {
      this.toastService.warning('', 'Ingresa Sede');
    }
  }

  exportAsXLSXGeneral(): void {
    this.isSubmitted = true;
    this.ReportGlossS.exportGlossGeneral().then(x => {
      if (x.length > 0) {
        this.ReportGlossS.exportAsExcelFile(x, 'reporte_glosas_general_del_[' +
          this.today + ']_a_las_[');
      } else {
        this.toastService.warning('', 'No Existen Registros');
      }
    }).catch(x => {
      this.isSubmitted = false;
    });
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

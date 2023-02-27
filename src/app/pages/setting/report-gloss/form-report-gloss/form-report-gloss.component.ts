import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { and } from '@rxweb/reactive-form-validators';
import { GlossService } from '../../../../business-controller/gloss.service';
import { ReportGlossService } from '../../../../business-controller/report-gloss.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
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
  public gloss: any[];
  public gloss_id;
  public entity;
  public customData;
  public show: boolean = false;

  public today = null;
  public pharmacy_product_request_id;

  constructor(
    private excelService: ReportGlossService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private UserBusinessS: UserBusinessService,
    private GlossS: GlossService
  ) {}

  async ngOnInit() {
    this.entity = this.entity;
    this.customData = this.customData;
    this.today = new Date();
    this.today = this.today.toISOString().split('T')[0];
    if (!this.data) {
      this.data = {
        initial_report: '',
        final_report: '',
        gloss_id: '',
        status: '',
      };
    }

    this.form = this.formBuilder.group({
      initial_report: [
        this.data.initial_report,
        Validators.compose([Validators.required]),
      ],
      final_report: [
        this.data.final_report,
        Validators.compose([Validators.required]),
      ],
      gloss_id: [
        this.data.gloss_id,
        Validators.compose([Validators.required]),
      ],
      status: [this.data.status, Validators.compose([Validators.required])],
    });

    await this.GlossS.GetCollection().then((x) => {
      this.gloss = x;
    });

    await this.UserBusinessS.GetUser().then((x) => {
      this.user_id = x;
    });
  }

  saveCode(e): void {
    var localidentify = this.gloss_id.find(
      (item) => item.name == e
    );
    if (localidentify) {
      this.gloss_id = localidentify.id;
    } else {
      this.gloss_id = null;
      this.toastService.warning(
        '',
        'Selecciona una Glosa de la Lista'
      );
    }
  }

  exportAsXLSX(): void {
    if (!this.form.invalid) {
      this.excelService
        .GetExportGloss(this.gloss_id, {
          initial_report: this.form.controls.initial_report.value,
          final_report: this.form.controls.final_report.value,
          status: this.form.controls.status.value,
          gloss_id: this.gloss_id,
        })
        .then((x) => {
          // if (x['reports'].length > 0) {
          this.excelService.exportAsExcelFile(x['reports'], "reporte_glosas_de_[" + this.form.controls.initial_report.value + "]_a_[" + this.form.controls.final_report.value + "]");
          // } else {
          //   this.toastService.warning('', 'No existen datos');
          // }
        });
    }
  }

  onDatechange1($event) {
    var date = new Date($event.target.value);
    var now_date = new Date();
    if (date > now_date) {
      this.form.controls.final_report.setErrors({ incorrect: true });
      this.toastService.danger(null, 'La fecha no puede ser mayor a la actual');
    } else {
      this.form.controls.final_report.setErrors(null);
    }
  }
}

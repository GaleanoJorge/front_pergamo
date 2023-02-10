import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { ReportCensusService } from '../../../../business-controller/report-census.service';
import { CampusService } from '../../../../business-controller/campus.service';
import { PavilionService } from '../../../../business-controller/pavilion.service';
import { FlatService } from '../../../../business-controller/flat.service';
@Component({
  selector: 'ngx-form-report-census',
  templateUrl: './form-report-census.component.html',
  styleUrls: ['./form-report-census.component.scss'],
})
export class FormReportCensusComponent implements OnInit {
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
  public pavilion: any[];
  public pavilion_id;
  public location: any[];
  public location_id;
  public flat: any[];
  public flat_id;
  public show: boolean = false;
  public flat_category: any[];
  public pavilion_category: any[];

  public today = null;

  constructor(
    private ReportCensusS: ReportCensusService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private UserBusinessS: UserBusinessService,
    private CampusS: CampusService,
    private PavilionS: PavilionService,
    private FlatS: FlatService
  ) { }

  async ngOnInit() {
    this.today = new Date();
    this.today = this.today.toISOString().split('T')[0];
    if (!this.data) {
      this.data = {
        initial_report: '',
        final_report: '',
        campus_id: '',
        flat_id: '',
        pavilion_id: '',
      };
    }

    this.form = this.formBuilder.group({
      initial_report: [this.data.initial_report, Validators.compose([Validators.required]),],
      final_report: [this.data.final_report, Validators.compose([Validators.required])],
      campus_id: [this.data.campus_id, Validators.compose([Validators.required])],
      flat_id: [this.data.flat_id, Validators.compose([Validators.required])],
      pavilion_id: [this.data.pavilion_id, Validators.compose([Validators.required])],
    });

    this.CampusS.GetCollection().then((x) => {
      this.campus = x;
    });
    this.UserBusinessS.GetUser().then((x) => {
      this.user_id = x;
    });
    this.onChanges();
  }

  saveCampus(e): void {
    var localidentify = this.campus.find((item) => item.name == e);
    if (localidentify) {
      this.campus_id = localidentify.id;
    } else {
      this.campus_id = null;
      this.toastService.warning('', 'Selecciona una Sede de la Lista');
    }
  }
  savePavilion(e): void {
    var localidentify = this.pavilion.find((item) => item.name == e);
    if (localidentify) {
      this.pavilion_id = localidentify.id;
    } else {
      this.pavilion_id = null;
      this.toastService.warning('', 'Selecciona un Pabellón de la Lista');
    }
  }

  //? Export PDF
  exportAsPDF(): void {
    this.ReportCensusS.ExportCensus(this.form.controls.campus_id.value, {
      flat_id: this.form.controls.flat_id.value,
      pavilion_id: this.form.controls.pavilion_id.value,
      campus_id: this.form.controls.campus_id.value,
      initial_report: this.form.controls.initial_report.value,
      final_report: this.form.controls.final_report.value,
    }).then(x => {
      this.toastService.success('', x.message);
      window.open(x.url);
    }).catch(x => {
      this.isSubmitted = false;
    });
  }

  //? Export Excel Parámetrizado
  exportAsXLSX(): void {
    if (!this.form.invalid) {
      this.ReportCensusS.GetExportCensus(this.form.controls.campus_id.value, {
        flat_id: this.form.controls.flat_id.value,
        pavilion_id: this.form.controls.pavilion_id.value,
        campus_id: this.form.controls.campus_id.value,
        initial_report: this.form.controls.initial_report.value,
        final_report: this.form.controls.final_report.value,
      },).then((x) => {
        if (x.length > 0) {
          this.ReportCensusS.exportAsExcelFile(x, 'reporte_censo_[' +
            this.form.controls.initial_report.value + ']_a_[' +
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

  onChanges() {
    //? Piso Por Sede
    this.form.get('campus_id').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.flat_category = [];
      } else {
        this.GetFlat(val).then();
      }
      this.form.patchValue({
        pavilion_id: '',
      });
    });

    //? Pabellón Por Piso
    this.form.get('flat_id').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.pavilion_category = [];
      } else {
        this.GetPavilion(val).then();
      }
      this.form.patchValue({
        pavilion_id: '',
      });
    });

    //? ID Pabellón
    this.form.get('pavilion_id').valueChanges.subscribe(val => {
      console.log(val);
    });
  }

  GetFlat(campus_id, job = false) {
    if (!campus_id || campus_id === '') return Promise.resolve(false);
    return this.FlatS.GetFlatByCampus(campus_id).then(x => {
      this.flat_category = x;
      return Promise.resolve(true);
    });
  }
  GetPavilion(flat_id, job = false) {
    if (!flat_id || flat_id === '') return Promise.resolve(false);
    return this.PavilionS.GetPavilionByFlat(flat_id).then(x => {
      this.pavilion_category = x;
      return Promise.resolve(true);
    });
  }
}
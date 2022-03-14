import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlossService } from '../../../../business-controller/gloss.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { PacMonitoringService } from '../../../../business-controller/pac-monitoring.service';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { ObjetionResponseService } from '../../../../business-controller/objetion-response.service';


@Component({
  selector: 'ngx-form-pad-complementary',
  templateUrl: './form-pad-complementary.component.html',
  styleUrls: ['./form-pad-complementary.component.scss'],
})
export class FormPadComplementaryComponent implements OnInit {
  @Input() title: string;
  @Input() data: any;
  @Input() admissions_id: any;

  // @Input() diagnosis: any;
  // @Input() profesionals: any;

  public form: FormGroup;
  public loading: boolean = true;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public objetion_type: any[];
  public repeated_initial: any[];
  public company: any[];
  public campus: any[];
  public objetion_code: any[];
  public received_by: any[];
  public assing_user: any[];
  public regime: any[];
  public today = null;
  public min_day = null;
  public factureValue: any = null;
  public objeted_value: any = null;
  public diagnosis: any[] = [];
  public profesionals: any[] = [];
  public diagnosis_id;
  public profesional_id;
  public loadAuxData = true;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private glossS: GlossService,
    private dialogService: NbDialogService,
    private pacMonitoringService: PacMonitoringService,
    private DiagnosisS: DiagnosisService,
    private objetionResponseS: ObjetionResponseService,
    private UserBS: UserBusinessService,
  ) {


  }

  async ngOnInit() {

    this.today = new Date();
    // this.today.setDate(this.today.getDate() - 2);
    this.today = this.today.toISOString().split('T')[0];

    console.log(this.data);

    if (!this.data) {
      this.data = {
        symptoms: '',
        respiratory_issues: '',
        covid_contact: '',
        application_date: '',
        authorization_pin: '',
        profesional_user_id: '',
        diagnosis_id: '',
        reception_hour: '',
        presentation_hour: '',
        acceptance_hour: '',
        offer_hour: '',
        start_consult_hour: '',
        finish_consult_hour: '',
        close_date: '',
        close_crm_hour: '',
        copay_value: '',
      };
    }
    this.loadForm(false).then();
    await Promise.all([
      this.GetAuxData(),
    ]);
    this.loadAuxData = false;
    this.loadForm();
    // await this.DiagnosisS.GetCollection().then(x => {
    //   this.diagnosis = x;
    // });
    // await this.UserBS.UserByRole(1).then(x => {
    //   this.profesionals = x;
    //   this.loading = false;
    // });

    // await this.DiagnosisS.GetCollection().then(x => {
    //   this.diagnosis = x;
    // });

    // await this.UserBS.UserByRole(1).then(x => {
    //   this.profesionals = x;
    //   this.loading = false;
    // });
    // this.loadForm(false).then();
    // this.loading = false
  }

  async GetAuxData() {
    await this.DiagnosisS.GetCollection().then(x => {
      this.diagnosis = x;
    });

    await this.UserBS.UserByRole(1).then(x => {
      this.profesionals = x;
      this.loading = false;
    });
    return Promise.resolve(true);
  }

  // GetDiagnosis(Diagnosis_id) {
  //   if (!Diagnosis_id || Diagnosis_id === '') return Promise.resolve(false);

  //   return this.DiagnosisS.GetCollection().then(x => {
  //     this.diagnosis = x;
  //     return Promise.resolve(true);
  //   });
  // }

  // GetProfesions(profesional_id, job = false) {
  //   if (!profesional_id || profesional_id === '') return Promise.resolve(false);

  //   return this.UserBS.UserByRole(1).then(x => {
  //     this.profesionals = x;
  //     return Promise.resolve(true);
  //   });
  // }


  async loadForm(force = true) {
    if (this.loadAuxData && force) return false;
    // if (this.data) {
    //   // const promises = [
    //   //   this.GetDiagnosis(this.data.pac_monitoring[0].diagnosis_id),
    //   //   this.GetProfesions(this.data.pac_monitoring[0].profesional_user_id),
    //   // ]

    //   await Promise.all(promises);
    // }

    this.form = this.formBuilder.group({
      symptoms:
        [
          this.data.symptoms == '' ? '' : this.data.reason_consultation.length > 0 ? this.data.reason_consultation[0].symptoms : '',
          Validators.compose([Validators.required])
        ],
      respiratory_issues:
        [
          this.data.respiratory_issues == '' ? false : this.data.reason_consultation.length > 0 ? this.data.reason_consultation[0].respiratory_issues : false,
          Validators.compose([Validators.required])
        ],
      covid_contact: [
        this.data.covid_contact == '' ? false : this.data.reason_consultation.length > 0 ? this.data.reason_consultation[0].covid_contact : false,
        Validators.compose([Validators.required])
      ],
      application_date: [
        this.data.application_date == '' ? '' : this.data.pac_monitoring.length > 0 ? this.data.pac_monitoring[0].application_date : '',
        Validators.compose([Validators.required])

      ],
      authorization_pin: [
        this.data.authorization_pin == '' ? '' : this.data.pac_monitoring.length > 0 ? this.data.pac_monitoring[0].authorization_pin : '',
        // Validators.compose([Validators.required])

      ],
      profesional_user_id: [
        this.data.profesional_user_id == '' ? '' : this.data.pac_monitoring.length > 0 ? this.returnInputSearch(this.data.pac_monitoring[0].profesional_user_id) : '',
        // Validators.compose([Validators.required])
        // 
      ],
      diagnosis_id: [
        this.data.diagnosis_id == '' ? '' : this.data.pac_monitoring.length > 0 ? this.returnInputSearch(this.data.pac_monitoring[0].diagnosis_id, 1) : '',
        // Validators.compose([Validators.required])
      ],
      reception_hour: [
        this.data.reception_hour == '' ? '' : this.data.pac_monitoring.length > 0 ? this.data.pac_monitoring[0].reception_hour : '',
        // Validators.compose([Validators.required])

      ],
      presentation_hour: [
        this.data.presentation_hour == '' ? '' : this.data.pac_monitoring.length > 0 ? this.data.pac_monitoring[0].presentation_hour : '',
        // Validators.compose([Validators.required])

      ],
      acceptance_hour: [
        this.data.acceptance_hour == '' ? '' : this.data.pac_monitoring.length > 0 ? this.data.pac_monitoring[0].acceptance_hour : '',
        // Validators.compose([Validators.required])

      ],
      offer_hour: [
        this.data.offer_hour == '' ? '' : this.data.pac_monitoring.length > 0 ? this.data.pac_monitoring[0].offer_hour : '',
        // Validators.compose([Validators.required])
        // 
      ],
      start_consult_hour: [
        this.data.start_consult_hour == '' ? '' : this.data.pac_monitoring.length > 0 ? this.data.pac_monitoring[0].start_consult_hour : '',
        // Validators.compose([Validators.required])

      ],
      finish_consult_hour: [
        this.data.finish_consult_hour == '' ? '' : this.data.pac_monitoring.length > 0 ? this.data.pac_monitoring[0].finish_consult_hour : '',
        // Validators.compose([Validators.required])

      ],
      close_date: [
        this.data.close_date == '' ? '' : this.data.pac_monitoring.length > 0 ? this.data.pac_monitoring[0].close_date : '',
        // Validators.compose([Validators.required])

      ],
      close_crm_hour: [
        this.data.close_crm_hour == '' ? '' : this.data.pac_monitoring.length > 0 ? this.data.pac_monitoring[0].close_crm_hour : '',
        // Validators.compose([Validators.required])

      ],
      copay_value: [
        this.data.copay_value == '' ? '' : this.data.pac_monitoring.length > 0 ? this.data.pac_monitoring[0].copay_value : '',
        // Validators.compose([Validators.required])

      ],
    });

    this.onChanges();
  }

  close() {
    this.dialogRef.close();
  }

  saveCode(e, type_search): void {

    if (type_search) {
      var localidentify = this.diagnosis.find(item => item.name == e);

      if (localidentify) {
        this.diagnosis_id = localidentify.id;
      } else {
        this.diagnosis_id = null;
      }
    } else {
      var localidentify = this.profesionals.find(item => item.nombre_completo == e);

      if (localidentify) {
        this.profesional_id = localidentify.id;
      } else {
        this.profesional_id = null;
      }
    }
  }

  returnInputSearch(n, type_search?): Promise<string> {

    var localidentify;
    var name;
    if (type_search) {
      localidentify = this.diagnosis.find(item => item.id == n);
      if (localidentify) {
        // diagnosis_name = localidentify.name;
        this.diagnosis_id = localidentify.id;
        name = localidentify.name;
      } else {
        name = null;
      }

    } else {
      localidentify = this.profesionals.find(item => item.id == n);
      if (localidentify) {
        this.profesional_id = localidentify.id;
        name = localidentify.nombre_completo;
      } else {
        name = null;
      }
    }
    // var diagnosis_name;



    return name;
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (!this.data.id) {
        this.pacMonitoringService.Save({
          admissions_id: this.admissions_id,
          symptoms: this.form.controls.symptoms.value,
          respiratory_issues: this.form.controls.respiratory_issues.value === true ? true : false,
          covid_contact: this.form.controls.covid_contact.value === true ? true : false,
          application_date: this.form.controls.application_date.value,
          authorization_pin: this.form.controls.authorization_pin.value,
          profesional_user_id: this.profesional_id,
          diagnosis_id: this.diagnosis_id,
          reception_hour: this.form.controls.reception_hour.value,
          presentation_hour: this.form.controls.presentation_hour.value,
          acceptance_hour: this.form.controls.acceptance_hour.value,
          offer_hour: this.form.controls.offer_hour.value,
          start_consult_hour: this.form.controls.start_consult_hour.value,
          finish_consult_hour: this.form.controls.finish_consult_hour.value,
          close_date: this.form.controls.close_date.value,
          close_crm_hour: this.form.controls.close_crm_hour.value,
          copay_value: this.form.controls.copay_value.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.pacMonitoringService.Update({
          id: this.data.pac_monitoring[0].id,
          id_reason: this.data.reason_consultation[0].id,
          admissions_id: this.data.pac_monitoring[0].admissions_id,
          symptoms: this.form.controls.symptoms.value,
          respiratory_issues: this.form.controls.respiratory_issues.value === true ? true : false,
          covid_contact: this.form.controls.covid_contact.value === true ? true : false,
          application_date: this.form.controls.application_date.value,
          authorization_pin: this.form.controls.authorization_pin.value,
          profesional_user_id: this.profesional_id,
          diagnosis_id: this.diagnosis_id,
          reception_hour: this.form.controls.reception_hour.value,
          presentation_hour: this.form.controls.presentation_hour.value,
          acceptance_hour: this.form.controls.acceptance_hour.value,
          offer_hour: this.form.controls.offer_hour.value,
          start_consult_hour: this.form.controls.start_consult_hour.value,
          finish_consult_hour: this.form.controls.finish_consult_hour.value,
          close_date: this.form.controls.close_date.value,
          close_crm_hour: this.form.controls.close_crm_hour.value,
          copay_value: this.form.controls.copay_value.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }
    }
  }

  onChanges() {

    this.form.get('application_date').valueChanges.subscribe(val => {

      if (!this.form.controls.application_date.invalid) {
        this.min_day = this.form.controls.application_date.value;
      }
    });

    this.form.get('diagnosis_id').valueChanges.subscribe(val => { })
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChExternalCauseService } from '../../../../business-controller/ch-external-cause.service';
import { ChNotesDescriptionService } from '../../../../business-controller/ch-notes-description.service';
import { Ostomy } from '../../../../models/ostomy';
import { PatientPosition } from '../../../../models/patient-position';
import { OstomyService } from '../../../../business-controller/ostomy.service';
import { PatientPositionService } from '../../../../business-controller/patient-position.service';
import { OxygenTypeService } from '../../../../business-controller/oxygen_type.service';
import { LitersPerMinuteService } from '../../../../business-controller/liters_per_minute.service';



@Component({
  selector: 'ngx-form-notes-description',
  templateUrl: './form-notes-description.component.html',
  styleUrls: ['./form-notes-description.component.scss']
})
export class FormNotesDescriptionComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public ch_external_cause: any[];

  public ostomies: any[] = [];
  public patient_positions: any[] = [];
  public oxygen_type: any[] = [];
  public liters_per_minute: any[] = [];




  constructor(
    private formBuilder: FormBuilder,
    private ChNotesDescriptionS: ChNotesDescriptionService,
    private chexternalcauseS: ChExternalCauseService,
    private toastService: NbToastrService,
    private OxygenTypeS: OxygenTypeService,
    private LitersPerMinuteS: LitersPerMinuteService,
    private ostomyS: OstomyService,
    private patientPositionS: PatientPositionService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        patient_position_id: '',
        ostomy_id: '',
        hair_revision: '',
        has_oxigen: false,
        oxygen_type_id: '',
        liters_per_minute_id: '',
        change_position_id: '',
        patient_dry: '',
        unit_arrangement: '',
      };
    }

    this.ostomyS.GetCollection().then(x => {
      this.ostomies = x;
    });

    this.patientPositionS.GetCollection().then(x => {
      this.patient_positions = x;
    });

    // this.OxygenTypeS.GetCollection({ status_id: 1 }).then(x => {
    //   this.oxygen_type = x;
    // });
    // this.LitersPerMinuteS.GetCollection({ status_id: 1 }).then(x => {
    //   this.liters_per_minute = x;
    // });

    this.form = this.formBuilder.group({
      patient_position_id: [
        this.data[0] ? this.data[0].patient_position_id : this.data.patient_position_id,
        Validators.compose([Validators.required])
      ],
      ostomy_id: [
        this.data[0] ? this.data[0].ostomy_id : this.data.ostomy_id,
        Validators.compose([Validators.required])
      ],
      hair_revision: [
        this.data[0] ? this.data[0].hair_revision : this.data.hair_revision,
        Validators.compose([Validators.required])
      ],
      has_oxigen: [
        this.data[0] ? this.data[0].has_oxigen : this.data.has_oxigen,
      ],
      oxygen_type_id: [
        this.data[0] ? this.data[0].oxygen_type_id : this.data.oxygen_type_id
      ],
      liters_per_minute_id: [
        this.data[0] ? this.data[0].liters_per_minute_id : this.data.liters_per_minute_id
      ],
      change_position_id: [
        this.data[0] ? this.data[0].change_position_id : this.data.change_position_id,
        Validators.compose([Validators.required])
      ],
      patient_dry: [
        this.data[0] ? this.data[0].patient_dry : this.data.patient_dry,
        Validators.compose([Validators.required])
      ],
      unit_arrangement: [
        this.data[0] ? this.data[0].unit_arrangement : this.data.unit_arrangement,
        Validators.compose([Validators.required])
      ],

    });

    this.onChange();

    // if (this.data.reason_consultation != '') {
    //   this.form.controls.reason_consultation.disable();
    //   this.form.controls.current_illness.disable();
    //   this.form.controls.ch_external_cause_id.disable();
    //   this.disabled = true;
    // } else {
    //   this.form.controls.reason_consultation.enable();
    //   this.form.controls.current_illness.enable();
    //   this.form.controls.ch_external_cause_id.enable();
    //   this.disabled = false;
    // }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChNotesDescriptionS.Update({
          id: this.data.id,
          patient_position_id: this.form.controls.patient_position_id.value,
          ostomy_id: this.form.controls.ostomy_id.value,
          hair_revision: this.form.controls.hair_revision.value,
          has_oxigen: this.form.controls.has_oxigen.value,
          oxygen_type_id: this.form.controls.oxygen_type_id.value,
          liters_per_minute_id: this.form.controls.liters_per_minute_id.value,
          change_position_id: this.form.controls.change_position_id.value,
          patient_dry: this.form.controls.patient_dry.value,
          unit_arrangement: this.form.controls.unit_arrangement.value,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.ChNotesDescriptionS.Save({
          patient_position_id: this.form.controls.patient_position_id.value,
          ostomy_id: this.form.controls.ostomy_id.value,
          hair_revision: this.form.controls.hair_revision.value,
          has_oxigen: this.form.controls.has_oxigen.value,
          oxygen_type_id: this.form.controls.oxygen_type_id.value,
          liters_per_minute_id: this.form.controls.liters_per_minute_id.value,
          change_position_id: this.form.controls.change_position_id.value,
          patient_dry: this.form.controls.patient_dry.value,
          unit_arrangement: this.form.controls.unit_arrangement.value,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
            this.isSubmitted = true;
            this.loading = true;

        });
      }

    }
  }

  async onChange() {

    this.form.get('has_oxigen').valueChanges.subscribe(val => {
      if (val === false) {
        this.oxygen_type = [];
        this.liters_per_minute = [];

        this.form.controls.oxygen_type_id.clearValidators();
        this.form.controls.patient_position_id.setErrors(null);

        this.form.controls.liters_per_minute_id.clearValidators();
        this.form.controls.liters_per_minute_id.setErrors(null);
      } else {

        this.OxygenTypeS.GetCollection({ status_id: 1 }).then(x => {
          this.oxygen_type = x;
        });
        this.LitersPerMinuteS.GetCollection({ status_id: 1 }).then(x => {
          this.liters_per_minute = x;
        });
        this.form.controls.oxygen_type_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.liters_per_minute_id.setValidators(Validators.compose([Validators.required]));
        console.log('pone campos obligatorios')
      };

    });
  }

}

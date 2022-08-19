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
  @Input() is_pad: boolean = false;
  @Input() type_record: any = null;
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
        has_oxigen: false,
        patient_position_id: '',
        patient_dry: '',
        unit_arrangement: '',
      };
    }

    // this.ostomyS.GetCollection().then(x => {
    //   this.ostomies = x;
    // });

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
      has_oxigen: [
        this.data[0] ? this.data[0].has_oxigen : this.data.has_oxigen,
      ],
      patient_position_id: [
        this.data[0] ? this.data[0].patient_position_id : this.data.patient_position_id,
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
          patient_dry: this.form.controls.patient_dry.value,
          unit_arrangement: this.form.controls.unit_arrangement.value,
          type_record_id: this.type_record,
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
          patient_dry: this.form.controls.patient_dry.value,
          unit_arrangement: this.form.controls.unit_arrangement.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            patient_position_id: '',
            patient_dry: '',
            unit_arrangement: '',
          });

        }).catch(x => {
            this.isSubmitted = true;
            this.loading = true;

        });
      }

    }
  }
}

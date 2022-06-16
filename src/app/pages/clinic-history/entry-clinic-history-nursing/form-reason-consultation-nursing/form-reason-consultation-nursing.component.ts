import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { ChReasonConsultationService } from '../../../../business-controller/ch-reason-consultation.service';
// import { ChExternalCauseService } from '../../../../business-controller/ch-external-cause.service';
import { OstomyService } from '../../../../business-controller/ostomy.service';
// import { Ostomy } from '../../../../models/ostomy';
import { PatientPositionService } from '../../../../business-controller/patient-position.service';
// import { PatientPosition } from '../../../../models/patient-position';
// import { ChNursingEntry } from '../../../../models/ch-nursing-entry';
import { ChNursingEntryService } from '../../../../business-controller/ch-nursing-entry.service';



@Component({
  selector: 'ngx-form-reason-consultation-nursing',
  templateUrl: './form-reason-consultation-nursing.component.html',
  styleUrls: ['./form-reason-consultation-nursing.component.scss']
})
export class FormReasonConsultationNursingComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;

  public ostomies: any[]=[];
  public patient_positions: any[]=[];


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ostomyS: OstomyService,
    private patientPositionS: PatientPositionService,
    private chNursingEntryS: ChNursingEntryService,

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        patient_position_id: '',
        ostomy_id: '',
        observation: '',
        hair_revision:''
      };
    }

    this.ostomyS.GetCollection().then(x => {
      this.ostomies = x;
    });

    this.patientPositionS.GetCollection().then(x => {
      this.patient_positions = x;
    });



    this.form = this.formBuilder.group({
      patient_position_id: [
        this.data[0] ? this.data[0].patient_position_id : this.data.patient_position_id,
      ],
      ostomy_id: [
        this.data[0] ? this.data[0].ostomy_id : this.data.ostomy_id,
      ],
      observation: [
        this.data[0] ? this.data[0].observation : this.data.observation,
      ],
      hair_revision: [
        this.data[0] ? this.data[0].hair_revision : this.data.hair_revision,
      ],
    });
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
         this.chNursingEntryS.Update({
          id: this.data.id,
          patient_position_id: this.form.controls.patient_position_id.value,
          ostomy_id: this.form.controls.ostomy_id.value,
          observation: this.form.controls.observation.value,
          hair_revision: this.form.controls.hair_revision.value,
          type_record_id: 1,
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
         this.chNursingEntryS.Save({
          patient_position_id: this.form.controls.patient_position_id.value,
          ostomy_id: this.form.controls.ostomy_id.value,
          observation: this.form.controls.observation.value,
          hair_revision: this.form.controls.hair_revision.value,
          type_record_id: 1,
          ch_record_id: this.record_id,

        }).then(x => {
          this.toastService.success('', x.message);
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

}
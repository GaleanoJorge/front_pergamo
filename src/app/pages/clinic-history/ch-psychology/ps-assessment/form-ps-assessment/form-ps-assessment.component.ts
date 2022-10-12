import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserBusinessService } from '../../../../../business-controller/user-business.service';
import { PatientDataService } from '../../../../../business-controller/patient-data.service';
import { MunicipalityService } from '../../../../../business-controller/municipality.service';
import { PopulationGroupService } from '../../../../../business-controller/population-groups.service';
import { EthnicityService } from '../../../../../business-controller/ethnicity.service';
import { ChSwArmedConflictService } from '../../../../../business-controller/ch-sw-armed-conflict.service';
import { ChDiagnosisService } from '../../../../../business-controller/ch-diagnosis.service';
import { ChSwDiagnosisService } from '../../../../../business-controller/ch-sw-diagnosis.service';
import { RelationshipService } from '../../../../../business-controller/relationship.service';
import { ChPsEpisodesService } from '../../../../../business-controller/ch-ps-episodes.service';
import { ChPsAreasService } from '../../../../../business-controller/ch-ps-areas.service';
import { ChPsAssessmentService } from '../../../../../business-controller/ch-ps-assessment.service';


@Component({
  selector: 'ngx-form-ps-assessment',
  templateUrl: './form-ps-assessment.component.html',
  styleUrls: ['./form-ps-assessment.component.scss']
})
export class FormPsAssessmentComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: Boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() has_input: boolean = false;


  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public ch_diagnosis: any[];
  public diagnosis: any[] = [];
  public disabled: boolean = false;
  public municipality: any[] = [];
  public population: any[] = [];
  public ethnicity: any[] = [];
  public realtionships: any[] = [];
  public episodes: any[] = [];
  public areas: any[] = [];
  checked = false;
  public ch_diagnosis_id;


  constructor(
    // protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private userBS: UserBusinessService,
    // private statusBS: StatusBusinessService,
    private toastService: NbToastrService,
    private relationshipS: RelationshipService,
    private episodesS: ChPsEpisodesService,
    private areasS: ChPsAreasService,
    private assessmentS: ChPsAssessmentService,
  ) {
  }

  toggle(checked: boolean) {
    this.checked = checked;
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        patient:'',
        symptom:'',
        episodes_number:'',
        relationship_id:'',
        ch_ps_episodes_id:'',
        areas:[]

      };
    }

    this.relationshipS.GetCollection().then(x => {
      this.realtionships = x;
    });

    this.episodesS.GetCollection().then(x => {
      this.episodes = x;
    });

    this.areasS.GetCollection().then(x => {
      this.areas = x;
    });

    this.form = this.formBuilder.group({

      patient: [this.data[0] ? this.data[0].patient : this.data.patient, Validators.compose([Validators.required])],
      symptom: [this.data[0] ? this.data[0].symptom : this.data.symptom, Validators.compose([Validators.required])],
      episodes_number: [this.data[0] ? this.data[0].episodes_number : this.data.episodes_number, Validators.compose([Validators.required])],
      relationship_id: [this.data[0] ? this.data[0].relationship_id : this.data.relationship_id, Validators.compose([Validators.required])],
      ch_ps_episodes_id: [this.data[0] ? this.data[0].ch_ps_episodes_id : this.data.ch_ps_episodes_id, Validators.compose([Validators.required])],
      areas: [this.data[0] ? this.data[0].areas : this.data.areas, Validators.compose([Validators.required])],


    });

  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.assessmentS.Update({
          id: this.data.id,
          patient: this.form.controls.patient.value,
          symptom: this.form.controls.symptom.value,
          episodes_number: this.form.controls.episodes_number.value,
          relationship_id: this.form.controls.relationship_id.value,
          ch_ps_episodes_id: this.form.controls.ch_ps_episodes_id.value,
          areas: JSON.stringify(this.form.controls.areas.value),
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.assessmentS.Save({
          patient: this.form.controls.patient.value,
          symptom: this.form.controls.symptom.value,
          episodes_number: this.form.controls.episodes_number.value,
          relationship_id: this.form.controls.relationship_id.value,
          ch_ps_episodes_id: this.form.controls.ch_ps_episodes_id.value,
          areas: JSON.stringify(this.form.controls.areas.value),
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            patient:'',
            symptom:'',
            episodes_number:'',
            relationship_id:'',
            ch_ps_episodes_id:'',
            areas:[],
          });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    }
     else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }


  

  }


import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChPsAttitudeService } from '../../../../../business-controller/ch-ps-attitude.service';
import { ChPsAwarenessService } from '../../../../../business-controller/ch-ps-awareness.service';
import { ChPsFeedingService } from '../../../../../business-controller/ch-ps-exam-feeding.service';
import { ChPsExamOthersService } from '../../../../../business-controller/ch-ps-exam-others.service';
import { ChPsSexualityService } from '../../../../../business-controller/ch-ps-exam-sexuality.service';
import { ChPsExcretionService } from '../../../../../business-controller/ch-ps-excretion.service';
import { ChPsRelationshipService } from '../../../../../business-controller/ch-ps-relationship.service';
import { ChPsSleepService } from '../../../../../business-controller/ch-ps-sleep.service';
import { ChSwHygieneHousingService } from '../../../../../business-controller/ch-sw-hygiene-housing.service';


@Component({
  selector: 'ngx-form-ps-relationship',
  templateUrl: './form-ps-relationship.component.html',
  styleUrls: ['./form-ps-relationship.component.scss']
})
export class FormPsRelationshipComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Input() has_input: any = null;
  @Input() type_record_id: Boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public attitude: any[] = [];
  public awareness: any[] = [];
  public sleep: any[] = [];
  public others: any[] = [];
  public sexuality: any[] = [];
  public feeding: any[] = [];
  public excretion: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,    
    private attitudeS: ChPsAttitudeService,
    private awarenessS: ChPsAwarenessService,
    private sleepS: ChPsSleepService,
    private othersS: ChPsExamOthersService,
    private sexualityS: ChPsSexualityService,
    private feedingS: ChPsFeedingService,
    private excretionS: ChPsExcretionService,
    private relationshipS: ChPsRelationshipService,

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {

      position:'',
      self_care:'',
      visual:'',
      verbal:'',
      appearance:'',
      att_observations:'',
      aw_observations:'',
      sl_observations:'',
      sex_observations:'',
      fee_observations:'',
      ex_observations:'',
      attitude:[],
      ch_ps_awareness_id:'',
      ch_ps_sleep_id:'',
      exam_others:[],
      sexuality:[],
      feeding:[],
      excretion:[],

      };

      this.attitudeS.GetCollection().then(x => {
        this.attitude = x;
      });

      this.awarenessS.GetCollection().then(x => {
        this.awareness = x;
      });
  
      this.sleepS.GetCollection().then(x => {
        this.sleep = x;
      });

      this.othersS.GetCollection().then(x => {
        this.others = x;
      });
  
      this.sexualityS.GetCollection().then(x => {
        this.sexuality = x;
      });

      this.feedingS.GetCollection().then(x => {
        this.feeding = x;
      });
  
      this.excretionS.GetCollection().then(x => {
        this.excretion = x;
      });
  
    }

    this.form = this.formBuilder.group({

      position: [this.data[0] ? this.data[0].position : this.data.position, Validators.compose([Validators.required])],
      self_care: [this.data[0] ? this.data[0].self_care : this.data.self_care, Validators.compose([Validators.required])],
      visual: [this.data[0] ? this.data[0].visual : this.data.visual, Validators.compose([Validators.required])],
      verbal: [this.data[0] ? this.data[0].verbal : this.data.verbal, Validators.compose([Validators.required])],
      appearance: [this.data[0] ? this.data[0].appearance : this.data.appearance, Validators.compose([Validators.required])],
      att_observations: [this.data[0] ? this.data[0].att_observations : this.data.att_observations, Validators.compose([Validators.required])],
      aw_observations: [this.data[0] ? this.data[0].aw_observations : this.data.aw_observations, Validators.compose([Validators.required])],
      sl_observations: [this.data[0] ? this.data[0].sl_observations : this.data.sl_observations, Validators.compose([Validators.required])],
      sex_observations: [this.data[0] ? this.data[0].sex_observations : this.data.sex_observations, Validators.compose([Validators.required])],
      fee_observations: [this.data[0] ? this.data[0].fee_observations : this.data.fee_observations, Validators.compose([Validators.required])],
      ex_observations: [this.data[0] ? this.data[0].ex_observations : this.data.ex_observations, Validators.compose([Validators.required])],
      attitude: [this.data[0] ? this.data[0].attitude : this.data.attitude, Validators.compose([Validators.required])],
      ch_ps_awareness_id: [this.data[0] ? this.data[0].ch_ps_awareness_id : this.data.ch_ps_awareness_id, Validators.compose([Validators.required])],
      ch_ps_sleep_id: [this.data[0] ? this.data[0].ch_ps_sleep_id : this.data.ch_ps_sleep_id, Validators.compose([Validators.required])],
      exam_others: [this.data[0] ? this.data[0].exam_others : this.data.exam_others,],
      sexuality: [this.data[0] ? this.data[0].sexuality : this.data.sexuality, Validators.compose([Validators.required])],
      feeding: [this.data[0] ? this.data[0].feeding : this.data.feeding, Validators.compose([Validators.required])],
      excretion: [this.data[0] ? this.data[0].excretion : this.data.excretion, Validators.compose([Validators.required])],

    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.relationshipS.Update({
          id: this.data.id,
          position: this.form.controls.position.value,
          self_care: this.form.controls.self_care.value,
          visual: this.form.controls.visual.value,
          verbal: this.form.controls.verbal.value,
          appearance: this.form.controls.appearance.value,
          att_observations: this.form.controls.att_observations.value,
          aw_observations: this.form.controls.aw_observations.value,
          sl_observations: this.form.controls.sl_observations.value,
          sex_observations: this.form.controls.sex_observations.value,
          fee_observations: this.form.controls.fee_observations.value,
          ex_observations: this.form.controls.ex_observations.value,
          attitude: JSON.stringify (this.form.controls.attitude.value),
          ch_ps_awareness_id: this.form.controls.ch_ps_awareness_id.value,
          ch_ps_sleep_id: this.form.controls.ch_ps_sleep_id.value,
          exam_others: JSON.stringify (this.form.controls.exam_others.value),
          sexuality: JSON.stringify (this.form.controls.sexuality.value),
          feeding: JSON.stringify (this.form.controls.feeding.value),
          excretion: JSON.stringify (this.form.controls.excretion.value),
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          // this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.relationshipS.Save({
          position: this.form.controls.position.value,
          self_care: this.form.controls.self_care.value,
          visual: this.form.controls.visual.value,
          verbal: this.form.controls.verbal.value,
          appearance: this.form.controls.appearance.value,
          att_observations: this.form.controls.att_observations.value,
          aw_observations: this.form.controls.aw_observations.value,
          sl_observations: this.form.controls.sl_observations.value,
          sex_observations: this.form.controls.sex_observations.value,
          fee_observations: this.form.controls.fee_observations.value,
          ex_observations: this.form.controls.ex_observations.value,
          attitude: JSON.stringify (this.form.controls.attitude.value),
          ch_ps_awareness_id: this.form.controls.ch_ps_awareness_id.value,
          ch_ps_sleep_id: this.form.controls.ch_ps_sleep_id.value,
          exam_others: JSON.stringify (this.form.controls.exam_others.value),
          sexuality: JSON.stringify (this.form.controls.sexuality.value),
          feeding: JSON.stringify (this.form.controls.feeding.value),
          excretion: JSON.stringify (this.form.controls.excretion.value),
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            position:'',
            self_care:'',
            visual:'',
            verbal:'',
            appearance:'',
            att_observations:'',
            aw_observations:'',
            sl_observations:'',
            sex_observations:'',
            fee_observations:'',
            ex_observations:'',
            exam_others:[],
            attitude:[],
            ch_ps_awareness_id:'',
            ch_ps_sleep_id:'',
            sexuality:[],
            feeding:[],
            excretion:[]
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

  async onChange() {

    this.form.get('ch_ps_sleep_id').valueChanges.subscribe(val => {
      if (val != 9) {

        this.form.controls.exam_others.clearValidators();

        this.form.controls.exam_others.setErrors(null);

      } else {
        this.form.controls.exam_others.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ exam_others:''});

      };
    });

  

  }
}

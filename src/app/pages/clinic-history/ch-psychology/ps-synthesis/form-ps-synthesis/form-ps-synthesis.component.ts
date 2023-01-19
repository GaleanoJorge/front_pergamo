import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChPsIntelligenceService } from '../../../../../business-controller/ch-ps-intelligence.service';
import { ChPsIntrospectionService } from '../../../../../business-controller/ch-ps-introspection.service';
import { ChPsJudgmentService } from '../../../../../business-controller/ch-ps-judgment.service';
import { ChPsProspectingService } from '../../../../../business-controller/ch-ps-prospecting.service';
import { ChPsPsychomotricityService } from '../../../../../business-controller/ch-ps-psychomotricity.service';
import { ChPsSynthesisService } from '../../../../../business-controller/ch-ps-synthesis.service';


@Component({
  selector: 'ngx-form-ps-synthesis',
  templateUrl: './form-ps-synthesis.component.html',
  styleUrls: ['./form-ps-synthesis.component.scss']
})
export class FormPsSynthesisComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Input() type_record_id: Boolean = false;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;

  public psychomotricity: any[] = [];
  public introspection: any[] = [];
  public judgment: any[] = [];
  public prospecting: any[] = [];
  public intelligence: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,    
    private psychomotricityS: ChPsPsychomotricityService,    
    private introspectionS: ChPsIntrospectionService,    
    private judgmentS: ChPsJudgmentService,    
    private prospectingS: ChPsProspectingService,    
    private intelligenceS: ChPsIntelligenceService,    
    private synthesisS: ChPsSynthesisService,    

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {

       psychomotricity: [],
       observations_psy: '',
       introspection: [],
       observations_in: '',
       ch_ps_judgment_id: '',
       observations_jud: '',
       ch_ps_prospecting_id: '',
       observations_pros: '',
       ch_ps_intelligence_id: '',
       observations_inte: ''

      };
    }

    this.form = this.formBuilder.group({

      psychomotricity: [this.data[0] ? this.data[0].psychomotricity : this.data.psychomotricity, Validators.compose([Validators.required])],
      observations_psy: [this.data[0] ? this.data[0].observations_psy : this.data.observations_psy, Validators.compose([Validators.required])],
      introspection: [this.data[0] ? this.data[0].introspection : this.data.introspection, Validators.compose([Validators.required])],
      observations_in: [this.data[0] ? this.data[0].observations_in : this.data.observations_in, Validators.compose([Validators.required])],
      ch_ps_judgment_id: [this.data[0] ? this.data[0].ch_ps_judgment_id : this.data.ch_ps_judgment_id, Validators.compose([Validators.required])],
      observations_jud: [this.data[0] ? this.data[0].observations_jud : this.data.observations_jud, Validators.compose([Validators.required])],
      ch_ps_prospecting_id: [this.data[0] ? this.data[0].ch_ps_prospecting_id : this.data.ch_ps_prospecting_id, Validators.compose([Validators.required])],
      observations_pros: [this.data[0] ? this.data[0].observations_pros : this.data.observations_pros, Validators.compose([Validators.required])],
      ch_ps_intelligence_id: [this.data[0] ? this.data[0].ch_ps_intelligence_id : this.data.ch_ps_intelligence_id, Validators.compose([Validators.required])],
      observations_inte: [this.data[0] ? this.data[0].observations_inte : this.data.observations_inte, Validators.compose([Validators.required])],


    });

    this.psychomotricityS.GetCollection().then(x => {
      this.psychomotricity = x;
    });

    this.introspectionS.GetCollection().then(x => {
      this.introspection = x;
    });

    this.judgmentS.GetCollection().then(x => {
      this.judgment = x;
    });

    this.prospectingS.GetCollection().then(x => {
      this.prospecting = x;
    });

    this.intelligenceS.GetCollection().then(x => {
      this.intelligence = x;
    });

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.synthesisS.Update({
          id: this.data.id,
          psychomotricity: JSON.stringify (this.form.controls.psychomotricity.value),
          observations_psy: this.form.controls.observations_psy.value,
          introspection: JSON.stringify (this.form.controls.introspection.value),
          observations_in: this.form.controls.observations_in.value,
          ch_ps_judgment_id: this.form.controls.ch_ps_judgment_id.value,
          observations_jud: this.form.controls.observations_jud.value,
          ch_ps_prospecting_id: this.form.controls.ch_ps_prospecting_id.value,
          observations_pros: this.form.controls.observations_pros.value,
          ch_ps_intelligence_id: this.form.controls.ch_ps_intelligence_id.value,
          observations_inte: this.form.controls.observations_inte.value,
          type_record_id: 1,
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
        this.synthesisS.Save({
          psychomotricity: JSON.stringify (this.form.controls.psychomotricity.value),
          observations_psy: this.form.controls.observations_psy.value,
          introspection: JSON.stringify (this.form.controls.introspection.value),
          observations_in: this.form.controls.observations_in.value,
          ch_ps_judgment_id: this.form.controls.ch_ps_judgment_id.value,
          observations_jud: this.form.controls.observations_jud.value,
          ch_ps_prospecting_id: this.form.controls.ch_ps_prospecting_id.value,
          observations_pros: this.form.controls.observations_pros.value,
          ch_ps_intelligence_id: this.form.controls.ch_ps_intelligence_id.value,
          observations_inte: this.form.controls.observations_inte.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            psychomotricity: [],
            observations_psy: '',
            introspection: [],
            observations_in: '',
            ch_ps_judgment_id: '',
            observations_jud: '',
            ch_ps_prospecting_id: '',
            observations_pros: '',
            ch_ps_intelligence_id: '',
            observations_inte: '',
           });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }


}

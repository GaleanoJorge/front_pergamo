import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChPsAttentionService } from '../../../../../business-controller/ch-ps-attention.service';
import { ChPsIntellectiveService } from '../../../../../business-controller/ch-ps-intellective.service';
import { ChPsMemoryService } from '../../../../../business-controller/ch-ps-memory.service';
import { ChPsPerceptionService } from '../../../../../business-controller/ch-ps-perception.service';


@Component({
  selector: 'ngx-form-ps-intellective',
  templateUrl: './form-ps-intellective.component.html',
  styleUrls: ['./form-ps-intellective.component.scss']
})
export class FormPsIntellectiveComponent implements OnInit {

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
  public attention: any[] = [];
  public awareness: any[] = [];
  public memory: any[] = [];
  public perception: any[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService, 
    private attentionS: ChPsAttentionService, 
    private memoryS: ChPsMemoryService, 
    private perceptionS: ChPsPerceptionService, 

    private intellectiveS: ChPsIntellectiveService,

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {

      memory:[],
      att_observations:'',
      me_observations:'',
      perception:[],
      per_observations:'',
      ch_ps_attention_id:'',
      autopsychic:'',
      allopsychic:'',
      space:'',

      };

      this.attentionS.GetCollection().then(x => {
        this.attention = x;
      });

      this.memoryS.GetCollection().then(x => {
        this.memory = x;
      });
  
      this.perceptionS.GetCollection().then(x => {
        this.perception = x;
      });

  
    }

    this.form = this.formBuilder.group({

      memory: [this.data[0] ? this.data[0].memory : this.data.memory, Validators.compose([Validators.required])],
      att_observations: [this.data[0] ? this.data[0].att_observations : this.data.att_observations, Validators.compose([Validators.required])],
      me_observations: [this.data[0] ? this.data[0].me_observations : this.data.me_observations, Validators.compose([Validators.required])],
      perception: [this.data[0] ? this.data[0].perception : this.data.perception, Validators.compose([Validators.required])],
      per_observations: [this.data[0] ? this.data[0].per_observations : this.data.per_observations, Validators.compose([Validators.required])],
      ch_ps_attention_id: [this.data[0] ? this.data[0].ch_ps_attention_id : this.data.ch_ps_attention_id, Validators.compose([Validators.required])],
      autopsychic: [this.data[0] ? this.data[0].autopsychic : this.data.autopsychic, Validators.compose([Validators.required])],
      allopsychic: [this.data[0] ? this.data[0].allopsychic : this.data.allopsychic, Validators.compose([Validators.required])],
      space: [this.data[0] ? this.data[0].space : this.data.space, Validators.compose([Validators.required])],
    
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.intellectiveS.Update({
          id: this.data.id,
          memory: JSON.stringify (this.form.controls.memory.value),
          att_observations: this.form.controls.att_observations.value,
          me_observations: this.form.controls.me_observations.value,
          perception: JSON.stringify (this.form.controls.perception.value),
          per_observations: this.form.controls.per_observations.value,
          ch_ps_attention_id: this.form.controls.ch_ps_attention_id.value,
          autopsychic: this.form.controls.autopsychic.value,
          allopsychic: this.form.controls.allopsychic.value,
          space: this.form.controls.space.value,
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
        this.intellectiveS.Save({
          memory: JSON.stringify (this.form.controls.memory.value),
          att_observations: this.form.controls.att_observations.value,
          me_observations: this.form.controls.me_observations.value,
          perception: JSON.stringify (this.form.controls.perception.value),
          per_observations: this.form.controls.per_observations.value,
          ch_ps_attention_id: this.form.controls.ch_ps_attention_id.value,
          autopsychic: this.form.controls.autopsychic.value,
          allopsychic: this.form.controls.allopsychic.value,
          space: this.form.controls.space.value,

          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            memory:[],
            att_observations:'',
            me_observations:'',
            perception:[],
            per_observations:'',
            ch_ps_attention_id:'',
            autopsychic:'',
            allopsychic:'',
            space:''
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChSwCommunicationsService } from '../../../../../business-controller/ch-sw-communication.service';
import { ChSwExpressionService } from '../../../../../business-controller/ch-sw-expression.service';
import { ChSwFamilyDynamicsService } from '../../../../../business-controller/ch-sw-family-dynamics.service';
import { ChSwFamilyService } from '../../../../../business-controller/ch-sw-family.service';



@Component({
  selector: 'ngx-form-sw-family-dynamics',
  templateUrl: './form-sw-family-dynamics.component.html',
  styleUrls: ['./form-sw-family-dynamics.component.scss']
})
export class FormSwFamilyDynamicsComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public diagnosis: any[] = [];
  public communication: any[] = [];
  public expression: any[] = [];
  public decisions: any[] = [];
  public authority: any[] = [];
  public disabled: boolean = false;
  checked = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private communicationS: ChSwCommunicationsService,
    private expressionS: ChSwExpressionService,
    private dimanicS: ChSwFamilyDynamicsService,
    private familyS: ChSwFamilyService,

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {
       
        observations: '',
        // decisions: '',
        // authority: '',
        ch_sw_communications_id:'',
        ch_sw_expression_id: '',
        decisions_id:'',
        authority_id:''
      };
    }

    this.form = this.formBuilder.group({

      ch_sw_communications_id: [this.data[0] ? this.data[0].ch_sw_communications_id : this.data.ch_sw_communications_id, Validators.compose([Validators.required])],
      ch_sw_expression_id: [this.data[0] ? this.data[0].ch_sw_expression_id : this.data.ch_sw_expression_id, Validators.compose([Validators.required])],
      decisions_id: [this.data[0] ? this.data[0].ch_sw_expression_id : this.data.ch_sw_expression_id, Validators.compose([Validators.required])],
      authority_id: [this.data[0] ? this.data[0].ch_sw_expression_id : this.data.ch_sw_expression_id, Validators.compose([Validators.required])],
      observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
   
    });
    this.communicationS.GetCollection().then(x => {
      this.communication = x;
    });

    this.expressionS.GetCollection().then(x => {
      this.expression = x;
    });

    this.familyS.GetCollection().then(x => {
      this.decisions = x;
    });

    this.familyS.GetCollection().then(x => {
      this.authority = x;
    });
  
  }
    
  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.dimanicS.Update({
          id: this.data.id,
          ch_sw_communications_id: this.form.controls.ch_sw_communications_id.value,
          ch_sw_expression_id: this.form.controls.ch_sw_expression_id.value,
          observations: this.form.controls.observations.value,
          decisions_id: this.form.controls.decisions_id.value,
          authority_id: this.form.controls.authority_id.value,
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
        this.dimanicS.Save({
          // decisions: this.form.controls.decisions.value,
          // authority: this.form.controls.authority.value,
          ch_sw_communications_id: this.form.controls.ch_sw_communications_id.value,
          ch_sw_expression_id: this.form.controls.ch_sw_expression_id.value,
          observations: this.form.controls.observations.value,
          decisions_id: this.form.controls.decisions_id.value,
          authority_id: this.form.controls.authority_id.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ ch_sw_communications_id:[], ch_sw_expression_id: [],  observations:'', decisions_id:[],
          authority_id: []});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    }else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

  
}

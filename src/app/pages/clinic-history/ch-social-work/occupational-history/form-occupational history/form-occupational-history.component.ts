import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChSwAtivitiesService } from '../../../../../business-controller/ch-sw-activities.service';
import { ChSwHoursService } from '../../../../../business-controller/ch-sw-hours.service';
import { ChSwOccupationService } from '../../../../../business-controller/ch-sw-occupation.service';
import { ChSwOccupationalHistoryService } from '../../../../../business-controller/ch-sw-occupational-history.service';
import { ChSwSeniorityService } from '../../../../../business-controller/ch-sw-seniority.service';
import { ChSwTurnService } from '../../../../../business-controller/ch-sw-turn.service';


@Component({
  selector: 'ngx-form-occupational-history',
  templateUrl: './form-occupational-history.component.html',
  styleUrls: ['./form-occupational-history.component.scss']
})
export class FormOccupationalHistoryComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Input() type_record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public diagnosis: any[] = [];
  public disabled: boolean = false;
  public activities: any[] = [];
  public occupation: any[] = [];
  public seniority: any[] = [];
  public hours: any[] = [];
  public turn: any[] = [];
  checked = false;
  public ch_activities: any[];


  constructor(
    // protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,    
    private activitiesS: ChSwAtivitiesService,   
    private ocupationS: ChSwOccupationService,   
    private seniorityS: ChSwSeniorityService,   
    private hoursS: ChSwHoursService,   
    private turnS: ChSwTurnService,   
    private occupationalS: ChSwOccupationalHistoryService,   
  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {
        ch_sw_occupation_id: '',
        ch_sw_seniority_id: '',
        ch_sw_hours_id: '',
        ch_sw_turn_id: '',
        observations: '',
        ch_activities: [],
      };
    }

    this.form = this.formBuilder.group({

      ch_activities: [[this.data],Validators.compose([Validators.required])],
      ch_sw_occupation_id: [this.data[0] ? this.data[0].ch_sw_occupation_id : this.data.ch_sw_occupation_id, Validators.compose([Validators.required])],
      ch_sw_seniority_id: [this.data[0] ? this.data[0].ch_sw_seniority_id : this.data.ch_sw_seniority_id,],
      ch_sw_hours_id: [this.data[0] ? this.data[0].ch_sw_hours_id : this.data.ch_sw_hours_id,],
      ch_sw_turn_id: [this.data[0] ? this.data[0].ch_sw_turn_id : this.data.ch_sw_turn_id,],
      observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
   
    });
    this.activitiesS.GetCollection().then(x => {
      this.activities = x;
    });

    this.ocupationS.GetCollection().then(x => {
      this.occupation = x;
    });
   
    this.seniorityS.GetCollection().then(x => {
      this.seniority = x;
    });

    this.hoursS.GetCollection().then(x => {
      this.hours = x;
    });

    this.turnS.GetCollection().then(x => {
      this.turn = x;
    });


    this.onChange();  

  }
  

  
  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.occupationalS.Update({
          id: this.data.id,
          ch_activities: this.form.controls.ch_activities.value,
          ch_sw_occupation_id: this.form.controls.ch_sw_occupation_id.value,
          ch_sw_seniority_id: this.form.controls.ch_sw_seniority_id.value,
          ch_sw_hours_id: this.form.controls.ch_sw_hours_id.value,
          ch_sw_turn_id: this.form.controls.ch_sw_turn_id.value,
          observations: this.form.controls.observations.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.patchValue({ ch_activities:'', ch_sw_occupation_id: '', ch_sw_seniority_id:'', ch_sw_hours_id:'',
          ch_sw_turn_id:'', observations:''});
          // this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.occupationalS.Save({
          ch_activities: this.form.controls.ch_activities.value,
          ch_sw_occupation_id: this.form.controls.ch_sw_occupation_id.value,
          ch_sw_seniority_id: this.form.controls.ch_sw_seniority_id.value,
          ch_sw_hours_id: this.form.controls.ch_sw_hours_id.value,
          ch_sw_turn_id: this.form.controls.ch_sw_turn_id.value,
          observations: this.form.controls.observations.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ 
            ch_sw_occupation_id: '',
            ch_sw_seniority_id: '',
            ch_sw_hours_id: '',
            ch_sw_turn_id: '',
            observations: '',
            ch_activities: [],});
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
  
  async onChange() {

    this.form.get('ch_sw_occupation_id').valueChanges.subscribe(val => {
      if (val === 1) {
        
        this.form.controls.ch_sw_seniority_id.clearValidators();
        this.form.controls.ch_sw_hours_id.clearValidators();
        this.form.controls.ch_sw_turn_id.clearValidators();
        this.form.controls.observations.clearValidators();
        
        this.form.controls.ch_sw_seniority_id.setErrors(null);        
        this.form.controls.ch_sw_hours_id.setErrors(null);        
        this.form.controls.ch_sw_turn_id.setErrors(null);        
        this.form.controls.observations.setErrors(null);      
                
        this.form.patchValue({ ch_sw_seniority_id:'', ch_sw_hours_id: '', ch_sw_turn_id:'', observations:''});
                
        this.form.controls.ch_sw_seniority_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.ch_sw_hours_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.ch_sw_turn_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.observations.setValidators(Validators.compose([Validators.required]));   

      } else if (val === 2) {

        this.form.controls.ch_sw_hours_id.clearValidators();
        this.form.controls.ch_sw_turn_id.clearValidators();
        this.form.controls.observations.clearValidators();
        
        this.form.controls.ch_sw_hours_id.setErrors(null);        
        this.form.controls.ch_sw_turn_id.setErrors(null);        
        this.form.controls.observations.setErrors(null);       
        
        this.form.patchValue({ ch_sw_hours_id:'', ch_sw_turn_id: '', observations:''});

        this.form.controls.ch_sw_hours_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.ch_sw_turn_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.observations.setValidators(Validators.compose([Validators.required]));

      } else if (val === 3) {

        this.form.controls.observations.clearValidators();
        this.form.controls.observations.setErrors(null);  
        this.form.patchValue({ observations:''});

        this.form.controls.observations.setValidators(Validators.compose([Validators.required]));

      } else if (val === 4) {

        this.form.controls.ch_sw_seniority_id.clearValidators();
        this.form.controls.ch_sw_hours_id.clearValidators();
        this.form.controls.ch_sw_turn_id.clearValidators();
        this.form.controls.observations.clearValidators();

        this.form.controls.ch_sw_seniority_id.setErrors(null);
        this.form.controls.ch_sw_hours_id.setErrors(null);
        this.form.controls.ch_sw_turn_id.setErrors(null);
        this.form.controls.observations.setErrors(null);

        this.form.patchValue({ch_sw_seniority_id:'', ch_sw_hours_id:'',
        ch_sw_turn_id:'', observations:''});

        this.form.controls.observations.setValidators(Validators.compose([Validators.required]));

      };
    });
  }
 
}

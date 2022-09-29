import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChPsParaphasiasService } from '../../../../../business-controller/ch_ps_paraphasias.service';
import { ChPsComprehensiveService } from '../../../../../business-controller/ch_ps_comprehensive.service';
import { ChPsOthersService } from '../../../../../business-controller/ch_ps_others.service';
import { ChPsLanguageService } from '../../../../../business-controller/ch-ps-language.service';
import { UserBusinessService } from '../../../../../business-controller/user-business.service';
import { ChPsExpressiveService } from '../../../../../business-controller/ch_ps_expressive.service';
import { ChPsSadnessService } from '../../../../../business-controller/ch-ps-sadness.service';
import { ChPsJoyService } from '../../../../../business-controller/ch-ps-joy.service';
import { ChPsFearService } from '../../../../../business-controller/ch-ps-fear.service';
import { ChPsAngerService } from '../../../../../business-controller/ch-ps-anger.service';
import { ChPsInsufficiencyService } from '../../../../../business-controller/ch-ps-insufficiency.service';
import { ChPsSeveralService } from '../../../../../business-controller/ch-ps-several.service';
import { ChPsSphere } from '../../../../../models/ch-ps-sphere';
import { ChPsSphereService } from '../../../../../business-controller/ch_ps_sphere.service';


@Component({
  selector: 'ngx-form-ps-sphere',
  templateUrl: './form-ps-sphere.component.html',
  styleUrls: ['./form-ps-sphere.component.scss']
})
export class FormPsSphereComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: Boolean = false;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();


  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public sadness: any[] = [];
  public joy: any[] = [];
  public fear: any[] = [];
  public anger: any[] = [];
  public insufficiency: any[] = [];
  public several: any[] = [];
  checked = false;


  constructor(
    // protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private userBS: UserBusinessService,
    // private statusBS: StatusBusinessService,
    private toastService: NbToastrService,
    private sadnessS: ChPsSadnessService,
    private joyS: ChPsJoyService,
    private fearS: ChPsFearService,
    private angerS: ChPsAngerService,
    private insufficiencyS: ChPsInsufficiencyService,
    private severalS: ChPsSeveralService,
    private sphereS: ChPsSphereService,
  ) {
  }

  toggle(checked: boolean) {
    this.checked = checked;
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        euthymia: '',
        ch_ps_sadness_id: '',
        ch_ps_joy_id: '',
        ch_ps_fear_id: '',
        ch_ps_anger_id: '',
        ch_ps_insufficiency_id: '',
        ch_ps_several_id: '',
        observations: '',

      };
    }

    this.sadnessS.GetCollection().then(x => {
      this.sadness = x;
    });

    this.joyS.GetCollection().then(x => {
      this.joy = x;
    });

    this.fearS.GetCollection().then(x => {
      this.fear = x;
    });

    this.angerS.GetCollection().then(x => {
      this.anger = x;
    });

    this.insufficiencyS.GetCollection().then(x => {
      this.insufficiency = x;
    });

    this.severalS.GetCollection().then(x => {
      this.several = x;
    });


    this.form = this.formBuilder.group({

      euthymia: [this.data[0] ? this.data[0].euthymia : this.data.euthymia, Validators.compose([Validators.required])],
      ch_ps_sadness_id: [this.data[0] ? this.data[0].ch_ps_sadness_id : this.data.ch_ps_sadness_id,],
      ch_ps_joy_id: [this.data[0] ? this.data[0].ch_ps_joy_id : this.data.ch_ps_joy_id,],
      ch_ps_fear_id: [this.data[0] ? this.data[0].ch_ps_fear_id : this.data.ch_ps_fear_id,],
      ch_ps_anger_id: [this.data[0] ? this.data[0].ch_ps_anger_id : this.data.ch_ps_anger_id,],
      ch_ps_insufficiency_id: [this.data[0] ? this.data[0].ch_ps_insufficiency_id : this.data.ch_ps_insufficiency_id,],
      ch_ps_several_id: [this.data[0] ? this.data[0].ch_ps_several_id : this.data.ch_ps_several_id,],
      observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
     

    });

  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.sphereS.Update({
          id: this.data.id,
          euthymia: this.form.controls.euthymia.value,
          observations: this.form.controls.observations.value,
          ch_ps_sadness_id: this.form.controls.ch_ps_sadness_id.value,
          ch_ps_joy_id: this.form.controls.ch_ps_joy_id.value,
          ch_ps_fear_id: this.form.controls.ch_ps_fear_id.value,
          ch_ps_anger_id: this.form.controls.ch_ps_anger_id.value,
          ch_ps_insufficiency_id: this.form.controls.ch_ps_insufficiency_id.value,
          ch_ps_several_id: this.form.controls.ch_ps_several_id.value,
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
        this.sphereS.Save({
          euthymia: this.form.controls.euthymia.value,
          observations: this.form.controls.observations.value,
          ch_ps_sadness_id: this.form.controls.ch_ps_sadness_id.value,
          ch_ps_joy_id: this.form.controls.ch_ps_joy_id.value,
          ch_ps_fear_id: this.form.controls.ch_ps_fear_id.value,
          ch_ps_anger_id: this.form.controls.ch_ps_anger_id.value,
          ch_ps_insufficiency_id: this.form.controls.ch_ps_insufficiency_id.value,
          ch_ps_several_id: this.form.controls.ch_ps_several_id.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            euthymia:'',
            observations:'',
            ch_ps_sadness_id:'',
            ch_ps_joy_id:'',
            ch_ps_fear_id:'',
            ch_ps_anger_id:'',
            ch_ps_insufficiency_id:'',
            ch_ps_several_id:'',
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

    this.form.get('euthymia').valueChanges.subscribe(val => {
      if (val != 1) {

        this.form.controls.ch_ps_sadness_id.clearValidators();
        this.form.controls.ch_ps_joy_id.clearValidators();
        this.form.controls.ch_ps_fear_id.clearValidators();
        this.form.controls.ch_ps_anger_id.clearValidators();
        this.form.controls.ch_ps_insufficiency_id.clearValidators();
        this.form.controls.ch_ps_several_id.clearValidators();

        this.form.controls.ch_ps_sadness_id.setErrors(null);
        this.form.controls.ch_ps_joy_id.setErrors(null);
        this.form.controls.ch_ps_fear_id.setErrors(null);
        this.form.controls.ch_ps_anger_id.setErrors(null);
        this.form.controls.ch_ps_insufficiency_id.setErrors(null);
        this.form.controls.ch_ps_several_id.setErrors(null);

      } else {
        this.form.controls.ch_ps_sadness_id.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ ch_ps_sadness_id:''});
        this.form.controls.ch_ps_joy_id.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ ch_ps_joy_id:''});
        this.form.controls.ch_ps_fear_id.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ ch_ps_fear_id:''});
        this.form.controls.ch_ps_anger_id.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ ch_ps_anger_id:''});
        this.form.controls.ch_ps_insufficiency_id.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ ch_ps_insufficiency_id:''});
        this.form.controls.ch_ps_several_id.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ ch_ps_several_id:''});

      };
    });

  

  }

}


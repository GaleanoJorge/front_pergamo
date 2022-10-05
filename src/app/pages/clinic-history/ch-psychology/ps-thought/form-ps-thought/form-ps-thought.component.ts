import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserBusinessService } from '../../../../../business-controller/user-business.service';
import { ChPsSpeedService } from '../../../../../business-controller/ch-ps-speed.service';
import { ChPsDelusionalService } from '../../../../../business-controller/ch-ps-delusional.service';
import { ChPsOverratedService } from '../../../../../business-controller/ch-ps-overrated.service';
import { ChPsObsessiveService } from '../../../../../business-controller/ch-ps-obsessive.service';
import { ChPsAssociationService } from '../../../../../business-controller/ch_ps_association.service';
import { ChPsThoughtService } from '../../../../../business-controller/ch_ps_thought.service';


@Component({
  selector: 'ngx-form-ps-thought',
  templateUrl: './form-ps-thought.component.html',
  styleUrls: ['./form-ps-thought.component.scss']
})
export class FormPsThoughtComponent implements OnInit {

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
  public disabled: boolean = false;
  public speed: any[] = [];
  public delusional: any[] = [];
  public overrated: any[] = [];
  public obsessive: any[] = [];
  public association: any[] = [];
  public thought: any[] = [];
  checked = false;


  constructor(
    // protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private userBS: UserBusinessService,
    // private statusBS: StatusBusinessService,
    private toastService: NbToastrService,
    private speedS: ChPsSpeedService,
    private delusionalS: ChPsDelusionalService,
    private overratedS: ChPsOverratedService,
    private obsessiveS: ChPsObsessiveService,
    private associationS: ChPsAssociationService,
    private thoughtS: ChPsThoughtService,
  ) {
  }

  toggle(checked: boolean) {
    this.checked = checked;
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        grade: '',
        contents: '',
        prevalent: '',
        observations: '',
        ch_ps_speed_id: '',
        ch_ps_delusional_id: '',
        ch_ps_overrated_id: '',
        ch_ps_obsessive_id: '',
        ch_ps_association_id: '',

      };
    }

    this.speedS.GetCollection().then(x => {
      this.speed = x;
    });

    this.delusionalS.GetCollection().then(x => {
      this.delusional = x;
    });

    this.overratedS.GetCollection().then(x => {
      this.overrated = x;
    });

    this.obsessiveS.GetCollection().then(x => {
      this.obsessive = x;
    });

    this.associationS.GetCollection().then(x => {
      this.association = x;
    });

    this.form = this.formBuilder.group({

      grade: [this.data[0] ? this.data[0].grade : this.data.grade, Validators.compose([Validators.required])],
      contents: [this.data[0] ? this.data[0].contents : this.data.contents, Validators.compose([Validators.required])],
      prevalent: [this.data[0] ? this.data[0].prevalent : this.data.prevalent,],
      observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
      ch_ps_speed_id: [this.data[0] ? this.data[0].ch_ps_speed_id : this.data.ch_ps_speed_id,],
      ch_ps_delusional_id: [this.data[0] ? this.data[0].ch_ps_delusional_id : this.data.ch_ps_delusional_id,],
      ch_ps_overrated_id: [this.data[0] ? this.data[0].ch_ps_overrated_id : this.data.ch_ps_overrated_id,],
      ch_ps_obsessive_id: [this.data[0] ? this.data[0].ch_ps_obsessive_id : this.data.ch_ps_obsessive_id,],
      ch_ps_association_id: [this.data[0] ? this.data[0].ch_ps_association_id : this.data.ch_ps_association_id,],


    });

    this.onChange();

  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.thoughtS.Update({
          id: this.data.id,
          grade: this.form.controls.grade.value,
          contents: this.form.controls.contents.value,
          prevalent: this.form.controls.prevalent.value,
          observations: this.form.controls.observations.value,
          ch_ps_speed_id: this.form.controls.ch_ps_speed_id.value,
          ch_ps_delusional_id: this.form.controls.ch_ps_delusional_id.value,
          ch_ps_overrated_id: this.form.controls.ch_ps_overrated_id.value,
          ch_ps_obsessive_id: this.form.controls.ch_ps_obsessive_id.value,
          ch_ps_association_id: this.form.controls.ch_ps_association_id.value,
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
        this.thoughtS.Save({
          grade: this.form.controls.grade.value,
          contents: this.form.controls.contents.value,
          prevalent: this.form.controls.prevalent.value,
          observations: this.form.controls.observations.value,
          ch_ps_speed_id: this.form.controls.ch_ps_speed_id.value,
          ch_ps_delusional_id: this.form.controls.ch_ps_delusional_id.value,
          ch_ps_overrated_id: this.form.controls.ch_ps_overrated_id.value,
          ch_ps_obsessive_id: this.form.controls.ch_ps_obsessive_id.value,
          ch_ps_association_id: this.form.controls.ch_ps_association_id.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            grade:'',
            contents:'',
            prevalent:'',
            observations:'',
            ch_ps_speed_id:'',
            ch_ps_delusional_id:'',
            ch_ps_overrated_id:'',
            ch_ps_obsessive_id:'',
            ch_ps_association_id:''
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

    this.form.get('grade').valueChanges.subscribe(val => {
      if (val != 'Alterado') {

        this.form.controls.ch_ps_speed_id.clearValidators();
        this.form.controls.ch_ps_association_id.clearValidators();

        this.form.controls.ch_ps_speed_id.setErrors(null);
        this.form.controls.ch_ps_association_id.setErrors(null);

      } else {
        this.form.controls.ch_ps_speed_id.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ ch_ps_speed_id:''});
        this.form.controls.ch_ps_association_id.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ ch_ps_association_id:''});

      };
    });


    this.form.get('contents').valueChanges.subscribe(val => {
      if (val != 'Alterado') {

        this.form.controls.ch_ps_delusional_id.clearValidators();
        this.form.controls.ch_ps_overrated_id.clearValidators();
        this.form.controls.prevalent.clearValidators();
        this.form.controls.ch_ps_obsessive_id.clearValidators();

        this.form.controls.ch_ps_delusional_id.setErrors(null);
        this.form.controls.ch_ps_overrated_id.setErrors(null);
        this.form.controls.prevalent.setErrors(null);
        this.form.controls.ch_ps_obsessive_id.setErrors(null);

      } else {
        this.form.controls.ch_ps_delusional_id.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ ch_ps_delusional_id:''});
        this.form.controls.ch_ps_overrated_id.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ ch_ps_overrated_id:''});
        this.form.controls.prevalent.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ prevalent:''});
        this.form.controls.ch_ps_obsessive_id.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ ch_ps_obsessive_id:''});

      };
    });
    
  }

  

  }


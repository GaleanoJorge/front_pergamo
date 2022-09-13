import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEReflectionFTService } from '../../../../../../business-controller/ch_e_reflection_f_t.service';

@Component({
  selector: 'ngx-form-reflection_f_t',
  templateUrl: './form-reflection_f_t.component.html',
  styleUrls: ['./form-reflection_f_t.component.scss']
})
export class FormReflectionFTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public ch_external_cause: any[];



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChEReflectionFTService: ChEReflectionFTService,
  )
  {

  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {       

        bicipital: '',
        radial: '',
        triceps: '',
        patellar: '',
        aquilano: '',
        reflexes: '',
        observation: '',
      
      };
    }

    this.form = this.formBuilder.group({
      

      bicipital: [this.data[0] ? this.data[0].bicipital : this.data.bicipital, Validators.compose([Validators.required])],
      radial: [this.data[0] ? this.data[0].radial : this.data.radial, Validators.compose([Validators.required])],
      triceps: [this.data[0] ? this.data[0].triceps : this.data.triceps, Validators.compose([Validators.required])],
      patellar: [this.data[0] ? this.data[0].patellar : this.data.patellar, Validators.compose([Validators.required])],
      aquilano: [this.data[0] ? this.data[0].aquilano : this.data.aquilano, Validators.compose([Validators.required])],
      reflexes: [this.data[0] ? this.data[0].reflexes : this.data.reflexes, Validators.compose([Validators.required])],
      observation: [this.data[0] ? this.data[0].observation : this.data.observation],

    });

    // if (this.data.illness != '') {
    //   this.form.controls.type.disable();
    //   this.form.controls.irradiated.disable();
    //   this.form.controls.located.disable();
    //   this.form.controls.intensity.disable();
    //   this.form.controls.exaccervating.disable();
    //   this.form.controls.decreated.disable();

    //   this.disabled = true;
    // } else {
    //   this.form.controls.type.enable();
    //   this.form.controls.irradiated.enable();
    //   this.form.controls.located.enable();
    //   this.form.controls.intensity.enable();
    //   this.form.controls.exaccervating.enable();
    //   this.form.controls.decreated.enable();


    //   this.disabled = false;
    // }
  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.messageEvent.emit(true)
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
          this.ChEReflectionFTService.Update({
          id: this.data.id,         
          bicipital: this.form.controls.bicipital.value,
          radial: this.form.controls.radial.value,
          triceps: this.form.controls.triceps.value,
          patellar: this.form.controls.patellar.value,
          aquilano: this.form.controls.aquilano.value,
          reflexes: this.form.controls.reflexes.value,
          observation: this.form.controls.observation.value,

          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
          
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({bicipital:'',  radial:'', triceps:'', patellar:'', aquilano:'',
            reflexes:'',  observation:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChEReflectionFTService.Save({
            bicipital: this.form.controls.bicipital.value,
            radial: this.form.controls.radial.value,
            triceps: this.form.controls.triceps.value,
            patellar: this.form.controls.patellar.value,
            aquilano: this.form.controls.aquilano.value,
            reflexes: this.form.controls.reflexes.value,
            observation: this.form.controls.observation.value,

          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({bicipital:'',  radial:'', triceps:'', patellar:'', aquilano:'',
          reflexes:'',  observation:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {


        });
      }

    }else{
      this.toastService.danger('ingrese todos los campos solicitados');
    }
  }

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEPainFTService } from '../../../../../../business-controller/ch_e_pain_f_t.service';

@Component({
  selector: 'ngx-form-pain-ft',
  templateUrl: './form-pain-ft.component.html',
  styleUrls: ['./form-pain-ft.component.scss']
})
export class FormPainFTComponent implements OnInit {

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
    private ChEPainFTService: ChEPainFTService,
  )
  {

  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {       

        type: [],
        burning: '',
        stinging: '',
        locatedi: '',
        oppressive: '',

        irradiated: '',
        located: '',
        intensity: '',
        exaccervating: '',
        decreated: '',

      };
    }

    this.form = this.formBuilder.group({
      

      type: [this.data[0] ? this.data[0].type : this.data.type, Validators.compose([Validators.required])],
      burning: [this.data[0] ? this.data[0].burning : this.data.burning],
      stinging: [this.data[0] ? this.data[0].stinging : this.data.stinging],
      locatedi: [this.data[0] ? this.data[0].locatedi : this.data.locatedi],
      oppressive: [this.data[0] ? this.data[0].oppressive : this.data.oppressive],
      

      irradiated: [this.data[0] ? this.data[0].irradiated : this.data.irradiated, Validators.compose([Validators.required])],
      located: [this.data[0] ? this.data[0].located : this.data.located],
      intensity: [this.data[0] ? this.data[0].intensity : this.data.intensity, Validators.compose([Validators.required])],
      exaccervating: [this.data[0] ? this.data[0].exaccervating : this.data.exaccervating, Validators.compose([Validators.required])],
      decreated: [this.data[0] ? this.data[0].decreated : this.data.decreated, Validators.compose([Validators.required])],

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
          this.ChEPainFTService.Update({
          id: this.data.id,         
          type: this.form.controls.type.value,
          burning: this.form.controls.burning.value,
          stinging: this.form.controls.stinging.value,
          locatedi: this.form.controls.locatedi.value,
          oppressive: this.form.controls.oppressive.value,

          irradiated: this.form.controls.irradiated.value,
          located: this.form.controls.located.value,
          intensity: this.form.controls.intensity.value,
          exaccervating: this.form.controls.exaccervating.value,
          decreated: this.form.controls.decreated.value,

          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
          
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({type:'',  burning:'', stinging:'', locatedi:'', oppressive:'',
            irradiated:'',  located:'',  intensity:'',  exaccervating:'',  decreated:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChEPainFTService.Save({
            type: this.form.controls.type.value,
            burning: this.form.controls.burning.value,
            stinging: this.form.controls.stinging.value,
            locatedi: this.form.controls.locatedi.value,
            oppressive: this.form.controls.oppressive.value,
            
            irradiated: this.form.controls.irradiated.value,
            located: this.form.controls.located.value,
            intensity: this.form.controls.intensity.value,
            exaccervating: this.form.controls.exaccervating.value,
            decreated: this.form.controls.decreated.value,

          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({type:'',  burning:'', stinging:'', locatedi:'', oppressive:'',
          irradiated:'',  located:'',  intensity:'',  exaccervating:'',  decreated:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {


        });
      }

    }
  }

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }
}

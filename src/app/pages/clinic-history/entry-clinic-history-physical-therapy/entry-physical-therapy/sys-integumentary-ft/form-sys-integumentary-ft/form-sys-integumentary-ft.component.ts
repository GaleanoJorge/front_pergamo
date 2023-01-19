import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChESysIntegumentaryFTService } from '../../../../../../business-controller/ch_e_sys_integumentary_f_t.service';

@Component({
  selector: 'ngx-form-sys-integumentary-ft',
  templateUrl: './form-sys-integumentary-ft.component.html',
  styleUrls: ['./form-sys-integumentary-ft.component.scss']
})
export class FormSysIntegumentaryComponent implements OnInit {

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
    private ChESysIntegumentaryFTService: ChESysIntegumentaryFTService,
  )
  {

  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {       

        colaboration: '',
        integrity: '',
        texture: '',
        sweating: '',
        elasticity: '',
        extensibility: '',
        mobility: '',
        scar: '',
        bedsores: '',
        location: '',

      };
    }

    this.form = this.formBuilder.group({
      

      colaboration: [this.data[0] ? this.data[0].colaboration : this.data.colaboration, Validators.compose([Validators.required])],
      integrity: [this.data[0] ? this.data[0].integrity : this.data.integrity, Validators.compose([Validators.required])],
      texture: [this.data[0] ? this.data[0].texture : this.data.texture, Validators.compose([Validators.required])],
      sweating: [this.data[0] ? this.data[0].sweating : this.data.sweating, Validators.compose([Validators.required])],
      elasticity: [this.data[0] ? this.data[0].elasticity : this.data.elasticity, Validators.compose([Validators.required])],
      extensibility: [this.data[0] ? this.data[0].extensibility : this.data.extensibility, Validators.compose([Validators.required])],
      mobility: [this.data[0] ? this.data[0].mobility : this.data.mobility, Validators.compose([Validators.required])],
      scar: [this.data[0] ? this.data[0].scar : this.data.scar, Validators.compose([Validators.required])],
      bedsores: [this.data[0] ? this.data[0].bedsores : this.data.bedsores, Validators.compose([Validators.required])],
      location: [this.data[0] ? this.data[0].location : this.data.location, Validators.compose([Validators.required])],

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
          this.ChESysIntegumentaryFTService.Update({
          id: this.data.id,         
          colaboration: this.form.controls.colaboration.value,
          integrity: this.form.controls.integrity.value,
          texture: this.form.controls.texture.value,
          sweating: this.form.controls.sweating.value,
          elasticity: this.form.controls.elasticity.value,
          extensibility: this.form.controls.extensibility.value,
          mobility: this.form.controls.mobility.value,
          scar: this.form.controls.scar.value,
          bedsores: this.form.controls.bedsores.value,
          location: this.form.controls.location.value,

          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
          
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({colaboration:'',  integrity:'', texture:'', sweating:'', elasticity:'',
            extensibility:'',  mobility:'',  scar:'',  bedsores:'',  location:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChESysIntegumentaryFTService.Save({
            colaboration: this.form.controls.colaboration.value,
            integrity: this.form.controls.integrity.value,
            texture: this.form.controls.texture.value,
            sweating: this.form.controls.sweating.value,
            elasticity: this.form.controls.elasticity.value,
            extensibility: this.form.controls.extensibility.value,
            mobility: this.form.controls.mobility.value,
            scar: this.form.controls.scar.value,
            bedsores: this.form.controls.bedsores.value,
            location: this.form.controls.location.value,

          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({colaboration:'',  integrity:'', texture:'', sweating:'', elasticity:'',
          extensibility:'',  mobility:'',  scar:'',  bedsores:'',  location:''});
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChPsAttitudeService } from '../../../../../business-controller/ch-ps-attitude.service';
import { ChPsAwarenessService } from '../../../../../business-controller/ch-ps-awareness.service';
import { ChPsConsciousnessService } from '../../../../../business-controller/ch-ps-consciousness.service';


@Component({
  selector: 'ngx-form-ps-awareness',
  templateUrl: './form-ps-awareness.component.html',
  styleUrls: ['./form-ps-awareness.component.scss']
})
export class FormPsAwarenessComponent implements OnInit {

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

  public attitude: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,      
    private consciousnessS: ChPsConsciousnessService,   
    private attitudeS: ChPsAttitudeService, 

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {
       watch: '',
       obtundation: '',
       confusion: '',
       delirium: '',
       oneiroid: '',
       twilight: '',
       stupor: '',
       shallow: '',
       deep: '',
       appearance: '',
       attitude: []
    }

    this.form = this.formBuilder.group({

      watch: [this.data[0] ? this.data[0].watch : this.data.watch, Validators.compose([Validators.required])],
      hypervigilant: [this.data[0] ? this.data[0].hypervigilant : this.data.hypervigilant, Validators.compose([Validators.required])],
      obtundation: [this.data[0] ? this.data[0].obtundation : this.data.obtundation, Validators.compose([Validators.required])],
      confusion: [this.data[0] ? this.data[0].confusion : this.data.confusion, Validators.compose([Validators.required])],
      delirium: [this.data[0] ? this.data[0].delirium : this.data.delirium, Validators.compose([Validators.required])],
      oneiroid: [this.data[0] ? this.data[0].oneiroid : this.data.oneiroid, Validators.compose([Validators.required])],
      twilight: [this.data[0] ? this.data[0].twilight : this.data.twilight, Validators.compose([Validators.required])],
      stupor: [this.data[0] ? this.data[0].stupor : this.data.stupor, Validators.compose([Validators.required])],
      shallow: [this.data[0] ? this.data[0].shallow : this.data.shallow, Validators.compose([Validators.required])],
      deep: [this.data[0] ? this.data[0].deep : this.data.deep, Validators.compose([Validators.required])],
      appearance: [this.data[0] ? this.data[0].appearance : this.data.appearance, Validators.compose([Validators.required])],
      attitude: [this.data[0] ? this.data[0].attitude : this.data.attitude, Validators.compose([Validators.required])],


    });

    this.attitudeS.GetCollection().then(x => {
      this.attitude = x;
    });

    

  }

}

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.consciousnessS.Update({
          id: this.data.id,
          watch: this.form.controls.watch.value,
          hypervigilant: this.form.controls.hypervigilant.value,
          obtundation: this.form.controls.obtundation.value,
          confusion: this.form.controls.confusion.value,
          delirium: this.form.controls.delirium.value,
          oneiroid: this.form.controls.oneiroid.value,
          twilight: this.form.controls.twilight.value,
          stupor: this.form.controls.stupor.value,
          shallow: this.form.controls.shallow.value,
          deep: this.form.controls.deep.value,
          appearance: this.form.controls.appearance.value,
          attitude: JSON.stringify  (this.form.controls.attitude.value),
          type_record_id:  this.type_record_id,
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
        this.consciousnessS.Save({
          watch: this.form.controls.watch.value,
          hypervigilant: this.form.controls.hypervigilant.value,
          obtundation: this.form.controls.obtundation.value,
          confusion: this.form.controls.confusion.value,
          delirium: this.form.controls.delirium.value,
          oneiroid: this.form.controls.oneiroid.value,
          twilight: this.form.controls.twilight.value,
          stupor: this.form.controls.stupor.value,
          shallow: this.form.controls.shallow.value,
          deep: this.form.controls.deep.value,
          appearance: this.form.controls.appearance.value,
          attitude: JSON.stringify  (this.form.controls.attitude.value),
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            watch:'',
            hypervigilant:'',
            obtundation:'',
            confusion:'',
            delirium:'',
            oneiroid:'',
            twilight:'',
            stupor:'',
            shallow:'',
            deep:'',
            appearance:'',
            attitude:[]
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

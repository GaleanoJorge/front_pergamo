import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChEMSTestOTService } from '../../../../../../../business-controller/ch_e_m_s_test_o_t.service';





@Component({
  selector: 'ngx-form-test-m-ot',
  templateUrl: './form-test-m-ot.component.html',
  styleUrls: ['./form-test-m-ot.component.scss']
})
export class FormTestMOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChEMSTestOTService: ChEMSTestOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {

        appearance: '',
        consent: '',
        Attention: '',
        humor: '',
        language: '',
        sensory_perception: '',
        grade: '',
        contents: '',
        orientation: '',
        sleep: '',
        memory: '',

      };
    }

    this.form = this.formBuilder.group({

      appearance: [this.data[0] ? this.data[0].appearance : this.data.appearance, Validators.compose([Validators.required])],
      consent: [this.data[0] ? this.data[0].consent : this.data.consent, Validators.compose([Validators.required])],
      Attention: [this.data[0] ? this.data[0].Attention : this.data.Attention, Validators.compose([Validators.required])],
      humor: [this.data[0] ? this.data[0].humor : this.data.humor, Validators.compose([Validators.required])],
      language: [this.data[0] ? this.data[0].language : this.data.language, Validators.compose([Validators.required])],
      sensory_perception: [this.data[0] ? this.data[0].sensory_perception : this.data.sensory_perception, Validators.compose([Validators.required])],
      grade: [this.data[0] ? this.data[0].grade : this.data.grade, Validators.compose([Validators.required])],
      contents: [this.data[0] ? this.data[0].contents : this.data.contents, Validators.compose([Validators.required])],
      orientation: [this.data[0] ? this.data[0].orientation : this.data.orientation, Validators.compose([Validators.required])],
      sleep: [this.data[0] ? this.data[0].sleep : this.data.sleep, Validators.compose([Validators.required])],
      memory: [this.data[0] ? this.data[0].memory : this.data.memory, Validators.compose([Validators.required])],

    });

    if (this.data.appearance != '') {
      this.form.controls.appearance.disable();
      this.form.controls.consent.disable();
      this.form.controls.Attention.disable();
      this.form.controls.humor.disable();
      this.form.controls.language.disable();
      this.form.controls.sensory_perception.disable();
      this.form.controls.grade.disable();
      this.form.controls.contents.disable();
      this.form.controls.orientation.disable();
      this.form.controls.sleep.disable();
      this.form.controls.memory.disable();


      this.disabled = true;
    } else {
      this.form.controls.appearance.enable();
      this.form.controls.consent.enable();
      this.form.controls.Attention.enable();
      this.form.controls.humor.enable();
      this.form.controls.language.enable();
      this.form.controls.sensory_perception.enable();
      this.form.controls.grade.enable();
      this.form.controls.contents.enable();
      this.form.controls.orientation.enable();
      this.form.controls.sleep.enable();
      this.form.controls.memory.enable();

      this.disabled = false;
    }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
          this.ChEMSTestOTService.Update({
          id: this.data.id,
          appearance: this.form.controls.appearance.value,
          consent: this.form.controls.consent.value,
          Attention: this.form.controls.Attention.value,
          humor: this.form.controls.humor.value,
          language: this.form.controls.language.value,
          sensory_perception: this.form.controls.sensory_perception.value,
          grade: this.form.controls.grade.value,
          contents: this.form.controls.contents.value,
          orientation: this.form.controls.orientation.value,
          sleep: this.form.controls.sleep.value,
          memory: this.form.controls.memory.value,

          type_record_id: 1,
          ch_record_id: this.record_id,
          
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChEMSTestOTService.Save({
          appearance: this.form.controls.appearance.value,
          consent: this.form.controls.consent.value,
          Attention: this.form.controls.Attention.value,
          humor: this.form.controls.humor.value,
          language: this.form.controls.language.value,
          sensory_perception: this.form.controls.sensory_perception.value,
          grade: this.form.controls.grade.value,
          contents: this.form.controls.contents.value,
          orientation: this.form.controls.orientation.value,
          sleep: this.form.controls.sleep.value,
          memory: this.form.controls.memory.value,

          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
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



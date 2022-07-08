import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRtInspectionService } from '../../../business-controller/ch_rt_inspection.service';
import { ChAuscultationService } from '../../../business-controller/ch_auscultation.service';


@Component({
  selector: 'ngx-form-auscultacion-therapy',
  templateUrl: './form-auscultacion-therapy.component.html',
  styleUrls: ['./form-auscultacion-therapy.component.scss']
})
export class FormaAuscultacionTherapyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  messageEvent: any;
 


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private AuscultacionS: ChAuscultationService,

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        aus: [],
        obs_murmur: '',
        obs_crepits: '',
        obs_rales: '',
        obs_stridor: '',
        obs_pleural: '',
        obs_roncus: '',
        obs_wheezing: '',

      };
    }
    this.form = this.formBuilder.group({
      aus: [this.data[0] ? this.data[0].aus : this.data.aus, Validators.compose([Validators.required])],
      obs_murmur: [this.data[0] ? this.data[0].obs_murmur : this.data.obs_murmur,],
      obs_crepits: [this.data[0] ? this.data[0].obs_crepits : this.data.obs_crepits,],
      obs_rales: [this.data[0] ? this.data[0].obs_rales : this.data.obs_rales,],
      obs_stridor: [this.data[0] ? this.data[0].obs_stridor : this.data.obs_stridor,],
      obs_pleural: [this.data[0] ? this.data[0].obs_pleural : this.data.obs_pleural,],
      obs_roncus: [this.data[0] ? this.data[0].obs_roncus : this.data.obs_roncus,],
      obs_wheezing: [this.data[0] ? this.data[0].obs_wheezing : this.data.obs_wheezing,],
           
    });    
    
    if (this.data.obs_murmur != '') {
      this.form.controls.obs_murmur.disable();
      this.form.controls.obs_crepits.disable();
      this.form.controls.obs_rales.disable();
      this.form.controls.obs_stridor.disable();
      this.form.controls.obs_pleural.disable();
      this.form.controls.obs_roncus.disable();
      this.form.controls.obs_wheezing.disable();
      this.disabled = true;
    } else {
      this.form.controls.obs_murmur.enable();
      this.form.controls.obs_crepits.enable();
      this.form.controls.obs_rales.enable();
      this.form.controls.obs_stridor.enable();
      this.form.controls.obs_pleural.enable();
      this.form.controls.obs_roncus.enable();
      this.form.controls.obs_wheezing.enable();
      this.disabled = false;
    }

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.AuscultacionS.Update({
          id: this.data.id,
          aus: this.form.controls.aus.value,
          obs_murmur: this.form.controls.obs_murmur.value,
          obs_crepits: this.form.controls.obs_crepits.value,
          obs_rales: this.form.controls.obs_rales.value,
          obs_stridor: this.form.controls.obs_stridor.value,
          obs_pleural: this.form.controls.obs_pleural.value,
          obs_roncus: this.form.controls.obs_roncus.value,
          obs_wheezing: this.form.controls.obs_wheezing.value,
          type_record_id: 1,
          ch_record_id: this.record_id,

        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.AuscultacionS.Save({
          aus: this.form.controls.aus.value,
          obs_murmur: this.form.controls.obs_murmur.value,
          obs_crepits: this.form.controls.obs_crepits.value,
          obs_rales: this.form.controls.obs_rales.value,
          obs_stridor: this.form.controls.obs_stridor.value,
          obs_pleural: this.form.controls.obs_pleural.value,
          obs_roncus: this.form.controls.obs_roncus.value,
          obs_wheezing: this.form.controls.obs_wheezing.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ aus: [], obs_murmur: '', obs_crepits:'', obs_rales:'',obs_stridor:'', obs_pleural:'',
          obs_roncus:'',obs_wheezing:''});
          if (this.saved) {
            this.saved();
          }
          
        });
      }

    }else{
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

}

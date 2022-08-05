import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChSwHygieneHousingService } from '../../../../../business-controller/ch-sw-hygiene-housing.service';


@Component({
  selector: 'ngx-form-sw-hygiene-housing',
  templateUrl: './form-sw-hygiene-housing.component.html',
  styleUrls: ['./form-sw-hygiene-housing.component.scss']
})
export class FormChSwHygieneHousingComponent implements OnInit {

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
  public disabled: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,    
    private hygieneS: ChSwHygieneHousingService,

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {

        cleanliness: '',
        obs_cleanliness: '',
        illumination: '',
        obs_illumination: '',
        ventilation: '',
        obs_ventilation: '',
        pests: '',
        obs_pests: '',
        sanitary: '',
        obs_sanitary: '',
        trash: '',
        obs_trash: ''

      };
    }

    this.form = this.formBuilder.group({

      cleanliness: [this.data[0] ? this.data[0].cleanliness : this.data.cleanliness, Validators.compose([Validators.required])],
      obs_cleanliness: [this.data[0] ? this.data[0].obs_cleanliness : this.data.obs_cleanliness, Validators.compose([Validators.required])],
      illumination: [this.data[0] ? this.data[0].illumination : this.data.illumination, Validators.compose([Validators.required])],
      obs_illumination: [this.data[0] ? this.data[0].obs_illumination : this.data.obs_illumination, Validators.compose([Validators.required])],
      ventilation: [this.data[0] ? this.data[0].ventilation : this.data.ventilation, Validators.compose([Validators.required])],
      obs_ventilation: [this.data[0] ? this.data[0].obs_ventilation : this.data.obs_ventilation, Validators.compose([Validators.required])],
      pests: [this.data[0] ? this.data[0].pests : this.data.pests, Validators.compose([Validators.required])],
      obs_pests: [this.data[0] ? this.data[0].obs_pests : this.data.obs_pests, Validators.compose([Validators.required])],
      sanitary: [this.data[0] ? this.data[0].sanitary : this.data.sanitary, Validators.compose([Validators.required])],
      obs_sanitary: [this.data[0] ? this.data[0].obs_sanitary : this.data.obs_sanitary, Validators.compose([Validators.required])],
      trash: [this.data[0] ? this.data[0].trash : this.data.trash, Validators.compose([Validators.required])],
      obs_trash: [this.data[0] ? this.data[0].obs_trash : this.data.obs_trash, Validators.compose([Validators.required])],

    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.hygieneS.Update({
          id: this.data.id,
          cleanliness: this.form.controls.cleanliness.value,
          obs_cleanliness: this.form.controls.obs_cleanliness.value,
          illumination: this.form.controls.illumination.value,
          obs_illumination: this.form.controls.obs_illumination.value,
          ventilation: this.form.controls.ventilation.value,
          obs_ventilation: this.form.controls.obs_ventilation.value,
          pests: this.form.controls.pests.value,
          obs_pests: this.form.controls.obs_pests.value,
          sanitary: this.form.controls.sanitary.value,
          obs_sanitary: this.form.controls.obs_sanitary.value,
          trash: this.form.controls.trash.value,
          obs_trash: this.form.controls.obs_trash.value,
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
        this.hygieneS.Save({
          cleanliness: this.form.controls.cleanliness.value,
          obs_cleanliness: this.form.controls.obs_cleanliness.value,
          illumination: this.form.controls.illumination.value,
          obs_illumination: this.form.controls.obs_illumination.value,
          ventilation: this.form.controls.ventilation.value,
          obs_ventilation: this.form.controls.obs_ventilation.value,
          pests: this.form.controls.pests.value,
          obs_pests: this.form.controls.obs_pests.value,
          sanitary: this.form.controls.sanitary.value,
          obs_sanitary: this.form.controls.obs_sanitary.value,
          trash: this.form.controls.trash.value,
          obs_trash: this.form.controls.obs_trash.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({cleanliness:'',  obs_cleanliness:'', illumination:'', obs_illumination:'', ventilation:'',
            obs_ventilation:'',  pests:'',  obs_pests:'',  sanitary:'',  obs_sanitary:'',  trash:'', obs_trash:'' });
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

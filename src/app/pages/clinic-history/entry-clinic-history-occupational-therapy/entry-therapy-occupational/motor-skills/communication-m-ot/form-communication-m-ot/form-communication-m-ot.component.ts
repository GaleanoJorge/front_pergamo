import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChEMSCommunicationOTService } from '../../../../../../../business-controller/ch_e_m_s_communication_o_t.service';





@Component({
  selector: 'ngx-form-communication-m-ot',
  templateUrl: './form-communication-m-ot.component.html',
  styleUrls: ['./form-communication-m-ot.component.scss']
})
export class FormCommunicationMOTComponent implements OnInit {

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



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChEMSCommunicationOTService: ChEMSCommunicationOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {

        community: '',
        relatives: '',
        friends: '',
        health: '',
        shopping: '',
        foods: '',
        bathe: '',
        dress: '',
        animals: '',

      };
    }

    this.form = this.formBuilder.group({

      community: [this.data[0] ? this.data[0].appearance : this.data.community, Validators.compose([Validators.required])],
      relatives: [this.data[0] ? this.data[0].relatives : this.data.relatives, Validators.compose([Validators.required])],
      friends: [this.data[0] ? this.data[0].friends : this.data.friends, Validators.compose([Validators.required])],
      health: [this.data[0] ? this.data[0].health : this.data.health, Validators.compose([Validators.required])],
      shopping: [this.data[0] ? this.data[0].shopping : this.data.shopping, Validators.compose([Validators.required])],
      foods: [this.data[0] ? this.data[0].foods : this.data.foods, Validators.compose([Validators.required])],
      bathe: [this.data[0] ? this.data[0].bathe : this.data.bathe, Validators.compose([Validators.required])],
      dress: [this.data[0] ? this.data[0].dress : this.data.dress, Validators.compose([Validators.required])],
      animals: [this.data[0] ? this.data[0].animals : this.data.animals, Validators.compose([Validators.required])],

    });

  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
          this.ChEMSCommunicationOTService.Update({
          id: this.data.id,
          community: this.form.controls.community.value,
          relatives: this.form.controls.relatives.value,
          friends: this.form.controls.friends.value,
          health: this.form.controls.health.value,
          shopping: this.form.controls.shopping.value,
          foods: this.form.controls.foods.value,
          bathe: this.form.controls.bathe.value,
          dress: this.form.controls.dress.value,
          animals: this.form.controls.animals.value,

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
          this.ChEMSCommunicationOTService.Save({
          community: this.form.controls.community.value,
          relatives: this.form.controls.relatives.value,
          friends: this.form.controls.friends.value,
          health: this.form.controls.health.value,
          shopping: this.form.controls.shopping.value,
          foods: this.form.controls.foods.value,
          bathe: this.form.controls.bathe.value,
          dress: this.form.controls.dress.value,
          animals: this.form.controls.animals.value,

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



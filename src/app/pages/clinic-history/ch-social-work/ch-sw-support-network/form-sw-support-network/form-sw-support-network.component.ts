import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserBusinessService } from '../../../../../business-controller/user-business.service';
import { PatientDataService } from '../../../../../business-controller/patient-data.service';
import { ChSwNetworkService } from '../../../../../business-controller/ch-sw-network.service';
import { ChSwSupportNetworkService } from '../../../../../business-controller/ch-sw-support-network.service';
import { ChSwEntityService } from '../../../../../business-controller/ch-sw-entity.service';


@Component({
  selector: 'ngx-form-sw-support-network',
  templateUrl: './form-sw-support-network.component.html',
  styleUrls: ['./form-sw-support-network.component.scss']
})
export class FormSwSupportNetworkComponent implements OnInit {

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
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public diagnosis: any[] = [];
  public disabled: boolean = false;
  public network: any[] = [];
  public entity: any[] = [];
  checked = false;


  constructor(
    // protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private userBS: UserBusinessService,
    // private statusBS: StatusBusinessService,
    private PatientDataS: PatientDataService,
    private toastService: NbToastrService,
    private networkS: ChSwNetworkService,
    private supportS: ChSwSupportNetworkService,
    private entityS: ChSwEntityService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        provided: '',
        sw_note: '',
        ch_sw_network_id: '',
        ch_sw_entity_id: '',
        observation: ''
      };
    }

    this.networkS.GetCollection().then(x => {
      this.network = x;
    });

    this.entityS.GetCollection().then(x => {
      this.entity = x;
    });


    this.form = this.formBuilder.group({

      provided: [this.data[0] ? this.data[0].provided : this.data.provided, Validators.compose([Validators.required])],
      sw_note: [this.data[0] ? this.data[0].sw_note : this.data.sw_note, Validators.compose([Validators.required])],
      ch_sw_entity_id: [this.data[0] ? this.data[0].ch_sw_entity_id : this.data.ch_sw_entity_id,],
      observation: [this.data[0] ? this.data[0].observation : this.data.observation,],
      ch_sw_network_id: [this.data[0] ? this.data[0].ch_sw_network_id : this.data.ch_sw_network_id, Validators.compose([Validators.required])],
     
    });

    this.onChange();

  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.supportS.Update({
          id: this.data.id,
          provided: this.form.controls.provided.value,
          sw_note: this.form.controls.sw_note.value,
          ch_sw_entity_id: this.form.controls.ch_sw_entity_id.value,
          observation: this.form.controls.observation.value,
          ch_sw_network_id: this.form.controls.ch_sw_network_id.value,
          type_record_id: this.type_record,
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
        this.supportS.Save({
          provided: this.form.controls.provided.value,
          sw_note: this.form.controls.sw_note.value,
          ch_sw_entity_id: this.form.controls.ch_sw_entity_id.value,
          observation: this.form.controls.observation.value,
          ch_sw_network_id: this.form.controls.ch_sw_network_id.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ provided:'', sw_note:'', ch_sw_network_id:'', ch_sw_entity_id:'', observation:'' });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    }else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

  async onChange() {

    this.form.get('ch_sw_network_id').valueChanges.subscribe(val => {
      if (val != 5) {

        this.form.controls.ch_sw_entity_id.clearValidators();
        this.form.controls.observation.clearValidators();

        this.form.controls.ch_sw_entity_id.setErrors(null);
        this.form.controls.observation.setErrors(null);

      } else {
        this.form.controls.ch_sw_entity_id.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ ch_sw_entity_id:''});
        this.form.controls.observation.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ observation:''});

      };
    });
  }

}

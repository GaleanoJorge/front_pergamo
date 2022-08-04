import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChSwConditionHousingService } from '../../../../../business-controller/ch-sw-condition-housing.service';
import { ChSwIncomeService } from '../../../../../business-controller/ch-sw-income.service';
import { ChSwServicesService } from '../../../../../business-controller/ch-sw-services.service';


@Component({
  selector: 'ngx-form-sw-condition-housing',
  templateUrl: './form-sw-condition-housing.component.html',
  styleUrls: ['./form-sw-condition-housing.component.scss']
})
export class FormChSwConditionHousingComponent implements OnInit {

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
  public services: any[] = [];
  public disabled: boolean = false;
  checked = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private servicesS: ChSwServicesService,
    private conditionS: ChSwConditionHousingService,

  ) {
  }


  toggle(checked: boolean) {
    this.checked = checked;
  }



  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {

        ch_activities: [],
        num_rooms:'',
        persons_rooms:'',
        rooms:'',
        living_room:'',
        dinning_room:'',
        kitchen:'',
        bath:''

      };
    }

    this.form = this.formBuilder.group({

      ch_sw_services_id: [[this.data], Validators.compose([Validators.required])],
      num_rooms: [this.data[0] ? this.data[0].num_rooms : this.data.num_rooms, Validators.compose([Validators.required])],
      persons_rooms: [this.data[0] ? this.data[0].persons_rooms : this.data.persons_rooms,Validators.compose([Validators.required])],
      rooms: [this.data[0] ? this.data[0].rooms : this.data.rooms],
      living_room: [this.data[0] ? this.data[0].living_room : this.data.living_room],
      dinning_room: [this.data[0] ? this.data[0].dinning_room : this.data.dinning_room],
      kitchen: [this.data[0] ? this.data[0].kitchen : this.data.kitchen],
      bath: [this.data[0] ? this.data[0].bath : this.data.bath],

    });

    this.servicesS.GetCollection().then(x => {
      this.services = x;
    });

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.conditionS.Update({
          id: this.data.id,
          ch_sw_services_id: this.form.controls.ch_sw_services_id.value,
          num_rooms: this.form.controls.num_rooms.value,
          persons_rooms: this.form.controls.persons_rooms.value,
          rooms: this.form.controls.rooms.value,
          living_room: this.form.controls.living_room.value,
          dinning_room: this.form.controls.dinning_room.value,
          kitchen: this.form.controls.kitchen.value,
          bath: this.form.controls.bath.value,
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
        this.conditionS.Save({
          ch_sw_services_id: this.form.controls.ch_sw_services_id.value,
          num_rooms: this.form.controls.num_rooms.value,
          persons_rooms: this.form.controls.persons_rooms.value,
          rooms: this.form.controls.rooms.value,
          living_room: this.form.controls.living_room.value,
          dinning_room: this.form.controls.dinning_room.value,
          kitchen: this.form.controls.kitchen.value,
          bath: this.form.controls.bath.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            services:[],num_rooms: '', persons_rooms: '', rooms: '', living_room: '', dinning_room: '', kitchen: '',
            bath: ''  });
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

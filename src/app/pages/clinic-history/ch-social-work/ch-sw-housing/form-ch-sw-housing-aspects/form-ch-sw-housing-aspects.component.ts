import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChSwCommunicationsService } from '../../../../../business-controller/ch-sw-communication.service';
import { ChSwExpressionService } from '../../../../../business-controller/ch-sw-expression.service';
import { ChSwHousingAspectService } from '../../../../../business-controller/ch-sw-housing-aspect.service';
import { ChSwHousingTypeService } from '../../../../../business-controller/ch-sw-housing-type.service';
import { ChSwHousingService } from '../../../../../business-controller/ch-sw-housing.service';



@Component({
  selector: 'ngx-form-ch-sw-housing-aspects',
  templateUrl: './form-ch-sw-housing-aspects.component.html',
  styleUrls: ['./form-ch-sw-housing-aspects.component.scss']
})
export class FormChSwHousingAspectsComponent implements OnInit {

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
  public diagnosis: any[] = [];
  public housing: any[] = [];
  public housingType: any[] = [];
  public disabled: boolean = false;
  checked = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private housingS: ChSwHousingService,
    private housingTypeS: ChSwHousingTypeService,
    private HousingAspectS: ChSwHousingAspectService,

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {
       
        flat: '',
        lift: '',
        location: '',
        vehicle_access: '',
        ch_sw_housing_type_id: '',
        ch_sw_housing_id: ''

      };
    }

    this.form = this.formBuilder.group({

      ch_sw_housing_type_id: [this.data[0] ? this.data[0].ch_sw_communications_id : this.data.ch_sw_communications_id,],
      ch_sw_housing_id: [this.data[0] ? this.data[0].ch_sw_expression_id : this.data.ch_sw_expression_id,],
      flat: [this.data[0] ? this.data[0].flat : this.data.flat,],
      lift: [this.data[0] ? this.data[0].lift : this.data.lift,],
      location: [this.data[0] ? this.data[0].location : this.data.location,],
      vehicle_access: [this.data[0] ? this.data[0].vehicle_access : this.data.vehicle_access,],

   
    });
    this.housingS.GetCollection().then(x => {
      this.housing = x;
    });

    this.housingTypeS.GetCollection().then(x => {
      this.housingType = x;
    });
  
  }
    
  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.HousingAspectS.Update({
          id: this.data.id,
          flat: this.form.controls.flat.value,
          lift: this.form.controls.lift.value,
          location: this.form.controls.location.value,
          vehicle_access: this.form.controls.vehicle_access.value,
          ch_sw_housing_type_id: this.form.controls.ch_sw_housing_type_id.value,
          ch_sw_housing_id: this.form.controls.ch_sw_housing_id.value,
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
        this.HousingAspectS.Save({
          flat: this.form.controls.flat.value,
          lift: this.form.controls.lift.value,
          location: this.form.controls.location.value,
          vehicle_access: this.form.controls.vehicle_access.value,
          ch_sw_housing_type_id: this.form.controls.ch_sw_housing_type_id.value,
          ch_sw_housing_id: this.form.controls.ch_sw_housing_id.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ activities:''});
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

  
}

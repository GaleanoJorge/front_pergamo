import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChVitalSignsService } from '../../../../../../business-controller/ch-vital-signs.service';
import { ChTypeFluidService } from '../../../../../../business-controller/ch-type-fluid.service';
import { ChRouteFluidService } from '../../../../../../business-controller/ch-route-fluid.service';
import { ChLiquidControlService } from '../../../../../../business-controller/ch-liquid-control.service';


@Component({
  selector: 'ngx-form-liquid-control-del',
  templateUrl: './form-liquid-control-del.component.html',
  styleUrls: ['./form-liquid-control-del.component.scss'],
})
export class FormLiquidControlDelComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: any = null;

  @Output() messageEvent = new EventEmitter<any>();


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;

  public ch_routes: any [] = [];
  public ch_types: any [] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private chVitalSignsS: ChVitalSignsService,
    private chTypeFluidS: ChTypeFluidService,
    private chRouteFluidS: ChRouteFluidService,
    private chLiquidControlS: ChLiquidControlService,
    
  ) {
  }
  
  async ngOnInit(): Promise<void> {

    if (!this.data) {
      this.data = {
        clock: '',
        ch_route_fluid_id: '',
        ch_type_fluid_id: '',
        specific_name: '',
        delivered_volume: '',
        bag_number: '',
      };

    }

    this.chRouteFluidS.GetCollection(1).then(x =>{
      this.ch_routes = x;
    });

    this.form = this.formBuilder.group({
      clock: [
        this.data[0] ? this.data[0].clock : this.data.clock,
        Validators.compose([Validators.required])
      ],
      ch_route_fluid_id: [
        this.data[0] ? this.data[0].ch_rute_fluid_id : this.data.ch_rute_fluid_id,
        Validators.compose([Validators.required])
      ],
      ch_type_fluid_id: [
        this.data[0] ? this.data[0].ch_type_fluid_id : this.data.ch_type_fluid_id,
        Validators.compose([Validators.required])
      ],
      specific_name: [
        this.data[0] ? this.data[0].specific_name : this.data.specific_name,
        // Validators.compose([Validators.required])
      ],
      delivered_volume: [
        this.data[0] ? this.data[0].delivered_volume : this.data.delivered_volume,
        Validators.compose([Validators.required])
      ],
      bag_number: [
        this.data[0] ? this.data[0].bag_number : this.data.bag_number
      ],

    });

    this.onChanges();

  }

  onChanges(){

    this.form.get('ch_route_fluid_id').valueChanges.subscribe(val =>{
      if(val == ''){
        this.ch_types = [];
        this.form.patchValue({
          clock: '',
          ch_type_fluid_id: '',
          specific_name: '',
          delivered_volume: '',
          bag_number: '',
        });
      } else {
        this.ch_types = [];
        this.form.patchValue({
          clock: '',
          ch_type_fluid_id: '',
          specific_name: '',
          delivered_volume: '',
          bag_number: '',
        });
        this.GetTypesFluids(val);
      }
    });
    this.form.get('').valueChanges.subscribe(val => {
      if(val == 29){
        this.form.controls.specific_name.setValidators(Validators.compose([Validators.required]));
      } else {
        this.form.controls.specific_name.clearValidators();
        this.form.controls.specific_name.updateValueAndValidity();
      }
    });
  }

  GetTypesFluids(route_id) {
    if (!route_id || route_id === '') return Promise.resolve(false);
    return this.chTypeFluidS.GetCollection({ch_route_fluid_id: route_id}).then(x => {
      this.ch_types = x;

      return Promise.resolve(true);
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.chLiquidControlS.Update({
          id: this.data.id,
          clock: this.form.controls.clock.value,
          ch_route_fluid_id: this.form.controls.ch_route_fluid_id.value,
          ch_type_fluid_id: this.form.controls.ch_type_fluid_id.value,
          specific_name: this.form.controls.specific_name.value,
          delivered_volume: this.form.controls.delivered_volume.value,
          bag_number: this.form.controls.bag_number.value,
          type_record_id: this.type_record_id,
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
        await this.chLiquidControlS.Save({
          clock: this.form.controls.clock.value,
          ch_route_fluid_id: this.form.controls.ch_route_fluid_id.value,
          ch_type_fluid_id: this.form.controls.ch_type_fluid_id.value,
          specific_name: this.form.controls.specific_name.value,
          delivered_volume: this.form.controls.delivered_volume.value,
          bag_number: this.form.controls.bag_number.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.patchValue({
            clock: '',
            ch_route_fluid_id: '',
            ch_type_fluid_id: '',
            specific_name: '',
            delivered_volume: '',
            bag_number: '',
          });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
        });
        this.messageEvent.emit(true);
      }

    }
  }




}

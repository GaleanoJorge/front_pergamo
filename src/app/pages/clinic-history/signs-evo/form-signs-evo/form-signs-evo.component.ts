import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChVitalSignsService } from '../../../../business-controller/ch-vital-signs.service';
import { ChVitalHydrationService } from '../../../../business-controller/ch-vital-hydration.service';
import { ChVitalNeurologicalService } from '../../../../business-controller/ch-vital-neurological.service';
import { ChVitalVentilatedService } from '../../../../business-controller/ch-vital-ventilated.service';
import { ChVitalTemperatureService } from '../../../../business-controller/ch-vital-temperature.service';
import { OxygenTypeService } from '../../../../business-controller/oxygen_type.service';
import { LitersPerMinuteService } from '../../../../business-controller/liters_per_minute.service';
import { ParametersSignsService } from '../../../../business-controller/parameters-signs.service';


@Component({
  selector: 'ngx-form-signs-evo',
  templateUrl: './form-signs-evo.component.html',
  styleUrls: ['./form-signs-evo.component.scss'],
})
export class FormsignsEvoComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() admission: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public vital_hydration: any[];
  public vital_neurological: any[];
  public vital_temperature: any[];
  public vital_ventilated: any[];
  public oxygen_type: any[];
  public liters_per_minute: any[];
  public parameters_signs: any[];
  public chvitsigns: any[];
  public pressure_half: any[];
  public pressure_systolic;
  public pressure_diastolic;
  public weight;
  public size;
  public body_mass_index;
  public selectedItemsList = [];
  public checkedIDs = [];
  public checkboxesDataList: any[] = [];
  public geteratedIMC = null;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private chVitalSignsS: ChVitalSignsService,
    private chvitalHydrationS: ChVitalHydrationService,
    private chvitalNeurologicalS: ChVitalNeurologicalService,
    private chvitalTemperatureS: ChVitalTemperatureService,
    private chvitalVentilatedS: ChVitalVentilatedService,
    private OxygenTypeS: OxygenTypeService,
    private LitersPerMinuteS: LitersPerMinuteService,
    private ParametersSignsS: ParametersSignsService,

  ) {
  }

  async ngOnInit(): Promise<void> {
    this.checkboxesDataList = [
      {
        id: 'mydriatic',
        label: 'MINDRIÁTICA',
        isChecked: false,
      },
      {
        id: 'normal',
        label: 'NORMAL',
        isChecked: false,
      },
      {
        id: 'lazy_reaction_light',
        label: 'REACCIÓN PERESOZA ( A LA LUZ)',
        isChecked: false,
      },
      {
        id: 'fixed_lazy_reaction',
        label: 'REACCIÓN PERESOZA',
        isChecked: false,
      },
      {
        id: 'miotic_size',
        label: 'TAMAÑO MIÓTICA',
        isChecked: false,
      },
    ];
    if (!this.data || this.data.length == 0) {
      this.data = {
        clock: '',
        cardiac_frequency: '',
        respiratory_frequency: '',
        temperature: '',
        oxigen_saturation: '',
        intracranial_pressure: '',
        cerebral_perfusion_pressure: '',
        intra_abdominal: '',
        pressure_systolic: '',
        pressure_diastolic: '',
        pressure_half: '',
        pulse: '',
        venous_pressure: '',
        size: '',
        weight: '',
        glucometry: '',
        body_mass_index: '',
        pulmonary_systolic: '',
        pulmonary_diastolic: '',
        pulmonary_half: '',
        right_reaction: '',
        pupil_size_right: '',
        left_reaction: '',
        pupil_size_left: '',
        // mydriatic: '',
        // normal: '',
        // lazy_reaction_light: '',
        // fixed_lazy_reaction: '',
        // miotic_size: '',
        observations_glucometry: '',
        head_circunference: '',
        abdominal_perimeter: '',
        chest_perimeter: '',
        ch_vital_hydration_id: '',
        ch_vital_ventilated_id: '',
        ch_vital_temperature_id: '',
        ch_vital_neurological_id: '',
        oxygen_type_id: '',
        liters_per_minute_id: '',
        parameters_signs_id: '',
        pupilas: '',
        has_oxigen: this.admission ? this.admission.location[0].program_id == 7 ? true : false : false,
      };

    }

    this.chvitalHydrationS.GetCollection({ status_id: 1 }).then(x => {
      this.vital_hydration = x;
    });
    this.chvitalNeurologicalS.GetCollection({ status_id: 1 }).then(x => {
      this.vital_neurological = x;
    });
    this.chvitalTemperatureS.GetCollection({ status_id: 1 }).then(x => {
      this.vital_temperature = x;
    });
   

    this.form = this.formBuilder.group({
      clock: [this.data[0] ? this.data[0].clock : this.data.clock, Validators.compose([Validators.required])],
      cardiac_frequency: [this.data[0] ? this.data[0].cardiac_frequency : this.data.cardiac_frequency, Validators.compose([Validators.required])],
      respiratory_frequency: [this.data[0] ? this.data[0].respiratory_frequency : this.data.respiratory_frequency, Validators.compose([Validators.required])],
      temperature: [this.data[0] ? this.data[0].temperature : this.data.temperature,Validators.compose([Validators.required])],
      oxigen_saturation: [this.data[0] ? this.data[0].oxigen_saturation : this.data.oxigen_saturation,Validators.compose([Validators.required])],
      intracranial_pressure: [this.data[0] ? this.data[0].intracranial_pressure : this.data.intracranial_pressure],
      cerebral_perfusion_pressure: [this.data[0] ? this.data[0].cerebral_perfusion_pressure : this.data.cerebral_perfusion_pressure],
      intra_abdominal: [this.data[0] ? this.data[0].intra_abdominal : this.data.intra_abdominal],
      pressure_systolic: [this.data[0] ? this.data[0].pressure_systolic : this.data.pressure_systolic, Validators.compose([Validators.required])],
      pressure_diastolic: [this.data[0] ? this.data[0].pressure_diastolic : this.data.pressure_diastolic, Validators.compose([Validators.required])],
      pressure_half: [this.data[0] ? this.data[0].pressure_half : this.data.pressure_half, Validators.compose([Validators.required])],
      pulse: [this.data[0] ? this.data[0].pulse : this.data.pulse],
      observations_glucometry: [this.data[0] ? this.data[0].observations_glucometry : this.data.observations_glucometry],
      venous_pressure: [this.data[0] ? this.data[0].venous_pressure : this.data.venous_pressure],
      size: [this.data[0] ? this.data[0].size : this.data.size, Validators.compose([Validators.required])],
      weight: [this.data[0] ? this.data[0].weight : this.data.weight,Validators.compose([Validators.required])],
      glucometry: [this.data[0] ? this.data[0].glucometry : this.data.glucometry],
      body_mass_index: [this.data[0] ? this.data[0].body_mass_index : this.data.body_mass_index],
      pulmonary_systolic: [this.data[0] ? this.data[0].pulmonary_systolic : this.data.pulmonary_systolic],
      pulmonary_diastolic: [this.data[0] ? this.data[0].pulmonary_diastolic : this.data.pulmonary_diastolic],
      pulmonary_half: [this.data[0] ? this.data[0].pulmonary_half : this.data.pulmonary_half],
      head_circunference: [this.data[0] ? this.data[0].head_circunference : this.data.head_circunference],
      abdominal_perimeter: [this.data[0] ? this.data[0].abdominal_perimeter : this.data.abdominal_perimeter],
      chest_perimeter: [this.data[0] ? this.data[0].chest_perimeter : this.data.chest_perimeter],
      right_reaction: [this.data[0] ? this.data[0].right_reaction : this.data.right_reaction],
      pupil_size_right: [this.data[0] ? this.data[0].pupil_size_right : this.data.pupil_size_right],
      left_reaction: [this.data[0] ? this.data[0].left_reaction : this.data.left_reaction],
      pupil_size_left: [this.data[0] ? this.data[0].pupil_size_left : this.data.pupil_size_left],
      ch_vital_hydration_id: [this.data[0] ? this.data[0].ch_vital_hydration_id : this.data.ch_vital_hydration_id, Validators.compose([Validators.required])],
      ch_vital_ventilated_id: [this.data[0] ? this.data[0].ch_vital_ventilated_id : this.data.ch_vital_ventilated_id],
      ch_vital_temperature_id: [this.data[0] ? this.data[0].ch_vital_temperature_id : this.data.ch_vital_temperature_id, Validators.compose([Validators.required])],
      ch_vital_neurological_id: [this.data[0] ? this.data[0].ch_vital_neurological_id : this.data.ch_vital_neurological_id, Validators.compose([Validators.required])],
      oxygen_type_id: [this.data[0] ? this.data[0].oxygen_type_id : this.data.oxygen_type_id],
      liters_per_minute_id: [this.data[0] ? this.data[0].liters_per_minute_id : this.data.liters_per_minute_id],
      parameters_signs_id: [this.data.parameters_signs_id],
      pupilas: [],
      has_oxigen: [(this.data[0] ? this.data[0].has_oxigen : this.data.has_oxigen) == 1 ? true : false,
      ],
    });

    this.har_ox((this.data[0] ? this.data[0].has_oxigen : this.data.has_oxigen) == 1 ? true : (this.data[0] ? this.data[0].has_oxigen : this.data.has_oxigen) == 0 ? false : (this.data[0] ? this.data[0].has_oxigen : this.data.has_oxigen));

    this.onChange();

  
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.chVitalSignsS.Update({
          id: this.data.id,
          clock: this.form.controls.clock.value,
          cardiac_frequency: this.form.controls.cardiac_frequency.value,
          respiratory_frequency: this.form.controls.respiratory_frequency.value,
          temperature: this.form.controls.temperature.value,
          oxigen_saturation: this.form.controls.oxigen_saturation.value,
          intracranial_pressure: this.form.controls.intracranial_pressure.value,
          cerebral_perfusion_pressure: this.form.controls.cerebral_perfusion_pressure.value,
          intra_abdominal: this.form.controls.intra_abdominal.value,
          pressure_systolic: this.form.controls.pressure_systolic.value,
          pressure_diastolic: this.form.controls.pressure_diastolic.value,
          pressure_half: this.form.controls.pressure_half.value,
          pulse: this.form.controls.pulse.value,
          venous_pressure: this.form.controls.venous_pressure.value,
          size: this.form.controls.size.value,
          weight: this.form.controls.weight.value,
          glucometry: this.form.controls.glucometry.value,
          body_mass_index: this.form.controls.body_mass_index.value,
          pulmonary_systolic: this.form.controls.pulmonary_systolic.value,
          pulmonary_diastolic: this.form.controls.pulmonary_diastolic.value,
          pulmonary_half: this.form.controls.pulmonary_half.value,
          head_circunference: this.form.controls.head_circunference.value,
          abdominal_perimeter: this.form.controls.abdominal_perimeter.value,
          chest_perimeter: this.form.controls.chest_perimeter.value,
          right_reaction: this.form.controls.right_reaction.value,
          pupil_size_right: this.form.controls.pupil_size_right.value,
          pupil: JSON.stringify(this.checkboxesDataList),
          observations_glucometry: this.form.controls.observations_glucometry.value,
          left_reaction: this.form.controls.left_reaction.value,
          pupil_size_left: this.form.controls.pupil_size_left.value,
          ch_vital_hydration_id: this.form.controls.ch_vital_hydration_id.value,
          ch_vital_ventilated_id: this.form.controls.ch_vital_ventilated_id.value,
          ch_vital_temperature_id: this.form.controls.ch_vital_temperature_id.value,
          ch_vital_neurological_id: this.form.controls.ch_vital_neurological_id.value,
          oxygen_type_id: this.form.controls.oxygen_type_id.value,
          liters_per_minute_id: this.form.controls.liters_per_minute_id.value,
          parameters_signs_id: [this.data.parameters_signs_id],
          has_oxigen: this.form.controls.has_oxigen.value,
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
        await this.chVitalSignsS.Save({
          clock: this.form.controls.clock.value,
          cardiac_frequency: this.form.controls.cardiac_frequency.value,
          respiratory_frequency: this.form.controls.respiratory_frequency.value,
          temperature: this.form.controls.temperature.value,
          oxigen_saturation: this.form.controls.oxigen_saturation.value,
          intracranial_pressure: this.form.controls.intracranial_pressure.value,
          cerebral_perfusion_pressure: this.form.controls.cerebral_perfusion_pressure.value,
          intra_abdominal: this.form.controls.intra_abdominal.value,
          pressure_systolic: this.form.controls.pressure_systolic.value,
          pressure_diastolic: this.form.controls.pressure_diastolic.value,
          pressure_half: this.form.controls.pressure_half.value,
          pulse: this.form.controls.pulse.value,
          venous_pressure: this.form.controls.venous_pressure.value,
          size: this.form.controls.size.value,
          weight: this.form.controls.weight.value,
          glucometry: this.form.controls.glucometry.value,
          body_mass_index: this.geteratedIMC,
          pulmonary_systolic: this.form.controls.pulmonary_systolic.value,
          pulmonary_diastolic: this.form.controls.pulmonary_diastolic.value,
          pulmonary_half: this.form.controls.pulmonary_half.value,
          head_circunference: this.form.controls.head_circunference.value,
          abdominal_perimeter: this.form.controls.abdominal_perimeter.value,
          chest_perimeter: this.form.controls.chest_perimeter.value,
          right_reaction: this.form.controls.right_reaction.value,
          pupil_size_right: this.form.controls.pupil_size_right.value,
          pupil: JSON.stringify(this.checkboxesDataList),
          observations_glucometry: this.form.controls.observations_glucometry.value,
          left_reaction: this.form.controls.left_reaction.value,
          pupil_size_left: this.form.controls.pupil_size_left.value,
          ch_vital_hydration_id: this.form.controls.ch_vital_hydration_id.value,
          ch_vital_ventilated_id: this.form.controls.ch_vital_ventilated_id.value,
          ch_vital_temperature_id: this.form.controls.ch_vital_temperature_id.value,
          ch_vital_neurological_id: this.form.controls.ch_vital_neurological_id.value,
          oxygen_type_id: this.form.controls.oxygen_type_id.value,
          liters_per_minute_id: this.form.controls.liters_per_minute_id.value,
          parameters_signs_id: this.form.controls.parameters_signs_id.value,
          has_oxigen: this.form.controls.has_oxigen.value,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            clock: '',
            cardiac_frequency: '',
            respiratory_frequency: '',
            temperature: '',
            oxigen_saturation: '',
            intracranial_pressure: '',
            cerebral_perfusion_pressure: '',
            intra_abdominal: '',
            pressure_systolic: '',
            pressure_diastolic: '',
            pressure_half: '',
            pulse: '',
            venous_pressure: '',
            size: '',
            weight: '',
            glucometry: '',
            body_mass_index: '',
            pulmonary_systolic: '',
            pulmonary_diastolic: '',
            pulmonary_half: '',
            head_circunference: '',
            abdominal_perimeter: '',
            chest_perimeter: '',
            right_reaction: '',
            pupil_size_right: '',
            pupil: '',
            observations_glucometry: '',
            left_reaction: '',
            pupil_size_left: '',
            ch_vital_hydration_id: '',
            ch_vital_ventilated_id: '',
            ch_vital_temperature_id: '',
            ch_vital_neurological_id: '',
            oxygen_type_id: '',
            liters_per_minute_id: '',
            parameters_signs_id: '',
            has_oxigen: false,
          });
          if (this.saved) {
            this.saved();
          }

        }).catch(x => {
          if (this.form.controls.has_caregiver.value == true) {
            this.isSubmitted = true;
            this.loading = true;
          } else {
            this.isSubmitted = false;
            this.loading = false;
          }

        });
      }

    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }

  }
  onChanges(event, id) {
    if (
      this.form.controls.pressure_systolic.value &&
      this.form.controls.pressure_systolic.value != '' &&
      this.form.controls.pressure_diastolic.value &&
      this.form.controls.pressure_diastolic.value != ''
    ) {
      var sys = this.form.controls.pressure_systolic.value;
      var dias = this.form.controls.pressure_diastolic.value;
      this.form.controls.pressure_half.setValue((sys + 2 * dias) / 3);
    } else {
      this.form.controls.pressure_half.setValue('');
    }
  }
  onChangesIMC(event, id) {

    if (this.form.controls.weight.value != '' && this.form.controls.size.value != '') {
      this.geteratedIMC = (this.form.controls.weight.value /
        ((this.form.controls.size.value / 100) * (this.form.controls.size.value / 100))).toFixed(2);
    } else {
      this.geteratedIMC = null;
    }

  }

  async onChange() {

    this.form.get('has_oxigen').valueChanges.subscribe(val => {
      this.har_ox(val);
    });

    this.form.get('ch_vital_ventilated_id').valueChanges.subscribe(val => {
      if (val == 9) {
  
        this.form.controls.parameters_signs_id.clearValidators();
  
        this.form.controls.parameters_signs_id.setErrors(null);
  
      } else {
        this.form.controls.parameters_signs_id.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ parameters_signs_id:''});
  
      };
    });
  }
  
    har_ox(val: boolean) {



      if (val === false) {
        this.vital_ventilated = [];
        this.oxygen_type = [];
        this.liters_per_minute = [];

        this.form.controls.ch_vital_ventilated_id.clearValidators();
        this.form.controls.oxygen_type_id.clearValidators();
        this.form.controls.liters_per_minute_id.clearValidators();
        this.form.controls.parameters_signs_id.clearValidators();

        this.form.controls.ch_vital_ventilated_id.setErrors(null);
        this.form.controls.oxygen_type_id.setErrors(null);
        this.form.controls.liters_per_minute_id.setErrors(null);
        this.form.controls.parameters_signs_id.setErrors(null);

      } else {

        this.chvitalVentilatedS.GetCollection({ status_id: 1 }).then(x => {
          this.vital_ventilated = x;
        });
        this.OxygenTypeS.GetCollection({ status_id: 1 }).then(x => {
          this.oxygen_type = x;
        });
        this.LitersPerMinuteS.GetCollection({ status_id: 1 }).then(x => {
          this.liters_per_minute = x;
        });
        this.ParametersSignsS.GetCollection({ status_id: 1 }).then((x) => {
          this.parameters_signs = x;
        });

        this.form.controls.ch_vital_ventilated_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.oxygen_type_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.liters_per_minute_id.setValidators(Validators.compose([Validators.required]));

      }
    }
  
  fetchSelectedItems($event) {
    var i = 0;
    if ($event.item) {
      this.checkboxesDataList.forEach((item) => {
        if (item.label == $event.item) {
          this.checkboxesDataList[i].isChecked = !$event.value;
        }
        i++;
      })

    }
  }
  fetchCheckedIDs($event) {
    this.checkedIDs = []
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
  }

}

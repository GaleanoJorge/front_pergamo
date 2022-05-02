import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChVitalSignsService } from '../../../../business-controller/ch-vital-signs.service';
import { ChVitalHydrationService } from '../../../../business-controller/ch-vital-hydration.service';
import { ChVitalNeurologicalService } from '../../../../business-controller/ch-vital-neurological.service';
import { ChVitalVentilatedService } from '../../../../business-controller/ch-vital-ventilated.service';
import { ChVitalTemperatureService } from '../../../../business-controller/ch-vital-temperature.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'ngx-form-signs-evo',
  templateUrl: './form-signs-evo.component.html',
  styleUrls: ['./form-signs-evo.component.scss'],
})
export class FormsignsEvoComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;

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
  public chvitsigns: any[];
  public pressure_half: any[];
  public pressure_systolic;
  public pressure_diastolic;
  public weight;
  public size;
  public body_mass_index;
  public selectedItemsList;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private chVitalSignsS: ChVitalSignsService,
    private chvitalHydrationS: ChVitalHydrationService,
    private chvitalNeurologicalS: ChVitalNeurologicalService,
    private chvitalTemperatureS: ChVitalTemperatureService,
    private chvitalVentilatedS: ChVitalVentilatedService,
    private currency: CurrencyPipe
  ) {
    
  }


  checkboxesDataList = [
    {
      id: 'mydriatic',
      label: 'MINDRIÁTICA',
      isChecked: true
    },
    {
      id: 'normal',
      label: 'NORMAL',
      isChecked: true
    },
    {
      id: 'lazy_reaction_light',
      label: 'REACCIÓN PERESOZA ( A LA LUZ)',
      isChecked: true
    },
    {
      id: 'fixed_lazy_reaction',
      label: 'REACCIÓN PERESOZA',
      isChecked: true 
    },
    {
      id: 'miotic_size',
      label: 'TAMAÑO MIÓTICA',
      isChecked: true
    }
  ]

  async ngOnInit(): Promise<void> {
    if (!this.data) {
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
        mydriatic: '',
        normal: '',
        lazy_reaction_light: '',
        fixed_lazy_reaction: '',
        miotic_size: '',
        observations_glucometry:'',
        head_circunference: '',
        abdominal_perimeter: '',
        chest_perimeter: '',
        ch_vital_hydration_id: '',
        //ch_vital_ventilated_id: '',
        ch_vital_temperature_id: '',
        ch_vital_neurological_id: '',
      };
    }

    this.chvitalHydrationS.GetCollection({ status_id: 1 }).then((x) => {
      this.vital_hydration = x;
    });
    this.chvitalNeurologicalS.GetCollection({ status_id: 1 }).then((x) => {
      this.vital_neurological = x;
    });
    this.chvitalTemperatureS.GetCollection({ status_id: 1 }).then((x) => {
      this.vital_temperature = x;
    });
    this.chvitalVentilatedS.GetCollection({ status_id: 1 }).then((x) => {
      this.vital_ventilated = x;
    });

    this.onChanges();
    this.onChanges();
    this.fetchSelectedItems();

    this.form = this.formBuilder.group({
      clock: [this.data.clock],
      cardiac_frequency: [
        this.data.cardiac_frequency,
        Validators.compose([Validators.required]),
      ],
      respiratory_frequency: [
        this.data.respiratory_frequency,
        Validators.compose([Validators.required]),
      ],
      temperature: [
        this.data.temperature,
        Validators.compose([Validators.required]),
      ],
      oxigen_saturation: [
        this.data.oxigen_saturation,
        Validators.compose([Validators.required]),
      ],
      intracranial_pressure: [this.data.intracranial_pressure],
      cerebral_perfusion_pressure: [this.data.cerebral_perfusion_pressure],
      intra_abdominal: [this.data.intra_abdominal],
      pressure_systolic: [
        this.data.pressure_systolic,
        Validators.compose([Validators.required]),
      ],
      pressure_diastolic: [
        this.data.pressure_diastolic,
        Validators.compose([Validators.required]),
      ],
      pressure_half: [this.data.pressure_half],
      pulse: [this.data.pulse],
      venous_pressure: [this.data.venous_pressure],
      size: [this.data.size, Validators.compose([Validators.required])],
      weight: [this.data.weight, Validators.compose([Validators.required])],
      glucometry: [this.data.glucometry],
      body_mass_index: [this.data.body_mass_index],
      pulmonary_systolic: [this.data.pulmonary_systolic],
      pulmonary_diastolic: [this.data.pulmonary_diastolic],
      pulmonary_half: [this.data.pulmonary_half],
      head_circunference: [this.data.head_circunference],
      abdominal_perimeter: [this.data.abdominal_perimeter],
      chest_perimeter: [this.data.chest_perimeter],
      right_reaction: [this.data.right_reaction],
      pupil_size_right: [this.data.pupil_size_right],
      left_reaction: [this.data.left_reaction],
      pupil_size_left: [this.data.pupil_size_left],
      mydriatic: [this.data.mydriatic],
      normal: [this.data.normal],
      lazy_reaction_light: [this.data.lazy_reaction_light],
      fixed_lazy_reaction: [this.data.fixed_lazy_reaction],
      miotic_size: [this.data.miotic_size],
      observations_glucometry: [this.data.observations_glucometry],
      ch_vital_hydration_id: [this.data.ch_vital_hydration_id],
      //ch_vital_ventilated_id: [this.data.ch_vital_ventilated_id],
      ch_vital_temperature_id: [
        this.data.ch_vital_temperature_id,
        Validators.compose([Validators.required]),
      ],
      ch_vital_neurological_id: [this.data.ch_vital_neurological_id],
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.chVitalSignsS
          .Update({
            id: this.data.id,
            clock: this.form.controls.clock.value,
            cardiac_frequency: this.form.controls.cardiac_frequency.value,
            respiratory_frequency:
              this.form.controls.respiratory_frequency.value,
            temperature: this.form.controls.temperature.value,
            oxigen_saturation: this.form.controls.oxigen_saturation.value,
            intracranial_pressure:
              this.form.controls.intracranial_pressure.value,
            cerebral_perfusion_pressure:
              this.form.controls.cerebral_perfusion_pressure.value,
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
            left_reaction: this.form.controls.left_reaction.value,
            pupil_size_left: this.form.controls.pupil_size_left.value,
            mydriatic: this.form.controls.mydriatic.value,
            normal:this.form.controls.normal.value,
            lazy_reaction_light: this.form.controls.lazy_reaction_light.value,
            fixed_lazy_reaction: this.form.controls.fixed_lazy_reaction.value,
            miotic_size: this.form.controls.miotic_size.value,
            observations_glucometry: this.form.controls.observations_glucometry.value,
            ch_vital_hydration_id:
              this.form.controls.ch_vital_hydration_id.value,
            //ch_vital_ventilated_id:this.form.controls.ch_vital_ventilated_id.value,
            ch_vital_temperature_id:
              this.form.controls.ch_vital_temperature_id.value,
            ch_vital_neurological_id:
              this.form.controls.ch_vital_neurological_id.value,
            type_record_id: 3,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.chVitalSignsS
          .Save({
            clock: this.form.controls.clock.value,
            cardiac_frequency: this.form.controls.cardiac_frequency.value,
            respiratory_frequency:
              this.form.controls.respiratory_frequency.value,
            temperature: this.form.controls.temperature.value,
            oxigen_saturation: this.form.controls.oxigen_saturation.value,
            intracranial_pressure:
              this.form.controls.intracranial_pressure.value,
            cerebral_perfusion_pressure:
              this.form.controls.cerebral_perfusion_pressure.value,
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
            left_reaction: this.form.controls.left_reaction.value,
            pupil_size_left: this.form.controls.pupil_size_left.value,
            mydriatic: this.form.controls.mydriatic.value,
            normal:this.form.controls.normal.value,
            lazy_reaction_light: this.form.controls.lazy_reaction_light.value,
            fixed_lazy_reaction: this.form.controls.fixed_lazy_reaction.value,
            miotic_size: this.form.controls.miotic_size.value,
            observations_glucometry: this.form.controls.observations_glucometry.value,
            ch_vital_hydration_id:
              this.form.controls.ch_vital_hydration_id.value,
            //ch_vital_ventilated_id: this.form.controls.ch_vital_ventilated_id.value,
            ch_vital_temperature_id:
              this.form.controls.ch_vital_temperature_id.value,
            ch_vital_neurological_id:
              this.form.controls.ch_vital_neurological_id.value,
            type_record_id: 3,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.form.setValue({ clock: '', cardiac_frequency: '', respiratory_frequency:'',temperature:'',oxigen_saturation:'',intracranial_pressure:'',cerebral_perfusion_pressure:'',intra_abdominal:'',
            pressure_systolic:'',pressure_diastolic:'',pressure_half:'',pulse:'',venous_pressure:'',size:'',weight:'',glucometry:'',body_mass_index:'',pulmonary_systolic:'',
            pulmonary_diastolic:'',pulmonary_half:'',head_circunference:'',abdominal_perimeter:'',chest_perimeter:'',right_reaction:'',pupil_size_right:'',left_reaction:'',pupil_size_left:'',ch_vital_hydration:'',
            //ch_vital_ventilated:'',
            ch_vital_temperature:'',ch_vital_neurological:'',pupillary_assessment:'',mydriatic:'',normal:'',lazy_reaction_light:'',fixed_lazy_reaction:'',miotic_size:'',observations_glucometry:'',});
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            if (this.form.controls.has_caregiver.value == true) {
              this.isSubmitted = true;
              this.loading = true;
            } else {
              this.isSubmitted = false;
              this.loading = false;
            }
          });
      }
    }
  }
  onChanges() {
    this.form.get('pressure_systolic').valueChanges.subscribe((val) => {
      console.log(val);
      if (val === '') {
        this.pressure_systolic = '';
        this.pressure_diastolic = '';
      } else {
        this.pressure_half.forEach((x) => {
          if (x.id == event) {
            this.pressure_systolic = this.currency.transform(x.invoice_value);
            this.pressure_diastolic = x.ordered_quantity;
            this.form.controls.unit_value.setValue( x.invoice_value + (2 * x.ordered_quantity) / 3
            );
          }
        });
      }
      this.form.patchValue({
        pressure_half: '',
      });
    });
  }
  oonChanges() {
    this.form.get('weight').valueChanges.subscribe((val) => {
      console.log(val);
      if (val === '') {
        this.weight = '';
        this.size = '';
      } else {
        this.body_mass_index.forEach((x) => {
          if (x.id == event) {
            this.weight = this.currency.transform(x.invoice_value);
            this.size = x.ordered_quantity;
            this.form.controls.unit_value.setValue( x.invoice_value / (2 * x.ordered_quantity) 
            );
          }
        });
      }
      this.form.patchValue({
        body_mass_index: '',
      });
    });
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked
    });
  }
  
}


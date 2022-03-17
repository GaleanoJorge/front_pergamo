import { Component, Input, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChVitalSignsService } from '../../../../business-controller/ch-vital-signs.service';
import { ChVitalHydrationService } from '../../../../business-controller/ch-vital-hydration.service';
import { ChVitalNeurologicalService } from '../../../../business-controller/ch-vital-neurological.service';
import { ChVitalTemperatureService } from '../../../../business-controller/ch-vital-temperature.service';
import { ChVitalVentilatedService } from '../../../../business-controller/ch-vital-ventilated.service';


@Component({
  selector: 'ngx-form-signs',
  templateUrl: './form-signs.component.html',
  styleUrls: ['./form-signs.component.scss'],
})
export class FormsignsComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;


  public form: FormGroup;
  public saved: any = null;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public ch_vital_hydration: any[];
  public ch_vital_neurological: any[];
  public ch_vital_temperature: any[];
  public ch_vital_ventilated: any[];
  public showTable;
  public chsigns: any[];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private chVitalSignsS: ChVitalSignsService,
    private chvitalHydrationS: ChVitalHydrationService,
    private chvitalNeurologicalS: ChVitalNeurologicalService,
    private chvitalTemperatureS: ChVitalTemperatureService,
    private chvitalVentilatedS: ChVitalVentilatedService,
  ) {
  }

  async ngOnInit(): Promise<void> {

    if (!this.data) {
      this.data = {
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
        fetal_heart_rate: '',
        right_reaction: '',
        pupil_size_right: '',
        left_reaction: '',
        pupil_size_left: '',
        glomerular_filtration_rate: '',
        cardiovascular_risk: '',
        vital_hydration_id: '',
        vital_ventilated_id: '',
        vital_temperature_id: '',
        vital_neurological_id: '',

      };
    }

    await this.chVitalSignsS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chsigns = x;
    });


    this.chvitalHydrationS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_vital_hydration = x;
    });
    this.chvitalNeurologicalS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_vital_neurological = x;
    });
    this.chvitalTemperatureS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_vital_temperature = x;
    });
    this.chvitalVentilatedS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_vital_ventilated = x;
    });

    this.form = this.formBuilder.group({
      cardiac_frequency: [this.data.cardiac_frequency],
      respiratory_frequency: [this.data.respiratory_frequency],
      temperature: [this.data.temperature],
      oxigen_saturation: [this.data.oxigen_saturation],
      intracranial_pressure: [this.data.intracranial_pressure],
      cerebral_perfusion_pressure: [this.data.cerebral_perfusion_pressure],
      intra_abdominal: [this.data.intra_abdominal],
      pressure_systolic: [this.data.pressure_systolic],
      pressure_diastolic: [this.data.pressure_diastolic],
      pressure_half: [this.data.pressure_half],
      pulse: [this.data.pulse],
      venous_pressure: [this.data.venous_pressure],
      size: [this.data.size],
      weight: [this.data.weight],
      glucometry: [this.data.glucometry],
      body_mass_index: [this.data.body_mass_index],
      pulmonary_systolic: [this.data.pulmonary_systolic],
      pulmonary_diastolic: [this.data.pulmonary_diastolic],
      pulmonary_half: [this.data.pulmonary_half],
      head_circunference: [this.data.head_circunference],
      abdominal_perimeter: [this.data.abdominal_perimeter],
      chest_perimeter: [this.data.chest_perimeter],
      fetal_heart_rate: [this.data.fetal_heart_rate],
      right_reaction: [this.data.right_reaction],
      pupil_size_right: [this.data.pupil_size_right],
      left_reaction: [this.data.left_reaction],
      pupil_size_left: [this.data.pupil_size_left],
      glomerular_filtration_rate: [this.data.glomerular_filtration_rate],
      cardiovascular_risk: [this.data.cardiovascular_risk],
      vital_hydration_id: [this.data.vital_hydration_id],
      vital_ventilated_id: [this.data.vital_ventilated_id],
      vital_temperature_id: [this.data.vital_temperature_id],
      vital_neurological_id: [this.data.vital_neurological_id],
    });
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.chVitalSignsS.Update({
          id: this.data.id,
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
          fetal_heart_rate: this.form.controls.fetal_heart_rate.value,
          right_reaction: this.form.controls.right_reaction.value,
          pupil_size_right: this.form.controls.pupil_size_right.value,
          left_reaction: this.form.controls.left_reaction.value,
          pupil_size_left: this.form.controls.pupil_size_left.value,
          glomerular_filtration_rate: this.form.controls.glomerular_filtration_rate.value,
          cardiovascular_risk: this.form.controls.cardiovascular_risk.value,
          vital_hydration_id: this.form.controls.vital_hydration_id.value,
          vital_ventilated_id: this.form.controls.vital_ventilated_id.value,
          vital_temperature_id: this.form.controls.vital_temperature_id.value,
          vital_neurological_id: this.form.controls.vital_neurological_id.value,
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
        this.chVitalSignsS.Save({
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
          fetal_heart_rate: this.form.controls.fetal_heart_rate.value,
          right_reaction: this.form.controls.right_reaction.value,
          pupil_size_right: this.form.controls.pupil_size_right.value,
          left_reaction: this.form.controls.left_reaction.value,
          pupil_size_left: this.form.controls.pupil_size_left.value,
          glomerular_filtration_rate: this.form.controls.glomerular_filtration_rate.value,
          cardiovascular_risk: this.form.controls.cardiovascular_risk.value,
          vital_hydration_id: this.form.controls.vital_hydration_id.value,
          vital_ventilated_id: this.form.controls.vital_ventilated_id.value,
          vital_temperature_id: this.form.controls.vital_temperature_id.value,
          vital_neurological_id: this.form.controls.vital_neurological_id.value,
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
      }
    }
  }
}

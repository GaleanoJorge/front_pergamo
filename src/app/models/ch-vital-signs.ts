import { MainClass } from './main-class';

export class ChVitalSigns extends MainClass {
    id: number;
    clock: string;
    cardiac_frequency: number;
    respiratory_frequency: number;
    temperature: string;
    oxigen_saturation: number;
    intracranial_pressure: number;
    cerebral_perfusion_pressure: number;
    intra_abdominal: number;
    pressure_systolic: number;
    pressure_diastolic: number;
    pressure_half: number;
    pulse: number;
    venous_pressure: number;
    size: string;
    weight: string;
    glucometry: number;
    body_mass_index: string;
    pulmonary_systolic: number;
    pulmonary_diastolic: number;
    pulmonary_half: number;
    head_circunference: number;
    abdominal_perimeter: number;
    chest_perimeter: number;
    right_reaction: string;
    pupil_size_right: string;
    left_reaction: string;
    pupil_size_left: string;
    ch_vital_hydration_id: number;
    ch_vital_ventilated_id: number;
    ch_vital_temperature_id: number;
    ch_vital_neurological_id: number;
    type_record_id: number;
    ch_record_id: number;
}

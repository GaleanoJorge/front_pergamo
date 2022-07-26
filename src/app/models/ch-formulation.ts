import { MainClass } from './main-class';

export class ChFormulation extends MainClass{
    id: number;
    administration_route_id: number;
    hourly_frequency_id: number;
    medical_formula: string;
    treatment_days: number;
    outpatient_formulation: string;
    observation: string;
    dose: string;
    type_record_id: number;
    ch_record_id: number;
}

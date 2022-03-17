import { MainClass } from './main-class';

export class ChDiagnosis extends MainClass {
    id: number;
    status: string;
    ch_diagnosis_type_id: number;
    ch_diagnosis_class_id: number;
    diagnosis_id: number;
    diagnosis_observation: string;
    type_record_id: number;
    ch_record_id: number;
}


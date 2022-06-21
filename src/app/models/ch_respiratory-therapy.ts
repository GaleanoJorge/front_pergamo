import { MainClass } from './main-class';

export class ChRespiratoryTherapy extends MainClass {
    id: number;
    medical_diagnosis_id:string;
    therapeutic_diagnosis_id:number;
    reason_consultation:string;
    ch_background_id:number;
    ch_gynecologists_id:number;
    type_record_id: number;
    ch_record_id: number;
}

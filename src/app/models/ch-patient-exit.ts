import { MainClass } from './main-class';

export class ChPatientExit extends MainClass{
    id: number;
    exit_status: string;
    legal_medicine_transfer: string;
    date_time: string;
    death_diagnosis_id: number;
    medical_signature: string;
    death_certificate_number: string;
    ch_diagnosis_id: number;
    exit_diagnosis_id: number;
    relations_diagnosis_id: number;
    reason_exit_id: number;
    type_record_id: number;
    ch_record_id: number;
}

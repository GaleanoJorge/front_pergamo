import { MainClass } from './main-class';

export class ChMedicalOrders extends MainClass{
    id: number;
    ambulatory_medical_order: string;
    procedure_id: number;
    amount: number;
    frequency_id: number;
    observations: string;
    type_record_id: number;
    ch_record_id: number;
}

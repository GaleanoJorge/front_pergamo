import { MainClass } from './main-class';

export class ChNursingEntry extends MainClass{
    id: number;
    patient_position_id: number;
    observation_position: string;
    ostomy_id: number;
    observation: string;
    hair_revision: string;
    type_record_id: number;
    ch_record_id: number;
}

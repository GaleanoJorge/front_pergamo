import { MainClass } from './main-class';

export class ChPsRelationship extends MainClass {
    
    id: number;
    position: string;
    self_care: string;
    visual: string;
    verbal: string;
    appearance: string;
    att_observations: string;
    aw_observations: string;
    sl_observations: string;
    eo_observations: string;
    sex_observations: string;
    fee_observations: string;
    ex_observations: string;
    ch_ps_attitude_id: number;
    ch_ps_awareness_id: number;
    ch_ps_sleep_id: number;
    ch_ps_exam_others_id: number;
    ch_ps_sexuality_id: number;
    ch_ps_feeding_id: number;
    ch_ps_excretion_id: number;
    
}
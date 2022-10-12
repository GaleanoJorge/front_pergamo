import { MainClass } from './main-class';

export class ChPsThought extends MainClass {
    GetCollection() {
      throw new Error('Method not implemented.');
    }
    id: number;
    grade: string;
    contents: string;
    prevalent: string;
    observations: string;
    ch_ps_speed_id: number;
    ch_ps_delusional_id: number;
    ch_ps_overrated_id: number;
    ch_ps_obsessive_id: number;
    ch_ps_association_id: number; 
}

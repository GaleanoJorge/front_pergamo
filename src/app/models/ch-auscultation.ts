import { MainClass } from './main-class';

export class ChAuscultation extends MainClass {
    id: number;
    expansion:string;
    masses:string;
    crepitations:string;
    fracturues:string;
    airway:string;
    pain:string;
    type_record_id: number;
    ch_record_id: number;
}

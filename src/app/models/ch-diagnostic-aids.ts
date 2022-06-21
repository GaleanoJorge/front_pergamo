import { MainClass } from './main-class';

export class ChDiagnosticAids extends MainClass {
    id: number;
    scan:string;
    spirometry:string;
    gases:string;
    polysomnography:string;
    other:string;
    observation:string;
    type_record_id: number;
    ch_record_id: number;
}

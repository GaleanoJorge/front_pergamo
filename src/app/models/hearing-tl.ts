import { MainClass } from './main-class';

export class HearingTl extends MainClass{
    id: number;
    external_ear: string;
    middle_ear: string;
    inner_ear: string;
    observations: string;
    type_record_id: number;
    ch_record_id: number;
}

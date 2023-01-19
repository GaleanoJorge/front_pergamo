import { MainClass } from './main-class';

export class ChRecord extends MainClass {
    id: number;
    status: string;
    date_attention: Date;
    admissions_id: number;
    user_id: number;
    date_finish: Date;
    url: string;
}

import { MainClass } from './main-class';

export class ChRecord extends MainClass {
    id: number;
    status: string;
    date_attention: Date;
    admissions_id: string;
    user_id: string;
    date_finish: Date;
}

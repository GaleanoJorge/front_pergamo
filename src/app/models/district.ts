import {MainClass} from './main-class';
import {Status} from './status';
import {SectionalCouncil } from './sectional-council';

export class District extends MainClass {
    id: number;
    status_id: number;
    name: string;
    sectional_council_id:number;
    status: Status;
    sectional: SectionalCouncil;
}
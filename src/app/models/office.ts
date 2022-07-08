import {MainClass} from './main-class';
import {Status} from './status';

export class Office extends MainClass {
    id: number;
    status_id: number;
    name: string;
    status: Status;
}
import {MainClass} from './main-class';
import {Status} from './status';

export class Position extends MainClass {
    id: number;
    status_id: number;
    name: string;
    status: Status;
    is_judicial: boolean;
}
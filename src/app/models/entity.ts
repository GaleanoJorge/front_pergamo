import {MainClass} from './main-class';
import {Status} from './status';

export class Entity extends MainClass {
  id: number;
  status_id: number;
  name: string;
  sntities: string;
  status: Status;
  is_judicial: boolean;
}

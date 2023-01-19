import {MainClass} from './main-class';
import {Status} from './status';

export class Circuit extends MainClass {
  id: number;
  status_id: number;
  name: string;
  entities: string;
}

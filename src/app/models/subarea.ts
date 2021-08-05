import {MainClass} from './main-class';
import {Status} from './status';

export class Subarea extends MainClass {
  id: number;
  status_id: number;
  name: string;
  description: string;
  status: Status;
  data:Object;
}

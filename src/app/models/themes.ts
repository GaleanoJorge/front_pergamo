import {MainClass} from './main-class';
import {Status} from './status';

export class Themes extends MainClass {
  id: number;
  status_id: number;
  name: string;
  description: string;
  status: Status;
  checked?: boolean;
  data:Object;
}

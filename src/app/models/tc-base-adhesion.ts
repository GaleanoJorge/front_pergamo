import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class TcBaseAdhesion extends MainClass {
  id: number;
  agent: string;
  name: string;
  date_init: string;
  date_end: string;
  total_login: string;
}

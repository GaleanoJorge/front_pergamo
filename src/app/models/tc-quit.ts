import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class TcQuit extends MainClass {
  id: number;
  phone: string;
  status_call: string;
  agent: string;
  date_time: string;
  duration_seg: string;
  uniqueid: string;
  cedula_RUC: string;
  first_name: string;
  last_name: string;
  observations: string;
  fila: string;
}

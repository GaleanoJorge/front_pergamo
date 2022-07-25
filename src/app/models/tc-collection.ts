import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class TcCollection extends MainClass {
  id: number;
  transaction_date: string;
  period: string;
  nit: string;
  entity: string;
  bank_value: string;
}

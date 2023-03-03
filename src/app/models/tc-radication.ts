import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class TcRadication extends MainClass {
  id: number;
  invoice: string;
  invoice_date: string;
  entity: string;
  filing_date: string;
  status: string;
  total_eps: number;
  ambit: string;
  campus: string;
  filing_period: string;
  year: string;
}

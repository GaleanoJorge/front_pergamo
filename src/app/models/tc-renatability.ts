import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class TcRentability extends MainClass {
  id: number;
  cost_center: string;
  cc1: string;
  cc2: string;
  cc3: string;
  cc4: string;
  area1: number;
  area2: string;
  area3: string;
  area4: string;
  name_cost_center: string;
  bill: string;
  name_bill: string;
  value: string;
  month: number;
  year: string;
}

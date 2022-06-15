import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class FixedLoan extends MainClass {
  id: number;
  amount: number;
  amount_damaged: number;
  amount_provition: number;
  fixed_add_id: number;
  responsible_user_id: number;
  observation: string;
}

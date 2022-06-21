import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class FixedAccessories extends MainClass {
  id: number;
  name: string;
  amount: number;
  fixed_type_id: number;
  campus_id: number;
}

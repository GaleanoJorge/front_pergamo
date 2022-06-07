import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class FixedLoan extends MainClass {
  id: number;
  own_user_id: number;
  fixed_assets_id: number;
  fixed_stock_accessories_id: number;
  fixed_location_campus_id: number;
  responsible_user_id: number;
  observation: string;
  request_user_id: number;
  status: string;
}

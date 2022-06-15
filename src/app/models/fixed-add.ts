import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class FixedAdd extends MainClass {
  id: number;
  fixed_assets_id: number;
  fixed_accessories_id: number;
  fixed_location_campus_id: number;
  responsible_user_id: number;
  observation: string;
  request_amount: string;
  status: string;
}

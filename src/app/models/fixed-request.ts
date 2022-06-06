import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class FixedRequest extends MainClass {
  id: number;
  fixed_type_id: number;
  fixed_assets_id: number;
  fixed_accessories_id: number;
  request_user_id: number;
  patient_id: number;
  request_amount: number;
  status: string;
}

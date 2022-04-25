import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class PharmacyPermission extends MainClass {
  id: number;
  pharmacy_stock_id: number;
  permission_id: number;
  user_id: number;
}

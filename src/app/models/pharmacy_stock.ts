import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class PharmacyStock extends MainClass {
  id: number;
  name: string;
  type_pharmacy_stock_id: number;
  campus_id: number;
  permission_pharmacy_stock_id: number;
}

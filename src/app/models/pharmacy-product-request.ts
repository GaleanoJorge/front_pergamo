import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class PharmacyProductRequest extends MainClass {
  id: number;
  amount: number;
  product_generic_id: number;
  pharmacy_stock_id: number;
}

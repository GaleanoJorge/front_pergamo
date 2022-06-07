import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class PharmacyProductRequest extends MainClass {
  id: number;
  request_amount: number;
  status: string;
  observation: string;
  product_generic_id: number;
  own_pharmacy_stock_id: number;
  request_pharmacy_stock_id: number;
}

import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class PharmacyLotStock extends MainClass {
  id: number;
  lot: string;
  amount_total: string;
  sample: string;
  actual_amount: string;
  expiration_date: string;
  pharmacy_lot_id: number;
  billing_stock_id: number;
}

import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class LogPharmacyLot extends MainClass {
  id: number;
  lot: string;
  actual_amount: string;
  sample: string;
  expiration_date: string;
  billing_stock_id: string;
  pharmacy_lot_stock_id: string;
}

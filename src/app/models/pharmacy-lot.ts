import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class PharmacyLot extends MainClass {
  id: number;
  subtotal: string;
  vat: string;
  total: string;
  receipt_date: string;
  pharmacy_stock_id: number;  
}

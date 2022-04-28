import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class PharmacyLot extends MainClass {
  id: number;
  enter_amount: string;
  unit_value: string;
  lot: string;
  expiration_date: string;
  billing_id: number;
  billing_stock_id: number;  
  pharmacy_stock_id: number;  
}

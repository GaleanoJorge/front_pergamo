import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class PharmacyUpdateMaxMin extends MainClass {
  id: number;
  pharmacy_lot_stock_id: number;
  own_pharmacy_stock_id: number;
  request_pharmacy_stock_id: number;
}

import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class PharmacyInventory extends MainClass {
  id: number;
  pharmacy_stock_id: number;
  pharmacy_lot_id: number;
}

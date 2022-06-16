import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class ProductSuppliesCom extends MainClass {
  id: number;
  name: string;
  factory_id: number;
  product_supplies_id: number;
  invima_registration: string;
  invima_status_id: number;
  sanitary_registration_id: number;
  code_cum_file: string;
  code_cum_consecutive: number;
  high_price: number;
  date_cum: string;
  unit_packing: string;
  packing_id: number;
  useful_life: string;
}

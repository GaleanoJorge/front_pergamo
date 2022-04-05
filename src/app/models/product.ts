import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class Product extends MainClass {
  id: number;
  code: string;
  name: string;
  factory_id: number;
  product_generic_id: number;
  invima_registration: string;
  invima_status_id: number;
  sanitary_registration_id: number;
  storage_conditions_id: number;
  risk_id: number;
  code_cum_file: string;
  code_cum_consecutive:number;
  regulated_drug: number;
  high_price: number;
  maximum_dose: string;
  indications: string;
  contraindications: string;
  applications: string;
  minimum_stock: number;
  maximum_stock: number;
  generate_iva: number;
  date_cum: string;
}

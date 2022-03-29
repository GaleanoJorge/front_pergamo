import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class ProductGeneric extends MainClass {
  id: number;
  name: string;
  drug_concentration_id: number;
  measurement_units_id: number;
  product_presentation_id: number;
  description: string;
  product_genericcol: string;
  pbs_type_id: number;
  product_subcategory_id: number;
  consumption_unit_id: number;
  administration_route_id: number;
  special_controller_medicene:number;
  code_atc: string;
  implantable: number;
  reuse_id: number;
  invasive: number;
  consignment: number;
}

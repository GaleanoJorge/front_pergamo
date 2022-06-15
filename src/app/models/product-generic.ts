import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class ProductGeneric extends MainClass {
  id: number;
  drug_concentration_id: number;
  measurement_units_id: number;
  product_presentation_id: number;
  description: string;
  product_genericcol: string;
  pbs_type_id: number;
  pbs_restriction: string;
  nom_product_id: number;
  administration_route_id: number;
  special_controller_medicene:number;
  code_atc: string;
  implantable: number;
  dose: string;
  product_dose_id: number;
  reuse_id: number;
  invasive: number;
  minimum_stock: number;
  maximum_stock: number;
  consignment: number;
}

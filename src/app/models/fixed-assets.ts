import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class FixedAssets extends MainClass {
  id: number;
  name: string;
  product_presentation_id: number;
  product_subcategory_id: number;
  consumption_unit_id: number;
  plate_number: string;
  factory_id:number;
  type_assets_id: number;
}

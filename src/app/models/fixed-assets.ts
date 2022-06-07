import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class FixedAssets extends MainClass {
  id: number;
  fixed_clasification_id: string;
  fixed_type_id: number;
  fixed_property_id: number;
  obs_property: string;
  plaque: string;
  name: string;
  model: string;
  amount: string;
  mark: string;
  serial: string;
  description: string;
  detail_description: string;
  color: string;
  fixed_condition_id: number;
  company_id: number;
}

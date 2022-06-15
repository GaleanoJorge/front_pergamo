import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class ServicesBriefcase extends MainClass {
  id: number;
  name: string;
  factor: number;
  value: number;
  contract_id: number;
  campus_id: number;
  manual_price_id: number;
  type_briefcase_id: number;  
}

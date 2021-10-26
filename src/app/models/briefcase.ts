import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class Briefcase extends MainClass {
  id: number;
  contract_id: number;
  name: string;
  type_briefcase_id: number;
  coverage_id: number;
  modality_id: number;
  status_id: number;
}

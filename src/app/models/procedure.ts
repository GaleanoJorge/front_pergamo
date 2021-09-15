import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class Procedure extends MainClass {
  id: number;
  code: string;
  equivalent: string;
  name: string;
  category_id: number;
  nopos: number;
  age_id: number;
  gender_id: number;
  status_id: number;
  purpose_id: number;
  time: Time;
  
  
}

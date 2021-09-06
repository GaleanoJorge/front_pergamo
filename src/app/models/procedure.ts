import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class Procedure extends MainClass {
  id: number;
  prd_code: string;
  prd_equivalent: string;
  prd_name: string;
  prd_category: number;
  prd_nopos: number;
  prd_age: number;
  prd_gender: number;
  prd_state: number;
  prd_purpose: number;
  prd_time: Time;
  
  
}

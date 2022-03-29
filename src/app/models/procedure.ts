import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class Procedure extends MainClass {
  id: number;
  code: string;
  equivalent: string;
  name: string;
  procedure_category_id: number;
  pbs_type_id: number;
  procedure_age_id: number;
  gender_id: number;
  status_id: number;
  procedure_purpose_id: number;
  purpose_service_id: number;
  procedure_type_id: number;
  time: Time;
  
  
}

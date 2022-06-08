import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class Factory extends MainClass {
  id: number;
  identification_type_id: number;
  identification: string;
  verification: number;
  name: string;
  status_id:number;
  
}

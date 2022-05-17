import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class TcBilling extends MainClass {
  id: number;
  consecutive: string;
  date: string;
  made_by: string;
  value: number;
  entity: string;
  branch_office: string;
  procedures: string;
  doctor: string;
  details: string;
  period: string;
  consecutive2: string;
  ambit: string;
  campus: string;
}

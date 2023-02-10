import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class ReportBilling extends MainClass {
  id: number;
  initial_report: string;
  final_report: string;
  billing: string;
  status: string;
  user_id: string;
}

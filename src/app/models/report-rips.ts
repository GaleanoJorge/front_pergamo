import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class ReportRips extends MainClass {
  id: number;
  initial_report: string;
  final_report: string;
  company_id: string;
  user_id: string;
}

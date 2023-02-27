import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class ReportPharmacy extends MainClass {
  id: number;
  initial_report: string;
  final_report: string;
  pharmacy_stock_id: string;
  status: string;
  user_id: string;
}

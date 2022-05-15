import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class Billing extends MainClass {
  id: number;
  company_id: number;
  pharmacy_stock_id: number;
  type_billing_evidence_id: number;
}

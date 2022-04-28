import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class Billing extends MainClass {
  id: number;
  company_id: number;
  num_evidence: string;
  sub_total: string;
  vat: string;
  setting_value: string;
  invoice_value: string;
  type_billing_evidence_id: number;
}

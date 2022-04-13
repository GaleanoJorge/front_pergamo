import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class Billing extends MainClass {
  id: number;
  provider_name: string;
  num_evidence: string;
  ordered_quantity: string;
  sub_total: string;
  vat: string;
  setting_value: string;
  invoice_value: string;
  type_billing_evidence_id: number;
  pharmacy_stock_id: number;
}

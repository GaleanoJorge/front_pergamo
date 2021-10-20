import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class Contract extends MainClass {
  id:number;
  number_contract: string;
  name: string;
  company_id: number;
  type_contract_id: number;
  occasional: number;
  amount: number;
  start_date: Date;
  finish_date:Date;
  status_id: number;
  firms_id: number;
  civil_liability_policy:string;
  value_civil_policy: number;
  start_date_civil_policy:Date;
  finish_date_civil_policy: Date;
  civil_policy_insurance_id:number;
  contractual_liability_policy: string;
  value_contractual_policy:number;
  start_date_contractual_policy: Date;
  finish_date_contractual_policy:Date;
  contractual_policy_insurance_id: number;
  date_of_delivery_of_invoices: Date;
  expiration_days_portfolio: number;
  observations: string;
  objective: string;
}

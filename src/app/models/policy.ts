import { MainClass } from './main-class';

export class Policy extends MainClass {
  id: number;
  contract_id: number;
  value_policy: number;
  policy_type_id: number;
  insurance_carrier_id: number;
  start_date: Date;
  finish_date: Date;
  policy_file: string;
}

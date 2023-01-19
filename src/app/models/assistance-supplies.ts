import { MainClass } from './main-class';

export class AssistanceSupplies extends MainClass {
  id: number;
  user_incharge_id: number;
  pharmacy_product_request_id: number;
  ch_record_id: number;
  supplies_status_id: number;
  observation: string;
}

import { MainClass } from './main-class';

export class BillingStockRequest extends MainClass {
  id: number;
  amount: number;
  amount_unit: number;
  billing_id: number;
  product_generic_id: number;
  product_supplies_id: number;
}

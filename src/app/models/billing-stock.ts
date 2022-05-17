import { MainClass } from './main-class';

export class BillingStock extends MainClass {
  id: number;
  amount: number;
  amount_unit: number;
  billing_id: number;
  product_id: number;
}

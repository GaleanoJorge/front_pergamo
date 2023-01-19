import { MainClass } from './main-class';

export class BillingStock extends MainClass {
  id: number;
  amount: number;
  amount_unit: number;
  iva: number;
  billing_id: number;
  product_id: number;
  product_supplies_com_id: number;
}

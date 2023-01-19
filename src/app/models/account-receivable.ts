import { Double } from '@syncfusion/ej2/charts';
import { UsersComponent } from '../pages/setting/users/users.component';
import { GlossAmbit } from './gloss-ambit';
import { MainClass } from './main-class';
import { StatusBill } from './status-bill';
import { User } from './user';

export class AccountReceivable extends MainClass {
  id: number;
  file_payment: string;
  user_id: User;
  gloss_ambit_id: GlossAmbit;
  status_bill_id: StatusBill;
  minimum_salary_id: Double;
  gross_value_activities: Double;
  net_value_activities: Double;
  observation: string;
}

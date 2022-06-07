import { Double } from '@syncfusion/ej2/charts';
import { UserActivityData } from '../@core/data/user-activity';
import { AccountReceivable } from './account-receivable';
import { MainClass } from './main-class';
import { User } from './user';

export class BillUserActivity extends MainClass {
  id: number;
  num_activity: number;
  user_id: User;
  account_receivable_id: AccountReceivable;
  user_activity_id: UserActivityData;
  value_total: Double;
  observation: string;
  


}


import { AccountReceivable } from './account-receivable';

import { MainClass } from './main-class';


export class Retentions extends MainClass {
  id: number;
    account_receivable_id: AccountReceivable;
    rrt_salary: string;
    rrt_comprehensive_salary: string;
    rrt_means_transport: string;
    rrt_holidays: string;
    incr_mandatory_pension_contributions: string;
    incr_mandatory_fund_contributions: string;
    incr_voluntary_contributions_funds: string;
    incr_non_rental_income: string;
    d_home_interest_payment: string;
    d_dependent_payments: string;
    d_health_payments: string;
    re_contributions_voluntary_pension_fund: string;
    re_contributions_accounts_AFC: string;
    re_other_extensive_income: string;

}

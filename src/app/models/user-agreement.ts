import { Company } from './company';
import { MainClass } from './main-class';

export class UserAgreement extends MainClass {
  id: number;
  company_id: number;
  user_id: number;
  company: Company;
}

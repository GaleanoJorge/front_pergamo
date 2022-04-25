import { GlossAmbit } from './gloss-ambit';
import { MainClass } from './main-class';
import { Procedure } from './procedure';
import { User } from './user';

export class UserActivity extends MainClass {
  id: number;
  user_id: User;
  procedure_id: Procedure;
  gloss_ambit_id: GlossAmbit;

}

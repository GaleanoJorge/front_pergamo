import { MainClass } from './main-class';
import { ObservationNovelty } from './observation-novelty';
import { User } from './user';

export class UserChange extends MainClass {
  id: number;
  name: string;
  wrong_user_id: User;
  right_user_id: User;
  observation_novelty_id: ObservationNovelty;

}

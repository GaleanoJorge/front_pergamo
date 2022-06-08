import { Campus } from './campus';
import { User } from './user';

export class UserCampus {
    id: number;
    user_id: number;
    campus_id: number;
    user: User;
    campus: Campus;
}

import { AssistanceSession } from './assistance-session';
import { MainClass } from './main-class';
import { UserRole } from './user-role';

export class UserRoleGroup extends MainClass {
    id: number;
    user_role_id: number;
    group_id: number;
    status_id: number;
    user_role: UserRole;
    assistance_session?: AssistanceSession[];
}

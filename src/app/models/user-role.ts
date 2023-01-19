import { Role } from './role';
import { User } from './user';
import { UserRoleCourse } from './user-role-course';

export class UserRole {
    id: number;
    user_id: number;
    role_id: number;
    user: User;
    role: Role;
    user_role_course: UserRoleCourse[];
}

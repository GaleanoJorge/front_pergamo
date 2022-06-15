import { Status } from './status';
import { UserRole } from './user-role';
import { Course } from './course';

export class UserCourse {
    id: number;
    status_id: number;
    user_role_id: number;
    course_id: number;
    status: Status;
    user_role: UserRole;
    course: Course;
}

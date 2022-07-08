import { Role } from './role';
import { User } from './user';
import { MainClass } from './main-class';
import { UserRole } from './user-role';
import { CourseInstitutionCohort } from './course-institution-cohort';

export class UserRoleCourse extends MainClass {
    id: number;
    course_institution_cohort_id: number;
    status_id: number;
    user_role_id: number;
    user_role: UserRole;
    course_institution_cohort: CourseInstitutionCohort;
}

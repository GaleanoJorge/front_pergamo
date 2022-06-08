import { Category } from './category';
import { Status } from './status';
import { EducationalInstitution } from './educational-institution';
import { MainClass } from './main-class';
import { Course } from './course';
import { CourseInstitutionCohort } from './course-institution-cohort';

export class CourseEducationalInstitution extends MainClass {
    id: number;
    course_id: number;
    educational_institution_id: number;
    course: Course;
    educational_institution: EducationalInstitution;
    course_institution_cohorts: CourseInstitutionCohort[];
}

import { CourseEducationalInstitution } from './course-educational-institution';
import { MainClass } from './main-class';

export class CourseInstitutionCohort extends MainClass {
    id: number;
    cohort: string;
    course_institution_id: number;
    course_educational_institution: CourseEducationalInstitution;
}

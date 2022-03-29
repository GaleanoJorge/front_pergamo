import { Municipality } from './municipality';
import { CourseEducationalInstitution } from './course-educational-institution';

export class EducationalInstitution {
    id: number;
    municipality_id: number;
    name: string;
    parent_id: number;
    latitude: string;
    longitude: string;
    institution: EducationalInstitution;
    municipality: Municipality;
    course_educational_institution: CourseEducationalInstitution[];
}

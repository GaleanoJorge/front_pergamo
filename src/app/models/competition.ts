import { MainClass } from './main-class';
import { Course } from './course';
import { Activity } from './activity';
import { Goal } from './goal';
import { Criterion } from './criterion';

export class Competition extends MainClass {
    id: number;
    course_id: number;
    name: string;
    description: string;
    course: Course;
    activities: Activity[];
    goals: Goal[];
    checked?: boolean;
    criterion: Criterion[];
}

import { Course } from './course';
import { MainClass } from './main-class';

export class Group extends MainClass {
  id: number;
  course_id: number;
  name: string;
  description: string;
  code: string;
  course: Course;
}

import {MainClass} from './main-class';
import {CourseBase} from './coursebase';
import { AnswerType } from './answer-type';

export class Section extends MainClass {
  id: number;  
  name: string;
  description:string;
  coursebase_id: CourseBase;
  is_matriz: number;
  answer_type_id: AnswerType;			
}

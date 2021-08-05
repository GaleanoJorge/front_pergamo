import { AnswerType } from './answer-type';
import {MainClass} from './main-class';

export class Answer extends MainClass {
  id: number;  
  name: string;
  answer_type_id: AnswerType;
  order:number;
  value:number;				
}

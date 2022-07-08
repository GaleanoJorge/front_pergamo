import { Answer } from './answer';
import {MainClass} from './main-class';
import { Question } from './question';

export class AnswerQuestion extends MainClass {
  id: number;  
  answer_id: number;
  answer:Answer;
  question_id:number;
  question:Question
  order:number;			
}

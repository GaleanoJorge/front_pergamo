import { AnswerType } from './answer-type';
import {MainClass} from './main-class';

export class HumanTalentRequest extends MainClass {
  id: number;  
  admissions_id: string;
  management_plan_id: AnswerType;
  observation:number;
  status:number;				
}

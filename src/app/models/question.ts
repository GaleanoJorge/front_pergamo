import {MainClass} from './main-class';
import { QuestionType } from './question-type';
import { Section } from './section';
import { Status } from './status';

export class Question extends MainClass {
  id: number;
  description: string;
  name: string;
  question_type_id: QuestionType;
  section_id: Section;
  order:number;
  attribute:string;
  status_id: Status;
  aling:string;		
}
	
	



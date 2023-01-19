import { MainClass } from './main-class';
import { SpecialField } from './special-field';
import { Assistance } from './assistance'

export class AssistanceSpecial extends MainClass {
  id: number;
  specialty_id: SpecialField;
  assistance_id: Assistance; 
  assistance_special: AssistanceSpecial;
}


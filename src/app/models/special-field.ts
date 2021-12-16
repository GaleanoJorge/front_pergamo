import { MainClass } from './main-class';
import { TypeProfessional } from './type-professional';

export class SpecialField extends MainClass {
  id: number;
  name: string;
  type_professional_id: TypeProfessional;
}


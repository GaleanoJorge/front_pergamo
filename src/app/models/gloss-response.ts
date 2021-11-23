import { MainClass } from './main-class';

export class GlossResponse extends MainClass {
  id: number;
  user_id: number;
  gloss_id: number;
  objetion_code_response_id: number;
  objetion_response_id: number;
  response_date: string;
  accepted_value: string;
  value_not_accepted: string;
}

import { MainClass } from './main-class';

export class ChNutritionGastrointestinal extends MainClass {
  id: number;
  bowel_habit: string;
  vomit: boolean;
  amount_of_vomit: number;
  nausea: boolean;
  observations: string;
  type_record_id: number;
  ch_record_id: number;
}

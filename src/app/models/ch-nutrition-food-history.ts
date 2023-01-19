import { MainClass } from './main-class';

export class ChNutritionFoodHistory extends MainClass {
  id: number;
  description: string;
  is_allergic: boolean;
  allergy: string;
  appetite: string;
  intake: string;
  swallowing: string;
  diet_type: string;
  parenteral_nutrition: string;
  intake_control: string;
  type_record_id: number;
  ch_record_id: number;
}

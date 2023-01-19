import { MainClass } from './main-class';

export class ChNutritionAnthropometry extends MainClass {
  id: number;
  is_functional: boolean;
  weight: number;
  size: number;
  arm_circunferency: number;
  calf_circumference: number;
  knee_height: number;
  abdominal_perimeter: number;
  hip_perimeter: number;
  geteratedIMC: number;
  classification: string;
  estimated_weight: number;
  estimated_size: number;
  total_energy_expenditure: number;
  type_record_id: number;
  ch_record_id: number;
}

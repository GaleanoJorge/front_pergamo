import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class FixedAssets extends MainClass {
  id: number;
  fixed_clasification_id: string;
  fixed_type_id: number;
  fixed_property_id: number;
  obs_property: string;
  plaque: string;
  name: string;
  model: string;
  amount_total: string;
  actual_amount: string;
  mark: string;
  serial: string;
  description: string;
  detail_description: string;
  color: string;
  fixed_condition_id: number;
  company_id: number;

  calibration_certificate: string;
  health_register: string;
  warranty: string;
  cv: string;
  last_maintenance: string;
  last_pame: string;
  interventions_carriet: string;
  type: string;
  mobile_fixed: string;
  clasification_risk_id: string;
  biomedical_classification_id: string;
  code_ecri: string;
  form_acquisition: string;
  date_adquisicion: string;
  date_warranty: string;
  useful_life: string;
  cost: number;
  maker: string;
  phone_maker: string;
  email_maker: string;
  power_supply: string;
  predominant_technology: string;
  volt: string;
  stream: string;
  power: string;
  frequency_rank: string;
  temperature_rank: string;
  humidity_rank: string;
  manuals: string;
  guide: string;
  periodicity_frequency_id: string;
  calibration_frequency_id: string;

}

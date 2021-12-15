import { ContractType } from './contract-type';
import { CostCenter } from './cost-center';
import { MainClass } from './main-class';
import { TypeProfessional } from './type-professional';
import { User } from './user';


export class Assistance extends MainClass {
  id: number;
  user_id: User;
  medical_record_id: string;
  contract_type_id: ContractType;
  cost_center_id: CostCenter;
  type_professional_id: TypeProfessional;
  attends_external_consultation: number;
  serve_multiple_patients: number;
  file_firm: string;
  
}


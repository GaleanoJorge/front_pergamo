import { MainClass } from './main-class';

export class PatientData extends MainClass {
  id: number;
  user_id: number;
  patient_data_type: number;
  policy_type_id: number;
  patient_data_firstname: string;
  patient_data_middlefirstname: string;
  patient_data_lastname: string;
  patient_data_middlelastname: string;
  patient_data_identification: number;
  patient_data_phone: number;
  patient_data_email: string;
  patient_data_residence_address: string;
  identification_type_id: number;
  affiliate_type_id: number;
  special_attention_id: number;
}

import { Time } from '@angular/common';
import {MainClass} from './main-class';

export class MedicalCitation extends MainClass {
  id: number;
  title: string;
  note: string;			
  start_time: Time;			
  finish_time: Time;			
  start_date: Date;			
  finish_date: Date;			
  patient_id: number;			
  assistance_id: number;			
  user_id: number;			
  status_id: number;			
}

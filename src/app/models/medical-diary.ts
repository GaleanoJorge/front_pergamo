import { Time } from '@angular/common';
import {MainClass} from './main-class';

export class MedicalDiary extends MainClass {
  id: number;
  assistance_id: number;
  weekdays: string;			
  start_time: Time;			
  finish_time: Time;			
  start_date: Date;			
  finish_date: Date;			
  interval: number;			
  attends_teleconsultation: boolean;			
}

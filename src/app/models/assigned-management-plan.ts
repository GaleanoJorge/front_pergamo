import { Time } from '@angular/common';
import { MainClass } from './main-class';

export class AssignedManagementPlan extends MainClass {
  id: number;
  start_date: Date;
  finish_date:Date;
  user_id:number;
  start_hour:Time;
}

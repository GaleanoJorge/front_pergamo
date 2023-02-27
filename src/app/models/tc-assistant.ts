import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class TcAssistant extends MainClass {
  id: number;
  agent_number: string;
  agent_name: string;
  hold: string;
  lunch: string;
  break_am: string;
  break_pm: string;
  outgoing_call: string;
  bathroom: string;
  whatsapp: string;
  user_attention: string;
  meeting: string;
  total: string;
}

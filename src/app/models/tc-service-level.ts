import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class TcServiceLevel extends MainClass {
  id: number;
  line: string;
  i0_10: string;
  i11_20: string;
  i21_30: string;
  i31_40: string;
  i41_50: string;
  i51_60: string;
  older_than_60: string;
  total_calls_received: string;
  replied_20: string;
  service_level: string;
}

import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class FixedPermissionType extends MainClass {
  id: number;
  permission_id: string;
  fixed_type_id: number;
  user_id: number; 
}

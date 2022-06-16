import { Time } from '@angular/common';
import { MainClass } from './main-class';

export class ChLiquidControl extends MainClass {
  id: number;
  clock: Time;
  ch_route_fluid_id: Date;
  ch_type_fluid_id: number;
  delivered_volume: number;
  bag_number: string;
  type_record_id: number;
  ch_record_id: string;
}

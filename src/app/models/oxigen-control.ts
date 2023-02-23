import { GlossAmbit } from './gloss-ambit';
import { MainClass } from './main-class';
import { Procedure } from './procedure';
import { User } from './user';

export class OxigenControl extends MainClass {
  id: number;
  oxigen_flow: string;
  duration_minutes: string;
  oxigen_administration_way_id: number;
  type_record_id: number;
  ch_record_id: number;

}

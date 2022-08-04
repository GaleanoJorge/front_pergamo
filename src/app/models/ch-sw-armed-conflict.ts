import { MainClass } from './main-class';

export class ChSwArmedConflict extends MainClass {
  GetCollection() {
    throw new Error('Method not implemented.');
  }
  id: number;
  victim: string;
  victim_time: string;
  subsidies: string;
  detail_subsidies: string;
  municipality_id: number;
  population_group_id: number;
  ethnicity_id: number;
}

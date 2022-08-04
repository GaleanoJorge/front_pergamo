import { MainClass } from './main-class';

export class ChSwHousingAspect extends MainClass {
  GetCollection() {
    throw new Error('Method not implemented.');
  }
  id: number;
  flat: string;
  lift: string;
  location: string;
  vehicle_access: string;
  ch_sw_housing_type_id: number;
  ch_sw_housing_id: number;
}

import { MainClass } from './main-class';

export class ChSwHygieneHousing extends MainClass {
  GetCollection() {
    throw new Error('Method not implemented.');
  }
  id: number;
  cleanliness: string;
  obs_cleanliness: string;
  illumination: string;
  obs_illumination: string;
  ventilation: string;
  obs_ventilation: string;
  pests: string;
  obs_pests: string;
  sanitary: string;
  obs_sanitary: string;
  trash: string;
  obs_trash: string;
}

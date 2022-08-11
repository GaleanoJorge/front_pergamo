import { MainClass } from './main-class';

export class ChSwConditionHousing extends MainClass {
  GetCollection() {
    throw new Error('Method not implemented.');
  }
  id: number;
  water: string;
  light: string;
  telephone: string;
  sewerage: string;
  gas: string;
  num_rooms: number;
  persons_rooms: number;
  rooms: string;
  living_room: string;
  dinning_room: string;
  kitchen: string;
  bath: string;
}

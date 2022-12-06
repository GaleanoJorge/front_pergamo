import { MainClass } from './main-class';

export class ChPsInsufficiency extends MainClass {
    GetCollection() {
      throw new Error('Method not implemented.');
    }
    id: number;
    name:string;    
}

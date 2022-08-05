import { MainClass } from './main-class';

export class ChSwFamilyDynamics extends MainClass {
    GetCollection() {
      throw new Error('Method not implemented.');
    }
    id: number;
    decisions_id:number;    
    authority_id:number;    
    ch_sw_communications_id:number;    
    ch_sw_expression_id:number;    
    observations:string;    
}

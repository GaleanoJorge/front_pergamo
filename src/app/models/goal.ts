import { MainClass } from './main-class';
import { Unit } from './unit';

export class Goal extends MainClass {
    id: number;
    unit_id: number;
    value: number;
    name: string;
    description: string;
    unit: Unit;
}

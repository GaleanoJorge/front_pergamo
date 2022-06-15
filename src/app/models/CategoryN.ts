import { Origin } from './origin';
import { Subarea } from './subarea';
import {Area} from './area';
import {User} from './user';
import { MainClass } from './main-class';

export class CategoryN extends MainClass {
    id: number;
    category_parent_id: string;
    origin_id: number;
    area_id: number;
    subarea_id: number;
    user_id: number;
    name: string;
    description: string;
    Origin: Origin;
    Subarea: Subarea;
    Area: Area;
    User: User;
}

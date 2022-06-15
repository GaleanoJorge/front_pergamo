import { Origin } from './origin';
import { Status } from './status';
import { MainClass } from './main-class';

export class Category extends MainClass {
    id: number;
    category_parent_id: string;
    origin_id: number;
    status_id: number;
    name: string;
    subcategories: any;
    description: string;
    Category: Category;
    Origin: Origin;
    Status: Status;
}

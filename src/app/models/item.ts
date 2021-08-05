import { MainClass } from './main-class';

export class Item extends MainClass {
    id: number;
    item_parent_id: number;
    name: string;
    route: string;
    icon: string;
    subitems: any;
}

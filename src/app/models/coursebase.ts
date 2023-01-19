import { Category } from './category';
import { MainClass } from './main-class';

export class CourseBase extends MainClass {
    id: number;
    name: string;
    category_id: number;
    category: Category;
}

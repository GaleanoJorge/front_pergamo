import { Component, OnInit } from '@angular/core';
import { CategoryBusinessService } from '../../../business-controller/category-business.service';
import { Category } from '../../../models/category';

@Component({
    selector: 'ngx-categories',
    templateUrl: 'categories.component.html',
    styleUrls: ['categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

    public messageError: string = null;
    routes = [
        {
            name: "Categorías",
            route: "../../category/categories"
        }
    ];

    constructor(public categoryBS: CategoryBusinessService) { }

    ngOnInit() {
        // this.categoryBS.GetCollection().then(x => {
        //     this.messageError = null;
        // }).catch(x => {
        //     this.messageError = x;
        // });
    }
}

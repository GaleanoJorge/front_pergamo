import { Component, OnInit } from '@angular/core';
import { CourseBusinessService } from '../../../business-controller/course-business.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'ngx-courses',
    templateUrl: 'courses.component.html',
    styleUrls: ['courses.component.scss'],
})
export class CoursesComponent implements OnInit {

    private idCategory: number;
    public messageError: string = null;
    routes = [];

    constructor(public courseBS: CourseBusinessService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.idCategory = +params['id'];
                this.SaveRoutes();
                this.courseBS.GetCollection(this.idCategory).then(x => {
                    this.messageError = null;
                }).catch(x => {
                    this.messageError = x;
                });
            }
        );
    }
    SaveRoutes() {
        this.routes = [
            {
                name: "Categorías",
                route: "../../../category/categories"
            },
            {
                name: "Cursos",
                route: "../../../category/courses/" + this.idCategory
            },
        ];
    }

}


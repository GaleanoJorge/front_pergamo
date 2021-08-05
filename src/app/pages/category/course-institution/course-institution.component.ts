import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CourseBusinessService } from '../../../business-controller/course-business.service';
import { CompetitionBusinessService } from '../../../business-controller/competition-business.service';
import { NbWindowService } from '@nebular/theme';
import { Competition } from '../../../models/competition';

@Component({
  selector: 'ngx-course-institution',
  templateUrl: './course-institution.component.html',
  styleUrls: ['./course-institution.component.scss']
})
export class CourseInstitutionComponent implements OnInit {

  routes = [];
  public idCourse: number;
  public idCategory: number;
  public messageError: string = null;

  constructor(
    private route: ActivatedRoute,
    public courseBS: CourseBusinessService,
    public competitionBS: CompetitionBusinessService,
    private windowService: NbWindowService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.idCourse = +params['id'];
        this.idCategory = +params['idCategory'];
        this.SaveRoutes();
      }
    );
    this.courseBS.GetEducationalInstitution(this.idCourse).then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
    this.competitionBS.GetByCourse(this.idCourse).then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }

  SaveRoutes() {
    this.routes = [
      {
        name: "Categorías",
        route: "../../../../category/categories"
      },
      {
        name: "Cursos",
        route: "../../../../category/courses/" + this.idCategory
      },
      {
        name: "Curso " + this.idCourse,
        route: "../../../../category/course-institutions/" + this.idCourse + "/" + this.idCategory
      },
    ];
  }

  openWindow(contentTemplate, competition: Competition) {
    this.windowService.open(
      contentTemplate,
      {
        title: competition.name,
        context: {
          competition: competition,
        },
      },
    );
  }

}

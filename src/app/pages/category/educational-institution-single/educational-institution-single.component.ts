import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { InstitutionBusinessService } from '../../../business-controller/institution-business.service';
import { Course } from '../../../models/course';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'ngx-educational-institution-single',
  templateUrl: './educational-institution-single.component.html',
  styleUrls: ['./educational-institution-single.component.scss']
})
export class EducationalInstitutionSingleComponent implements OnInit {

  routes = [];
  public idParent: number;
  public idInstitution: number;
  public messageError: string = null;
  public courses: Course[] = [];
  public groups: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public institutionBS: InstitutionBusinessService,
    private windowService: NbWindowService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.idParent = +params['idParent'];
        this.idInstitution = +params['idInstitution'];
        this.SaveRoutes();
        this.institutionBS.GetInstitutionById(this.idInstitution).then(x => {
          this.messageError = null;
          x.forEach(institution => {
            institution.course_educational_institution.forEach(cei => {
              if (!this.courses.some(({ id }) => id == cei.course.id))
                this.courses.push(cei.course)
            });
          });
          this.FilterGroups(0);
        }).catch(x => {
          this.messageError = x;
        });
      }
    );
  }

  FilterGroups(filter) {
    this.groups = [];
    this.institutionBS.educationalInstitutions.forEach(institution => {
      institution.course_educational_institution.forEach(cei => {
        cei.course_institution_cohorts.forEach(cic => {
          if (!this.groups.some(({ id, category }) => id == cic.id && category == cei.course_id)) {
            if (filter == 0 || filter == cei.course_id)
              this.groups.push({
                id: cic.id,
                urc: cic.id,
                category: cei.course_id,
                course: cei.course,
              });
          }
        });
      });
    });
  }

  SaveRoutes() {
    this.routes = [
      {
        name: "Dashboard",
        route: "../../../../dashboard"
      },
      {
        name: "Instituciones",
        route: "../../../institutions/" + this.idParent
      },
      {
        name: "Grupos",
        route: "../../../institution-single/" + this.idInstitution + "/" + this.idParent
      }
    ];
  }

  openWindow(contentTemplate, group) {
    this.windowService.open(
      contentTemplate,
      {
        title: "Grupo " + group.id,
        context: {
          group: group,
        },
      },
    );
  }

}

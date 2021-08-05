import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseBusinessService} from '../../../../business-controller/course-business.service';
import {CardStudentsAdmissionsComponent} from './card-students-admissions.component';
import {InscriptionStatus} from '../../../../models/inscription-status';
import {InscriptionStatusBusinessService} from '../../../../business-controller/inscription-status-business.service';
import {GroupBusinessService} from '../../../../business-controller/group-business.service';
import {Group} from '../../../../models/group';

@Component({
  selector: 'ngx-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  public messageError = null;

  public title = 'Inscritos en ';
  public subtitle = 'Admisiones discentes programa: ';

  public routes = [];
  public course;

  public inscriptionStatus: InscriptionStatus[] = [];
  public groups: Group[] = [];

  public settings = {
    columns: {
      created_at: {
        title: 'Discente',
        type: 'custom',
        sort: false,
        valuePrepareFunction: (value, row) => {
          return {
            data: row,
            inscriptionStatus: this.inscriptionStatus,
            groups: this.groups,
          };
        },
        renderComponent: CardStudentsAdmissionsComponent,
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseBS: CourseBusinessService,
    private inscriptionStatusBs: InscriptionStatusBusinessService,
    private groupBs: GroupBusinessService,
  ) {
  }

  GetParams() {
    return {
      course_id: this.route.snapshot.params.course_id,
      inscription_status_id: this.route.snapshot.queryParams.status,
    };
  }

  ngOnInit(): void {
    this.courseBS.GetById(this.route.snapshot.params.course_id).then(x => {
      this.course = x;

      this.routes = [
        {
          name: 'Admisiones discentes',
          route: '/pages/admissions/students',
        },
        {
          name: this.course.coursebase.name,
          route: this.router.url,
        },
      ];

      this.title += this.course.coursebase.name;

      this.subtitle += this.course.coursebase.category.name;
    });

    this.inscriptionStatusBs.GetCollection({
      pagination: false,
    }).then(x => {
      this.inscriptionStatus = x;
    }).catch(x => {
    });

    this.groupBs.GetCollection({
      pagination: false,
      course_id: this.route.snapshot.params.course_id,
    }).then(x => {
      this.groups = x;
    });
  }

}

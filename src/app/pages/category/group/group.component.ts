import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CourseBusinessService } from '../../../business-controller/course-business.service';
import { Module } from '../../../models/module';
import { Activity } from '../../../models/activity';
import { Session } from '../../../models/session';
import { NbWindowService } from '@nebular/theme';
import { InstitutionBusinessService } from '../../../business-controller/institution-business.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { WebAPIService } from '../../../services/web-api.service';

@Component({
  selector: 'ngx-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  routes = [];
  public idParent: number;
  public idInstitution: number;
  public idCourse: number;
  public group: number;
  public messageError: string = null;
  public filePath: string = null;
  public modules: Module[] = [];
  public modulesFilter: Module[] = [];
  public sessions: Session[] = [];
  public sessionsFilter: Session[] = [];
  public activities: Activity[] = [];

  constructor(
    private route: ActivatedRoute,
    public courseBS: CourseBusinessService,
    public institutionBS: InstitutionBusinessService,
    private windowService: NbWindowService,
    public _dateFormatPipe: DateFormatPipe,
    public filePathService: WebAPIService
  ) { }

  ngOnInit(): void {
    this.filePath = this.filePathService.GetFilePath();
    this.route.params.subscribe(
      (params: Params) => {
        this.idParent = +params['idParent'];
        this.idInstitution = +params['idInstitution'];
        this.idCourse = +params['idCourse'];
        this.group = +params['group'];
        this.institutionBS.GetInstitutionById(this.idInstitution).then(x => {
          this.messageError = null;
        }).catch(x => {
          this.messageError = x;
        });
        this.courseBS.GetStructure(this.idCourse).then(x => {
          this.messageError = null;
          this.FilterModuleSession(0, 0);
          this.courseBS.GetGroup(this.group).then(x => {
            this.messageError = null;
          }).catch(x => {
            this.messageError = x;
          });
        }).catch(x => {
          this.messageError = x;
        });
        this.SaveRoutes();
      }
    );
  }

  FilterModuleSession(e, f) {
    this.modules = [];
    this.sessions = [];
    this.activities = [];
    this.modulesFilter = [];
    this.sessionsFilter = [];
    this.courseBS.courses.forEach(element => {
      element.modules.forEach(module => {
        this.modulesFilter.push(module);
        if (e == 0 || e == module.id) {
          module.colspan = 0;
          this.modules.push(module);
          module.sessions.forEach(session => {
            if (f == 0 || f == session.id) {
              session.colspan = 0;
              this.sessions.push(session);
              session.activities.forEach(activity => {
                this.modules.find(({ id }) => id == module.id).colspan++;
                this.sessions.find(({ id }) => id == session.id).colspan++;
                this.activities.push(activity);
              });
            }
          });
        }
        if (e != 0 && e == module.id)
          this.sessionsFilter = module.sessions;
      });
    });
  }

  openWindow(contentTemplate, delivery, user) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Actividad ' + delivery.activity.id + ', ' + user,
        context: {
          delivery: delivery,
        },
      },
    );
  }

  SaveRoutes() {
    this.routes = [
      {
        name: "Dashboard",
        route: "../../../../../../dashboard"
      },
      {
        name: "Instituciones",
        route: "../../../../../institutions/" + this.idParent
      },
      {
        name: "Grupos",
        route: "../../../../../institution-single/" + this.idInstitution + "/" + this.idParent
      },
      {
        name: "Aprendices",
        route: "../../../../" + this.group + "/" + this.idCourse + "/" + this.idInstitution + "/" + this.idParent
      }
    ];
  }



}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseBusinessService } from '../../../business-controller/course-business.service';
import { GroupBusinessService } from '../../../business-controller/group-business.service';
import { Group } from '../../../models/group';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroupComponent } from './form-group/form-group.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormSessionComponent } from './form-session/form-session.component';
import { ActionsSessionComponent } from './actions-session.component';
import { SessionBusinessService } from '../../../business-controller/session-business.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  public messageError = null;

  public course;

  public routes = [
    {
      name: 'Cursos',
      route: '/pages/course/list',
    },
  ];

  public groups: Group[] = [];
  public course_id: number = null;
  public current_group = null;

  @ViewChild('tableSession') tableSesion: BaseTableComponent;

  public settingsSession = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditSession.bind(this),
            'delete': this.DeleteSessionConfirm.bind(this),
            'roomSession': this.CreateRoomSession.bind(this),
          };
        },
        renderComponent: ActionsSessionComponent,
      },
      name: {
        title: 'Nombre',
      },
      module_id: {
        title: 'Módulo',
        valuePrepareFunction(value, row) {
          return row.module.name;
        },
      },
      // nombre_completo: {
      //   title: 'Docente',
      //   sort: false,
      // },
      session_date: {
        title: 'Fecha',
      },
      start_time: {
        title: 'Inicio',
        valuePrepareFunction: ((value,row) => {
          return this.datepipe.convertoToAMPM(row.start);
        }).bind(this),
      },
      closing_time: {
        title: 'Finalización',
        valuePrepareFunction: ((value,row) => {
          return this.datepipe.convertoToAMPM(row.closing);
        }).bind(this),
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datepipe: DateFormatPipe,
    private courseBs: CourseBusinessService,
    private groupBS: GroupBusinessService,
    private sessionBS: SessionBusinessService,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.course_id = this.route.snapshot.params.id;
    this.courseBs.GetById(this.course_id).then(x => {
      this.course = x;
      this.routes.push({
        name: 'Grupos de ' + this.course.coursebase.name,
        route: this.router.url,
      });
    });

    this.RefreshGroups();
  }

  RefreshGroups() {
    this.groupBS.GetCollection({
      course_id: this.course_id,
    }).then(x => {
      this.groups = x;
    });
  }

  ChangeSesion(group) {
    this.current_group = group;
    this.RefreshSession();
  }

  RefreshSession() {
    if (this.tableSesion)
      this.tableSesion.refresh(this.paramsSession);
  }

  NewGroup() {
    this.dialogService.open(FormGroupComponent, {
      context: {
        course_id: this.course_id,
        refresh: this.RefreshGroups.bind(this),
      },
    });
  }

  EditGroup(data) {
    this.dialogService.open(FormGroupComponent, {
      context: {
        course_id: this.course_id,
        refresh: this.RefreshGroups.bind(this),
        data,
      },
    });
  }

  DeleteGroupConfirm(data) {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteGroup.bind(this),
      },
    });
  }

  DeleteGroup(data) {
    return this.groupBS.Delete(data.id).then(x => {
      this.RefreshGroups();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  get paramsSession() {
    return {
      group_id: this.current_group.id,
    };
  }

  get titleSession() {
    return 'Sesiones del grupo ' + this.current_group.name;
  }

  NewSession() {
    this.dialogService.open(FormSessionComponent, {
      context: {
        group_id: this.current_group.id,
        course_id: this.course_id,
        refreshSession: this.RefreshSession.bind(this),
      },
    });
  }

  EditSession(data) {
    this.dialogService.open(FormSessionComponent, {
      context: {
        group_id: this.current_group.id,
        course_id: this.course_id,
        refreshSession: this.RefreshSession.bind(this),
        data,
      },
    });
  }

  DeleteSessionConfirm(data) {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteSession.bind(this),
      },
    });
  }

  DeleteSession(data) {
    return this.sessionBS.Delete(data.id).then(x => {
      this.RefreshSession();
      this.toastS.success(null, x.message);
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  CreateRoomSession(data) {
    this.sessionBS.CreateRoom(data.id).then(x => {
      this.RefreshSession();
      this.toastS.success(null, 'Se ha creado la Sala de Teams exitosamente');
    }).catch(x => {
      this.toastS.danger(null, 'Se produjo un error al crear la Sala de Teams');
      throw x;
    });
  }
}

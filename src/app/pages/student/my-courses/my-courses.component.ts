import { Component, OnInit, ViewChild } from '@angular/core';
import { SubareaService } from '../../../business-controller/subarea.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponentCourses } from './actionscourses.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { InfoComponentCourses } from './infocourses.component';

@Component({
  selector: 'ngx-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Mis Cursos';
  public subtitle: string = 'Gestión';
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'string',
      },
      course: {
        title: 'Nombre',
        type: 'string',
      },
      campus: {
        title: 'Sede',
        type: 'string',
      },
      entity_type_name: {
        title: 'Modalidad',
        type: 'string',
      },
      status: {
        title: 'Grupo/Estado',
        type: 'string',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          // return {
          //   'data': row,
          //   'changeState': this.ChangeState.bind(this),
          // };
          if (value == 'Aprobado') {
            return row.group;
          } else {
            return value;
          }
        },
        // renderComponent: StatusFieldComponent,
      },
      actions: {
        title: 'Sesiones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent

          return {
            'data': row,
            // 'edit': this.EditSubarea.bind(this),
            // 'delete': this.DeleteConfirmSubarea.bind(this),
          };
        },
        renderComponent: ActionsComponentCourses,
      },
      info: {
        title: 'Info',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent

          return {
            'data': row,
            // 'edit': this.EditSubarea.bind(this),
            // 'delete': this.DeleteConfirmSubarea.bind(this),
          };
        },
        renderComponent: InfoComponentCourses
      }
    },
  };

  public routes = [
    {
      name: 'Mis Cursos',
      route: '../../student/mycourses',
    },
  ];

  constructor(
    private subareaS: SubareaService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {

  }

  RefreshData() {
    this.table.refresh();
  }



  ChangeState(data) {
    data.status_id = data.status_id === 1 ? 2 : 1;

    this.toastrService.info('', 'Cambiando estado');

    this.subareaS.Update(data).then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    }).catch((x) => {
      this.toastrService.danger(x.message);
    });
  }



}

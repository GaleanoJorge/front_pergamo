import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActionsComponent } from '../../setting/sectional-council/actions.component';
import { FormCourseApprovalComponent } from '../course-approval/form-course-approval/form-course-approval.component';
import { NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { CourseApprovalBusinessService } from '../../../business-controller/course-approval-business.service';
import { StatsApprovalComponent } from './stats-approval.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-course-approval',
  templateUrl: './course-approval.component.html',
  styleUrls: ['./course-approval.component.scss'],
})
export class CourseApprovalComponent implements OnInit {
  @Input() course_id: number = null;

  public routes = [
    {
      name: 'Cursos',
      route: '/pages/course/list',
    },
  ];

  public title = 'Acto Administrativo del Curso';
  public messageError = null;
  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'edit': this.EditModule.bind(this),
            'delete': this.DeleteConfirmModule.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: 'ID',
        type: 'string',
      },
      approval_file: {
        title: 'Archivo de Aprobación',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
          };
        },
        renderComponent: StatsApprovalComponent
        ,
      },
      approval_date: {
        title: 'Fecha de Aprobación',
        type: 'date',
        valuePrepareFunction: (value, row) => {
          return this.CambiarFecha(value)

        },
      },
    },
  };


  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private dialogFormService: NbDialogService,
    private courseApprovalBS: CourseApprovalBusinessService,
    public datepipe: DateFormatPipe,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }
  public approval_date: any;
  public data: any;
  ngOnInit(): void {
    this.course_id = this.route.snapshot.params.id;
  }

  CambiarFecha(value) {
    var fecha = this.datepipe.transform2(value);
    return fecha;
  }
  RefreshData() {
    this.table.refresh();
  }

  NewModule() {
    this.dialogFormService.open(FormCourseApprovalComponent, {
      context: {
        title: 'Crear nuevo Acto Administrativo',
        saved: this.RefreshData.bind(this),
        course_id: this.course_id,
        moduleEdit: false,
      },
    });
  }

  EditModule(data) {
    this.data = data;
    data.approval_date = this.datepipe.transform2(data.approval_date);
    this.dialogFormService.open(FormCourseApprovalComponent, {
      context: {
        title: 'Editar Acto Administrativo',
        data,
        saved: this.RefreshData.bind(this),
        moduleEdit: false,
        course_id: this.course_id,

      },
    });
  }

  DeleteConfirmModule(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteModule.bind(this),
      },
    });
  }

  DeleteModule(data) {
    return this.courseApprovalBS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

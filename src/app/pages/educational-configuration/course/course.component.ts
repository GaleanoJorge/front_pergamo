import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActionsComponent } from '../../setting/sectional-council/actions.component';
import { NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ModuleBusinessService } from '../../../business-controller/module-business.service';
import { FormCourseComponent } from './form-course/form-course.component';

@Component({
  selector: 'ngx-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  @Input() category_id = null;
  public title = 'Cursos';
  public messageError = null;
  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditCurse.bind(this),
            'delete': this.DeleteConfirmCurse.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: 'ID',
        type: 'string',
      },
      name: {
        title: 'Nombre',
        type: 'string',
      },
    },
  };

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private dialogFormService: NbDialogService,
    private moduleBS: ModuleBusinessService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {
    this.table.refresh();
  }

  NewCurse() {
    this.dialogFormService.open(FormCourseComponent, {
      context: {
        title: 'Crear nuevo curso base',
        saved: this.RefreshData.bind(this),
        category_id: this.category_id,
        curseEdit: false,
      },
    });
  }

  EditCurse(data) {
    this.dialogFormService.open(FormCourseComponent, {
      context: {
        title: 'Editar curso base',
        data,
        saved: this.RefreshData.bind(this),
        curseEdit: false,
      },
    });
  }

  DeleteConfirmCurse(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCurse.bind(this),
      },
    });
  }

  DeleteCurse(data) {

    return this.moduleBS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseTypeService } from '../../../business-controller/course-type.service';
import { StatusFieldComponent } from '../../setting/sectional-council/status-field.component';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCourseTypeComponent } from './course-type/form-course-type.component';
import { ActionsComponent } from '../../setting/sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-course-type',
  templateUrl: './course-type.component.html',
  styleUrls: ['./course-type.component.scss']
})
export class CourseTypeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipo de Curso';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditArea.bind(this),
            'delete': this.DeleteConfirmArea.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      }
    },
  };

  public routes = [
    {
      name: 'Tipo de Curso',
      route: '../../educational-configuration/course-type',
    },
  ];

  constructor(
    private courseTypeS: CourseTypeService,
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

  NewArea() {
    this.dialogFormService.open(FormCourseTypeComponent, {
      context: {
        title: 'Crear nuevo tipo de curso',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditArea(data) {
    this.dialogFormService.open(FormCourseTypeComponent, {
      context: {
        title: 'Editar Tipo de Curso',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmArea(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteArea.bind(this),
      },
    });
  }

  DeleteArea(data) {
    return this.courseTypeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}


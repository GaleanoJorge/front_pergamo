import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Actions2Component } from './actions.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormCourseComponent } from './form-course/form-course.component';
import { CourseBusinessService } from '../../../business-controller/course-business.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { Router } from '@angular/router';
import {ValidityService} from '../../../business-controller/validity.service';
import {OriginBusinessService} from '../../../business-controller/origin-business.service';
import {CategoryBusinessService} from '../../../business-controller/category-business.service';

@Component({
  selector: 'ngx-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {

  public isSubmitted = false;
  public entity:string;
  public category_id:number=null;
  public messageError: string = null;
  public title: string = 'Cursos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Sede', 'Nombre', 'Beneficiarios', 'Modalidad'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public validity = 0;
  public origin = 0;
  public category = 0;
  public validities = [];
  public origins = [];
  public categories = [];

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
            'edit': this.EditCourse.bind(this),
            'delete': this.DeleteConfirmCourse.bind(this),
            'certificate': (row) => this.router.navigate([`/pages/certificates/generate/${row.id}`])
          };
        },
        renderComponent: Actions2Component,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      campus: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction(value) {
          return value.name;
        },
      },
      coursebase: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value) {
          return value.name;
        },
      },
      quota: {
        title: this.headerFields[3],
        type: 'string',
      },
      entity_type: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value) {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Cursos',
      route: '../course/list',
    },
  ];

  constructor(
    private courseBS: CourseBusinessService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private datepipe: DateFormatPipe,
    private router: Router,
    private validityBS: ValidityService,
    private originBS: OriginBusinessService,
    private categoryBS: CategoryBusinessService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if(this.route.snapshot.params.id){
      this.category_id = this.route.snapshot.params.id;
      this.entity = this.category_id ? 'courses/byvalidity/0/0/' + this.category_id : 'courses';
    }else{
      this.entity='courses';
    }
    this.validityBS.GetCollection({
      pagination: false,
    }).then(x => {
      this.validities = x;
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  NewCourse() {
    this.dialogFormService.open(FormCourseComponent, {
      context: {
        title: 'Crear nuevo curso',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCourse(data) {
    this.courseBS.GetById(data.id).then(x => {
      data = x;
      data.start_date = this.datepipe.transform2(data.start_date);
      data.finish_date = this.datepipe.transform2(data.finish_date);
      this.dialogFormService.open(FormCourseComponent, {
        context: {
          title: 'Editar curso',
          data,
          saved: this.RefreshData.bind(this),
        },
      });
    });

  }
  getOrigins(validity_id) {
    this.originBS.GetCollection({
      validity_id,
      pagination: false,
    }).then(x => {
      this.origins = x;
    });
  }

  getCategories(origin_id) {
    this.categoryBS.GetByOrigin(origin_id, false).then(x => {
      this.categories = x;
    });
  }
  ChangeValidity(validity) {
    this.validity = validity;
    this.origin=0;
    this.category=0;
    this.table.changeEntity(`courses/byvalidity/${this.validity}/${this.origin}/${this.category}`);
    this.getOrigins(validity);
    // this.RefreshData();
}
ChangeOrigin(origin) {
  this.validity = 0;
  this.origin=origin;
  this.category=0;
  this.table.changeEntity(`courses/byvalidity/${this.validity}/${this.origin}/${this.category}`);
  this.getCategories(origin);
  // this.RefreshData();
}
ChangeCategory(category) {
  this.validity = 0;
  this.origin=0;
  this.category=category;
  this.table.changeEntity(`courses/byvalidity/${this.validity}/${this.origin}/${this.category}`);
  // this.RefreshData();
}

  ChangeState(data) {
    data.status_id = data.status_id === 1 ? 2 : 1;

    // this.toastrService.info('', 'Cambiando estado');

    this.courseBS.Update(data).then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    }).catch((x) => {
      this.toastrService.danger(x.message);
    });
  }

  DeleteConfirmCourse(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCourse.bind(this),
      },
    });
  }

  DeleteCourse(data) {
    return this.courseBS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

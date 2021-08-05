import { Component, OnInit } from '@angular/core';
import { ReportBusinessService } from '../../../business-controller/report-business.service';
import { CategoryBusinessService } from '../../../business-controller/category-business.service';
import { CourseBusinessService } from '../../../business-controller/course-business.service';
import { NbToastrService } from '@nebular/theme';
import { Category } from '../../../models/category';

@Component({
  selector: 'ngx-report4',
  templateUrl: './report4.component.html',
  styleUrls: ['./report4.component.scss']
})
export class Report4Component implements OnInit {

  public messageError: string = null;
  public data: any = {};
  public show: boolean;
  public categories: Category[] = [];
  public categorySelected: string;
  public courseSelected: string;
  public studentSelected: string;

  constructor(
    private reporteBS: ReportBusinessService,
    public categoryBS: CategoryBusinessService,
    public courseBS: CourseBusinessService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.categoryBS.GetCollection().then(x => {
      this.messageError = null;
      x.forEach(element => {
        if (!this.categories.some(({ id }) => id == element.id))
          this.categories.push(element)
      });
    }).catch(x => {
      this.messageError = x;
    });
  }
  changeCategory(e) {
    this.categorySelected = e;
    this.courseBS.GetCollection(e).then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }

  changeCourse(e) {
    this.courseSelected = e;
    this.courseBS.GetSingle(e).then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }

  changeStudent(e) {
    this.studentSelected = e;
  }

  Search() {
    this.show = false;
    this.reporteBS.GetReport4({
      student: this.studentSelected,
      course: this.courseSelected
    }).then(x => {
      this.toastrService.success("", "Busqueda realizada correctamente!");
      this.show = x.data.report.length > 0 ? true : false;
      let cont = 1;
      this.data.type = "line";
      this.data.title = [x.message];
      this.data.description = [x.message];
      this.data.categories = [];
      this.data.datasets = [
        {
          label: 'Estudiante',
          data: [],
          backgroundColor: '',
          borderColor: ''
        }
      ];
      x.data.report.forEach(element => {
        this.data.datasets[0].data.push(parseInt(element.Calificacion));
        this.data.categories.push(cont++);
      });
    }).catch(x => {
      this.messageError = null;
    });
  }
}

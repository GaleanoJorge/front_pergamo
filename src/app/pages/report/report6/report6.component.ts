import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { ReportBusinessService } from '../../../business-controller/report-business.service';
import { CategoryBusinessService } from '../../../business-controller/category-business.service';
import { CourseBusinessService } from '../../../business-controller/course-business.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-report6',
  templateUrl: './report6.component.html',
  styleUrls: ['./report6.component.scss']
})
export class Report6Component implements OnInit {

  public messageError: string = null;
  public columns: string[] = [];
  public data: any[] = [];
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
    this.reporteBS.GetReport6({
      student: this.studentSelected,
      course: this.courseSelected
    }).then(x => {
      this.toastrService.success("", "Busqueda realizada correctamente!");
      this.show = x.data.report.length > 0 ? true : false;
      x.data.report.forEach(element => {
        this.columns = Object.keys(element);
        this.data.push(element);
      });
    }).catch(x => {
      this.messageError = x;
    });
  }

}

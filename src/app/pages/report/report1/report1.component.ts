import { Component, OnInit } from '@angular/core';
import { ReportBusinessService } from '../../../business-controller/report-business.service';
import { CategoryBusinessService } from '../../../business-controller/category-business.service';
import { CourseBusinessService } from '../../../business-controller/course-business.service';
import { NbToastrService } from '@nebular/theme';
import { Category } from '../../../models/category';

@Component({
  selector: 'ngx-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.scss']
})
export class Report1Component implements OnInit {

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
    this.reporteBS.GetReport1({
      student: this.studentSelected,
      course: this.courseSelected
    }).then(x => {
      this.toastrService.success("", "Busqueda realizada correctamente!");
      this.show = x.data.report.length > 0 && x.data.report[0].CourseID ? true : false;
      this.data.type = "bar";
      this.data.labels = ["Promedio de calificaciones"];
      this.data.title = ["Promedio de calificaciones"];
      this.data.description = [x.message];
      this.data.datasets = [];
      x.data.report.forEach(element => {
        this.data.datasets.push({
          data: [element.Promedio],
          label: element.Item,
          backgroundColor: "",
        });
      });
    }).catch(x => {
      this.messageError = null;
    });
  }

}

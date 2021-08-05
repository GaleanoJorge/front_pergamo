import { Component, OnInit } from '@angular/core';
import { ReportBusinessService } from '../../../business-controller/report-business.service';
import { CategoryBusinessService } from '../../../business-controller/category-business.service';
import { CourseBusinessService } from '../../../business-controller/course-business.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-report15',
  templateUrl: './report15.component.html',
  styleUrls: ['./report15.component.scss']
})
export class Report15Component implements OnInit {

  public messageError: string = null;
  public data: any = {};
  public show: boolean;

  constructor(
    private reporteBS: ReportBusinessService,
    public categoryBS: CategoryBusinessService,
    public courseBS: CourseBusinessService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.show = false;
    this.reporteBS.GetReport15().then(x => {
      this.show = x.data.report.length > 0 && x.data.report[0].CourseID ? true : false;
      this.data.type = "bar";
      this.data.labels = ["Cursos"];
      this.data.title = [x.message];
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

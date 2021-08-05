import { Component, OnInit } from '@angular/core';
import { ReportBusinessService } from '../../../business-controller/report-business.service';

@Component({
  selector: 'ngx-report2',
  templateUrl: './report2.component.html',
  styleUrls: ['./report2.component.scss']
})
export class Report2Component implements OnInit {

  public messageError: string = null;
  public data: any = {};
  public show: boolean;

  constructor(private reporteBS: ReportBusinessService) { }

  ngOnInit(): void {
    this.reporteBS.GetReport2().then(x => {
      this.show = x.data.report.length > 0 ? true : false;
      this.data.type = "bar";
      this.data.labels = ["Reporte entregas por tecnoacademias"];
      this.data.title = ["Reporte entregas por tecnoacademias"];
      this.data.description = [x.message];
      this.data.datasets = [];
      x.data.report.forEach(element => {
        this.data.datasets.push({
          data: [element.Promedio],
          label: element.Region,
          backgroundColor: "",
        });
      });
    }).catch(x => {
      this.messageError = null;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ReportBusinessService } from '../../../business-controller/report-business.service';

@Component({
  selector: 'ngx-report11-b',
  templateUrl: './report11-b.component.html',
  styleUrls: ['./report11-b.component.scss']
})
export class Report11BComponent implements OnInit {

  public messageError: string = null;
  public data: any = {};
  public show: boolean;

  constructor(private reporteBS: ReportBusinessService) { }

  ngOnInit(): void {
    this.reporteBS.GetReport11B().then(x => {
      this.show = x.data.report.length > 0 ? true : false;
      this.data.type = "pie";
      this.data.title = [x.message];
      this.data.description = [x.message];
      this.data.labels = ['Aprobados', 'NoAprobados'];
      this.data.series = [];
      x.data.report.forEach(element => {
        this.data.series.push({
          value: element['Aprobados'],
          name: 'Aprobados',
        })
        this.data.series.push({
          value: element['NoAprobados'],
          name: 'NoAprobados',
        })
      });
    }).catch(x => {
      this.messageError = null;
    });
  }

}

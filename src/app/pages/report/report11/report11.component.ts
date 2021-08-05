import { Component, OnInit } from '@angular/core';
import { ReportBusinessService } from '../../../business-controller/report-business.service';

@Component({
  selector: 'ngx-report11',
  templateUrl: './report11.component.html',
  styleUrls: ['./report11.component.scss']
})
export class Report11Component implements OnInit {

  public messageError: string = null;
  public columns: string[] = [];
  public data: any[] = [];
  public show: boolean;

  constructor(private reporteBS: ReportBusinessService,) { }

  ngOnInit(): void {
    this.reporteBS.GetReport11().then(x => {
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

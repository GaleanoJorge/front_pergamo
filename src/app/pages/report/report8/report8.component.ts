import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ReportBusinessService } from '../../../business-controller/report-business.service';

@Component({
  selector: 'ngx-report8',
  templateUrl: './report8.component.html',
  styleUrls: ['./report8.component.scss']
})
export class Report8Component implements OnInit {

  constructor(public reporteBS: ReportBusinessService,) { }
  source: LocalDataSource = new LocalDataSource();
  public data: any[] = [];
  public messageError: string = null;
  public show: boolean;

  public settings = {
    actions: false,
    columns: {
      IdUsuario: {
        title: 'ID',
        type: 'string'
      },
      Nombres: {
        title: 'Nombres',
        type: 'string'
      },
      Curso: {
        title: 'Curso',
        type: 'string'
      },
      Institucion: {
        title: 'Institución',
        type: 'string',
      },
      Municipio: {
        title: 'Municipio',
        type: 'string',
      },
      Region: {
        title: 'Departamento',
        type: 'string',
      }
    }
  };

  ngOnInit() {
    this.reporteBS.GetReport8().then(x => {
      this.source.load(x.data.report);
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }

}

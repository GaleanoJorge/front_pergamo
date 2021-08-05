import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ReportBusinessService } from '../../../business-controller/report-business.service';

@Component({
  selector: 'ngx-report9',
  templateUrl: './report9.component.html',
  styleUrls: ['./report9.component.scss']
})
export class Report9Component implements OnInit {

  constructor(private reporteBS: ReportBusinessService,) { }
  source: LocalDataSource = new LocalDataSource();
  public data: any[] = [];
  public messageError: string = null;
  public show: boolean;

  public settings = {
    actions: false,
    columns: {
      Estudiante: {
        title: 'Estudiante',
        type: 'string'
      },
      Entregas: {
        title: 'Entregas',
        type: 'string'
      },
      'No entregadas': {
        title: 'No entregadas',
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


  ngOnInit(): void {
    this.reporteBS.GetReport9().then(x => {
      this.source.load(x.data.report);
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
}

}

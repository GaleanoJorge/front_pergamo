import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ReportBusinessService } from '../../../business-controller/report-business.service';

@Component({
  selector: 'ngx-fuid',
  templateUrl: './fuid.component.html',
  styleUrls: ['./fuid.component.scss']
})
export class FuidComponent implements OnInit {

  constructor(private reporteBS: ReportBusinessService) { }

  source: LocalDataSource = new LocalDataSource();
  public data: any[] = [];
  public messageError: string = null;
  public show: boolean;

  public settings = {
    actions: false,
    columns: {
      Curso: {
        title: 'Curso',
        type: 'string'
      },
      Modulo: {
        title: 'Modulo',
        type: 'string'
      },
      Sesion: {
        title: 'Sesion',
        type: 'string',
      },
      Actividad: {
        title: 'Actividad',
        type: 'string',
      },
      NombreArchivo: {
        title: 'NombreArchivo',
        type: 'string',
      },
      RutaArchivo: {
        title: 'RutaArchivo',
        type: 'string',
      },
      Aprendis: {
        title: 'Aprendis',
        type: 'string',
      },
    }
  };

  ngOnInit() {
    this.reporteBS.GetFUID().then(x => {
      this.source.load(x.data.report);
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }

}

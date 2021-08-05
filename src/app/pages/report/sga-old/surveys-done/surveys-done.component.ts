import {Component, OnInit} from '@angular/core';
import {OldreportsSgaService} from '../../../../business-controller/oldreports-sga.service';

@Component({
  selector: 'ngx-surveys-done',
  templateUrl: './surveys-done.component.html',
  styleUrls: ['./surveys-done.component.scss'],
})
export class SurveysDoneComponent implements OnInit {
  public messageError = null;
  public title = 'Reporte de encuestas realizadas por actividad academica';
  public exportExcel = 'exportExcelEncuestasActividad';
  public loading = true;
  public filtersRequired = {
    'curso_id': 'Curso',
  };

  public cursos = [];

  public cursoActual = null;
  public fecha_inicio = null;
  public fecha_fin = null;

  constructor(
    private oldReportsSgaBS: OldreportsSgaService,
  ) {
  }

  ngOnInit(): void {
    this.oldReportsSgaBS.GetFilters('filterCourses').then(x => {
      this.cursos = x.cursos;
      this.loading = false;
    });
  }

  public get filters() {
    return {
      curso_id: this.cursoActual ? this.cursoActual.value : null,
      fecha_inicio: this.fecha_inicio,
      fecha_fin: this.fecha_fin,
    };
  }
}

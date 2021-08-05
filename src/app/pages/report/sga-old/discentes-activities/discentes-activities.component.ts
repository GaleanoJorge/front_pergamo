import {Component, OnInit} from '@angular/core';
import {OldreportsSgaService} from '../../../../business-controller/oldreports-sga.service';

@Component({
  selector: 'ngx-discentes-activities',
  templateUrl: './discentes-activities.component.html',
  styleUrls: ['./discentes-activities.component.scss'],
})
export class DiscentesActivitiesComponent implements OnInit {
  public messageError = null;
  public title = 'Reporte de discentes admitidos, rechazados y asistentes por actividad académica';
  public exportExcel = 'exportExcelStatsDiscentesCourse';
  public loading = true;
  public filtersRequired = {
    'curso_id': 'Curso',
  };

  public cursos = [];

  public cursoActual = null;

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
    };
  }
}

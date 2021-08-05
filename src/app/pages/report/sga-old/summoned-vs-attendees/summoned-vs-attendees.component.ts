import {Component, OnInit} from '@angular/core';
import {OldreportsSgaService} from '../../../../business-controller/oldreports-sga.service';

@Component({
  selector: 'ngx-summoned-vs-attendees',
  templateUrl: './summoned-vs-attendees.component.html',
  styleUrls: ['./summoned-vs-attendees.component.scss'],
})
export class SummonedVsAttendeesComponent implements OnInit {
  public messageError = null;
  public title = 'Reporte cantidad de convocados vs cantidad de asistentes';
  public exportExcel = 'exportExcelCourses';
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

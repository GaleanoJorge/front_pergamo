import {Component, OnInit} from '@angular/core';
import {OldreportsSgaService} from '../../../../business-controller/oldreports-sga.service';

@Component({
  selector: 'ngx-record-hours',
  templateUrl: './record-hours.component.html',
  styleUrls: ['./record-hours.component.scss'],
})
export class RecordHoursComponent implements OnInit {
  public messageError = null;
  public title = 'Reporte de registro de horas';
  // public exportExcel = 'exportExcelCourses';
  public loading = true;
  public loadingSearch = false;
  public loadingDownload = false;
  public notFound = false;
  public textNotFound: String = null;
  public discente = null;
  public cursos = [];

  public tipoDocumentos = [];

  public tipoDocumentoActual = null;
  public identificacion = null;

  constructor(
    private oldReportsSgaBS: OldreportsSgaService,
  ) {
  }

  ngOnInit(): void {
    this.oldReportsSgaBS.GetFilters('filtersRegistroHoras').then(x => {
      this.tipoDocumentos = x.tipoDocumentos;
      // this.cursos = x.cursos;
      this.loading = false;
    });
  }

  Search() {
    this.loadingSearch = true;
    this.notFound = false;
    this.oldReportsSgaBS.GetFilters('cursosRegistroHoras', {
      tipo_identificacion: this.tipoDocumentoActual.ti_id,
      identificacion: this.identificacion,
    }).then(x => {
      this.loadingSearch = false;
      if (!x.discente.length) {
        this.textNotFound = `No se ha encontrado información del discente identificado con ${this.tipoDocumentoActual.ti_nombre} número ${this.identificacion}`;
        this.notFound = true;
        return false;
      }

      this.discente = x.discente[0];

      if (!x.cursos.length) {
        this.textNotFound = `No se ha encontrado información de cursos para el discente identificado con ${this.tipoDocumentoActual.ti_nombre} número ${this.identificacion}`;
        this.notFound = true;
        return false;
      }

      this.cursos = x.cursos;


    });
  }

  VerIndividualPDF(data) {
    this.generarPDF([data.intIdCursoDeFormacion]);
  }

  generarConsolidado() {
    this.generarPDF(this.cursos.map(curso => curso.intIdCursoDeFormacion));
  }

  generarPDF(cursos) {
    this.loadingDownload = true;
    this.oldReportsSgaBS.GenerateReport('exportPdfRegistroHoras', {
      'cursos[]': cursos,
      discente_id: this.discente.Pe_IdPERSONA_PK,
    }).then(x => {
      window.open(x.url, '_blank');
      this.loadingDownload = false;
    }).catch(e => {
      this.loadingDownload = false;
    });
  }

  public get filters() {
    return {
      // curso_id: this.cursoActual ? this.cursoActual.value : null,
    };
  }

}

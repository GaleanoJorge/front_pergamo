import {Component, OnInit, ViewChild} from '@angular/core';
import {OldreportsSgaService} from '../../../../business-controller/oldreports-sga.service';

@Component({
  selector: 'ngx-academic-activities-done',
  templateUrl: './academic-activities-done.component.html',
  styleUrls: ['./academic-activities-done.component.scss'],
})
export class AcademicActivitiesDoneComponent implements OnInit {
  public messageError = null;
  public title = 'Reporte de actividades académicas realizadas o ejecutadas';
  public exportExcel = 'exportExcelRunCourses';

  public sedes = [];
  public programas = [];
  public modulos = [];
  public recursos = [];
  public coordinadores = [];
  public vigencias = [];
  public loading = true;

  @ViewChild('autoInput') input;

  sedeActual = null;
  programaActual = null;
  moduloActual = null;
  recursoActual = null;
  coordinadorActual = null;
  vigenciaActual = null;

  constructor(
    private oldReportsSgaBS: OldreportsSgaService,
  ) {
  }

  ngOnInit(): void {
    this.oldReportsSgaBS.GetCursosRealizados().then(x => {
      this.sedes = x.sedes;
      this.programas = x.programas;
      this.modulos = x.modulos;
      this.recursos = x.costos;
      this.coordinadores = x.coordinadores;
      this.vigencias = x.vigencias;
      this.loading = false;
    });
  }

  public get filters() {
    return {
      sede_id: this.sedeActual ? this.sedeActual.value : null,
      programa_id: this.programaActual ? this.programaActual.value : null,
      modulo_id: this.moduloActual ? this.moduloActual.value : null,
      recurso_id: this.recursoActual ? this.recursoActual.value : null,
      coordinador_id: this.coordinadorActual ? this.coordinadorActual.value : null,
      vigencia_id: this.vigenciaActual ? this.vigenciaActual.value : null,
    };
  }
}

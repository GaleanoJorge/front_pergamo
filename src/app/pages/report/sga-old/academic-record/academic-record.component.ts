import {Component, OnInit, ViewChild} from '@angular/core';
import {OldreportsSgaService} from '../../../../business-controller/oldreports-sga.service';
import {AutocompleteComponent} from '../../../components/autocomplete/autocomplete.component';

@Component({
  selector: 'ngx-academic-record',
  templateUrl: './academic-record.component.html',
  styleUrls: ['./academic-record.component.scss'],
})
export class AcademicRecordComponent implements OnInit {
  public messageError = null;
  public title = 'Registro académico';

  public loading = true;
  public loadingGroups = false;
  public loadingResume = false;
  public loadingDownload = false;

  public cursos = [];
  public grupos = [];

  public _cursoActual = null;
  public grupoActual = null;

  public curso = null;
  public asistentes = [];

  @ViewChild('gruposAutocomplete') gruposAutocomplete: AutocompleteComponent;

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

  async SearchGroups(curso_id) {
    this.loadingGroups = true;
    this.oldReportsSgaBS.GetFilters('filterGroups', {
      curso_id,
    }).then(x => {
      this.setGroups(x.grupos);
      this.loadingGroups = false;
    });
  }

  set cursoActual(value) {
    if (value)
      this.SearchGroups(value.value);
    else {
      this.setGroups([]);
    }

    this._cursoActual = value;
  }

  private setGroups(grupos) {
    this.grupos = grupos;
    this.gruposAutocomplete.setOptions(grupos);
  }

  get cursoActual() {
    return this._cursoActual;
  }

  SearchResume() {
    this.loadingResume = true;
    this.curso = null;
    this.asistentes = [];
    this.oldReportsSgaBS.GetFilters('resumenRegistroAcademico', {
      curso_id: this.cursoActual.value,
      grupo_id: this.grupoActual.intIdGrupoDeFormacion,
    }).then(x => {
      this.loadingResume = false;

      this.curso = x.curso[0];
      this.asistentes = x.asistentes;
    }).catch(e => {
      this.loadingResume = false;
    });
  }

  DownloadCertificate() {
    this.loadingDownload = true;
    this.oldReportsSgaBS.GenerateReport('exportPdfRegistroAcademico', {
      curso_id: this.cursoActual.value,
      grupo_id: this.grupoActual.intIdGrupoDeFormacion,
    }).then(x => {
      window.open(x.url, '_blank');
      this.loadingDownload = false;
    }).catch(e => {
      this.loadingDownload = false;
    });
  }
}

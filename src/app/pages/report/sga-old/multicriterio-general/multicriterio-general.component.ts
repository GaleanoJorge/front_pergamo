import {Component, OnInit, ViewChild} from '@angular/core';
import {OldreportsSgaService} from '../../../../business-controller/oldreports-sga.service';
import {BaseTableComponent} from '../../../components/base-table/base-table.component';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-multicriterio-general',
  templateUrl: './multicriterio-general.component.html',
  styleUrls: ['./multicriterio-general.component.scss'],
})
export class MulticriterioGeneralComponent implements OnInit {
  public messageError = null;
  public title = 'Reporte multicriterio';
  // public exportExcel = 'participantesMulticriterio';
  public exportExcel = null;
  public loading = true;
  public loadingResume = false;
  public isSearch = false;
  public filtersRequired = {
    'fecha_inicio': 'Fecha inicio',
    'fecha_fin': 'Fecha fin',
  };

  public cursos = [];
  public sedes = [];
  public programas = [];
  public modulos = [];
  public costos = [];
  public coordinadores = [];
  public vigencias = [];
  public zonas = [];
  public tipoDocumentos = [];
  public tipoParticipante = [];
  public genero = [];
  public cargos = [];
  public despachos = [];
  public especialidades = [];
  public entidades = [];
  public concejos = [];
  public distritos = [];
  public circuitos = [];
  public ciudades = [];
  public tipoUsuario = [];
  public columnasOptions = [];

  public fechaInicio = null;
  public fechaFin = null;
  public cursoActual = null;
  public sedeActual = null;
  public programaActual = null;
  public moduloActual = null;
  public costoActual = null;
  public coordinadorActual = null;
  public vigenciaActual = null;
  public codigoGrupo = null;
  public zonaActual = null;
  public tipoDocumentoActual = null;
  public tipoParticipanteActual = null;
  public numeroDocumento = null;
  public primerApellido = null;
  public segundoApellido = null;
  public primerNombre = null;
  public segundoNombre = null;
  public generoActual = null;
  public cargoActual = null;
  public despachoActual = null;
  public especialidadActual = null;
  public entidadActual = null;
  public concejoActual = null;
  public distritoActual = null;
  public circuitoActual = null;
  public ciudadActual = null;
  public tipoUsuarioActual = null;
  public columnas = [];
  public settings = {
    columns: {},
  };

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private oldReportsSgaBS: OldreportsSgaService,
    private toastService: NbToastrService,
  ) {
  }

  async ngOnInit() {
    const response = this.oldReportsSgaBS.GetFilters('filtersMulticriterioGeneral').then(x => {
      this.zonas = x.zonas;
      this.sedes = x.sedes;
      this.programas = x.programas;
      this.modulos = x.modulos;
      this.costos = x.costos;
      this.coordinadores = x.coordinadores;
      this.vigencias = x.vigencias;
      this.tipoDocumentos = x.tipoDocumentos;
      this.tipoParticipante = x.tipoParticipante;
      this.genero = x.genero;
      this.cargos = x.cargos;
      this.despachos = x.despachos;
      this.especialidades = x.especialidades;
      this.entidades = x.entidades;
      this.concejos = x.concejos;
      this.distritos = x.distritos;
      this.circuitos = x.circuitos;
      this.ciudades = x.ciudades;
      this.tipoUsuario = x.tipoUsuario;
      this.columnasOptions = x.columnas;
    });

    const response2 = this.oldReportsSgaBS.GetFilters('filterCourses').then(x => {
      this.cursos = x.cursos;
    });

    await Promise.all([
      response,
      response2,
    ]);

    this.loading = false;
  }

  SearchResume() {
    this.isSearch = true;
    this.toastService.success(null, 'Buscando información');
    setTimeout(() => {
      this.table.setSettings(this.getSettings());
      this.table.refresh(this.getQueryParams());
      this.exportExcel = 'exportExcelMulticriterioParticipantes';
    }, 500);
  }

  changeCustomColumns($event, column) {
    if ($event) {
      this.columnas.push(column.value);
    } else {
      this.columnas.map((f, index) => {
        if (f === column.value) {
          this.columnas.splice(index, 1);
        }
      });
    }
  }

  public get filters() {
    return {
      /*Rango de fechas*/
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.fechaFin,
      /*Evento academico*/
      codigo_grupo: this.codigoGrupo,
      zona_id: this.zonaActual ? this.zonaActual.intIdParametroDeFormador : null,
      curso_id: this.cursoActual ? this.cursoActual.value : null,
      sede_id: this.sedeActual ? this.sedeActual.value : null,
      programa_id: this.programaActual ? this.programaActual.value : null,
      modulo_id: this.moduloActual ? this.moduloActual.value : null,
      recurso_id: this.costoActual ? this.costoActual.value : null,
      coordinador_id: this.coordinadorActual ? this.coordinadorActual.value : null,
      vigencia_id: this.vigenciaActual ? this.vigenciaActual.value : null,
      /*Datos básicos del participante*/
      tipo_documento_id: this.tipoDocumentoActual ? this.tipoDocumentoActual.ti_id : null,
      tipo_participante_id: this.tipoParticipanteActual ? this.tipoParticipanteActual.value : null,
      numero_documento: this.numeroDocumento,
      primer_apellido: this.primerApellido,
      segundo_apellido: this.segundoApellido,
      primer_nombre: this.primerNombre,
      segundo_nombre: this.segundoNombre,
      genero_id: this.generoActual ? this.generoActual.value : null,
      /*Información laboral*/
      cargo_id: this.cargoActual ? this.cargoActual.lc_id : null,
      despacho_id: this.despachoActual ? this.despachoActual.id : null,
      especialidad_id: this.especialidadActual ? this.especialidadActual.e_idespecialidad : null,
      entidad_id: this.entidadActual ? this.entidadActual.en_Identidad_pk : null,
      concejo_id: this.concejoActual ? this.concejoActual.cs_id : null,
      distrito_id: this.distritoActual ? this.distritoActual.d_id : null,
      circuito_id: this.circuitoActual ? this.circuitoActual.ci_id_pk : null,
      ciudad_id: this.ciudadActual ? this.ciudadActual.cu_id_pk : null,
      tipo_usuario_id: this.tipoUsuarioActual ? this.tipoUsuarioActual.value : null,
      custom_columns: this.getCustomColumns().join(),
    };
  }

  public getQueryParams() {
    // const custom_columns = this.getCustomColumns();

    const filters = {...this.filters};
    const keys_filters = Object.keys(filters);

    const params = {};

    keys_filters.map(filter => {
      if (filters[filter]) {
        params[filter] = filters[filter];
      }
    });

    return {
      ...params,
    };
  }

  public getCustomColumns() {
    let custom_columns = this.columnasOptions.map(column => column.value);

    if (this.columnas.length) {
      custom_columns = this.columnas;
    }

    return custom_columns;
  }

  public getSettings() {
    const settings = {
      columns: {},
    };

    const custom_columns = this.getCustomColumns();

    this.columnasOptions.map(column => {
      if (custom_columns.includes(column.value)) {
        settings.columns[column.value] = {
          title: column.label,
        };
      }
    });

    return settings;
  }

}

import {Component, OnInit} from '@angular/core';
import {OldreportsSgaService} from '../../../../business-controller/oldreports-sga.service';

@Component({
  selector: 'ngx-individual-surveys',
  templateUrl: './individual-surveys.component.html',
  styleUrls: ['./individual-surveys.component.scss'],
})
export class IndividualSurveysComponent implements OnInit {
  public messageError = null;
  public title = 'Registro Reporte individual de encuestas realizadas o no realizadas';
  public exportExcel = 'exportExcelEncuestaIndividual';
  public loading = true;
  public filtersRequired = {
    'curso_id': 'Curso',
  };

  public optionsCheck = [
    {value: '1', label: 'Si'},
    {value: '0', label: 'No'},
  ];

  public optionsSurveys = [
    {value: 'realizadas', label: 'Encuestas realizadas'},
    {value: 'no_realizadas', label: 'Encuestas no realizadas'},
  ];

  public cursos = [];
  public tipoDocumentos = [];
  public cargos = [];
  public despachos = [];
  public especialidades = [];
  public entidades = [];
  public concejos = [];
  public distritos = [];
  public circuitos = [];
  public ciudades = [];
  public formaciones = [];

  public cursoActual = null;
  public encuestaActual = null;
  public tipoDocumentoActual = null;
  public numeroDocumento = null;
  public primerApellido = null;
  public segundoApellido = null;
  public primerNombre = null;
  public segundoNombre = null;
  public fechaNacimiento = null;
  public email = null;
  public telefonoFijo = null;
  public telefonoCelular = null;
  public cargoActual = null;
  public despachoActual = null;
  public especialidadActual = null;
  public entidadActual = null;
  public concejoActual = null;
  public distritoActual = null;
  public circuitoActual = null;
  public ciudadActual = null;
  public ano_vinculacion = null;
  public cargoInscripcionActual = null;
  public ano_vinculacion_rama = null;
  public ultima_calificacion = null;
  public vinculacion_rama = null;
  public carrera_judicial = null;
  public anotaciones_acuerdo = null;
  public sanciones_disciplinarias = null;
  public formadores_escuela = null;
  public igualdad_genero = null;
  public congestion_despacho = null;
  public eventos_escuela = null;
  public formacion_academica = [];

  constructor(
    private oldReportsSgaBS: OldreportsSgaService,
  ) {
  }

  async ngOnInit() {
    const response = this.oldReportsSgaBS.GetFilters('filterCourses').then(x => {
      this.cursos = x.cursos;
    });
    const response2 = this.oldReportsSgaBS.GetFilters('filtersEncuestaIndividual').then(x => {
      this.tipoDocumentos = x.tipoDocumentos;
      this.cargos = x.cargos;
      this.despachos = x.despachos;
      this.especialidades = x.especialidades;
      this.entidades = x.entidades;
      this.concejos = x.concejos;
      this.distritos = x.distritos;
      this.circuitos = x.circuitos;
      this.ciudades = x.ciudades;
      this.formaciones = x.formacionAcademica;
    });

    await Promise.all([
      response,
      response2,
    ]);

    this.loading = false;
  }

  public get filters() {
    return {
      /*Información académica*/
      curso_id: this.cursoActual ? this.cursoActual.value : null,
      encuesta: this.encuestaActual,
      /*Información básica del formador*/
      tipo_documento_id: this.tipoDocumentoActual ? this.tipoDocumentoActual.ti_id : null,
      numero_documento: this.numeroDocumento,
      primer_apellido: this.primerApellido,
      segundo_apellido: this.segundoApellido,
      primer_nombre: this.primerNombre,
      segundo_nombre: this.segundoNombre,
      fecha_nacimiento: this.fechaNacimiento,
      email: this.email,
      telefono_fijo: this.telefonoFijo,
      telefono_celular: this.telefonoCelular,
      /*Información laboral*/
      cargo_id: this.cargoActual ? this.cargoActual.lc_id : null,
      despacho_id: this.despachoActual ? this.despachoActual.id : null,
      especialidad_id: this.especialidadActual ? this.especialidadActual.e_idespecialidad : null,
      entidad_id: this.entidadActual ? this.entidadActual.en_Identidad_pk : null,
      concejo_id: this.concejoActual ? this.concejoActual.cs_id : null,
      distrito_id: this.distritoActual ? this.distritoActual.d_id : null,
      circuito_id: this.circuitoActual ? this.circuitoActual.ci_id_pk : null,
      ciudad_id: this.ciudadActual ? this.ciudadActual.cu_id_pk : null,
      ano_vinculacion: this.ano_vinculacion,
      cargo_inscripcion_id: this.cargoInscripcionActual ? this.cargoInscripcionActual.lc_id : null,
      ano_vinculacion_rama: this.ano_vinculacion_rama,
      ultima_calificacion: this.ultima_calificacion,
      vinculacion_rama: this.vinculacion_rama,
      carrera_judicial: this.carrera_judicial,
      anotaciones_acuerdo: this.anotaciones_acuerdo,
      sanciones_disciplinarias: this.sanciones_disciplinarias,
      formadores_escuela: this.formadores_escuela,
      igualdad_genero: this.igualdad_genero,
      congestion_despacho: this.congestion_despacho,
      eventos_escuela: this.eventos_escuela,
      'formacion_academica[]': this.formacion_academica,
    };
  }

  public changeFormacionAcademica($event, formacion) {
    if ($event) {
      this.formacion_academica.push(formacion);
    } else {
      this.formacion_academica.map((f, index) => {
        if (f === formacion) {
          this.formacion_academica.splice(index, 1);
        }
      });
    }
  }
}

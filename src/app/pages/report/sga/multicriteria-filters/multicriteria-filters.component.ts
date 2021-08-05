import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { ReportsSgaService } from '../../../../business-controller/reports-sga.service';
import { AutocompleteComponent } from '../../../components/autocomplete/autocomplete.component';
import { OriginBusinessService } from '../../../../business-controller/origin-business.service';
import { LocationBusinessService } from '../../../../business-controller/location-business.service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-multicriteria-filters',
  templateUrl: './multicriteria-filters.component.html',
  styleUrls: ['./multicriteria-filters.component.scss']
})
export class MulticriteriaFiltersComponent implements OnInit {
  public messageError = null;
  public title = 'Reporte multicriterio';
  public exportExcelSGA = null; //'multicriteriaFilters';
  public validateData = () => {
    if(this.start_date && this.finish_date){
      if(moment(this.finish_date).diff(this.start_date)<0){
        this.toast.danger('', `La fecha inicial no debe ser mayor a la final.`);
        return false;
      }
    }else if(!this.start_date){
      this.toast.danger('', `El filtro fecha inicial es obligatorio.`);
      return false;
    }else if(!this.finish_date){
      this.toast.danger('', `El filtro fecha final es obligatorio.`);
      return false;
    }
    return true;
  };

  public loading = true;
  public loadingResume = false;
  public isSearch = false;

  public validities = [];
  public origins = [];
  public categories = [];
  public coordinators = [];
  public dataCampus = [];
  public courses = [];
  public groups = [];
  public identificationTypes = [];
  public genders = [];
  public ethnicities = [];
  public entities = [];
  public positions = [];
  public sectionalCouncils = [];
  public districts = [];
  public circuits = [];
  public regions = [];
  public municipalities = [];
  public specialties = [];
  public offices = [];
  public columnasOptions = [];


  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @ViewChild('originsAutocomplete') originsAutocomplete: AutocompleteComponent;
  @ViewChild('categoriesAutocomplete') categoriesAutocomplete: AutocompleteComponent;
  @ViewChild('subcategoriesAutocomplete') subcategoriesAutocomplete: AutocompleteComponent;
  @ViewChild('coordinatorsAutocomplete') coordinatorsAutocomplete: AutocompleteComponent;
  @ViewChild('groupsAutocomplete') groupsAutocomplete: AutocompleteComponent;
  @ViewChild('coursesAutocomplete') coursesAutocomplete: AutocompleteComponent;
  @ViewChild('municipalitiesAutocomplete') municipalitiesAutocomplete: AutocompleteComponent;

  public start_date = null;
  public finish_date = null;
  public validity = null;
  public origin = null;
  public campus = null;
  public category = null;
  public coordinator = null;
  public course = null;
  public group = null;
  public identificationType = null;
  public identification = null;
  public lastname = null;
  public middlelastname = null;
  public firstname = null;
  public middlefirstname = null;
  public gender = null;
  public ethnicity = null;
  public entity = null;
  public position = null;
  public sectionalCouncil = null;
  public district = null;
  public circuit = null;
  public region = null;
  public municipality = null;
  public specialty = null;
  public office = null;

  public columnas = [];
  public settings = {
    columns: {},
  };


  constructor(
    private toast: NbToastrService,
    private ReportSGA: ReportsSgaService,
    private OriginBS: OriginBusinessService,
    private LocationBS: LocationBusinessService,
  ) { }

  ngOnInit(): void {
    this.ReportSGA.GetCustomFilters('filtersMulticriteria').then(x => {
      this.validities = x.validities;
      this.dataCampus = x.campus;
      this.identificationTypes = x.identificationTypes;
      this.genders = x.genders;
      this.ethnicities = x.ethnicities;
      this.entities = x.entities;
      this.positions = x.positions;
      this.sectionalCouncils = x.sectionalCouncils;
      this.districts = x.districts;
      this.circuits = x.circuits;
      this.specialties = x.specialties;
      this.regions = x.regions;
      this.columnasOptions = x.columnas;
      this.offices = x.offices;
      this.loading = false;
    });

    this.ReportSGA.GetCustomFilters('users', {
      rol:'coordinator'
    }).then(x => {
      this.coordinators = x.users;
    });

    this.ReportSGA.GetCustomFilters('courses', {
    }).then(x => {
      this.courses = x.courses;
    });

    this.loading = false;
  }

  async getCourses() {
    let param = {
      validity_id: this.validity ? this.validity : 0,
      origin_id: this.origin ? this.origin : 0, 
      category_id: this.category ? this.category : 0, 
      campus_id: this.campus ? this.campus : 0
    };
    this.coursesAutocomplete.clearText();
    this.groupsAutocomplete.clearText();
    this.ReportSGA.GetCustomFilters('courses', param).then(x => {
      this.courses = x.courses;
      this.coursesAutocomplete.setOptions(this.courses);
    });
  }

  async SearchGroups(course_id) {
    // this.loadingGroups = true;
    this.ReportSGA.GetCustomFilters('filterGroups', {
      course_id,
    }).then(x => {
      this.setGroups(x.groups);
      // this.loadingGroups = false;
    });
  }

  private setGroups(groups) {
    this.messageError = null;
    this.groups = groups;
    this.groupsAutocomplete.clearText();
    this.groupsAutocomplete.setOptions(groups);
  }

  SearchResume() {
    this.isSearch = true;
    this.toast.success(null, 'Buscando información');
    setTimeout(() => {
      this.table.setSettings(this.getSettings());
      this.table.refresh(this.getQueryParams());
      this.exportExcelSGA = 'multicriteriaFilters';
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
  
  changeValidity(e) {
    this.OriginBS.GetCollection({
      pagination: false, validity_id: e ? e.id : null
    }).then(x => {
      this.origins = x;
      this.originsAutocomplete.setOptions(this.origins);
    });
    this.origin = null;
    this.category = null;
    this.course = null;
    this.group = null;
    this.courses = [];
    this.groups = [];
    this.clearAutoComplete(this.originsAutocomplete);
    this.clearAutoComplete(this.categoriesAutocomplete);
    this.getCourses();
  }
  changeOrigin(e) {
    this.origin = e;
    this.ReportSGA.GetCustomFilters('filtersCategory', {
      origin_id: e ? e.id : null,
      type: 1
    }).then(x => {
      this.categories = x.categories;
      this.categoriesAutocomplete.setOptions(this.categories);
    });
    this.category = null;
    this.course = null;
    this.group = null;
    this.courses = [];
    this.categories = [];
    this.groups = [];
    this.clearAutoComplete(this.categoriesAutocomplete);
    this.getCourses();
  }
  changeCategory(category) {
    this.category = category;
    this.course = null;
    this.group = null;
    this.courses = [];
    this.groups = [];
    this.getCourses();
  }
  changeCampus(campus) {
    this.campus=campus;
    this.course=null;
    this.group = null;
    this.courses = [];
    this.groups = [];
    this.getCourses();
  }
  changeCourse(e) {
    this.group = null;
    this.groups = [];
    if(e){
      this.SearchGroups(e.value);
    }
  } 
  changeRegion(e) {
    this.region = e;
    this.municipalities = [];
    this.municipality = null;
    this.municipalitiesAutocomplete.clearText();
    if(this.region){
      this.LocationBS.GetPublicMunicipalitiesByRegion(this.region.id).then(x => { 
        this.municipalities = x; 
        this.municipalitiesAutocomplete.setOptions(x);
      });
    }
  }

  public get filters() {
    return {
      /*Rango de fechas*/
      start_date: this.start_date,
      finish_date: this.finish_date,
      /*Evento academico*/
      vigencia_id: this.validity ? this.validity.id : null,
      origin_id: this.origin ? this.origin.id : null,
      programa_id: this.category ? this.category.id : null,
      sede_id: this.campus ? this.campus.id : null,
      coordinator_id: this.coordinator ? this.coordinator.value : null,
      course_id: this.course ? this.course.value : null,
      group_id: this.group ? this.group.value : null,
      // modulo_id: this.moduloActual ? this.moduloActual.value : null,
      // recurso_id: this.costoActual ? this.costoActual.value : null,
      /*Datos básicos del participante*/
      // tipo_participante_id: this.tipoParticipanteActual ? this.tipoParticipanteActual.value : null,
      identification_type: this.identificationType ? this.identificationType.id : null,
      identification: this.identification,
      lastname: this.lastname,
      middlelastname: this.middlelastname,
      firstname: this.firstname,
      middlefirstname: this.middlefirstname,
      gener_id: this.gender ? this.gender.id : null,
      ethnicity_id: this.ethnicity ? this.ethnicity.id : null,
      /*Información laboral*/
      entity_id: this.entity ? this.entity.id : null,
      position_id: this.position ? this.position.id : null,
      office_id: this.office ? this.office.id : null,
      specialty: this.specialty ? this.specialty.id : null,
      sectional_council_id: this.sectionalCouncil ? this.sectionalCouncil.id : null,
      district_id: this.district ? this.district.id : null,
      circuit_id: this.circuit ? this.circuit.id : null,
      region_id: this.region ? this.region.id : null,
      ciudad_id: this.municipality ? this.municipality.id : null,
      // tipo_usuario_id: this.tipoUsuarioActual ? this.tipoUsuarioActual.value : null,
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

  changeDate() {
    if(this.start_date && this.finish_date){
      if( moment(this.finish_date).diff(this.start_date, 'days')>30){
        this.toast.info('', `El rango de fechas superior a 30 días genera carga al procesar el reporte.`);
      }
    }
  }

  clearAutoComplete(autoComplete) {
    autoComplete.input.nativeElement.value = '';
    autoComplete.clearButton(true);
    autoComplete.setOptions([]);
  }
  
}

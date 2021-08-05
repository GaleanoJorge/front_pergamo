import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { LocationBusinessService } from '../../../../business-controller/location-business.service';
import { ReportsSgaService } from '../../../../business-controller/reports-sga.service';
import { AutocompleteComponent } from '../../../components/autocomplete/autocomplete.component';
import { FilterReportsComponent } from '../../../components/filter-reports/filter-reports.component';

@Component({
  selector: 'ngx-hours-assistance',
  templateUrl: './hours-assistance.component.html',
  styleUrls: ['./hours-assistance.component.scss']
})
export class HoursAssistanceComponent implements OnInit {
  public messageError = null;
  public title = 'Reporte de asistentes con horas asistencia por fecha de curso';
  public exportExcelSGA = 'hoursOfAssistance';
  public validateData = () => {
    if(this.filterReports.start_date && this.filterReports.finish_date){
      if(moment(this.filterReports.finish_date).diff(this.filterReports.start_date)<0){
        this.toast.danger('', `La fecha inicial no debe ser mayor a la final.`);
        return false;
      }
    }else if(!this.filterReports.start_date){
      this.toast.danger('', `El filtro fecha inicial es obligatorio.`);
      return false;
    }else if(!this.filterReports.finish_date){
      this.toast.danger('', `El filtro fecha final es obligatorio.`);
      return false;
    }
    return true;
  };

  public identificationTypes = [];
  public sectionalCouncils = [];
  public districts = [];
  public circuits = [];
  public regions = [];
  public municipalities = [];
  public specialties = [];

  public loading = true;
 
  @ViewChild('filterReports') filterReports: FilterReportsComponent;
  @ViewChild('municipalitiesAutocomplete') municipalitiesAutocomplete: AutocompleteComponent;
  
  public identificationType = null;
  public identificacion = null;
  public sectionalCouncil = null;
  public district = null;
  public circuit = null;
  public region = null;
  public municipality = null;
  public specialty = null;

  constructor(
    private ReportSGA: ReportsSgaService,
    private LocationBS: LocationBusinessService,
    private toast: NbToastrService,
  ) { }

  ngOnInit(): void {
    
    this.ReportSGA.GetCustomFilters('filtersDiscente').then(x => {
      this.identificationTypes = x.identificationTypes;
      this.sectionalCouncils = x.sectionalCouncils;
      this.districts = x.districts;
      this.circuits = x.circuits;
      this.regions = x.regions;
      this.specialties = x.specialties;
      this.loading = false;
    });

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
    if(this.filterReports){
      return {
        validity_id: this.filterReports.validity ? this.filterReports.validity.id : null,
        origin_id: this.filterReports.origin ? this.filterReports.origin.id : null,
        programa_id: this.filterReports.category ? this.filterReports.category.id : null,
        subprograma_id: this.filterReports.subCategory ? this.filterReports.subCategory.id : null,
        campus_id: this.filterReports.campus ? this.filterReports.campus.id : null,
        course_id: (this.filterReports.course) ? this.filterReports.course.value : null,
        start_date: this.filterReports.start_date ? this.filterReports.start_date : null,
        finish_date: this.filterReports.finish_date ? this.filterReports.finish_date : null,
        type_identification: this.identificationType ? this.identificationType.id : null,
        identification: this.identificacion ? this.identificacion : null,
        sectional_council_id: this.sectionalCouncil ? this.sectionalCouncil.id : null,
        district_id: this.district ? this.district.id : null,
        circuit_id: this.circuit ? this.circuit.id : null,
        region_id: this.region ? this.region.id : null,
        municipality_id: this.municipality ? this.municipality.id : null,
        specialty_id: this.specialty ? this.specialty.id : null,
      };
    }
    return { };
  }
  
  
}

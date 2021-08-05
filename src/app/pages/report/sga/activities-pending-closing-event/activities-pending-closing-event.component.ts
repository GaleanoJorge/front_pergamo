import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { OriginBusinessService } from '../../../../business-controller/origin-business.service';
import { CampusService } from '../../../../business-controller/campus.service';
import { ReportsSgaService } from '../../../../business-controller/reports-sga.service';
import { AutocompleteComponent } from '../../../components/autocomplete/autocomplete.component';
import { ValidityService } from '../../../../business-controller/validity.service';

@Component({
  selector: 'ngx-activities-pending-closing-event',
  templateUrl: './activities-pending-closing-event.component.html',
  styleUrls: ['./activities-pending-closing-event.component.scss']
})
export class ActivitiesPendingClosingEventComponent implements OnInit {
  public messageError = null;
  public title = 'Reporte de actividades pendientes por realizar cierre de evento';
  public exportExcelSGA = 'activitiesPendingClosingEvent';
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

  public validities = [];
  public origins = [];
  public dataCampus = [];
  public categories = [];
  public subcategories = [];
  public coordinators = [];
  public loading = true;
  
  // @ViewChild('coordinatorsAutocomplete') coordinatorsAutocomplete: AutocompleteComponent;
  @ViewChild('originsAutocomplete') originsAutocomplete: AutocompleteComponent;
  @ViewChild('categoriesAutocomplete') categoriesAutocomplete: AutocompleteComponent;
  @ViewChild('subcategoriesAutocomplete') subcategoriesAutocomplete: AutocompleteComponent;

  public validity = null;
  public origin = null;
  public campus = null;
  public category = null;
  public subCategory = null;
  public start_date = null;
  public finish_date = null;
  public coordinator = null;

  constructor(
    private ReportSGA: ReportsSgaService,
    private OriginBS: OriginBusinessService,
    private CampusBS: CampusService,
    private toast: NbToastrService,
    private validityBS: ValidityService
  ) { }

  ngOnInit(): void {
    
    this.validityBS.GetCollection({
      pagination: false
    }).then(x => {
      this.validities = x;
    });
    this.CampusBS.GetCollection({
      pagination: false
    }).then(x => {
      this.dataCampus = x;
    }); 
    this.ReportSGA.GetCustomFilters('users', {
      rol:'coordinator'
    }).then(x => {
      this.coordinators = x.users;
    });
    this.loading = false;
  }

  public get filters() {
    return {
      validity_id: this.validity ? this.validity.id : null,
      origin_id: this.origin ? this.origin.id : null,
      programa_id: this.category ? this.category.id : null,
      subprograma_id: this.subCategory ? this.subCategory.id : null,
      campus_id: this.campus ? this.campus.id : null,
      user_id: this.coordinator ? this.coordinator.value : null,
      start_date: this.start_date ? this.start_date : null,
      finish_date: this.finish_date ? this.finish_date : null,
    };
  }

  
  getCategories(origin_id, type) {
    this.ReportSGA.GetCustomFilters('filtersCategory', {
      origin_id,
      type
    }).then(x => {
      if(type == 1){
        this.categories = x.categories;
        this.categoriesAutocomplete.setOptions(this.categories);
      }else{
        this.subcategories = x.categories;
        this.subcategoriesAutocomplete.setOptions(this.subcategories);
      }
    });
  }

  changeValidity(e) {
    this.OriginBS.GetCollection({
      pagination: false, 
      validity_id: e ? e.id : null 
    }).then(x => {
      this.origins = x;
      this.originsAutocomplete.setOptions(this.origins);
    });
    this.origin = null;
    this.category = null;
    this.subCategory=null;
    this.clearAutoComplete(this.originsAutocomplete);
    this.clearAutoComplete(this.categoriesAutocomplete);
    this.clearAutoComplete(this.subcategoriesAutocomplete);
  }

  changeOrigin(origin) {
    this.origin=origin;
    this.category=null;
    this.subCategory=null;
    this.getCategories(origin ? origin.id : null, 1);
    this.clearAutoComplete(this.categoriesAutocomplete);
    this.clearAutoComplete(this.subcategoriesAutocomplete);
  }

  changeCategory(category) {
    this.category=category;
    this.subCategory=null;
    this.getCategories(category ? category.id : null, 2);
    this.clearAutoComplete(this.subcategoriesAutocomplete);
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { OriginBusinessService } from '../../../../business-controller/origin-business.service';
import { NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { CampusService } from '../../../../business-controller/campus.service';
import { ReportsSgaService } from '../../../../business-controller/reports-sga.service';
import { ValidityService } from '../../../../business-controller/validity.service';
import { AutocompleteComponent } from '../../../components/autocomplete/autocomplete.component';

@Component({
  selector: 'ngx-activities-carried-out',
  templateUrl: './activities-carried-out.component.html',
  styleUrls: ['./activities-carried-out.component.scss']
})
export class ActivitiesCarriedOutComponent implements OnInit {
  public messageError = null;
  public title = 'Reporte de actividades realizadas vs actividades programadas';
  public exportExcelSGA = 'activitiesCarriedOut';
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
  public loading = true;

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

  constructor(
    private OriginBS: OriginBusinessService,
    private ReportSGA: ReportsSgaService,
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
    this.loading = false;
  }

  public get filters() {
    return {
      validity_id: this.validity ? this.validity.id : null,
      origin_id: this.origin ? this.origin.id : null,
      programa_id: this.category ? this.category.id : null,
      subprograma_id: this.subCategory ? this.subCategory.id : null,
      campus_id: this.campus ? this.campus.id : null,
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

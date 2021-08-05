import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { OriginBusinessService } from '../../../business-controller/origin-business.service';
import { CampusService } from '../../../business-controller/campus.service';
import { ReportsSgaService } from '../../../business-controller/reports-sga.service';
import {AutocompleteComponent} from '../../components/autocomplete/autocomplete.component';
import { ValidityService } from '../../../business-controller/validity.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-filter-reports',
  templateUrl: './filter-reports.component.html',
  styleUrls: ['./filter-reports.component.scss']
})
export class FilterReportsComponent implements OnInit {

  public validities = [];
  public origins = [];
  public dataCampus = [];
  public categories = [];
  public subcategories = [];
  public courses = [];

  public loading = true;

  @ViewChild('originsAutocomplete') originsAutocomplete: AutocompleteComponent;
  @ViewChild('categoriesAutocomplete') categoriesAutocomplete: AutocompleteComponent;
  @ViewChild('subcategoriesAutocomplete') subcategoriesAutocomplete: AutocompleteComponent;
  @ViewChild('coursesAutocomplete') coursesAutocomplete: AutocompleteComponent;
  
  public validity = null;
  public origin = null;
  public campus = null;
  public category = null;
  public subCategory = null;
  public start_date = null;
  public finish_date = null;
  public course = null;
  public loadCourses = true;

  constructor(
    private ReportSGA: ReportsSgaService,
    private OriginBS: OriginBusinessService,
    private validityBS: ValidityService,
    private CampusBS: CampusService,
    private toast: NbToastrService
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
    this.ReportSGA.GetCustomFilters('courses', {
    }).then(x => {
      this.courses = x.courses;
    });
    this.loading = false;
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

  getCourses() {
    this.coursesAutocomplete.clearText();
    this.ReportSGA.GetCustomFilters('courses', {
      validity_id: this.validity ? this.validity.id : 0, 
      origin_id: this.origin ? this.origin.id : 0, 
      category_id: this.category ? this.category.id : 0, 
      subcategory_id: this.subCategory ? this.subCategory.id : 0,
      campus_id: this.campus ? this.campus.id : 0
    }).then(x => {
      this.courses = x.courses;
      this.coursesAutocomplete.setOptions(this.courses);
      this.loadCourses = true;
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
    this.course = null;
    this.clearAutoComplete(this.originsAutocomplete);
    this.clearAutoComplete(this.categoriesAutocomplete);
    this.clearAutoComplete(this.subcategoriesAutocomplete);
    this.getCourses();
  }

  changeOrigin(origin) {
    this.origin=origin;
    this.subcategories = [];
    this.category=null;
    this.subCategory=null;
    this.course=null;
    this.courses = [];
    this.clearAutoComplete(this.categoriesAutocomplete);
    this.clearAutoComplete(this.subcategoriesAutocomplete);
    this.getCategories(origin ? origin.id : null, 1);
    this.getCourses();
  }
  
  changeCategory(category) {
    this.category=category;
    this.subCategory=null;
    this.course=null;
    this.courses = [];
    this.clearAutoComplete(this.subcategoriesAutocomplete);
    this.getCategories(category ? category.id : null, 2);
    this.getCourses();
  }
 
  changeSubCategory(subCategory) {
    this.subCategory=subCategory;
    this.course=null;
    this.courses = [];
    if(this.loadCourses) this.getCourses();
  }

  changeCampus(campus) {
    this.campus=campus;
    this.course=null;
    this.courses = [];
    this.getCourses();
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

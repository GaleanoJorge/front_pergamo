import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { FilterReportsComponent } from '../../../components/filter-reports/filter-reports.component';

@Component({
  selector: 'ngx-registered-courses',
  templateUrl: './registered-courses.component.html',
  styleUrls: ['./registered-courses.component.scss']
})
export class RegisteredCoursesComponent implements OnInit {
  public messageError = null;
  public title = 'Listado de cursos registrados';
  public exportExcelSGA = 'registeredCourses';
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

  public loading = true;

  
  @ViewChild('filterReports') filterReports: FilterReportsComponent;

  constructor(
    private toast: NbToastrService
  ) { }

  ngOnInit(): void {
    this.loading = false;
  }

  public get filters() {
    if(this.filterReports){
      return {
        validity_id: this.filterReports.validity ? this.filterReports.validity.id : null,
        origin_id: this.filterReports.origin ? this.filterReports.origin.id : null,
        campus_id: this.filterReports.campus ? this.filterReports.campus.id : null,
        course_id: this.filterReports.course ? this.filterReports.course.value : null,
        programa_id: this.filterReports.category ? this.filterReports.category.id : null,
        subprograma_id: this.filterReports.subCategory ? this.filterReports.subCategory.id : null,
        start_date: this.filterReports.start_date ? this.filterReports.start_date : null,
        finish_date: this.filterReports.finish_date ? this.filterReports.finish_date : null,
      };
    }
    return { };
  }

}

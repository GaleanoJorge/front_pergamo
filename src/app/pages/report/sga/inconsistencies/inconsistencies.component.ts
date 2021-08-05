import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { ReportsSgaService } from '../../../../business-controller/reports-sga.service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-inconsistencies',
  templateUrl: './inconsistencies.component.html',
  styleUrls: ['./inconsistencies.component.scss']
})
export class InconsistenciesComponent implements OnInit {
  
  public messageError = null;
  public title = 'Reporte de horas inconsistentes por actividad académica';
  public exportExcelSGA = 'inconsistencies';
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

  public loadingResume = false;
  public isSearch = false;

  public columnasOptions = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public loading = true;


  public courses = [];
  public columnas = [];

  public course = null;
  public start_date = null;
  public finish_date = null;
  public settings = {
    columns: {},
  };
  
  constructor(
    private toast: NbToastrService,
    private ReportSGA: ReportsSgaService,
  ) {
  }

  ngOnInit(): void {
    this.ReportSGA.GetCustomFilters('filtersSurvey/courses').then(x => {
      this.columnasOptions = x.columns;
      this.courses = x.courses;
      this.loading = false;
    });
  }

  changeDate() {
    if(this.start_date && this.finish_date){
      if( moment(this.finish_date).diff(this.start_date, 'days') > 30){
        this.toast.info('', `El rango de fechas superior a 30 días genera carga al procesar el reporte.`);
      }
    }
  }

  public get filters() {
    return {
      course_id: this.course ? this.course.value : null,
      start_date: this.start_date ? this.start_date : null,
      finish_date: this.finish_date ? this.finish_date : null,
    };
  }

}

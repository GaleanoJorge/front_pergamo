import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { ReportsSgaService } from '../../../../business-controller/reports-sga.service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-survey-trainers',
  templateUrl: './survey-trainers.component.html',
  styleUrls: ['./survey-trainers.component.scss']
})
export class SurveyTrainersComponent implements OnInit {

  public messageError = null;
  public title = 'Reporte evaluación de formadores';
  public exportExcelSGA = null;
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
  public identificationTypes = [];
  public columnas = [];

  public course = null;
  public identificationType = null;
  public identification = null;
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
    this.ReportSGA.GetCustomFilters('filtersSurvey/trainers').then(x => {
      this.columnasOptions = x.columns;
      this.courses = x.courses;
      this.identificationTypes = x.identificationTypes;
      this.getSettings();
      this.loading = false;
    });
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

  SearchResume() {
    if(!this.validateData()) return false;
    this.isSearch = true;
    this.toast.success(null, 'Buscando información');
    setTimeout(() => {
      this.table.refresh(this.getQueryParams());
      this.exportExcelSGA = 'exportSurveyTrainer';
    }, 500);
  }

  public getSettings() {
    this.columnasOptions.map(column => {
        this.settings.columns[column.value] = {
          title: column.label,
        };
    });
  }

  changeDate() {
    if(this.start_date && this.finish_date){
      if( moment(this.finish_date).diff(this.start_date, 'days')>30){
        this.toast.info('', `El rango de fechas superior a 30 días genera carga al procesar el reporte.`);
      }
    }
  }

  public get filters() {
    return {
      course_id: this.course ? this.course.value : null,
      identification_type: this.identificationType ? this.identificationType.id : null,
      identification: this.identification,
      start_date: this.start_date ? this.start_date : null,
      finish_date: this.finish_date ? this.finish_date : null,
    };
  }
}

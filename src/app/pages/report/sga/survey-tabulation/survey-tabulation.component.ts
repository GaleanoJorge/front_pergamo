import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import * as moment from 'moment';

@Component({
  selector: 'ngx-survey-tabulation',
  templateUrl: './survey-tabulation.component.html',
  styleUrls: ['./survey-tabulation.component.scss']
})
export class SurveyTabulationComponent implements OnInit {

  public messageError = null;
  public title = 'Tabulación resultado encuestas aplicadas a los discentes';
  public exportExcelSGA = 'tabulationSurvey';
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
  public start_date = null;
  public finish_date = null;

  constructor(
    private toast: NbToastrService
  ) {
  }

  ngOnInit(): void {
    this.loading = false;
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
      start_date: this.start_date ? this.start_date : null,
      finish_date: this.finish_date ? this.finish_date : null,
    };
  }

}

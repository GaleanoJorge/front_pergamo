import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import * as moment from 'moment';

@Component({
  selector: 'ngx-consolidated-events',
  templateUrl: './consolidated-events.component.html',
  styleUrls: ['./consolidated-events.component.scss']
})
export class ConsolidatedEventsComponent implements OnInit {
  public messageError = null;
  public title = 'Consolidación actos académicos';
  public exportExcelSGA = 'consolidatedEvents';
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

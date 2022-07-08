
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-reason-consultation-respiratory-therapy',
  templateUrl: './reason-consultation-respiratory-therapy.component.html',
  styleUrls: ['./reason-consultation-respiratory-therapy.component.scss'],
})
export class ReasonConsultationRespiratoryTherapyComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  
  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Diagnóstico médico','Diagnóstico terapéutico','Motivo de consulta'];
  public routes = [];
  public data = [];
  public loading: boolean = false;
  public saved: any = null;
  public isSubmitted = false; 
  public all_changes: any[];
  public saveEntry: any = 0;
  

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },

    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
      },
   

      medical_diagnosis: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction: (value) => {
          return value.name;
        },
      },

      therapeutic_diagnosis: {
        title: this.headerFields[2],
        width: 'string',
      },
      reason_consultation: {
        title: this.headerFields[3],
        width: 'string',
      },
    },
  };


constructor(
  public userChangeS: UserChangeService,
  public datePipe: DateFormatPipe,
) {
}

async ngOnInit() {
}

RefreshData() {
  this.table.refresh();
}

receiveMessage($event) {
  if($event==true){
    this.RefreshData();
  }
}
}
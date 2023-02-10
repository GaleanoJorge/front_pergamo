
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
@Component({
  selector: 'ngx-reason-consultation-respiratory-therapy',
  templateUrl: './reason-consultation-respiratory-therapy.component.html',
  styleUrls: ['./reason-consultation-respiratory-therapy.component.scss'],
})
export class ReasonConsultationRespiratoryTherapyComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id = null; 
  @Input() type_record: any = null;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  
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
          return this.datePipe.transform4(value);
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
  if ($event == true) {
    this.RefreshData();
    if (this.type_record_id == 1) {
      this.messageEvent.emit(true);
    }
  }
}

}
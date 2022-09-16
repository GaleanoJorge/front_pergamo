import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { ChOxygenTherapyService } from '../../../business-controller/ch_oxygen_therapy.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-oxygen-therapy',
  templateUrl: './oxygen-therapy.component.html',
  styleUrls: ['./oxygen-therapy.component.scss'],
})
export class OxygenTherapyComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;
  @Input() type_record_id: any = null;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  
  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha','Aplica / No aplica','Observaciones'];
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
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform2(value);
        },
      },
      revision: {
        title: this.headerFields[1],
        width: 'string',
      },
      observation: {
        title: this.headerFields[2],
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
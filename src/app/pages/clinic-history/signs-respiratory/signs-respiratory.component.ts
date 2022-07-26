import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-signs-respiratory',
  templateUrl: './signs-respiratory.component.html',
  styleUrls: ['./signs-respiratory.component.scss'],
})
export class SignsRespiratoryComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;

  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Aleteo nasal ', 'Cianosis Distal',  'Cianosis Generalizada', 'Cianosis Peribucal',
  'Cianosis Periorbital', 'Ninguno', 'Uso de musculos Intercostales','Uso de musculos supraclaviculares' ];
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
      fluter: {
        title: this.headerFields[1],
        width: 'string',
      },
      distal: {
        title: this.headerFields[2],
        width: 'string',
        
      },
      widespread: {
        title: this.headerFields[3],
        width: 'string',
        
      },
      peribucal: {
        title: this.headerFields[4],
        width: 'string',
        
      },
      periorbitary: {
        title: this.headerFields[5],
        width: 'string',
        
      },
      none: {
        title: this.headerFields[6],
        width: 'string',
        
      },
      intercostal: {
        title: this.headerFields[7],
        width: 'string',
        
      },
      aupraclavicular: {
        title: this.headerFields[8],
        width: 'string',
    },
  }
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
    }
  }
}
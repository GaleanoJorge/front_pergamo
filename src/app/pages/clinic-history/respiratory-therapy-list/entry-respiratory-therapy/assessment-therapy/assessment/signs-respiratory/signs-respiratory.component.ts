import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserChangeService } from '../../../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-signs-respiratory',
  templateUrl: './signs-respiratory.component.html',
  styleUrls: ['./signs-respiratory.component.scss'],
})
export class SignsRespiratoryComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;
  @Input() type_record_id: any = null;
  @Input() has_input: any = false;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Signos de dificltad respiratoria' ];
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
      fluter: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return (row.fluter != null ? row.fluter  + ' - ' : "") 
          + (row.distal != null ? row.distal  + ' - ' : "")
          + (row.widespread != null ? row.widespread  + ' - ' : "")
          + (row.peribucal != null ? row.peribucal  + ' - ' : "")
          + (row.periorbitary != null ? row.periorbitary  + ' - ' : "")
          + (row.none != null ? row.none  + ' - ' : "")
          + (row.intercostal != null ? row.intercostal  + ' - ' : "")
          + (row.aupraclavicular != null ? row.aupraclavicular: "")
          ;
        },
    },
  }
  };


  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe,
  ) {
  }

  async ngOnInit() {
    console.log('signos');
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
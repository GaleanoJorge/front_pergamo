import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-ch-ap',
  templateUrl: './ch-ap.component.html',
  styleUrls: ['./ch-ap.component.scss'],
})
export class ChApComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record: any;
  @Input() has_input: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = [
    'Análisis',
    'Plan (Diagnostico, Terapeutico, de seguimiento)',
  ];
  
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;
  

  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      
      analisys: {
        title: this.headerFields[0],
        width: 'string',
      },
      plan: {
        title: this.headerFields[1],
        width: 'string',
      },
     
    },
  };

  constructor(public userChangeS: UserChangeService) {}

  async ngOnInit() {

  }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
      if (this.type_record == 1) {
        this.messageEvent.emit(true);
      }
    }
  }
}

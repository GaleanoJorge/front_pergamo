import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-language-alterations',
  templateUrl: './language-alterations.component.html',
  styleUrls: ['./language-alterations.component.scss'],
})
export class LanguageAlterationsComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = [
    'Fecha',
    'Alteración En Timbre',
    'Alteración En Tono',
    'Alteración En Intensidad',
    'Observaciones',

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

      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform4(value);
        },
        },

      bell_alteration: {
        title: this.headerFields[1],
        width: 'string',
      },
      tone_alteration: {
        title: this.headerFields[2],
        width: 'string',
       
      },
      intensity_alteration: {
        title: this.headerFields[3],
        width: 'string',
      },
      observations: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value;
          } else {
            return 'NO APLICA'
          }
        }
      },
     
    },
  };

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe
    ) {}

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

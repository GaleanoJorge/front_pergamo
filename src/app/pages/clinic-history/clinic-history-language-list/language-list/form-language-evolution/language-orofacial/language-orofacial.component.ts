import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-language-orofacial',
  templateUrl: './language-orofacial.component.html',
  styleUrls: ['./language-orofacial.component.scss'],
})
export class LanguageOrofacialComponent implements OnInit {
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
    'Fecha','Simetría Derecho',	'Tono Derecho',	'Sensibilidad Derecho', 'Simetría Izquierdo', 'Tono Izquierdo', 'Sensibilidad Izquierdo'
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
     

      right_hermiface_symmetry: {
        title: this.headerFields[1],
        width: 'string',
      },
      right_hermiface_tone: {
        title: this.headerFields[2],
        width: 'string',
       
      },
      right_hermiface_sensitivity: {
        title: this.headerFields[3],
        width: 'string',
      },
      left_hermiface_symmetry: {
        title: this.headerFields[4],
        width: 'string',
      },
      left_hermiface_tone: {
        title: this.headerFields[5],
        width: 'string',
      },
      left_hermiface_sensitivity: {
        title: this.headerFields[6],
        width: 'string',
      },
     
    },
  };

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe) {}

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

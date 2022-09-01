import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-assessment-m-ot',
  templateUrl: './table-assessment-m-ot.component.html',
  styleUrls: ['./table-assessment-m-ot.component.scss']
})
export class TableAssessmentMOTComponent implements OnInit {
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
  public headerFields: any[] = ['OBJETIVO 1', 
                                'OBJETIVO 2',
                                'OBJETIVO 3', 
                                'OBJETIVO 4',
                                'OBJETIVO 5', 
                                'OBJETIVO 6',
                                'OBJETIVO 7', 
                                'OBJETIVO 8',
                                'OBJETIVO 9', 
                                'OBJETIVO 10',
                                'CONCEPTO OCUPACIONAL', ];

  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {

      check1_hold: {
        title: this.headerFields[0],
        width: 'string',
      },

      check2_improve: {
        title: this.headerFields[1],
        width: 'string',
      },

      check3_structure: {
        title: this.headerFields[2],
        width: 'string',
      },
      check4_promote: {
        title: this.headerFields[3],
        width: 'string',
      },

      check5_strengthen: {
        title: this.headerFields[4],
        width: 'string',
      },
      check6_promote_2: {
        title: this.headerFields[5],
        width: 'string',
      },

      check7_develop: {
        title: this.headerFields[6],
        width: 'string',
      },
      check8_strengthen_2: {
        title: this.headerFields[7],
        width: 'string',
      },

      check9_favor: {
        title: this.headerFields[8],
        width: 'string',
      },

      check10_functionality: {
        title: this.headerFields[9],
        width: 'string',
      },
      occupational_con: {
        title: this.headerFields[10],
        width: 'string',
      },

      
    },
  };

  constructor(
    public userChangeS: UserChangeService,
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


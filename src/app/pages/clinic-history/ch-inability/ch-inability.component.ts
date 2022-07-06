
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-ch-inability',
  templateUrl: './ch-inability.component.html',
  styleUrls: ['./ch-inability.component.scss'],
})
export class ChInabilityComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = [
    'Codigo de Contingencia', 'Descripción', 'Evidencia',
    
  ];

  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public loading: boolean = false;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      ch_contingency_code: {
        title: this.headerFields[0],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      extension: {
        title: this.headerFields[1],
        type: 'string',
        },
      
        initial_date: {
        title: this.headerFields[2],
        width: 'string',
        
      },
      final_date: {
        title: this.headerFields[3],
        width: 'string',
        
       },
       diagnosis: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      ch_type_inability: {
        title: this.headerFields[5],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      ch_type_procedure: {
        title: this.headerFields[6],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      observation: {
        title: this.headerFields[7],
        width: 'string',
        
       },
    },
  };

  constructor(
    public userChangeS: UserChangeService
    ) {
      
    }

  async ngOnInit() {}

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

 
}

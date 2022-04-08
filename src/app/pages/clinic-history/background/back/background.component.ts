import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserChangeService } from '../../../../business-controller/user-change.service';



@Component({
  selector: 'ngx-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['Lista', 'Revisión', 'Observación'];

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
      ch_type_background: {
        title: this.headerFields[0],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
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


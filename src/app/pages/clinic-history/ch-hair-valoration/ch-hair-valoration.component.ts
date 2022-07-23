import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-ch-hair-valoration',
  templateUrl: './ch-hair-valoration.component.html',
  styleUrls: ['./ch-hair-valoration.component.scss'],
})
export class ChHairValorationComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record: any;

  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = [
    'Cuero cabelludo',
    'Observaciones',
  ];
  
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public loading: boolean = false;
  

  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      hair_revision: {
        title: this.headerFields[0],
        width: 'string',
      },
      observation: {
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
    }
  }
}

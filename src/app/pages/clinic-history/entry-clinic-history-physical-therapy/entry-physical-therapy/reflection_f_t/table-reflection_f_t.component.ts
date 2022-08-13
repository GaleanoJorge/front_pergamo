import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-reflection_f_t',
  templateUrl: './table-reflection_f_t.component.html',
  styleUrls: ['./table-reflection_f_t.component.scss']
})
export class TableReflectionComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record_id;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['BICIPITAL',
                                'ESTILO RADIAL',
                                'TRICIPITAL',
                                'PATELAR O ROTULIANO',
                                'AQUILIANO',
                                'PRESENCIA DE REFLEJOS PATOLOGICOS',
                                'CUAL?'];

  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns:
    {
     
      bicipital:
      {
        title: this.headerFields[0],
        width: 'string',
      },

      radial:
      {
        title: this.headerFields[1],
        width: 'string',
      },

      triceps:
      {
        title: this.headerFields[2],
        width: 'string',
      },

      patellar:
      {
        title: this.headerFields[3],
        width: 'string',
      },

      aquilano:
      {
        title: this.headerFields[4],
        width: 'string',
      },

      reflexes:
      {
        title: this.headerFields[5],
        width: 'string',
      },

      observation:
      {
        title: this.headerFields[6],
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
    }
  }
}



import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-skin-valoration',
  templateUrl: './skin-valoration.component.html',
  styleUrls: ['./skin-valoration.component.scss'],
})
export class SkinValorationComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id;
  @Input() type_record_id;

  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = [
    'DIAGNOSTICO', 'ZONA EXAMINADA', 'EXUDADO', 'TIPO DE EXUDADO', 'SIGNOS DE INFECCIÓN', 'PIEL CIRCUNDANTE', 'ESTADO DE LA PIEL'
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
      diagnosis: {
        title: this.headerFields[0],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      body_region: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      skin_status: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      exudate: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value, row) {
          if(value){
            return value;
          } else {
            return 'NO APLICA';
          }
        },
      },
      concentrated: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction(value, row) {
          if(value){
            return value;
          } else {
            return 'NO APLICA';
          }
        },
      },
      infection_sign: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction(value, row) {
          if(value){
            return value;
          } else {
            return 'NO APLICA';
          }
        },
      },
      surrounding_skin: {
        title: this.headerFields[5],
        width: 'string',
        valuePrepareFunction(value, row) {
          if(value){
            return value;
          } else {
            return 'NO APLICA';
          }
        },
      }
    },
  };

  constructor(
    public userChangeS: UserChangeService
  ) {

  }

  async ngOnInit() { }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }


}

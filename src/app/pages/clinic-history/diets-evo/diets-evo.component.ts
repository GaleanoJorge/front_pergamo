import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../business-controller/user-change.service';

@Component({
  selector: 'ngx-diets-evo',
  templateUrl: './diets-evo.component.html',
  styleUrls: ['./diets-evo.component.scss'],
})
export class DietsEvoComponent implements OnInit {
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
  public headerFields: any[] = ['Oral', 'Enteral','Observaciones'];
  public movieForm: String;

  public isSubmitted: boolean = false;
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

      diet_consistency: {
        title: this.headerFields[0],
        width: 'string',
        valuePrepareFunction(value, row) {
          if(value){
          return value.name;
            }else{
              return 'NO APLICA'
            }
        },
      },
      enterally_diet: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          if(value){
          return value.name;
          }else{
            return 'NO APLICA'
          }

        },
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
    if ($event == true) {
      this.RefreshData();
    }
  }

}
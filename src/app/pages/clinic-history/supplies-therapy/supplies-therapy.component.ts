import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-supplies-therapy',
  templateUrl: './supplies-therapy.component.html',
  styleUrls: ['./supplies-therapy.component.scss'],
})
export class SuppliesTherapyComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;
  
  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha','Producto','Cantidad','Justificación'];
  public routes = [];
  public data = [];
  public loading: boolean = false;
  public saved: any = null;
  public isSubmitted = false; 
  public all_changes: any[];
  public saveEntry: any = 0;
  

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },

    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform2(value);
        },
      },
      product: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.description;
        },
      },
      amount: {
        title: this.headerFields[2],
        width: 'string',
      },
      justification: {
        title: this.headerFields[3],
        width: 'string',
      },
    },
  };


constructor(
  public userChangeS: UserChangeService,
  public datePipe: DateFormatPipe,
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
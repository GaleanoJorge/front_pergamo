
import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ActionsSWComponent } from './actions.component';

@Component({
  selector: 'ngx-sw-support-network',
  templateUrl: './sw-support-network.component.html',
  styleUrls: ['./sw-support-network.component.scss'],
})
export class SwSupportNetworkComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Input() data: any = null;


  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Red de apoyo', 'Brindada por', 'Nota Trabajo Social'];
  public routes = [];
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
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (row.ch_sw_network =! 5) {
            this.showButtom = false;
          }
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'assigned': this.assigned_management_plan,
            'user': this.user,
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: ActionsSWComponent,
      },
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform2(value);
        },
      },
      ch_sw_network: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      provided: {
        title: this.headerFields[2],
        width: 'string',
      },
      sw_note: {
        title: this.headerFields[3],
        width: 'string',
      },

    },
  };
  showButtom: boolean;
  assigned_management_plan: any;
  user: any;


  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe,
    private route: ActivatedRoute,
    private currency: CurrencyPipe,
    private dialogFormService: NbDialogService,

  ) {
  }

  async ngOnInit() {
    // this.record_id = this.route.snapshot.params.id;
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
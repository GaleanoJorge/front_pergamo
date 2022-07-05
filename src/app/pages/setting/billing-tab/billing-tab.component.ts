import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { AuthService } from '../../../services/auth.service';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';

@Component({
  selector: 'ngx-billing-tab',
  templateUrl: './billing-tab.component.html',
  styleUrls: ['./billing-tab.component.scss']
})
export class BillingTabComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['ID'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public entity;
  public user;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
    },

  };
  constructor(
  ) {
  }

  async ngOnInit() {
  }

  RefreshData() {
    this.table.refresh();
  }
}

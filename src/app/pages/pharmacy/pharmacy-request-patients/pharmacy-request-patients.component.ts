import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { AuthService } from '../../../services/auth.service';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';

@Component({
  selector: 'ngx-pharmacy-request-patients',
  templateUrl: './pharmacy-request-patients.component.html',
  styleUrls: ['./pharmacy-request-patients.component.scss']
})
export class PharmacyRequestPatientsComponent implements OnInit {

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
  public showdiv: Number = null;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {

      id: {
        title: this.headerFields[0],
        type: 'string',
      },
    },

  };
  constructor(
    private dialogFormService: NbDialogService,
    private invS: PharmacyLotStockService,
    private authService: AuthService,
  ) {
  }

  async ngOnInit() {
  }
  reloadForm(tab) {
    if (tab.tabTitle == 'DISPENSACIÓN PACIENTE') {
      this.showdiv = 1;
    } else {
      this.showdiv = 2;
    }
  }

  RefreshData() {
    this.table.refresh();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { LocationCapacityService } from '../../../business-controller/location-capacity.service';
import { ActionsLocationCapacityComponent } from './actions-location-capacity.component';
import { AssistanceService } from '../../../business-controller/assistance.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-location-capacity',
  templateUrl: './location-capacity.component.html',
  styleUrls: ['./location-capacity.component.scss']
})
export class LocationCapacityComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'PERSONAL ASISTENCIAL';
  public subtitle: string = 'PERSONAL';
  public headerFields: any[] = ['ROL', 'NOMBRE', 'CAPACIDAD INICIAL', 'CAPACIDAD ACTUAL', 'SERVICIOS EJECUTADOS', 'TIPO DE IDENTIFICACIÓN', 'IDENTIFICACIÓN'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public user_id;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
          };
        },
        renderComponent: ActionsLocationCapacityComponent,
      },
      identification_type: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.user.identification_type.name;
        },
      },
      identification: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.user.identification;
        },
      },
      user: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction(value) {
          return value.firstname + ' ' + value.lastname;
        },
      },
      role_name: {
        title: this.headerFields[0],
        type: 'string',
      },
      total1: {
        title: this.headerFields[2],
        type: 'string',
      },
      total2: {
        title: this.headerFields[3],
        type: 'string',
      },
      total3: {
        title: this.headerFields[4],
        type: 'string',
      },
    },
  };
  
  public routes = [
    {
      name: 'Personal asistencial',
      route: '../../setting/location-capacity',
    },
    
  ];

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.user_id= this.route.snapshot.params.user_id;
  }

  GetParams() {
    return {
      user_id: this.route.snapshot.params.user_id,
    };
  }

  RefreshData() {
    this.table.refresh();
  }
}

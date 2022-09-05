import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActionsLocationCapacityComponent } from './actions-location-capacity.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseLocationPackageComponent } from './sigle-location-capacity/base-location-package/base-location-package.component';
import { RoleBusinessService } from '../../../business-controller/role-business.service';
import { NbDialogService } from '@nebular/theme';

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
  public headerFields: any[] = ['ROL', 'NOMBRE', 'CAPACIDAD INICIAL', 'CAPACIDAD ACTUAL', 'SERVICIOS EJECUTADOS', 'TIPO DE IDENTIFICACIÓN', 'IDENTIFICACIÓN', 'TELÉFONO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public user_id;
  public role;
  public role_id;

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
            'show': this.EditSigleLocationCapacity.bind(this),
          };
        },
        renderComponent: ActionsLocationCapacityComponent,
      },
      identification_type: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.user.identification_type.code;
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
      phone: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.user.phone;
        },
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
    {
      name: 'Admisiones del paciente',
      route: 'single-location-capacity/' + this.route.snapshot.params.user_id,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private dialogFormService: NbDialogService,
    private roleBS: RoleBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.user_id= this.route.snapshot.params.user_id;

    this.roleBS.GetCollection({
      status_id: 1,
      role_type_id: 2,
    }).then(x => {
      this.role = x;
    });
  }

  EditSigleLocationCapacity(data) {
    this.dialogFormService.open(BaseLocationPackageComponent, {
      context: {
        parentData: data.id,
        from_form: false,
      },
    });
  }

  GetParams() {
    return {
      user_id: this.route.snapshot.params.user_id,
    };
  }

  RefreshData() {
    this.table.refresh();
  }

  changeRole($event) {
    this.role_id = $event;
    this.table.changeEntity('assistance/?pagination=true&status_id=1&role_id=' + this.role_id,'assistance');
  }
}

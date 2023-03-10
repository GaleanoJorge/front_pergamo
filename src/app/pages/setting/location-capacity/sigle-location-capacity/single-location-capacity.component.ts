import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { AssistanceService } from '../../../../business-controller/assistance.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ActionsSingleLocationCapacityComponent } from './actions-single-location-capacity.component';
import { FormEditLocationCapacityComponent } from './form-edit-location-capacity/form-edit-location-capacity.component';
import { FormLocationCapacityComponent } from './form-location-capacity/form-location-capacity.component';


@Component({
  selector: 'ngx-single-location-capacity',
  templateUrl: './single-location-capacity.component.html',
  styleUrls: ['./single-location-capacity.component.scss']
})
export class SingleLocationCapacityComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'REGISTROS DE CAPACIDAD INSTALADA';
  public subtitle: string = 'Comunas, Localidades o Veredas'.toUpperCase();
  public title_base: string = 'CAPACIDAD INSTALADA BASE';
  public subtitle_base: string = 'Comunas, Localidades o Veredas'.toUpperCase();
  public headerFields: any[] = ['MES', 'LOCALIDAD', 'CAPACIDAD INICIAL', 'CAPACIDAD ACTUAL', 'CAPACIDAD PROYECTADA', 'SERVICIOS EJECUTADOS'];
  public headerFields_base: any[] = ['MES', 'Comuna, Localidad o Vereda'.toUpperCase(), 'CAPACIDAD BASE'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public assistance_id;
  public assistance_name;
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 5,
    },
    columns: {
      actions: {
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'edit': this.EditSigleLocationCapacity.bind(this),
          };
        },
        renderComponent: ActionsSingleLocationCapacityComponent,
      },
      validation_date: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.getMonthPretty(value);
        }
      },
      'locality': {
        title: this.headerFields_base[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if(row.locality) {
            return row.locality.name;
          } else {
            return row.phone_consult;
          }
        }
      },
      PAD_patient_quantity: {
        title: this.headerFields[2],
        type: 'string',
      },
      PAD_patient_actual_capacity: {
        title: this.headerFields[3],
        type: 'string',
      },
      proyectada: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.PAD_patient_quantity - row.PAD_patient_actual_capacity;
        }
      },
      PAD_patient_attended: {
        title: this.headerFields[5],
        type: 'string',
      },
    },
  };

  @ViewChild(BaseTableComponent) table_base: BaseTableComponent;
  public settings_base = {
    pager: {
      display: true,
      perPage: 5,
    },
    columns: {
      'locality': {
        title: this.headerFields_base[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if(row.locality) {
            return row.locality.name;
          } else {
            return row.phone_consult;
          }
        }
      },
      PAD_base_patient_quantity: {
        title: this.headerFields_base[2],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Capacidad instalada',
      route: '/pages/setting/location-capacity',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    public datePipe: DateFormatPipe,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private assistanceS: AssistanceService,
    private deleteConfirmService: NbDialogService,
   

  ) {
  }

  ngOnInit(): void {
    this.assistance_id = this.route.snapshot.params.user_id;

    this.assistanceS.GetCollection({
      id: this.assistance_id,
    }).then(x => {
      this.assistance_name = x[0]['user']['firstname'] + ' ' + x[0]['user']['lastname'];
    });
  }
  

  GetParams() {
    return {
      assistance_id: this.route.snapshot.params.user_id,
    };
  }

  receiveMessage(event) {
    this.RefreshData();
  }

  RefreshData() {
    this.table.refresh();
    this.table_base.refresh();
  }

  NewSigleLocationCapacity() {
    this.dialogFormService.open(FormLocationCapacityComponent, {
      context: {
        title: 'Editar capacidad instalada',
        data: {
          id: this.assistance_id,
        },
        procedence: 1,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditSigleLocationCapacity(data) {
    this.dialogFormService.open(FormEditLocationCapacityComponent, {
      context: {
        title: 'Editar capacidad instalada',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

}

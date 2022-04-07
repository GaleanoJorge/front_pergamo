import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { FormLocationCapacityComponent } from './form-location-capacity/form-location-capacity.component';

@Component({
  selector: 'ngx-single-location-capacity',
  templateUrl: './single-location-capacity.component.html',
  styleUrls: ['./single-location-capacity.component.scss']
})
export class SingleLocationCapacityComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'CAPACIDAD INSTALADA';
  public subtitle: string = 'LOCALIDADES';
  public headerFields: any[] = ['MES', 'LOCALIDAD', 'CAPACIDAD INICIAL', 'CAPACIDAD ACTUAL', 'SERVICIOS REALIZADOS', 'ACCIONES'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public assistance_id;
  public data = [];
  public validation_done = false;
  public show_create: boolean;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      // actions: {
      //   title: 'ACCIONES',
      //   type: 'custom',
      //   valuePrepareFunction: (value, row) => {
      //     return {
      //       'data': row,
      //       'edit': this.EditSigleLocationCapacity.bind(this),
      //     };
      //   },
      //   renderComponent: ActionsSingleLocationCapacityComponent,
      // },
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (!this.validation_done) {
            var d1 = this.datePipe.getMonth(value);
            var d2 = this.datePipe.getCurrentMonth(value);
            if (d1 < d2) {
              this.show_create = true;
            } else {
              this.show_create = false;
            }
            this.validation_done = true;
          }
          return this.datePipe.getMonthPretty(value);
        }
      },
      locality: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
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
      PAD_patient_attended: {
        title: this.headerFields[4],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Capacidad instalada',
      route: '../../setting/single-location-capacity',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    public datePipe: DateFormatPipe,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    this.assistance_id = this.route.snapshot.params.user_id;
  }

  GetParams() {
    return {
      assistance_id: this.route.snapshot.params.user_id,
    };
  }

  RefreshData() {
    this.validation_done = false;
    this.table.refresh();
  }

  NewSigleLocationCapacity() {
    this.dialogFormService.open(FormLocationCapacityComponent, {
      context: {
        title: 'Crear nueva capacidad instalada',
        data: {
          id: this.assistance_id,
        },
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditSigleLocationCapacity(data) {
    // this.dialogFormService.open(FormSigleLocationCapacityComponent, {
    //   context: {
    //     title: 'Editar día de dietas',
    //     data,
    //     saved: this.RefreshData.bind(this),
    //   },
    // });
  }

}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { AuthService } from '../../../services/auth.service';
import { FixedAssetsService } from '../../../business-controller/fixed-assets.service';
import { FormFixedInventaryAddPatientsComponent } from './form-fixed-inventary-add-patients/form-fixed-inventary-add-patients.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-fixed-inventary-add-patients',
  templateUrl: './fixed-inventary-add-patients.component.html',
  styleUrls: ['./fixed-inventary-add-patients.component.scss']
})
export class FixedInventaryAddPatientsComponent implements OnInit {
  @Input() parentData: any;
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Consecutivo', 'Descripción', 'Marca', 'Modelo', 'Serial', 'Responsable', '# Documento paciente', 'Nombre del paciente', 'Fecha prestamo activo'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public entity;
  public user;
  public validator ;
  public my_fixed_id;


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
      fixed_nom_product: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },

      mark: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_assets.mark;
        },
      },

      model: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_assets.model;
        },
      },

      serial: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_assets.serial;
        },
      },

      own_fixed_user: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.own_fixed_user.firstname + " " + row.own_fixed_user.lastname + " - " + row.own_fixed_user.identification;
        }
      },

      admissions: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.admissions.patients.identification;
        },
      },
      firstname: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.admissions.patients.firstname + " " + row.admissions.patients.lastname;
        },
      },
      created_at: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
      },
    },

  };

  constructor(
    private dialogFormService: NbDialogService,
    private authService: AuthService,
    private FixedAssetsS: FixedAssetsService,
    private toastService: NbToastrService,
    public datePipe: DateFormatPipe,

  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.FixedAssetsS.getFixedByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_fixed_id = x[0].id;
        // this.entity = 'fixed_assets?fixed_stock_id=' + x[0].id+'&status_prod=PRESTADO PACIENTE';
        this.title = 'ACTIVOS ASIGNADOS:  ' + x[0]['fixed_stock']['fixed_type']['name'];
      }else {
        this.toastService.info('Usuario sin tipo de activo asociadas', 'Información');
       }
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  EditInv(data) {
    this.dialogFormService.open(FormFixedInventaryAddPatientsComponent, {
      context: {
        title: 'ENVIAR ACTIVO',
        data: data,
        //   my_pharmacy_id: this.my_pharmacy_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }
}

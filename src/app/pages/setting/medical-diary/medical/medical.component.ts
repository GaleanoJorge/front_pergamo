import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ManualPriceService } from '../../../../business-controller/manual-price.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsMedicalComponent } from '../medical/actions.component';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ManualService } from '../../../../business-controller/manual.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { FormMedicalDiaryComponent } from '../form-medical-diary/form-medical-diary.component';
import { ActionsDaysComponent } from './actions-days.component';

@Component({
  selector: 'ngx-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit {
  @Input() manual_id: number = null;

  public isSubmitted = false;
  public messageError: string = null;
  public title: string;
  public subtitle: string = 'Agenda';
  public headerFields: any[] = [
    'ID',
    'Piso',
    'Pabellon',
    'Consultorio',
    'Inicio agenda',
    'Final agenda',
    'Hora de inicio',
    'Hora de salida',
    'Estado',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public assistance_id;
  public user_id;
  public user;


  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    actions: false,
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'delete': this.DeleteConfirmManualPrice.bind(this),
          };
        },
        renderComponent: ActionsMedicalComponent,
      },
      'office.pavilion.flat': {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.office.pavilion.flat.name;
        },
      },
      'office.pavilion': {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.office.pavilion.name;
        },
      },
      office: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      days: {
        title: 'Dias de servicio',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'days':row.medical_diary_days,
          };
        },
        renderComponent: ActionsDaysComponent,
      },
      start_date: {
        title: this.headerFields[4],
        type: 'string',
      },
      finish_date: {
        title: this.headerFields[5],
        type: 'string',
      },
      start_time: {
        title: this.headerFields[6],
        type: 'string',
      },
      finish_time: {
        title: this.headerFields[7],
        type: 'string',
      },
      diary_status: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Agenda',
      route: '../../setting/medical-diary',
    },
  ];

  constructor(
    private ManualPriceS: ManualPriceService,
    private toastrService: NbToastrService,
    private UserS: UserBusinessService,
    private deleteConfirmService: NbDialogService,
    private route: ActivatedRoute,
  ) {
  }

  async ngOnInit() {

    this.assistance_id = this.route.snapshot.params.id;
    this.user_id = this.route.snapshot.params.user;
    await this.UserS.GetUserById(this.user_id).then(x => {
      this.user = x;
    });
    this.title = 'Agendamiento para ' + this.user.user_role[0].role.name + ' '+ this.user.nombre_completo;


  }

  NewMedical() {
    this.deleteConfirmService.open(FormMedicalDiaryComponent, {
      context: {
        user: this.user,
        assistance_id: this.assistance_id,
        title: 'Crear nueva Agenda',
        saved: this.RefreshData.bind(this),
      },
    });
  }


  RefreshData() {

    this.table.refresh();
  }

  // ChangeState(data) {
  //   // data.status_id = data.status_id === 1 ? 2 : 1;

  //   this.toastrService.info('', 'Cambiando estado');

  //   this.regionS.Update(data).then((x) => {
  //     this.toastrService.success('', x.message);
  //     this.table.refresh();
  //   }).catch((x) => {
  //     this.toastrService.danger(x.message);
  //   });
  // }

  DeleteConfirmManualPrice(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteManualPrice.bind(this),
      },
    });
  }

  DeleteManualPrice(data) {
    return this.ManualPriceS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

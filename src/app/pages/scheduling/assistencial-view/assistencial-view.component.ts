import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NonWorkingDaysService } from '../../../business-controller/non-working-days.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormAssistencialViewComponent } from './form-assistencial-view/form-assistencial-view.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActionsComponent } from '../../setting/sectional-council/actions.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { actionsSemaphore } from './actionsSemaphore.component';
import { CopayParametersService } from '../../../business-controller/copay-parameters.service';
import { AuthService } from '../../../services/auth.service';
import { ActionsAssistencialComponent } from './actions-assistencial.component';
import { MedicalDiaryDaysService } from '../../../business-controller/medical_diary_days.service';
import { FormConfirmDisabledComponent } from '../copay_category/form-confirm-disabled/form-confirm-disabled.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-assistencial-view',
  templateUrl: './assistencial-view.component.html',
  styleUrls: ['./assistencial-view.component.scss'],
})
export class AssistencialViewComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string =
    'Parece que no cuentas con atenciones en este momento';
  public title: string = 'Atenciones para: ';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = [
    'Estado',
    'Tipo de documento',
    'Documento',
    'Nombre',
    'Profesional',
    'Consultorio',
    'Procedimiento',
    'Inicio',
    'Finalización',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public dialog;
  public user;
  public entity = '';

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      select: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          this.messageError = null;
          return {
            data: row,
            // 'editP': this.editPatient.bind(this),
            // 'confirmScheduling': this.confirmScheduling.bind(this),
            // 'check_in': this.checkIn.bind(this),
            cancelScheduling: this.cancelScheduling.bind(this),
          };
        },
        renderComponent: ActionsAssistencialComponent,
      },
      'patient.identification_type': {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (row.patient) {
            return row.patient?.identification_type.name;
          } else {
            return '--';
          }
        },
      },
      'patient.identification': {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (row.patient) {
            return row.patient?.identification;
          } else {
            return '--';
          }
        },
      },
      'patient.nombre_completo': {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (row.patient) {
            return row.patient?.nombre_completo;
          } else {
            return '--';
          }
        },
      },
      'medical_diary.office.pavilion.flat.name': {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (row.medical_diary) {
            return (
              row.medical_diary.office.name +
              ' ' +
              row.medical_diary.office.pavilion.name +
              ' ' +
              row.medical_diary.office.pavilion.flat.name
            );
          } else {
            return '--';
          }
        },
      },
      'services_briefcase.manual_price.procedure': {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (row.services_briefcase) {
            return row.services_briefcase.manual_price.procedure.name;
          } else {
            return '--';
          }
        },
      },
      start_hour: {
        title: this.headerFields[7],
        type: 'string',
        // valuePrepareFunction(value, row) {
        //   return this.datePipe.transform(value);
        // },
      },
      finish_hour: {
        title: this.headerFields[8],
        type: 'string',
        // valuePrepareFunction(value, row) {
        //   return this.datePipe.transform(value);
        // },
      },
    },
  };

  public routes = [
    {
      name: 'Cuotas moderadoras y copagos',
      route: '../../scheduling/non-working-days',
    },
  ];

  constructor(
    private NonWorkingDaysS: NonWorkingDaysService,
    private toastrService: NbToastrService,
    public datePipe: DateFormatPipe,
    private currency: CurrencyPipe,
    private dialogFormService: NbDialogService,
    private CopayParametersS: CopayParametersService,
    private medicalDiaryDaysS: MedicalDiaryDaysService,
    private authS: AuthService,
    private ChangeDetectorRef: ChangeDetectorRef,
    private deleteConfirmService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.user = this.authS.GetUser();

    this.user.id != null
      ? (this.entity = `medical_diary_days?user_id=${this.user.id}`)
      : (this.entity = null);
    this.title = `Atenciones para: ${this.user.lastname} ${this.user.middlelastname[0]}. ${this.user.firstname}`;

    this.ChangeDetectorRef.detectChanges();
  }

  RefreshData() {
    this.table.refresh();
  }

  NewCopayParameters() {
    this.dialogFormService.open(FormAssistencialViewComponent, {
      context: {
        title: 'Crear nueva tarifa',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditNonWorkingDays(data) {
    this.dialogFormService.open(FormAssistencialViewComponent, {
      context: {
        title: 'Editar tarifa',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmNonWorkingDays(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteTypeProfessional.bind(this),
      },
    });
  }

  DeleteTypeProfessional(data) {
    return this.NonWorkingDaysS.Delete(data.id)
      .then((x) => {
        this.table.refresh();
        return Promise.resolve(x.message);
      })
      .catch((x) => {
        throw x;
      });
  }

  // ConfirmDisabled(data) {
  //   this.dialogFormService.open(FormConfirmDisabledComponent, {
  //     context: {
  //       data: data,
  //       desable: this.ChangeState.bind(this),
  //     },
  //   });
  // }

  cancelScheduling(data) {
    this.dialogFormService.open(FormConfirmDisabledComponent, {
      context: {
        data: data,
        CancelScheduling: this.cancel.bind(this),
        // saved: this.RefreshData.bind(this),
      },
    });
  }

  cancel(data) {
    this.medicalDiaryDaysS.ChangeStatus(data.id, 5).then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    });
  }

  ChangeState(data) {
    this.CopayParametersS.ChangeStatus(data.id, data.status_id == 1 ? 2 : 1)
      .then((x) => {
        this.toastrService.success('', x.message);
        this.RefreshData();
      })
      .catch((x) => {
        // this.toastrService.danger(x.message);
      });
  }
}

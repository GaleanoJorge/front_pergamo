import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
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
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  ScheduleComponent,
  EventSettingsModel,
  ResizeService,
  DragAndDropService,
  ActionEventArgs,
  PopupOpenEventArgs,
  TimeScaleModel,
  CellClickEventArgs,
  RenderCellEventArgs,
  View,
} from '@syncfusion/ej2-angular-schedule';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import {
  remove,
  addClass,
  closest,
  Browser,
  L10n,
  Internationalization,
  extend,
  isNullOrUndefined,
  createElement,
} from '@syncfusion/ej2-base';
import { MedicalDiaryService } from '../../../../business-controller/medical-diary.service';
import { FormHealthcareItineraryComponent } from '../../healtcare-itinerary/form-healtcare-itinerary/form-healthcare-itinerary.component';
import { StatusFieldComponent } from '../../copay_category/status-field.component';
import { FormConfirmDisabledComponent } from '../../copay_category/form-confirm-disabled/form-confirm-disabled.component';

@Component({
  selector: 'ngx-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss'],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
  ],
})
export class MedicalComponent implements OnInit {
  @Input() manual_id: number = null;

  public isSubmitted = false;
  public messageError: string = 'Este perfil no cuenta con itinerario Medico';
  public title: string;
  public subtitle: string = 'Agenda';
  public headerFields: any[] = [
    'ID',
    'Piso',
    'Pabellon',
    'Consultorio',
    'Inicio agenda',
    'Final agenda',
    'Horario',
    'Hora de salida',
    'Estado',
    'Lugar'
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public assistance_id;
  public user;
  public user_id;
  public currentView: View = 'Week';
  public entity: any = null;
  public schedulerDate = new Date();
  public medical_diary: any[] = [];
  public timeScale: TimeScaleModel = {
    enable: true,
    interval: 60,
    slotCount: 3,
  };

  public done: boolean = false;
  
  public scheduleData: Object[] = [];
  public ignore: boolean = true;
  public deleting: boolean = false;
  public click: boolean = false;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @ViewChild('Schedule') Schedule: ScheduleComponent;

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
          if(!this.done){
            this.done = true;
            this.messageError = null;
          }
          return {
            data: row,
            delete: this.DeleteConfirmManualPrice.bind(this),
          };
        },
        renderComponent: ActionsMedicalComponent,
      },
      'office.pavilion.flat.name': {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction(value, row) {
          if(row.office){
            return row.office.name + '- \n' + row.office.pavilion.name + '- \n' + row.office.pavilion.flat.name;
          } else {
            return '--'
          }
        },
      },
      // 'office.pavilion.flat': {
      //   title: this.headerFields[1],
      //   type: 'string',
      //   valuePrepareFunction: (value, row) => {
      //     // this.charge();
      //     return row.office.pavilion.flat.name;
      //   },
      // },
      // 'office.pavilion': {
      //   title: this.headerFields[2],
      //   type: 'string',
      //   valuePrepareFunction: (value, row) => {
      //     return row.office.pavilion.name;
      //   },
      // },
      // office: {
      //   title: this.headerFields[3],
      //   type: 'string',
      //   valuePrepareFunction: (value, row) => {
      //     return value.name;
      //   },
      // },
      days: {
        title: 'Dias de servicio',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            days: row.medical_diary_days,
          };
        },
        renderComponent: ActionsDaysComponent,
      },
      procedure: {
        title: 'Procedimiento',
        type: 'string',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          if(value){
            return value.name;
          } else {
            return '--';
          }
        },
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
        valuePrepareFunction: (value, row) => {
          return row.start_time + ' - ' + row.finish_time;
        },
      },
      status: {
        title: this.headerFields[8],
        type: 'custom',
        width: '10%',
        valuePrepareFunction: (value, row) => {
          return {
            data: row,
            changeState: this.ConfirmDisabled.bind(this),
            aditional: true,
          };
        },
        renderComponent: StatusFieldComponent,
      },
    },
  };

  public eventSettings: EventSettingsModel;

  public routes = [
    {
      name: 'Agenda',
      route: '../../scheduling/medical-diary',
    },
  ];

  constructor(
    private ManualPriceS: ManualPriceService,
    private toastrService: NbToastrService,
    private UserS: UserBusinessService,
    private deleteConfirmService: NbDialogService,
    private route: ActivatedRoute,
    private dialogFormService: NbDialogService,
    private medicalDiaryS: MedicalDiaryService
  ) {}

  async ngOnInit() {
    this.assistance_id = this.route.snapshot.params.id;
    this.user_id = this.route.snapshot.params.user;
    await this.UserS.GetUserById(this.user_id).then((x) => {
      this.user = x;
    });
    this.title =
      'Agendamiento para ' +
      this.user.user_role[0].role.name +
      ' ' +
      this.user.nombre_completo;
  }

  onEventRendered(args): void {
    const categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  ViewScheduling() {
    this.click = true;
    this.eventSettings = undefined;
    this.scheduleData = [];

    this.medicalDiaryS
      .GetCollection({ assistance_id: this.assistance_id, status_id: 1})
      .then((x) => {
        this.medical_diary = x;
        if (this.medical_diary.length > 0) {
          this.messageError = null;
          this.medical_diary.forEach((x) => {
            x.medical_diary_days.forEach((x) => {
              var data = {
                Id: x.id,
                Subject:
                  x.medical_status_id == 1
                    ? 'Libre'
                    : x.medical_status_id == 2
                    ? 'Reservada por ' + x.patient.nombre_completo
                    : x.medical_status_id == 3
                    ? 'Confirmada por ' + x.patient.nombre_completo
                    : x.medical_status_id == 4
                    ? 'Facturada'
                    : 'Cancelada',
                StartTime: new Date(x.start_hour),
                EndTime: new Date(x.finish_hour),
                CategoryColor: x.medical_status_id == 1
                ? '#37B24D'
                : x.medical_status_id == 2
                ? '#D8E926'
                : x.medical_status_id == 3
                ? '#09DBD4'
                : x.medical_status_id == 4
                ? '#F44C01'
                : '#7309DB', 
                IsReadonly: false,
                data: x,
                assistance_id: this.assistance_id,
              };
              this.scheduleData.push(data);
              this.charge();
            });
          });
          // var cells;
          // buttons = document.querySelector('.e-footer-content')
        } else {
          this.eventSettings = undefined;
          this.messageError = 'Este perfil no cuenta con itinerario activo';
          // this.toastrService.warning
        }
      });
  }

  HideScheduling() {
    this.click = false;
    this.scheduleData = [];
    this.eventSettings = undefined;
  }

  renderCell(args: RenderCellEventArgs) {
    // console.log(args);
    // var cells = document
    //   .querySelector('.td')
    //   .getElementsByClassName('e-work-cells');
    // // cells.forEach(element => {
      
    // // });
    // this.Schedule.cssClass = 'healthcare-itinerary.component'
  }

  charge() {
    this.eventSettings = {
      dataSource: <Object[]>extend([], this.scheduleData, null, true),
    };
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

  public onCellDoubleClick(args: CellClickEventArgs): void {
    args.cancel = true;
    // You can use your custom dialog
  }

  RefreshData() {
    // this.medicalDiaryS.GetCollection({assistance: this.assistance_id}).then( x => {
    //   this.medical_diary = x;
    //   if(this.medical_diary.length > 0){
    //     this.medical_diary.forEach(x => {
    //       x.medical_diary_days.forEach(x => {
    //         var data =
    //           {
    //             Id: x.id,
    //             Subject: 'Libre',
    //             StartTime: new Date(x.start_hour),
    //             EndTime: new Date(x.finish_hour),
    //             CategoryColor: '#1aaa55'
    //           }

    //         this.scheduleData.push(data);
    //         this.charge();
    //       });
    //     });
    //   } else {
    //     this.messageError = "Este perfil no cuenta con itinerario Medico"
    //   }
    // });

    if (this.click) {
      this.ViewScheduling();
    } else {
      this.HideScheduling();
    }
    this.done = false;
    this.table.refresh();
  }

  onActionComplete(args: ActionEventArgs): void {
    console.log(args);
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    // console.log(args);
    // if(args.type == "EventContainer"){
    // } else if(args.type == "QuickInfo") {
    //   args.cancel = true;
    // } else {
    //   args.cancel = true;
    //   this.dialogFormService.open(FormHealthcareItineraryComponent, {
    //     context: {
    //       data: args.data,
    //       // patientData: this.patient_data,
    //       assistance: this.user,
    //       // cups_selected_id: this.procedure_id.id,
    //       // title: 'Agendar paciente',
    //       saved: this.RefreshData.bind(this),
    //     },
    //   });
    // }

    if (args.type == 'Editor') {
      args.cancel = true;
      this.dialogFormService.open(FormHealthcareItineraryComponent, {
        context: {
          data: args.data,
          // patientData: this.patient_data,
          assistance: this.user,
          // cups_selected_id: this.procedure_id.id,
          // disabled: true,
          onlyView: true,
          saved: this.RefreshData.bind(this),
        },
      });
    } else if (args.type == 'EventContainer') {
    } else {
      args.cancel = true;
    }
  }
  
  ConfirmDisabled(data) {
    this.dialogFormService.open(FormConfirmDisabledComponent, {
      context: {
        data: data,
        desable_agend: this.ChangeState.bind(this),
      },
    });
  }

  ChangeState(data) {
    this.medicalDiaryS
      .ChangeStatus(data.id, {status_id: data.diary_status_id == 1 ? 2 : 1})
      .then((x) => {
        this.toastrService.success('', x.message);
        this.RefreshData();
      })
      .catch((x) => {
        this.toastrService.danger('',x);
      });


  }

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
    return this.medicalDiaryS
      .Delete(data.id)
      .then((x) => {
        this.table.refresh();
        return Promise.resolve(x.message);
      })
      .catch((x) => {
        throw x;
      });
  }
}

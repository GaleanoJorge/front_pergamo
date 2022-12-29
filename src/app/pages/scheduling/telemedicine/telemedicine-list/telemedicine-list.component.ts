import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component'; 
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { FormTelemedicineComponent } from './form-telemedicine/form-telemedicine.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { ObjetionCodeResponseService } from '../../../../business-controller/objetion-code-response.service';
import { ObjetionResponseService } from '../../../../business-controller/objetion-response.service';
import { CurrencyPipe } from '@angular/common';
import { AuthMiPresService } from '../../../../services/auth-mipress.service';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, ScheduleComponent, EventSettingsModel, ResizeService, DragAndDropService, ActionEventArgs, PopupOpenEventArgs, TimeScaleModel } from '@syncfusion/ej2-angular-schedule';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import {
  remove, addClass, closest, Browser, L10n, Internationalization, extend, isNullOrUndefined, createElement
} from '@syncfusion/ej2-base';

@Component({
  selector: 'ngx-telemedicine-list',
  templateUrl: './telemedicine-list.component.html',
  styleUrls: ['./telemedicine-list.component.scss'],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService
  ],

})
export class TelemedicineListComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Parentesco';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data: any[] = [];
  public entity: any = null;
  public schedulerDate = new Date();
  public timeScale: TimeScaleModel = { enable: true, interval: 60, slotCount: 3 };

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditTelemedicine.bind(this),
          };
        },
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Telemedicine',
      route: '../../list',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogFormService: NbDialogService,
    private authS: AuthService,
    private authTelemedicineS: AuthMiPresService,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,
    private currency: CurrencyPipe,
    private authService: AuthService,
    private dialogService: NbDialogService,
    private objetionCodeResponseS: ObjetionCodeResponseService,
    private objetionResponseS: ObjetionResponseService,
    private toastS: NbToastrService,
  ) {
  }
  public form: FormGroup;
  public ResponseTelemedicineForm: FormGroup;
  public RadicationTelemedicineForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;
  public scheduleObj: ScheduleComponent;




  async ngOnInit() {

  }



  RefreshData() {
    this.table.refresh();
  }

  onActionComplete(args: ActionEventArgs): void {
    console.log(args);
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    console.log(args)

    // args.element.ej2_instances[0].headerEle.firstChild.textContent = 'nueva cita';

    if (args.type === 'Editor') {
      args.element.querySelector(".e-title-text").innerHTML = 'Nuevo agendamiento';
      args.element.querySelector(".e-all-day-time-zone-row").remove();
      args.element.querySelector(".e-location-container").remove();
      // e-all-day-time-zone-row
    }


    // if (args.type === 'Editor') {

    // }
    // if (args.type === 'QuickInfo') {
    //   if (args.target.classList.contains('e-work-cells') || args.target.classList.contains('e-header-cells')) {
    //     this.scheduleObj.closeQuickInfoPopup();
    //     args.cancel = true;
    //   } else if (args.target.classList.contains('e-appointment')) {
    //     (args.element as HTMLElement).style.boxShadow = `1px 2px 5px 0 ${(args.target as HTMLElement).style.backgroundColor}`;
    //   }
    // }
    // if (args.type === 'EventContainer') {
    //   const eventElements: NodeListOf<HTMLElement> = args.element.querySelectorAll('.e-appointment');
    //   eventElements.forEach((element: HTMLElement) => { (element.querySelector('.e-subject') as HTMLElement).style.color = '#fff'; });
    // }
  }

  NewTelemedicine() {
    // this.dialogFormService.open(FormTelemedicineComponent, {
    //   context: {
    //     title: 'Crear nueva glosa',
    //     saved: this.RefreshData.bind(this),
    //   },
    // });


  }

  EditTelemedicine(data) {
    this.dialogFormService.open(FormTelemedicineComponent, {
      context: {
        title: 'Editar glosa',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }


  GetResponseParam() {
    if (!this.objetion_code_response || !this.objetion_response) {
      this.objetionCodeResponseS.GetCollection().then(x => {
        this.objetion_code_response = x;
      });
      this.objetionResponseS.GetCollection().then(x => {
        this.objetion_response = x;
      });
    }
  }


}

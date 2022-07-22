import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormTelemedicineComponent } from './form-telemedicine/form-telemedicine.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ObjetionCodeResponseService } from '../../../business-controller/objetion-code-response.service';
import { ObjetionResponseService } from '../../../business-controller/objetion-response.service';
import { CurrencyPipe } from '@angular/common';
import { AuthMiPresService } from '../../../services/auth-mipress.service';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'ngx-telemedicine-list',
  templateUrl: './telemedicine-list.component.html',
  styleUrls: ['./telemedicine-list.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],

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




  async ngOnInit() {
    
    

  }

  RefreshData() {
    this.table.refresh();
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

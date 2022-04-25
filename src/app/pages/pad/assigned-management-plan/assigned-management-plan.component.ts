import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Actions4Component } from './actions.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import * as XLSX from 'ts-xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CurrencyPipe } from '@angular/common';
import { date } from '@rxweb/reactive-form-validators';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { PatientService } from '../../../business-controller/patient.service';

@Component({
  selector: 'ngx-assigned-management-plan',
  templateUrl: './assigned-management-plan.component.html',
  styleUrls: ['./assigned-management-plan.component.scss'],
})
export class AssignedManagementPlanComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'Ejecución Plan de manejo';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha de inicio', 'Fecha Final','Fecha de ejecución'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public file: File;
  public management_id;
  public user_id;
  public user;
  public dialog;
  public currentRole;
  public selectedOptions: any[] = [];
  public result: any = null;
  


  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'user':this.user,
            'refresh': this.RefreshData.bind(this),
            'currentRole': this.currentRole,
          };
        },
        renderComponent: Actions4Component,
      },
      start_date: {
        title: this.headerFields[0],
        type: 'string',
      },
      finish_date: {
        title: this.headerFields[1],
        type: 'string',
      },
      execution_date: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Pad',
      route: '../pad/list',
    },
    {
      name: 'Plan de manejo',
    },
    {
      name: 'Ejecución de plan de manejo',
    },
  ];

  constructor(

    private formBuilder: FormBuilder,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,

    private currency: CurrencyPipe,
    private patientBS: PatientService,
    private userBS: UserBusinessService,

    private authService: AuthService,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private route: ActivatedRoute,

  ) {
  }
  public form: FormGroup;
  public ResponseManagementPlanForm: FormGroup;
  public RadicationManagementPlanForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;
  public user_logged;
  




  async ngOnInit() {
 
    this.management_id = this.route.snapshot.params.management_id;
    this.user = this.authService.GetUser();
    if(this.user.roles[0].role_type_id==2){
      this.user_logged= this.authService.GetUser().id;
    }else{
      this.user_logged=0;
    }
    
    this.user_id = this.route.snapshot.params.user;

    await this.patientBS.GetUserById(this.user_id).then(x => {
      this.user=x;
    });
  }



  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }



  RefreshData() {
    this.table.refresh();
  }

}

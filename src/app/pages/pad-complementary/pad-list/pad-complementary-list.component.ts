import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Actions2Component } from './actions.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormPadComplementaryComponent } from './form-pad/form-pad-complementary.component';
import * as XLSX from 'ts-xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CurrencyPipe } from '@angular/common';
import { date } from '@rxweb/reactive-form-validators';
import { DiagnosisService } from '../../../business-controller/diagnosis.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';

@Component({
  selector: 'ngx-pad-complementary-list',
  templateUrl: './pad-complementary-list.component.html',
  styleUrls: ['./pad-complementary-list.component.scss'],
})
export class PadComplementaryListComponent implements OnInit {
  public isSubmitted = false;
  public entity: string = "admission/byPAC/2";
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title_D: string = 'DILIGENCIAMIENTO PLAN DE ATENCIÓN COMPLEMENTARIA';
  public title_H: string = 'HISTORICO PLAN DE ATENCIÓN COMPLEMENTARIA';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['Tipo de documento', 'Número de documento', 'Nombre completo', 'Email', 'Ciudad', 'Barrio', 'Dirección', 'Consecutivo de ingreso', 'ambito', 'Programa', 'Sede'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public file: File;
  public user_id;
  public user;
  public dialog;
  public currentRole;
  public ambit;

  public selectedOptions: any[] = [];
  public result: any = null;
  public diagnosis: any[] = [];
  public profesionals: any[] = [];


  @ViewChild(BaseTableComponent) table: BaseTableComponent;


  public settings_D = {
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
            'edit': this.EditPadComplementary.bind(this),
            'delete': this.DeleteConfirmPadComplementary.bind(this),
            'confirm': this.ConfirmAction.bind(this),
            'refresh': this.RefreshData.bind(this),
            'currentRole': this.currentRole,
          };
        },
        renderComponent: Actions2Component,
      },
      identification_type: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      identification: {
        title: this.headerFields[1],
        type: 'string',
      },
      nombre_completo: {
        title: this.headerFields[2],
        type: 'string',
      },
      email: {
        title: this.headerFields[3],
        type: 'string',
      },
      residence_municipality: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      residence: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      residence_address: {
        title: this.headerFields[6],
        type: 'string',
      },
    },
  };

  @ViewChild(BaseTableComponent) table2: BaseTableComponent;

  public settings_H = {
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
            'edit': this.EditPadComplementary.bind(this),
            'delete': this.DeleteConfirmPadComplementary.bind(this),
            'confirm': this.ConfirmAction.bind(this),
            'refresh': this.RefreshData.bind(this),
            'currentRole': this.currentRole,
          };
        },
        renderComponent: Actions2Component,
      },
      consecutive: {
        title: this.headerFields[7],
        width: '5%',
      },
      identification_type: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      identification: {
        title: this.headerFields[1],
        type: 'string',
      },
      nombre_completo: {
        title: this.headerFields[2],
        type: 'string',
      },
      email: {
        title: this.headerFields[3],
        type: 'string',
      },
      residence_municipality: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      residence_address: {
        title: this.headerFields[6],
        type: 'string',
      },
      contract: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      entry_date: {
        title: this.headerFields[9],
        type: 'date',
      },
      discharge_date: {
        title: this.headerFields[10],
        type: 'date',
        valuePrepareFunction: (value, row) => {
          return value;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Plan complemantario',
      route: './',
    },
  ];

  constructor(

    private formBuilder: FormBuilder,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,
    private DiagnosisS: DiagnosisService,
    private UserBS: UserBusinessService,
    private currency: CurrencyPipe,
    private router: Router,
    private authService: AuthService,
    private dialogService: NbDialogService,

    private toastS: NbToastrService,
  ) {
  }
  public form: FormGroup;
  public ResponseGlossForm: FormGroup;
  public RadicationGlossForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;




  async ngOnInit() {
    // console.log('prueba');
    // this.user = this.authService.GetUser();
    // this.user_id = this.user.id;
    // this.currentRole = this.authService.GetRole();
    // if (this.user_id && this.currentRole == 5) {
    //   this.entity = 'gloss/byStatus/0/' + this.user_id;
    // } else if (this.user_id && this.currentRole == 6) {
    //   this.entity = 'gloss/byStatus/3/0';
    // }
    // else {
    //   this.entity = "gloss/?pagination=true";
    // }
    // await this.DiagnosisS.GetCollection().then(x => {
    //   this.diagnosis = x;
    // });
    // await this.UserBS.UserByRole(1).then(x => {
    //   this.profesionals = x;
    //   this.loading = false;
    // });

  }


  RefreshData() {
    this.table.refresh();
    this.table2.refresh();
    // window.location.reload();
    // this.router.navigate([this.router.url]);
  }
  reloadForm(tab) {
    this.table.refresh();

    if(tab.tabTitle == 'Para diligenciar'){
      this.table.changeEntity('user/byPAC/2','users');
    } else {
      this.table.changeEntity(this.entity,'admissions');
    }
  }
  ConfirmAction(data) {

    this.dialogFormService.open(FormPadComplementaryComponent, {
      context: {
        title: 'FORMATO DE RECEPCION, SEGUIMIENTO Y CONTROL PLAN COMPLEMENTARIO',
        admissions_id: data.admissions[data.admissions.length - 1].id,
        // data,
        // diagnosis: this.diagnosis,
        // profesionals: this.profesionals,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  async EditPadComplementary(data) {
    // this.loading = true


    this.dialogFormService.open(FormPadComplementaryComponent, {
      context: {
        title: 'EDITAR FORMATO DE RECEPCION, SEGUIMIENTO Y CONTROL PLAN COMPLEMENTARIO',
        data,
        // diagnosis: this.diagnosis,
        // profesionals: this.profesionals,
        saved: this.RefreshData.bind(this),
      },
    });
  }


  DeleteConfirmPadComplementary(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteGloss.bind(this),
      },
    });
  }

  DeleteGloss(data) {
    /*  return this.glossS.Delete(data.id).then(x => {
        this.table.refresh();
        return Promise.resolve(x.message);
      }).catch(x => {
        throw x;
      });*/
  }


  refresh() {
    this.table.refresh();
    this.entity = "user/byPAC/2"
    this.router.navigate([this.router.url])
  }

  GetResponseParam() {
    /*
    if (!this.objetion_code_response || !this.objetion_response) {
      this.objetionCodeResponseS.GetCollection().then(x => {
        this.objetion_code_response = x;
      });
      this.objetionResponseS.GetCollection().then(x => {
        this.objetion_response = x;
      });
    }*/
  }




}

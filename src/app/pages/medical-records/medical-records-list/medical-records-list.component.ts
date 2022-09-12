import { Component, OnInit, ViewChild, Renderer2, ElementRef, TemplateRef, Input } from '@angular/core';
import { NbDialogService, NbToastrService, NbWindowService } from '@nebular/theme';
import { map, filter, tap } from 'rxjs/operators'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { rowDataBound } from '@syncfusion/ej2/grids';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { PatientService } from '../../../business-controller/patient.service';
@Component({
  selector: 'ngx-medical-records-list',
  templateUrl: './medical-records-list.component.html',
  styleUrls: ['./medical-records-list.component.scss'],
})
export class MedicalRecordsListComponent implements OnInit {


  public isSubmitted = false;
  public loading: boolean = false;
  public messageError: string = null;
  public title: string = 'AUTORIZACIONES: PENDIENTES';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = [
    'Estado',
    'ID',
    'Procedimiento',
    'Número de autorización',
    'Tipo de documento',
    'Número de documento',
    'Nombre completo',
    'Email',
    'Providencia, Vereda o Municipio',
    'Barrio',
    'Dirección',
    'Fecha de creación',
    'Tipo de atención',
    'Fecha de ejecución',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public entity: string = 'authorization/byStatus/0';
  public data: any = [];
  public data_aux: any = [];
  public auth_status;
  public auth_statusM: any[] = [];
  public arrayBuffer: any;
  public user;
  public dialog;
  public currentRole;

  public today = null;
  public min_day = null;
  public selectedOptions: any[] = [];
  public briefcase_id: any = null;
  public admissions_id: any = null;
  public showdiv: boolean = null;
  public show;
  public checkbox: any[] = [];
  public all_Data: any[] = [];
  public company: any[] = [];
  public contract: any[] = [];
  public briefcase: any[] = [];
  public admissions: any[] = [];
  public patient: any[] = [];
  public filter =
    {
      eps_id: null,
      contract_id: null,
      initial_date: null,
      final_date: null,
      briefcase_id: null,
      patient_id: null,
      admissions_id: null,
    }
  public parentData: any;
  public previewFile = null;
  public patient_id;




  @ViewChild(BaseTableComponent) table: BaseTableComponent;


  public selectedMode: boolean = true;
  toastService: any;

  constructor(
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private formBuilder: FormBuilder,
    private toastS: NbToastrService,
    private chRecordS: ChRecordService,
    private patientS: PatientService,


    // private renderer2: Renderer2,
    // private elementR: ElementRef,
    private windowService: NbWindowService,
  ) {
  }

  public settings = {
    selectMode: 'multi',
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
            // 'edit': this.EditAuthPackage.bind(this),
            // 'view': this.ViewPackage.bind(this),
            // 'delete': this.DeleteConfirmAuth.bind(this),
            // 'refresh': this.RefreshData.bind(this),
          };
        },
        // renderComponent: ActionsComponent,
      },
      // select: {
      //   title: this.headerFields[0],
      //   type: 'custom',
      //   valuePrepareFunction: (value, row) => {
      //     // this.disableCheck();
      //     if (row.auth_status_id == 2 || row.auth_status_id == 3) {
      //       this.show = true;
      //     } else {
      //       this.show = false;
      //     }
      //     return {
      //       'data': row,
      //       'show': true,
      //       'select': this.auth_status,
      //       'status': (event, row: any) => this.SaveStatus(event, row),
      //     };
      //   },
      //   // renderComponent: ActionsStatusComponent,
      // },
      id: {
        title: this.headerFields[1],
        type: 'string',
      },
      date: {
        title: this.headerFields[11],
        type: 'string',
      },
      services_briefcase: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.manual_price.name;
        },
      },
      auth_number: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value ? value : '--'
        },
      },
      assigned_management_plan: {
        title: this.headerFields[13],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value) {
            return value.execution_date != "0000-00-00" ? value.execution_date : '--';
          } else {
            return '--';
          }
        },
      },
      'type_of_attention': {
        title: this.headerFields[12],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.assigned_management_plan) {
            return row.assigned_management_plan.management_plan.type_of_attention.name;
          } else {
            return '--';
          }
        },
      },
      'identification_type': {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.identification_type.name;
        },
      },
      'identification': {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.identification;
        },
      },
      nombre_completo: {
        title: this.headerFields[6],
        type: 'string',
      },
      'email': {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.email;
        },
      },
      'residence_municipality': {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.residence_municipality.name;
        },
      },
      'residence': {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.residence.name;
        },
      },
      residence_address: {
        title: this.headerFields[10],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.residence_address;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Autorizaciones',
      route: './',
    },
  ];


  public form: FormGroup;
  public formMassive: FormGroup;
  public xlsForm: FormGroup;
  public RadicationGlossForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;


  async ngOnInit() {

    this.parentData = {
      selectedOptions: [],
      entity: '',
      customData: '',
    };

    this.today = new Date();
    this.today = this.today.toISOString().split('T')[0];

    this.data = {
      company_id: null,
      start_date: '',
      finish_date: '',
      state_gloss: '',
      briefcase_id: '',
      contract_id: '',
      admissions_id: '',
      patient_id: ''
    };

    this.form = this.formBuilder.group({
      company_id: [
        this.data.company_id,
      ],
      start_date: [
        this.data.start_date,
      ],
      finish_date: [
        this.data.finish_date,
      ],
      briefcase_id: [
        this.data.briefcase_id,
      ],
      contract_id: [
        this.data.contract_id,
      ],
      admissions_id: [
        this.data.admissions_id,
      ],
      patient_id: 
      [this.data.patient_id
      ],
    });

    this.formMassive = this.formBuilder.group({
      observation: [
        '',
        // Validators.compose([Validators.required]),
      ],
      auth_number: [
        '',
        Validators.compose([Validators.required]),
      ],
      copay: [
        null,
        // Validators.compose([Validators.required]),
      ],
      copay_value: [
        '',
      ],
      file_auth: [
        null,
        Validators.compose([Validators.required])
      ]
    })

   
    await this.patientS.GetByAdmission(1).then(x => {
      this.patient = x;
    });

    this.xlsForm = this.formBuilder.group({
      state_gloss: [
        this.data.state_gloss,
        Validators.compose([Validators.required])
      ],
    });
  }

  onUserRowSelect(select: any[]) {
    this.selectedOptions = [];
    var briefValidator = [];
    var admiValidator = [];
    select.forEach(element => {

      this.selectedOptions.push(element);
      briefValidator.push(element.services_briefcase.briefcase_id);
      admiValidator.push(element.admissions_id);
    });
    let result = briefValidator.filter((item, index) => {
      return briefValidator.indexOf(item) === index;
    })
    let result2 = admiValidator.filter((item, index) => {
      return admiValidator.indexOf(item) === index;
    })
    if (result.length == 1 && result2.length == 1) {
      this.briefcase_id = result[0];
      this.admissions_id = result2[0];
    } else {
      this.briefcase_id = null;
      this.admissions_id = null;
    }
  }

  public saveCode2(e): void {

    var filter = this.patient.filter(patient => patient.identification == e.target.value);
    if (filter) {
      this.admissions = filter[0].admissions;

    }

    else {
      this.toastService.warning('', 'Debe seleccionar un pacinte de la lista');
      this.form.controls.patient_id.setErrors({ 'incorrect': true });
    }
  }

  RefreshData() {
    this.table.refresh();
  }

  reloadForm(tab) {

    if (tab.tabTitle == 'A tramitar') {
      this.showdiv = false;
    } else {
      this.showdiv = true;
    }

  }

  ConfirmActions(dialog: TemplateRef<any>) {
    if (this.selectedOptions.length > 0) {
      this.dialog = this.dialogFormService.open(dialog);
    } else {
      this.toastS.warning('', 'Debe seleccionar registros para autorizar masivamente')
    }
  }

  close() {
    this.dialog.close();
  }

  // EditAuthPackage(data) {
  //   this.data_aux = [];
  //   if (data) {
  //     this.parentData.entity = 'authorization/auth_byAdmission/' + data.admissions_id + '?edit=true&id=' + data.id;
  //     this.parentData.customData = 'authorization'
  //   };
  //   this.data_aux = data;
  //   this.dialog = this.dialogFormService.open(this.packagingedit, {
  //   });
  // }

  // ViewPackage(data) {
  //   if (data) {
  //     this.parentData.entity = 'authorization/auth_byAdmission/' + data.admissions_id + '?view=true&id=' + data.id;
  //     this.parentData.customData = 'authorization'
  //   };

  //   this.dialog = this.dialogFormService.open(this.packagingView, {
  //   });
  // }

  DeleteConfirmAuth(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteAuth.bind(this),
      },
    });
  }

  DeleteAuth(data) {
    return this.chRecordS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  receiveMessage($event) {
    this.selectedOptions = $event;
  }

  FilterHC() {
    this.chRecordS.ViewAllHC({
      start_date:this.form.controls.start_date.value,
      finish_date:this.form.controls.finish_date.value,
      admissions: JSON.stringify(this.admissions),

    }).then(x => {
      this.toastService.success('', x.message);
      this.close();

      if (this.saved) {
        this.saved();
      }
  });
}

  FilterStatus(status) {
    this.status = status;
    this.table.changeEntity(`authorization/byStatus/${this.status}`, 'authorization');
    this.entity = this.table.entity
    this.form.patchValue({
      company_id: null,
      start_date: '',
      finish_date: '',
      state_gloss: '',
      admissions_id: '',
    });
    this.toastS.warning('', 'Filtros limpiados');
    // this.RefreshData();

  }


  
  GetDataSelect(select: any[]) {
    this.selectedOptions = [];
    select.forEach(element => {
      var gloss = element;
      this.selectedOptions.push(gloss.id);

    });

  }

  onChanges() {
    // this.form.get('company_id').valueChanges.subscribe(val => {
    //   this.filter.eps_id = val;
    //   if (val == '') {
    //     this.contract = [];
    //     this.form.patchValue({
    //       contract_id: ''
    //     });
    //   } else {
    //     this.ContractS.GetCollection({ company_id: val }).then(x => {
    //       this.contract = x;
    //     });
    //   }
    // });

    // this.form.get('contract_id').valueChanges.subscribe(val => {
    //   this.filter.contract_id = val;
    //   if (val === '') {
    //     this.briefcase = [];
    //   } else {
    //     this.briefcaseS.GetBriefcaseByContract(val).then(x => {
    //       this.briefcase = x;
    //     });
    //   }
    //   this.form.patchValue({
    //     briefcase_id: '',
    //   });
    // });

    // this.form.get('start_date').valueChanges.subscribe(val => {
    //   this.min_day = val;
    //   this.filter.initial_date = val;
    // });

    // this.form.get('finish_date').valueChanges.subscribe(val => {
    //   this.filter.final_date = val;
    // });

    // this.form.get('briefcase_id').valueChanges.subscribe(val => {
    //   this.filter.briefcase_id = val;
    //   if (val === '') {
    //     this.briefcase = [];
    //   } else {
    //     this.admissionS.GetByBriefcase(val).then(x => {
    //       this.admissions = x;
    //     });
    //   }
    //   this.form.patchValue({
    //     admissions_id: '',
    //   });
    // });

    // this.form.get('admissions_id').valueChanges.subscribe(val => {
    //   this.filter.admissions_id = val;
    // });

  }

 


  async changeImage(files, option) {
    if (!files.length) return false;

    const file = await this.toBase64(files[0]);

    switch (option) {
      case 1:
        this.formMassive.patchValue({
          file_auth: files[0],
        });
        break;
    }
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
}


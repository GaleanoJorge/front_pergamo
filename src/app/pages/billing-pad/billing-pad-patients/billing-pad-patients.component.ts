import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormGroup } from '@angular/forms';
import { ActionsBillingPadPatientsComponent } from './actions-billing-pad-patients.component';
import { FormShowBillingPadComponent } from '../billing-admission/form-show-billing-pad/form-show-billing-pad.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ActionsSemaphoreAdmissionsListComponent } from '../billing-pad-admissions-list/actions -semaphore-admissions-list.component';
import { BillingPadService } from '../../../business-controller/billing-pad.service';
import { SelectServiceBillingComponent } from '../billing-pad-procedure/select-service-billing.component';

@Component({
  selector: 'ngx-billing-pad-patients',
  templateUrl: './billing-pad-patients.component.html',
  styleUrls: ['./billing-pad-patients.component.scss'],
})
export class BillingPadPatientsComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() is_pgp: boolean = false;
  @Input() route: number;
  @Input() entity: string;
  @Input() billing_pad_pgp_id: number = null;
  
  public title: string = 'PACIENTES';
  public isSubmitted = false;
  public loading: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public subtitle: string = 'Gestión';
  public headerFields: any[] = [
    /*00*/'ACCIONES', 
    /*01*/'NOMBRE', 
    /*02*/'DOCUMENTO', 
    /*03*/'FACTURAS PENDIENTES'
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public user;
  public dialog;
  public currentRole;
  public briefcase_id;
  public campus_id;
  public admissions: any[] = [];
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];

  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      select: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            data: row,
            valid: !this.selectedOptions2.find((item) => item.id == row.id)
              ? false
              : true,
            selection: (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: SelectServiceBillingComponent,
      },
      semaphore: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
          };
        },
        renderComponent: ActionsSemaphoreAdmissionsListComponent,
      },
      actions: {
        title: this.headerFields[0],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'briefcase_id': this.briefcase_id,
          };
        },
        renderComponent: ActionsBillingPadPatientsComponent,
      },
      nombre_completo: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value;
        },
      },
      identification: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value;
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

  constructor(
    private dialogFormService: NbDialogService,
    private activatedRoute: ActivatedRoute,
    private toastS: NbToastrService,
    private location: Location,
    private BillingPadS: BillingPadService,
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
    this.briefcase_id = this.activatedRoute.snapshot.params.briefcase_id;
    this.campus_id = +localStorage.getItem('campus');
  }


  RefreshData() {
    this.table.refresh();
  }

  ConfirmAction(data, Managemen?) {
    // var closeOnBackdropClick = false;
    // this.dialogFormService.open(FormObservationComponent, {
    //   closeOnBackdropClick,
    //   context: {
    //     data: data,
    //     Managemen: Managemen,
    //     saved: this.RefreshData.bind(this),
    //   },
    // });
  }

  SaveStatus(event?, data?) {


  }
  eventSelections(event, row) {
    if (event) {
      // var auth = {
      //   id: row.id,
      //   admissions_id: row.admissions_id
      //   admissions_id: row.services_briefcase.briefcase_id,

      // };
      this.selectedOptions2.push(row);
    } else {
      let i = this.selectedOptions2
        .map((item, index) => item.id)
        .indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
    }
    this.selectedOptions = this.selectedOptions2;
  }

  SelectAll(event) {
    console.log(event);
    var AllOnPage = this.selectedOptions2.concat(this.table.source.data);

    // this.selectedOptions2 = AllOnPage.filter((item, index) => {
    //   return AllOnPage.indexOf(item.id) === index;
    // });

    var hash = {};
    this.selectedOptions2 = AllOnPage.filter(function (current) {
      var exists = !hash[current.id];
      hash[current.id] = true;
      return exists;
    });
    this.selectedOptions = this.selectedOptions2;
    this.table.refresh();
  }

  async getAdmissions() {
    this.admissions = [];
    this.selectedOptions.forEach(element => {
      if (element.admissions.length > 0) {
        element.admissions.forEach(e => {
          if (e.briefcase_id == this.briefcase_id) {
            this.admissions.push(e.id);
          }
        });
      }
    });

    return Promise.resolve(true);
  }

  ShowPreBilling(dialog: TemplateRef<any>) {
    this.dialog = this.dialogFormService.open(dialog);
  }

  async SaveBilling() {
    if (this.selectedOptions.length > 0) {
      await this.getAdmissions();
      this.loading = true;
      this.isSubmitted = true;
      this.messageError = null;
      this.BillingPadS.GenerateMuBilling({
        admissions: JSON.stringify(this.admissions),
        campus_id: this.campus_id,
      }).then(x => {
        this.loading = false;
        this.closeDialog();
        this.back();
        this.toastS.success('', x.message);
        this.selectedOptions = [];
        this.RefreshData();
      }).catch(x => {
        this.loading = false;
        this.messageError = x;
      });
    } else {
      this.toastS.warning('Seleccione al menos un procedimiento', 'Aviso');
    }

  }

  async generatePdf() {
    await this.getAdmissions(); 
    this.BillingPadS.GeneratePdfMu({
      id: 0,
      billing_type: 'PREFACTURA',
      admissions: JSON.stringify(this.admissions),
    }).then(x => {
      this.toastS.success('Archivo generado con exito', 'Exito');
      window.open(x['url'], '_blank');
    }).catch(x => {
      this.toastS.danger('Error al generar archivo: ' + x, 'Error');
    });
  }

  back() {
    this.location.back();

 }

  ShowProcedures(data) {
    this.dialogFormService.open(FormShowBillingPadComponent, {
      context: {
        data: data,
        title: 'Servicios facturados',
        billing_pad_pgp_id: this.billing_pad_pgp_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  closeDialog() {
    this.dialog.close();
  }


}

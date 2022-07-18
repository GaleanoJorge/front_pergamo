import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormGroup } from '@angular/forms';
import { ActionsAdmissionsListComponent } from './actions-admissions-list.component';
import { FormShowBillingPadComponent } from '../billing-admission/form-show-billing-pad/form-show-billing-pad.component';
import { ActivatedRoute } from '@angular/router';
import { BriefcaseService } from '../../../business-controller/briefcase.service';

@Component({
  selector: 'ngx-billing-admissions-pad-list',
  templateUrl: './billing-admissions-pad-list.component.html',
  styleUrls: ['./billing-admissions-pad-list.component.scss'],
})
export class BillingAdmissionsPadListComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() title: string;
  @Input() is_pgp: boolean;
  @Input() route: number = null;
  @Input() entity: string;
  @Input() billing_pad_pgp_id: number = null;

  public isSubmitted = false;
  public loading: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ACCIONES', 'NOMBRE', 'DOCUMENTO', 'EPS'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public user;
  public dialog;
  public currentRole;
  public settings;
  public briefcase_id;


  public settings1 = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: this.headerFields[0],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'route': this.route,
            'billing_pad_pgp': this.billing_pad_pgp_id,
            'show': this.ShowProcedures.bind(this),
          };
        },
        renderComponent: ActionsAdmissionsListComponent,
      },
      nombre_completo: {
        title: this.headerFields[1],
        type: 'string',
      },
      patients: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.patients.identification;
        },
      },
      contract: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.contract.company.name;
        },
      },
    },
  };

  public settings2 = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: this.headerFields[0],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'route': this.route,
          };
        },
        renderComponent: ActionsAdmissionsListComponent,
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      company_id: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.company.name;
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
    private activatedRoute: ActivatedRoute,
    private BriefcaseS: BriefcaseService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
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
    if (this.route != null) {
      if (this.route == 2) {
        this.settings = this.settings2;
      } else {
        this.settings = this.settings1;
      }
    } else {
      this.briefcase_id = this.activatedRoute.snapshot.params.briefcase_id;
      this.settings = this.settings1;
      this.route = 1;
      this.entity = 'billing_pad/getEnabledAdmissions/0';
      this.BriefcaseS.GetCollection({id: this.briefcase_id}).then(x => {
        this.title = 'ADMISIONES DEL PORTAFOLIO ' + x[0].name.toUpperCase();
      });
    }
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



  GetResponseParam() {
  }

  tablock(e) {
    
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


}

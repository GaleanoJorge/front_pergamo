import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormGroup } from '@angular/forms';
import { ActionsBillingPadBriefcaseComponent } from './actions-billing-pad-briefcase.component';
import { FormShowBillingPadComponent } from '../billing-admission/form-show-billing-pad/form-show-billing-pad.component';
import { ActivatedRoute } from '@angular/router';
import { ContractService } from '../../../business-controller/contract.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-billing-pad-briefcase',
  templateUrl: './billing-pad-briefcase.component.html',
  styleUrls: ['./billing-pad-briefcase.component.scss'],
})
export class BillingPadBriefcaseComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() is_pgp: any = '!=';
  @Input() route: number;
  @Input() entity: string;
  @Input() billing_pad_pgp_id: number = null;

  public title: string = 'PORTAFOLIOS';
  public isSubmitted = false;
  public loading: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ACCIONES', 'NOMBRE', 'FACTURAS PENDIENTES'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public contract_id;
  public dialog;
  public currentRole;

  public settings = {
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
        renderComponent: ActionsBillingPadBriefcaseComponent,
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      created_billings: {
        title: this.headerFields[2],
        type: 'string',
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
    private ContractS: ContractService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private toastS: NbToastrService,
    private location: Location,

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
    this.contract_id = this.activatedRoute.snapshot.params.contract_id;
    this.ContractS.GetCollection({ id: this.contract_id }).then(x => {
      if(x.length > 0){
        this.title = 'PORTAFOLIOS DEL CONTRATO ' + x[0].name.toUpperCase();
      }
    });
    // if (this.route == 1) {
    //   this.settings = this.settings1;
    // } else if (this.route == 2) {
    //   this.settings = this.settings2;
    // }
  }


  back() {
    this.location.back();

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

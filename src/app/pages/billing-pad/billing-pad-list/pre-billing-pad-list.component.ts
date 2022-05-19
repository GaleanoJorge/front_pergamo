import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormGroup } from '@angular/forms';
import { ActionsStatusComponent } from './actions-status.component';

@Component({
  selector: 'ngx-pre-billing-pad-list',
  templateUrl: './pre-billing-pad-list.component.html',
  styleUrls: ['./pre-billing-pad-list.component.scss'],
})
export class PreBillingPadListComponent implements OnInit {


  public isSubmitted = false;
  public loading: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'ADMISIONES';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['id'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public user;
  public dialog;
  public currentRole;
  public show;
  public screen = 1;



  @ViewChild(BaseTableComponent) table: BaseTableComponent;


  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      select: {
        title: this.headerFields[11],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (row.auth_status_id == 2) {
            this.show = true;
          } else {
            this.show = false;
          }
          return {
            'data': row,
            'show': true,
          };
        },
        renderComponent: ActionsStatusComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      }
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
  }


  RefreshData() {
    this.table.refresh();
  }

  reloadForm(tab) {


    if (tab.tabTitle == 'ADMISIONES') {
      this.screen = 1;
    } else {
      this.screen = 2;
    }

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




}

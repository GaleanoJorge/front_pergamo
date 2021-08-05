import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { log } from 'console';
import { LocalDataSource } from 'ng2-smart-table';
import { CertificatesBusinessService } from '../../../../business-controller/certificates-business.service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ActionsComponent } from '../../../setting/sectional-council/actions.component';


@Component({
  selector: 'ngx-paperformat-list',
  templateUrl: './paperformat-list.component.html',
  styleUrls: ['./paperformat-list.component.scss']
})
export class PaperformatListComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  public dialog: any;
  public selectRecord: any;
  public loading: boolean = false;

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Formatos de papel';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @ViewChild('confirmDelete') confirmDelete: TemplateRef<any>;

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'edit': () => this.router.navigate([`/pages/certificates/paperformat/edit/${row.id}`]),
            'delete': () => this.dialogDeleteOpen(this.confirmDelete, row),
          };
        },
        renderComponent: ActionsComponent,
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
      name: 'Formatos de papel',
      route: '../setting/paperformat',
    },
  ];

  constructor(
    private dialogService: NbDialogService,
    private _serviceCertificates: CertificatesBusinessService,
    private router: Router,
  ) { 
    this.data = [];
  }

  ngOnInit() {
    this.getPaperFormats();
  }

  getPaperFormats() {
    this.loading = true;
    this._serviceCertificates.getAll('papers').then(
      response => {
        this.data = [];
        response['papers_formats'].forEach(element => {
          this.data.push({id: element.id, name: element.name})
        });
        this.loading = false;
      },
      error => {
        console.log('============== error =====================');
        console.log(error);
        console.log('====================================');
      }
    )
  }

  dialogDeleteOpen(dialog: TemplateRef<any>, papers: any = null) {
    this.selectRecord = papers.id;
    this.dialog = this.dialogService.open(dialog);
  }
  
  dialogDeleteClose() {
    this.dialog.close();
  }

  deletePaperFormats() {
    this.loading = true;
    this._serviceCertificates.delete('papers', this.selectRecord).then(
      (response: any) => {
        if(response.delete_success) {
          this.table.refresh();
          this.dialogDeleteClose();
          this.getPaperFormats();
          this.loading = false;
        }
      },
      error => {
        this.dialogDeleteClose();
        this.loading = false;
      }
    )
  }
}

import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormMipresComponent } from './form-mipres/form-mipres.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ObjetionCodeResponseService } from '../../../business-controller/objetion-code-response.service';
import { ObjetionResponseService } from '../../../business-controller/objetion-response.service';
import { CurrencyPipe } from '@angular/common';
import { AuthMiPresService } from '../../../services/auth-mipress.service';

@Component({
  selector: 'ngx-mipres-list',
  templateUrl: './mipres-list.component.html',
  styleUrls: ['./mipres-list.component.scss'],
})
export class MipresListComponent implements OnInit {

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
            'edit': this.EditMipres.bind(this),
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
      name: 'Mipres',
      route: '../../list',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogFormService: NbDialogService,
    private authS: AuthService,
    private authMipresS: AuthMiPresService,
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
  public ResponseMipresForm: FormGroup;
  public RadicationMipresForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;




  async ngOnInit() {
    
    

  }

  RefreshData() {
    this.table.refresh();
  }

  NewMipres() {
    // this.dialogFormService.open(FormMipresComponent, {
    //   context: {
    //     title: 'Crear nueva glosa',
    //     saved: this.RefreshData.bind(this),
    //   },
    // });
    this.authMipresS.APITokenMipress(0);
    this.authMipresS.APITokenMipress(1);

  }

  EditMipres(data) {
    this.dialogFormService.open(FormMipresComponent, {
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

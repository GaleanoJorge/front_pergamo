import { Component, OnInit, ViewChild,TemplateRef } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Actions2Component } from './actions.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormGlossComponent } from './form-gloss/form-gloss.component';
import { GlossService } from '../../../business-controller/gloss.service';
import * as XLSX from 'ts-xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlossResponseService } from '../../../business-controller/gloss-response.service';
import { GlossStatusService } from '../../../business-controller/gloss-status.service';
import { AuthService } from '../../../services/auth.service';
import { ObjetionCodeResponseService } from '../../../business-controller/objetion-code-response.service';
import { ObjetionResponseService } from '../../../business-controller/objetion-response.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'ngx-gloss-list',
  templateUrl: './gloss-list.component.html',
  styleUrls: ['./gloss-list.component.scss'],
})
export class GlossListComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'Glosas';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['Prefijo factura', 'Consecutivo factura', 'Tipo de objeción', 'Inicial reiterada', 'Fecha recibido', 'Fecha emisión', 'Fecha radicación', 'EAPB', 'Sede', 'Modalidad de Glosa', 'Ambito de Glosa', 'Sevicio de Glosa', 'Código de objeción', 'Detalle de objeción', 'Valor de factura', 'Valor objetado', 'Medio de recibido', 'Estado', 'Creado Por','Analista asignado'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}, ${this.headerFields[5]}, ${this.headerFields[6]}, ${this.headerFields[7]}, ${this.headerFields[8]}, ${this.headerFields[9]}, ${this.headerFields[10]}, ${this.headerFields[11]}, ${this.headerFields[12]}, ${this.headerFields[13]}, ${this.headerFields[14]}, ${this.headerFields[15]}, ${this.headerFields[16]}, ${this.headerFields[17]}, ${this.headerFields[18]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public file: File;
  public glossStatus: any[] = null;
  public user_id;
  public user;
  public dialog; 
  public currentRole;
  public selectedOptions: any[] = [];




  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    selectMode: 'multi',
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditGloss.bind(this),
            'delete': this.DeleteConfirmGloss.bind(this),
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: Actions2Component,
      },
      invoice_prefix: {
        title: this.headerFields[0],
        type: 'string',
      },
      invoice_consecutive: {
        title: this.headerFields[1],
        type: 'string',
      },
      objetion_type: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      repeated_initial: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      received_date: {
        title: this.headerFields[4],
        type: 'string',
      },
      emission_date: {
        title: this.headerFields[5],
        type: 'string',
      },
      radication_date: {
        title: this.headerFields[6],
        type: 'string',
      },
      company: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      campus: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      gloss_modality: {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      gloss_ambit: {
        title: this.headerFields[10],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      gloss_service: {
        title: this.headerFields[11],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      objetion_code: {
        title: this.headerFields[12],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      objetion_detail: {
        title: this.headerFields[13],
        type: 'string',
      },
      invoice_value: {
        title: this.headerFields[14],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
      },
      objeted_value: {
        title: this.headerFields[15],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
      },
      received_by: {
        title: this.headerFields[16],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      gloss_status: {
        title: this.headerFields[17],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      user: {
        title: this.headerFields[18],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.firstname + ' ' + value.lastname;
        },
      },
      assing_user: {
        title: this.headerFields[19],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.firstname + ' ' + value.lastname;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Glosas',
      route: '../gloss/list',
    },
  ];

  constructor(
    private glossS: GlossService,
    private formBuilder: FormBuilder,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,
    private GlossResponseS: GlossResponseService,
    private currency: CurrencyPipe,
    private GlossStatusS: GlossStatusService,
    private authService: AuthService,
    private dialogService: NbDialogService,
    private objetionCodeResponseS: ObjetionCodeResponseService,
    private objetionResponseS: ObjetionResponseService,
    private toastS: NbToastrService,
  ) {
  }
  public form: FormGroup;
  public ResponseGlossForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;




  ngOnInit(): void {
    this.user=this.authService.GetUser();
    this.user_id=this.user.id;
    this.currentRole = this.authService.GetRole();
    if(this.user_id && this.currentRole==5){
      this.entity= 'gloss/byStatus/0/' + this.user_id ;
    }else{
      this.entity="gloss/?pagination=true";
    }
    this.GlossStatusS.GetCollection().then((x) => {
      this.glossStatus = x;
    });
    this.form = this.formBuilder.group({
      file: [Validators.compose([Validators.required])],
    });

    this.ResponseGlossForm = this.formBuilder.group({
      response: ['', Validators.compose([Validators.required])],
      accepted_value: [ '',Validators.compose([Validators.required])],
      value_not_accepted: ['', Validators.compose([Validators.required])],
      objetion_code_response_id: ['', Validators.compose([Validators.required])],
      objetion_response_id: [ '',Validators.compose([Validators.required])],
      file: [Validators.compose([Validators.required])],
    });
  }

  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
    this.GetResponseParam();
  }

  GetDataSelect(select: any[]) {
    console.log(select);
    this.selectedOptions=[];
    select.forEach(element => {
      var manual_price=element;
      this.selectedOptions.push(manual_price.id);
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  NewGloss() {
    this.dialogFormService.open(FormGlossComponent, {
      context: {
        title: 'Crear nueva glosa',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditGloss(data) {
    this.dialogFormService.open(FormGlossComponent, {
      context: {
        title: 'Editar glosa',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }


  DeleteConfirmGloss(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteGloss.bind(this),
      },
    });
  }

  DeleteGloss(data) {
    return this.glossS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  async saveGroup() {
    this.isSubmitted = true;
    if (!this.ResponseGlossForm.invalid) {
      if (!this.selectedOptions.length) {
        this.dialog = this.dialog.close();
        this.toastS.danger(null, 'Debe seleccionar un registro');
      }else{
      this.loading = true;
      this.dialog.close();
   
          var formData = new FormData();
          formData.append('response', this.ResponseGlossForm.value.response);
          formData.append('file', this.ResponseGlossForm.value.file);
          formData.append('gloss_id',JSON.stringify(this.selectedOptions));
          formData.append('objetion_response_id', this.ResponseGlossForm.controls.objetion_response_id.value);
          formData.append('objetion_code_response_id', this.ResponseGlossForm.controls.objetion_code_response_id.value);
          formData.append('accepted_value', this.ResponseGlossForm.controls.accepted_value.value);
          formData.append('value_not_accepted', this.ResponseGlossForm.controls.value_not_accepted.value);

          await this.GlossResponseS.Save(formData).then(x => {
            this.toastService.success('', x.data);
            this.RefreshData();
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          }); 
    }
  }
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

  async saveFile(event) {
    if (event.target.files[0]) {
      this.loading2 = true;
      this.file = event.target.files[0];
      let lectura;
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        lectura = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        console.log(lectura);
        this.uploadDocumentInfo(lectura);
      }
      fileReader.readAsArrayBuffer(this.file);
    }
  }

  async uploadDocumentInfo(lectura) {
    try {
      let response;
      response = await this.glossS.SaveFile(lectura);
      this.loading2 = false;
      this.toastService.success('', response.message);
      this.RefreshData();
    } catch (e) {
      this.loading2 = false;
      throw new Error(e);
    }
  }

  ChangeGlossStatus(status) {
    this.status=status;
    if(status!=0 && this.currentRole==5){
    this.table.changeEntity(`gloss/byStatus/${this.status}/${this.user_id}`,'gloss');
    // this.RefreshData();
    }else if(this.currentRole==4 || this.currentRole==1){ 
      this.table.changeEntity(`gloss/byStatus/${this.status}/0`,'gloss');
    }else{
      this.table.changeEntity(`gloss/byStatus/0/${this.user_id}`,'gloss');
    }
   }

   async changeFile(files, option) {
    this.loading=true;
    if (!files) return false;
    const file = await this.toBase64(files.target.files[0]);
    
    switch (option) {
      case 2:
        this.ResponseGlossForm.patchValue({
          file: files.target.files[0],
        });
        this.loading=false;
        break;
        }
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

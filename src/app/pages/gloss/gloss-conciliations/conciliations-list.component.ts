import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormConciliationsComponent } from './form-gloss/form-conciliations.component';
import { GlossService } from '../../../business-controller/gloss.service';
import * as XLSX from 'ts-xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlossResponseService } from '../../../business-controller/gloss-response.service';
import { GlossStatusService } from '../../../business-controller/gloss-status.service';
import { AuthService } from '../../../services/auth.service';
import { ObjetionCodeResponseService } from '../../../business-controller/objetion-code-response.service';
import { ObjetionResponseService } from '../../../business-controller/objetion-response.service';
import { CurrencyPipe } from '@angular/common';
import { GlossRadicationService } from '../../../business-controller/gloss-radication.service';
import { date } from '@rxweb/reactive-form-validators';
import { Actions3Component } from './actions.component';
import { ConciliationResponseService } from '../../../business-controller/conciliation-response.service';
import { GlossConciliationService } from '../../../business-controller/gloss-conciliation.service';

@Component({
  selector: 'ngx-conciliations-list',
  templateUrl: './conciliations-list.component.html',
  styleUrls: ['./conciliations-list.component.scss'],
})
export class ConciliationsListComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'Conciliaciones';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['Prefijo factura', 'Consecutivo factura', 'Tipo de objeción', 'Inicial reiterada', 'Fecha recibido', 'Fecha emisión', 'Fecha radicación', 'EAPB', 'Sede', 'Modalidad de Glosa', 'Ambito de Glosa', 'Sevicio de Glosa', 'Código de objeción', 'Detalle de objeción', 'Valor de factura', 'Valor objetado', 'Medio de recibido', 'Estado', 'Creado Por', 'Analista asignado', 'Regimen'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}, ${this.headerFields[5]}, ${this.headerFields[6]}, ${this.headerFields[7]}, ${this.headerFields[8]}, ${this.headerFields[9]}, ${this.headerFields[10]}, ${this.headerFields[11]}, ${this.headerFields[12]}, ${this.headerFields[13]}, ${this.headerFields[14]}, ${this.headerFields[15]}, ${this.headerFields[16]}, ${this.headerFields[17]}, ${this.headerFields[18]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public file: File;
  public glossStatus: any[] = null;
  public glossStatusF: any[] = [];
  public user_id;
  public user;
  public dialog;
  public currentRole;
  public selectedOptions: any[] = [];
  public gloss_response_id = new Array();
  public gloss_id = new Array();
  public semaphore;
  public all_glosses: any[] = [];
  public result: any = null;


  @ViewChild(BaseTableComponent) table: BaseTableComponent;

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
            'edit': this.EditGloss.bind(this),
            'delete': this.DeleteConfirmGloss.bind(this),
            'refresh': this.RefreshData.bind(this),
            'currentRole': this.currentRole,
          };
        },
        renderComponent: Actions3Component,
      },
      invoice_prefix: {
        title: this.headerFields[0],
        type: 'string',
      },
      invoice_consecutive: {
        title: this.headerFields[1],
        type: 'string',
      },
      regimen: {
        title: this.headerFields[20],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
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

      emission_date: {
        title: this.headerFields[5],
        type: 'string',
      },

      received_date: {
        title: this.headerFields[4],
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
          return value.code + ' - ' + value.name;
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
      objeted_cons_value: {
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
      name: 'Conciliaciones',
      route: '../conciliations',
    },
  ];

  constructor(
    private glossS: GlossService,
    private formBuilder: FormBuilder,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,
    private GlossResponseS: GlossResponseService,
    private GlossRadicationS: GlossRadicationService,
    private ConciliationResponseS: ConciliationResponseService,
    private currency: CurrencyPipe,
    private GlossStatusS: GlossStatusService,
    private GlossConciliationS: GlossConciliationService,
    private authService: AuthService,
    private dialogService: NbDialogService,
    private objetionCodeResponseS: ObjetionCodeResponseService,
    private objetionResponseS: ObjetionResponseService,
    private toastS: NbToastrService,
  ) {
  }
  public form: FormGroup;
  public ResponseConciliationsForm: FormGroup;
  public SustainGlossForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;




  async ngOnInit() {
    // console.log('prueba');
    await this.GlossStatusS.GetCollection().then((x) => {
      this.glossStatus = x;
    });
    this.glossStatus.forEach(element => {
      if (this.currentRole == 5) {
        if (element.id != 4 && element.id != 5 && element.id != 6 && element.id != 7) {
          this.glossStatusF.push(element);
        }
      } else if (this.currentRole == 6) {
        if (element.id != 1 && element.id != 2 && element.id != 3 && element.id != 4) {
          this.glossStatusF.push(element);
        }
      } else {
        this.glossStatusF = this.glossStatus;
      }
    });

    // this.form = this.formBuilder.group({
    //   file: [Validators.compose([Validators.required])],
    // });

    this.ResponseConciliationsForm = this.formBuilder.group({
      response: ['', Validators.compose([Validators.required])],
      accepted_value: ['', Validators.compose([Validators.required])],
      value_not_accepted: ['', Validators.compose([Validators.required])],
      objetion_code_response_id: ['', Validators.compose([Validators.required])],
      justification_status: ['', Validators.compose([Validators.required])],
      objetion_response_id: ['', Validators.compose([Validators.required])],
      file: ['', Validators.compose([Validators.required])],
    });

    this.SustainGlossForm = this.formBuilder.group({
      response: ['', Validators.compose([Validators.required])],
      file: ['', Validators.compose([Validators.required])],
    });

  }

  // statusSemaphor(data: Date) {
  //   var gloss_received_date = new Date(data).getTime();
  //   var format = new Date().toLocaleDateString().split('/').reverse().join('-');
  //   var today = new Date(format).getTime();

  //   var diff = (today - gloss_received_date) / (1000 * 60 * 60 * 24);
  //   if(diff >9){
  //     this.semaphore = 3; // rojo
  //   } else if(diff <= 9 && diff>5){
  //     this.semaphore = 2; // amarillo
  //   }else if(diff<=5 && diff>=0){
  //     this.semaphore = 1; // verde
  //   }else if(diff<0){
  //     this.semaphore=0; //invalida
  //   }
  //   return this.semaphore
  // }

  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
    this.GetResponseParam();
  }

  GetDataSelect(select: any[]) {
    this.selectedOptions = [];
    this.gloss_response_id = [];
    this.gloss_id = [];
    this.all_glosses = [];
    select.forEach(element => {
      var conciliations = element;
      this.selectedOptions.push(conciliations.id_conciliation);
      this.gloss_id.push(conciliations.id);
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  NewGloss() {
    this.dialogFormService.open(FormConciliationsComponent, {
      context: {
        title: 'Crear nueva glosa',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditGloss(data) {
    this.dialogFormService.open(FormConciliationsComponent, {
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

  compareMasiveFactures() {
    this.result = null;
    var accepted = +this.ResponseConciliationsForm.controls.accepted_value.value;
    var not_accepted = +this.ResponseConciliationsForm.controls.value_not_accepted.value
    this.result = accepted + not_accepted;
    var localidentify = this.all_glosses.find(item => item.objeted_value != this.result);
    if (localidentify) {
      this.toastService.warning('', "Dentro de la selección hay glosas que no se pueden responder por valores no aceptados");
    }
  }

  async saveGroup() {
    this.compareMasiveFactures();
    this.isSubmitted = true;
    if (!this.ResponseConciliationsForm.invalid) {
      if (!this.selectedOptions.length) {
        this.dialog = this.dialog.close();
        this.toastS.danger(null, 'Debe seleccionar un registro');
      } else {
        this.loading = true;
        this.dialog.close();
        var formData = new FormData();
        formData.append('single', "0");
        formData.append('type_response', "0");
        formData.append('response', this.ResponseConciliationsForm.value.response);
        formData.append('file', this.ResponseConciliationsForm.controls.file.value);
        formData.append('gloss_conciliations_id', JSON.stringify(this.selectedOptions));
        formData.append('gloss_id', JSON.stringify(this.gloss_id));
        formData.append('result', this.result);
        formData.append('justification_status', this.ResponseConciliationsForm.value.justification_status);
        formData.append('objetion_response_id', this.ResponseConciliationsForm.controls.objetion_response_id.value);
        formData.append('objetion_code_response_id', this.ResponseConciliationsForm.controls.objetion_code_response_id.value);
        formData.append('accepted_value', this.ResponseConciliationsForm.controls.accepted_value.value);
        formData.append('value_not_accepted', this.ResponseConciliationsForm.controls.value_not_accepted.value);

        await this.ConciliationResponseS.Save(formData).then(x => {
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


  async saveCartera() {
    this.isSubmitted = true;
    if (!this.SustainGlossForm.invalid) {
      this.loading = true;
      var formData = new FormData();
      formData.append('single', "0");
      formData.append('type_response', "1");
      formData.append('response', this.SustainGlossForm.value.response);
      formData.append('gloss_conciliations_id', JSON.stringify(this.selectedOptions));
      formData.append('gloss_id', JSON.stringify(this.gloss_id));
      formData.append('file', this.SustainGlossForm.controls.file.value);
      await this.ConciliationResponseS.Save(formData).then(x => {
        this.toastService.success('', x.data);
        this.dialog.close();
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
    this.status = status;
    if (status != 0 && this.currentRole == 5) {
      this.table.changeEntity(`gloss/byStatus/${this.status}/${this.user_id}`, 'gloss');
      // this.RefreshData();
    } else if (this.currentRole == 4 || this.currentRole == 1) {
      this.table.changeEntity(`gloss/byStatus/${this.status}/0`, 'gloss');
    } else if (status) {
      this.table.changeEntity(`gloss/byStatus/${this.status}/0`, 'gloss');
    }
    else {
      this.table.changeEntity(`gloss/byStatus/0/${this.user_id}`, 'gloss');
    }
  }

  async changeFile(files, option) {
    this.loading = true;
    if (!files) return false;
    const file = await this.toBase64(files.target.files[0]);

    switch (option) {
      case 2:
        this.ResponseConciliationsForm.patchValue({
          file: files.target.files[0],
        });
        this.loading = false;
        break;
      case 3:
        this.SustainGlossForm.patchValue({
          file: files.target.files[0],
        });
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

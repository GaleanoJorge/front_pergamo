import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'ngx-gloss-list',
  templateUrl: './gloss-list.component.html',
  styleUrls: ['./gloss-list.component.scss'],
})
export class GlossListComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public loading: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'Glosas';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['Prefijo factura', 'Consecutivo factura', 'Tipo de objeción', 'Inicial reiterada', 'Fecha recibido', 'Fecha emisión', 'Fecha radicación', 'EAPB', 'Sede', 'Modalidad de Glosa', 'Ambito de Glosa', 'Sevicio de Glosa', 'Código de objeción', 'Detalle de objeción', 'Valor de factura', 'Valor objetado', 'Medio de recibido', 'Estado', 'Analista asignado'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}, ${this.headerFields[5]}, ${this.headerFields[6]}, ${this.headerFields[7]}, ${this.headerFields[8]}, ${this.headerFields[9]}, ${this.headerFields[10]}, ${this.headerFields[11]}, ${this.headerFields[12]}, ${this.headerFields[13]}, ${this.headerFields[14]}, ${this.headerFields[15]}, ${this.headerFields[16]}, ${this.headerFields[17]}, ${this.headerFields[18]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public file: File;
  public glossStatus: any[] = null;


  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: '',
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
      },
      objeted_value: {
        title: this.headerFields[15],
        type: 'string',
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
    private GlossStatusS: GlossStatusService,
  ) {
  }
  public form: FormGroup;
  public status;



  ngOnInit(): void {
    this.GlossStatusS.GetCollection().then((x) => {
      this.glossStatus = x;
    });
    this.form = this.formBuilder.group({
      file: [Validators.compose([Validators.required])],
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

  async saveFile(event) {
    if (event.target.files[0]) {
      this.loading = true;
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
      this.loading = false;
      this.toastService.success('', response.message);
      this.RefreshData();
    } catch (e) {
      this.loading = false;
      throw new Error(e);
    }
  }

  ChangeGlossStatus(status) {
    this.status=status;
    if(status!=0){
    this.table.changeEntity(`gloss/byStatus/${this.status}`,'gloss');
    // this.RefreshData();
    }else{
      this.table.changeEntity(`gloss`,'gloss');
    }
   }
}

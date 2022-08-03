import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ManualService } from '../../../../business-controller/manual.service';
import { InscriptionStatus } from '../../../../models/inscription-status';
import { PriceTypeService } from '../../../../business-controller/price-type.service';
import { ManualPriceService } from '../../../../business-controller/manual-price.service';
import { PriceType } from '../../../../models/price-type';
import { CurrencyPipe } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SelectComponent } from './select.component';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { FormProcedureComponent } from '../../procedure/form-procedure/form-procedure.component';
import { FormProductComponent } from '../../product/form-product/form-product.component';
import { FormManualProcedureComponent } from '../form-manual-procedure/form-manual-procedure.component';
import { ActionsComponentProcedure } from './actions.component';
import * as XLSX from 'ts-xlsx';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { ProcedurePackageService } from '../../../../business-controller/procedure-package.service';


@Component({
  selector: 'ngx-procedure-massive',
  templateUrl: './procedure-massive.component.html',
  styleUrls: ['./procedure-massive.component.scss'],
})
export class ProcedureMassiveComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public messageError = null;


  public InscriptionForm: FormGroup;
  public title;
  public subtitle = '';
  public headerFields: any[] = ['id', 'Código propio', 'Código Homologo', 'Nombre', 'Valor', 'Tipo de valor','Descripción','Paciente a prestar'];
  public routes = [];
  public row;
  public course;
  public selections: any = null;
  public data = [];
  public dialog;
  public inscriptionstatus = 0;
  public selectedRows: any;
  public inscriptionId;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public entity: string;
  public customData: string;
  public select = "0";
  public manual;
  public manual_id;
  public result;
  public btntype;
  public ProcedurePackage: any[];

  public inscriptionStatus: InscriptionStatus[] = [];
  public price_type: PriceType[] = [];

  public arrayBuffer: any;
  public file: File;
  public loading2: boolean = false;



  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent       
          this.row = row;
          return {
            'package': this.ProcedurePackage,
            'data': row,
            'edit': this.EditManualPrice.bind(this),
            'delete': this.DeleteConfirmManualPrice.bind(this),
          };

        },
        renderComponent: ActionsComponentProcedure,
      },
      id: {
        title: this.headerFields[0],
        width: '5%',
      },
      own_code: {
        title: this.headerFields[1],
        type: 'string',
      },
      homologous_id: {
        title: this.headerFields[2],
        type: 'string',
      },
      name: {
        title: this.headerFields[3],
        type: 'string',
      },
      value: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, data) => {
          return this.currency.transform(value);
        },
      },
      price_type: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      description: {
        title: this.headerFields[6],
        type: 'string',
      },
      patient_id: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if(value==null){
            return "Todos";
          }else{
          return row.patient.firstname + ' ' + row.patient.lastname;
          }
        },
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ManualS: ManualService,
    private PriceTypeS: PriceTypeService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private ManualPriceS: ManualPriceService,
    private toastService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private currency: CurrencyPipe,
    private ProcedurePackageS: ProcedurePackageService,
  ) {
  }

  async ngOnInit() {
    this.manual_id = this.route.snapshot.params.id,
      this.InscriptionForm = this.formBuilder.group({
        value: ['', Validators.compose([Validators.required])],
        price_type_id: ['', Validators.compose([Validators.required])],
      });

    this.routes = [
      {
        name: 'Manual tarifario',
        route: '/pages/setting/manual',
      },
    ];


    this.PriceTypeS.GetCollection().then(x => {
      this.price_type = x;
    });
    await this.ManualS.GetCollection().then(x => {
      this.manual = x;
    });
    this.result = this.manual.find(manual => manual.id == this.route.snapshot.params.id);
    this.title = 'Asocie procedimientos al ' + this.result.name;
  }


  onItemChange(event) {
    if (event) {
      this.selections = event.id;
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
      response = await this.ManualPriceS.SaveFile(lectura, this.route.snapshot.params.id);
      this.loading2 = false;
      this.toastService.success('', response.message);
      if (response.data_error[0].length > 0) {
        this.showToast(60000, response);
      }
      this.table.refresh();
    } catch (e) {
      this.loading2 = false;
      throw new Error(e);
    }
  }

  showToast(duration, response) {
    this.toastService.danger(
      'Se econtraron errores',
      `Revisar las siguientes filas: ${response.data_error}`,
      { duration });
  }

  NewProcedure() {
    this.dialogFormService.open(FormManualProcedureComponent, {
      context: {
        title: 'Crear procedimiento o servicios que se van a prestar',
        manual_id: this.manual_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditManualPrice(data) {
    this.dialogFormService.open(FormManualProcedureComponent, {
      context: {
        title: 'Editar Medicamentos o insumos',
        data: data,
        manual_id:this.manual_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  NewProduct() {
    this.dialogFormService.open(FormProductComponent, {
      context: {
        title: 'Crear Medicamentos o insumos',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  RefreshData() {
    this.table.refresh();
    this.selections = [];
  }
  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }
  /*  dataUserRole($event,data){
      if($event==true && !this.selectedOptions.includes(data)){
        var role_id=data;
        var role_filter = role_id.courses.filter(course => course.pivot.course_id==this.route.snapshot.params.course_id);
        role_filter.user_role_group_id= role_id.user_role_group_id;
        role_filter.email=role_id.email;
        role_filter.name=role_id.nombre_completo;
        this.selectedOptions.push(role_filter);
      }else{
        var i = this.selectedOptions.indexOf( data );
        this.selectedOptions.splice( i, 1 );
      }
    }*/
  saveGroup() {
    if (!this.selections) {
      this.dialog = this.dialog.close();
      this.toastService.danger(null, 'Debe seleccionar al menos un procedimiento');
    } else if (!this.InscriptionForm.controls.value.value) {
      this.toastService.danger(null, 'Debe agregar un precio');
    } else if (!this.InscriptionForm.controls.price_type_id.value) {
      this.toastService.danger(null, 'Debe seleccionar un Tipo');
    }
    else {
      this.dialog = this.dialog.close();
      this.ManualPriceS.Save({
        manual_id: this.route.snapshot.params.id,
        procedure_id: this.selections,
        value: this.InscriptionForm.controls.value.value,
        price_type_id: this.InscriptionForm.controls.price_type_id.value,
      }).then(x => {
        this.toastService.success('', x.message);
        this.dialog.close();
        if (this.saved) {
          this.saved();
        }
      }).catch(x => {
        this.isSubmitted = false;
        this.loading = false;
      });
      this.RefreshData();
      this.selections = [];
    }
  }

  DeleteConfirmManualPrice(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteManualPrice.bind(this),
      },
    });
  }

  DeleteManualPrice(data) {
    return this.ManualPriceS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

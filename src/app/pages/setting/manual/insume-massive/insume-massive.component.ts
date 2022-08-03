import {Component, OnInit,Input,TemplateRef,ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ManualService} from '../../../../business-controller/manual.service';
import {InscriptionStatus} from '../../../../models/inscription-status';
import {PriceTypeService} from '../../../../business-controller/price-type.service';
import {ManualPriceService} from '../../../../business-controller/manual-price.service';
import {PriceType} from '../../../../models/price-type';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { FormProcedureComponent } from '../../procedure/form-procedure/form-procedure.component';
import { FormProductComponent } from '../../product/form-product/form-product.component';
import { FormManualProcedureComponent } from '../form-manual-procedure/form-manual-procedure.component';
import { FormManualProductComponent } from '../form-manual-product/form-manual-product.component';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { ActionsComponentInsume } from './actions.component';
import { FormManualInsumeComponent } from '../form-manual-insume/form-manual-insume.component';

@Component({
  selector: 'ngx-insume-massive',
  templateUrl: './insume-massive.component.html',
  styleUrls: ['./insume-massive.component.scss'],
})
export class InsumeMassiveComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public messageError = null;
  

  public InscriptionForm: FormGroup;
  public title ;
  public subtitle = '';
  public headerFields: any[] =  ['id','Producto generico','Valor','Tipo de valor','Paciente a prestar'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}`;
  public routes = [];
  public row;
  public course;
  public selections: any=null;
  public data= [];
  public dialog; 
  public inscriptionstatus = 0;
  public selectedRows: any;
  public inscriptionId;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public entity:string;
  public customData:string;
  public select="0";
  public manual;
  public manual_id;
  public result;
  public btntype;

  public inscriptionStatus: InscriptionStatus[] = [];
  public price_type: PriceType[] = [];

  
  public settings = {  
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'delete': this.DeleteConfirmManualPrice.bind(this),
          };
        },
        renderComponent: ActionsComponentInsume,
      },
      id: {
        title: this.headerFields[0],
        width: '5%',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      value: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, data) => {
          return this.currency.transform(value);
        },
      },
      price_type: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
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
  ) {
  }

  async ngOnInit() {
    this.manual_id= this.route.snapshot.params.id,
  
      this.routes = [
        {
          name: 'Manual tarifario',
          route: '/pages/setting/manual',
        },
      ];

    await this.ManualS.GetCollection().then(x => {
      this.manual=x;
    });
    this.result=this.manual.find(manual => manual.id == this.route.snapshot.params.id);
      this.title='Asocie insumos al '+this.result.name;
     
  }


  onItemChange(event) {
    if (event) {
      this.selections=event.id;
    }
  }


  NewProduct() {
    this.dialogFormService.open(FormManualInsumeComponent, {
      context: {
        title: 'Crear Medicamentos o insumos',
        manual_id:this.manual_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }
  
  RefreshData() {
    this.table.refresh();
    this.selections=[];
  }
  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
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

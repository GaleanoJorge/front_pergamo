import {Component, OnInit,Input,TemplateRef,ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ManualService} from '../../../../business-controller/manual.service';
import {InscriptionStatus} from '../../../../models/inscription-status';
import {PriceTypeService} from '../../../../business-controller/price-type.service';
import {ManualPriceService} from '../../../../business-controller/manual-price.service';
import {PriceType} from '../../../../models/price-type';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { FormProcedureComponent } from '../../procedure/form-procedure/form-procedure.component';
import { FormProductComponent } from '../../product/form-product/form-product.component';
import { FormManualProcedureComponent } from '../form-manual-procedure/form-manual-procedure.component';
import { FormManualProductComponent } from '../form-manual-product/form-manual-product.component';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { ActionsComponentProduct } from './actions.component';

@Component({
  selector: 'ngx-product-massive',
  templateUrl: './product-massive.component.html',
  styleUrls: ['./product-massive.component.scss'],
})
export class ProductMassiveComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public messageError = null;
  

  public InscriptionForm: FormGroup;
  public title ;
  public subtitle = '';
  public headerFields: any[] =  ['id','Producto generico','Valor','Tipo de valor'];
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
        renderComponent: ActionsComponentProduct,
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
      },
      price_type: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
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
  ) {
  }

  async ngOnInit() {
    this.manual_id= this.route.snapshot.params.id,
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
      this.price_type=x;
    });
    await this.ManualS.GetCollection().then(x => {
      this.manual=x;
    });
    this.result=this.manual.find(manual => manual.id == this.route.snapshot.params.id);
      this.title='Asocie Medicamentos al '+this.result.name;
     
  }


  onItemChange(event) {
    if (event) {
      this.selections=event.id;
    }
  }


  NewProduct() {
    this.dialogFormService.open(FormManualProductComponent, {
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
      this.toastService.danger(null, 'Debe seleccionar al menos un medicamento');
    } else if(!this.InscriptionForm.controls.value.value){
      this.toastService.danger(null, 'Debe agregar un precio');
    }else if(!this.InscriptionForm.controls.price_type_id.value){
      this.toastService.danger(null, 'Debe seleccionar un Tipo');
    }
    else{
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
    this.selections=[];
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

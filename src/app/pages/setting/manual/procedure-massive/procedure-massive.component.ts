import {Component, OnInit,Input,TemplateRef,ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ManualService} from '../../../../business-controller/manual.service';
import {InscriptionStatus} from '../../../../models/inscription-status';
import {InscriptionStatusBusinessService} from '../../../../business-controller/inscription-status-business.service';
import {PriceTypeService} from '../../../../business-controller/price-type.service';
import {ManualPriceService} from '../../../../business-controller/manual-price.service';
import {PriceType} from '../../../../models/price-type';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SelectComponent } from './select.component';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { FormProcedureComponent } from '../../procedure/form-procedure/form-procedure.component';
import { FormProductComponent } from '../../product/form-product/form-product.component';

@Component({
  selector: 'ngx-procedure-massive',
  templateUrl: './procedure-massive.component.html',
  styleUrls: ['./procedure-massive.component.scss'],
})
export class ProcedureMassiveComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public messageError = null;
  

  public InscriptionForm: FormGroup;
  public title = 'Asocie procedimientos al Manual tarifario ';
  public subtitle = '';
  public headerFields: any[] =  ['id','Código','Nombre'];
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
  public result;
  public btntype;

  public inscriptionStatus: InscriptionStatus[] = [];
  public price_type: PriceType[] = [];

  public settings = {  
    columns: {
      select: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'selection': (event) => this.onItemChange(event),
          };
        },
        renderComponent: SelectComponent,
      },
      id: {
        title: this.headerFields[0],
        width: '5%',
      },
      code: {
        title: this.headerFields[1],
        type: 'string',
      },
      name: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ManualS: ManualService,
    private inscriptionStatusBs: InscriptionStatusBusinessService,
    private PriceTypeS: PriceTypeService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private ManualPriceS: ManualPriceService,
    private toastService: NbToastrService,
    private dialogFormService: NbDialogService,
  ) {
  }

  GetParams() {
    return {
      manual_id: this.route.snapshot.params.id,
    };
  }

  async ngOnInit() {
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
    if(this.result.type_manual==0){
      this.table.changeEntity(`procedure`,`procedure`);
      this.btntype=0;
    }else if(this.result.type_manual==1){
      this.table.changeEntity(`product`,`product`);
      this.btntype=1;
    }
     
  }


  onItemChange(event) {
    if (event) {
      this.selections=event.id;
    }
  }

  NewProcedure() {
    this.dialogFormService.open(FormProcedureComponent, {
      context: {
        title: 'Crear procedimiento o servicios que se van a prestar',
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
      this.toastService.danger(null, 'Debe seleccionar al menos un procedimiento');
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
}

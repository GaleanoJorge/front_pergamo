import {Component, OnInit,Input,TemplateRef,ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ServicesBriefcaseService} from '../../../business-controller/services-briefcase.service';
import {ManualService} from '../../../business-controller/manual.service';
import {ManualPriceService} from '../../../business-controller/manual-price.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { Actions4Component } from '../detail-services/actions.component';
import { numeric } from '@rxweb/reactive-form-validators';
import { multicast } from 'rxjs/operators';
import {CampusService} from '../../../business-controller/campus.service';
import {TypeBriefcaseService} from '../../../business-controller/type-briefcase.service';
import {ManualPrice} from '../../../models/manual-price';
import {CurrencyPipe} from '@angular/common';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-detail-services',
  templateUrl: './detail-services.component.html',
  styleUrls: ['./detail-services.component.scss'],
})
export class DetailServicesComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public messageError = null;
  

  public InscriptionForm: FormGroup;
  public title = 'Contrato: ';
  public subtitle = 'Detalle del Portafolio de servicios: ';
  public headerFields: any[] =  ['Código','Categoría','Servicio','Valor','Factor'];
  public routes = [];
  public row;
  public selectedOptions: any[] = [];
  public data= [];
  public dialog; 
  public inscriptionstatus = 0;
  public selectedRows: any;
  public inscriptionId;
  public entity:string;
  public campus;

  public manual_price: any[] = [];
  public manual: any[] = [];
  public type_briefcase: any[] = [];
  public briefcase_id:number;

  

  public settings = {  
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'delete': this.DeleteServiceBriefcase.bind(this),
            'refreshData': this.RefreshData.bind(this),
          };
        },
        renderComponent: Actions4Component,
      },
      'manual_price.procedure.code': {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value, row) {
          if(row.manual_price.procedure==null){
            return row.manual_price.product.code;
          }else{
            return row.manual_price.procedure.code;
          }
        },
      },
      manual_price: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if(value.procedure==null){
            return 'Medicamentos'
          }else{
          return value.procedure.procedure_category.name;
          }
        },
      },
      'manual_price.procedure.name': {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value, row) {
          if(row.manual_price.procedure==null){
            return row.manual_price.product.name;
          }else{
            return row.manual_price.procedure.name;
          }
        },
      },
   
      value: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, data) => {
          return this.currency.transform(value);
        },
      },
      factor: {
        title: this.headerFields[4],
        type: 'string',
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceBriefcaseS: ServicesBriefcaseService,
    private ManualS: ManualService,
    private ManualPriceS: ManualPriceService,
    private CampusS: CampusService,
    private TypeBriefcaseS: TypeBriefcaseService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private currency: CurrencyPipe,
    private deleteConfirmService: NbDialogService,
    private dialogFormService: NbDialogService,
  ) {
  }


  ngOnInit(): void {
    if(this.route.snapshot.params.id){
      this.briefcase_id = this.route.snapshot.params.id;
      this.entity = this.briefcase_id ? 'ServiceBriefcase/ServicesByBriefcase/' + this.briefcase_id : 'services_briefcase';
    }else{
      this.entity='services_briefcase';
    }
    
    this.InscriptionForm = this.formBuilder.group({
      factor: ['', Validators.compose([Validators.required])],
  });


      this.routes = [
        {
          name: 'Contratos',
          route: '../../list',
        },
        {
          name: 'Portafolios',
          route: '../../contract/briefcase',
        },
        {
          name: 'Asignación de servicios',
          route: '../../contract/detail-services',
        },
      ];
  }


  GetDataSelect(select: any[]) {
    this.selectedOptions=[];
    select.forEach(element => {
      var manual_price=element;
      this.selectedOptions.push(manual_price);
    });
  }

  ChangeManual(inscriptionstatus) {
    this.inscriptionstatus = inscriptionstatus;
    this.table.changeEntity(`inscriptionsByCourse/${this.inscriptionstatus}`);
    // this.RefreshData();
}
  RefreshData() {
    this.table.refresh();
    this.selectedOptions=[];
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

  DeleteServiceBriefcase(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteProduct.bind(this),
      },
    });
  }

  DeleteProduct(data) {
    return this.serviceBriefcaseS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  saveGroup() {
    var contador=0;
    var err=0;
    if (!this.selectedOptions.length) {
      this.dialog = this.dialog.close();
      this.toastS.danger(null, 'Debe seleccionar al menos un Procedimiento o medicamento');
    } else if(!this.InscriptionForm.controls.factor.value){
      this.toastS.danger(null, 'Debe seleccionar un Factor');
    }
    else{
      this.dialog = this.dialog.close();
      var dta = {
        factor: null,
        briefcase_id:null,
        manual_price_id:null,
        price_type_id:null,
        value:null
    };
      this.selectedOptions.forEach(element => {
      dta.factor = this.InscriptionForm.controls.factor.value;
      dta.briefcase_id = this.briefcase_id;
      dta.manual_price_id = element.id;
      dta.price_type_id=element.price_type_id;
      dta.value=element.value;
      this.serviceBriefcaseS.Save(dta).then(x => {
      }).catch(x => {
        err++;
      });
      contador++;
    });
    if(contador > 0){
      this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos'); 
    }else if(err > 0){
      this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
    }
    this.RefreshData();
    this.selectedOptions=[];
  } 
  }
}

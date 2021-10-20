import {Component, OnInit,Input,TemplateRef,ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ServicesBriefcaseService} from '../../../business-controller/services-briefcase.service';
import {ManualService} from '../../../business-controller/manual.service';
import {ManualPriceService} from '../../../business-controller/manual-price.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { numeric } from '@rxweb/reactive-form-validators';
import { multicast } from 'rxjs/operators';

@Component({
  selector: 'ngx-services-briefcase',
  templateUrl: './services-briefcase.component.html',
  styleUrls: ['./services-briefcase.component.scss'],
})
export class ServicesBriefcaseComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public messageError = null;
  

  public InscriptionForm: FormGroup;
  public title = 'Contrato: ';
  public subtitle = 'Asignación catalogo de servicios: ';
  public headerFields: any[] =  ['Código','Manual','Procedimiento', 'Producto',  'Valor','Tipo de Valor'];
  public routes = [];
  public row;
  public selectedOptions: any[] = [];
  public data= [];
  public dialog; 
  public inscriptionstatus = 0;
  public selectedRows: any;
  public inscriptionId;

  public manual_price: any[] = [];
  public manual: any[] = [];

  public settings = {  
    selectMode: 'multi',
    columns: {
     /* check :{
        sort: false,
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'dataUserRole': this.dataUserRole.bind(this),
          };
        },
        renderComponent: CheckboxUser,
      },     */
      id: {
        title: this.headerFields[0],
        width: '5%',
      },
      manual_id: {
        title: this.headerFields[1],
        type: 'string',
      },
      procedure_id: {
        title: this.headerFields[2],
        type: 'string',
      },
      Product_id: {
        title: this.headerFields[3],
        type: 'string',
      },
      value: {
        title: this.headerFields[4],
        type: 'string',
      },
      price_type_id: {
        title: this.headerFields[5],
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
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
  ) {
  }

  GetParams() {
    return {
      manual_id: this.route.snapshot.params.id,
    };
  }

  ngOnInit(): void {
    this.InscriptionForm = this.formBuilder.group({
      group: ['', Validators.compose([Validators.required])],
      inscriptionStat: ['', Validators.compose([Validators.required])],
  });


      this.routes = [
        {
          name: 'Contratos',
          route: '../../list',
        },
        {
          name: 'Asignación de catalogo al contrato',
          route: '../../contract/services-briefcase',
        },
      ];

    this.ManualS.GetCollection({
      pagination: false,
    }).then(x => {
      this.manual = x;
    }).catch(x => {
    }); 
  }


  GetDataSelect(select: any[]) {
    this.selectedOptions=[];
    select.forEach(element => {
      var role_id=element;
      var role_filter = role_id.courses.filter(course => course.pivot.course_id==this.route.snapshot.params.course_id);
      role_filter.user_role_group_id= role_id.user_role_group_id;
      role_filter.email=role_id.email;
      role_filter.name=role_id.nombre_completo;
      this.selectedOptions.push(role_filter);
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
    this.selectedOptions.forEach(element => {
      this.inscriptionId= element[0].pivot.inscription_status_id
    });
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
    var contador=0;
    var err=0;
    if (!this.selectedOptions.length) {
      this.dialog = this.dialog.close();
      this.toastS.danger(null, 'Debe seleccionar al menos un usuario');
    } else if(!this.InscriptionForm.controls.inscriptionStat.value){
      this.toastS.danger(null, 'Debe seleccionar un Estado');
    }else if(!this.InscriptionForm.controls.group.value && this.InscriptionForm.controls.inscriptionStat.value==1){
      this.toastS.danger(null, 'Debe seleccionar un Grupo');
    }
    else{
      this.dialog = this.dialog.close();
      this.selectedOptions.forEach(element => {
      element[0].pivot.inscription_status_id =  this.InscriptionForm.controls.inscriptionStat.value;
      element[0].pivot.group_id = this.InscriptionForm.controls.group.value;
      element[0].pivot.user_role_group_id = element.user_role_group_id;
      element[0].pivot.email=element.email;
      element[0].pivot.name=element.name;
      this.serviceBriefcaseS.Save(element[0].pivot).then(x => {
        element.user_role_group_id = x.data.inscription.user_role_group_id;
        element[0].pivot.user_role_group_id = x.data.inscription.user_role_group_id; 
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

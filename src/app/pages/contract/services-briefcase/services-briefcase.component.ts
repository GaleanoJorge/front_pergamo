import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ServicesBriefcaseService } from '../../../business-controller/services-briefcase.service';
import { ManualService } from '../../../business-controller/manual.service';
import { ManualPriceService } from '../../../business-controller/manual-price.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { numeric } from '@rxweb/reactive-form-validators';
import { multicast } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';
import { CampusService } from '../../../business-controller/campus.service';
import { TypeBriefcaseService } from '../../../business-controller/type-briefcase.service';
import { ManualPrice } from '../../../models/manual-price';
import { Console } from 'console';
import { BriefcaseService } from '../../../business-controller/briefcase.service';

@Component({
  selector: 'ngx-services-briefcase',
  templateUrl: './services-briefcase.component.html',
  styleUrls: ['./services-briefcase.component.scss'],
})
export class ServicesBriefcaseComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public messageError = null;


  public InscriptionForm: FormGroup;
  public title;
  public subtitle = 'Asignación catalogo de servicios: ';
  public headerFields: any[] = ['Código', 'Manual', 'Código propio', 'Código homologo', 'Nombre Procedimiento-medicamento-insumo', 'Valor', 'Tipo de Valor', 'Tipo de manual', 'Tipo de procedimiento','Paciente a prestar'];
  public routes = [];
  public row;
  public selectedOptions: any[] = [];
  public data = [];
  public dialog;
  public inscriptionstatus = 0;
  public selectedRows: any;
  public inscriptionId;
  public campus;

  public manual_price: any[] = [];
  public manual: any[] = [];
  public manual2;
  public type_briefcase: any[] = [];
  public briefcase_id: number;
  public briefcase: any[];
  public result;



  public settings = {
    selectMode: 'multi',
    pager: {
      display: true,
      perPage: 20,
    },
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
      manual: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      manual_type: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.manual.type_manual == 0) {
            return 'Procedimientos';
          } else if(row.manual.type_manual == 1){
            return 'Medicamentos'
          }else {
            return 'Insumos'
          }
        },
      },
      procedure_type: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.manual_procedure_type_id == 3) {
            return 'Paquetes';
          } else if (row.manual_procedure_type_id == 2 && row.manual.type_manual == 1) {
            return 'Medicamentos'
          } else if (row.manual_procedure_type_id == 2 && row.manual.type_manual == 2) {
            return '--'
          }
          else {
            return 'Código propio'
          }
        },
      },
      own_code: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (row.manual_procedure_type_id == 3 && row.manual.type_manual == 0) {
            return row.own_code;
          } else if (row.manual_procedure_type_id == 2 && row.manual.type_manual == 1) {
            return row.product.code_atc;
          } else if (row.manual_procedure_type_id == 2 && row.manual.type_manual == 2) {
            return '--'
          }
          else {
            return row.own_code;
          }
        },
      },
      homologous_id: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (row.manual_procedure_type_id == 3 && row.manual.type_manual == 0) {
            return row.homologous_id;
          } else if (row.manual_procedure_type_id == 2 && row.manual.type_manual == 1) {
            return row.product.code_atc;
          } else if (row.manual_procedure_type_id == 2 && row.manual.type_manual == 2) {
            return '--'
          }
          else {
            return row.homologous_id;
          }
        },
      },
      name: {
        title: this.headerFields[4],
        type: 'string',
      },
      value: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, data) => {
          return this.currency.transform(value);
        },
      },
      price_type: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      patient_id: {
        title: this.headerFields[9],
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
    private serviceBriefcaseS: ServicesBriefcaseService,
    private ManualS: ManualService,
    private ManualPriceS: ManualPriceService,
    private CampusS: CampusService,
    private TypeBriefcaseS: TypeBriefcaseService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private BriefcaseS: BriefcaseService,
    private currency: CurrencyPipe,
  ) {
  }


  async ngOnInit() {
    this.briefcase_id = this.route.snapshot.params.id;
    this.InscriptionForm = this.formBuilder.group({
      factor_sign: ['', Validators.compose([Validators.required])],
      factor: ['', Validators.compose([Validators.required])],
    });


    this.routes = [
      {
        name: 'Contratos',
        route: '../../list',
      },
      {
        name: 'Portafolios',
        route: '../../briefcase/' + this.briefcase_id,
      },
      {
        name: 'Asignación de procedimientos',
        route: '../../services-briefcase/' + this.briefcase_id,
      },
    ];

    this.ManualS.GetCollection().then(x => {
      this.manual = x;
    });

    await this.BriefcaseS.GetCollection().then(x => {
      this.briefcase = x;
    });
    this.result = this.briefcase.find(briefcase => briefcase.id == this.route.snapshot.params.id);
    this.title = 'Asociación de procedimientos a portafolio : ' + this.result.name;

  }


  GetDataSelect(select: any[]) {
    // console.log(select);
    this.selectedOptions = [];
    select.forEach(element => {
      var manual_price = element;
      this.selectedOptions.push(manual_price);
    });
  }

  ChangeManual(manual) {
    this.manual2 = manual;
    console.log(this.manual2);
    this.table.changeEntity(`manual_price/${this.briefcase_id}/${this.manual2}`, 'manual_price');
    // this.RefreshData();
  }
  RefreshData() {
    this.table.refresh();
    this.selectedOptions = [];
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
    var contador = 0;
    var err = 0;
    if (!this.selectedOptions.length) {
      this.dialog = this.dialog.close();
      this.toastS.danger(null, 'Debe seleccionar al menos un Procedimiento o medicamento');
    } else if (!this.InscriptionForm.controls.factor.value) {
      this.toastS.danger(null, 'Debe seleccionar un Factor');
    }
    else {
      this.dialog = this.dialog.close();
      var dta = {
        sign: null,
        factor: null,
        briefcase_id: null,
        manual_price_id: null,
        price_type_id: null,
        value: null
      };
      this.selectedOptions.forEach(element => {
        dta.sign = this.InscriptionForm.controls.factor_sign.value;
        dta.factor = this.InscriptionForm.controls.factor.value;
        dta.briefcase_id = this.briefcase_id;
        dta.manual_price_id = element.id;
        dta.price_type_id = element.price_type_id;
        dta.value = element.value;
        this.serviceBriefcaseS.Save(dta).then(x => {
        }).catch(x => {
          err++;
        });
        contador++;
      });
      if (contador > 0) {
        this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos');
      } else if (err > 0) {
        this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
      }
      this.RefreshData();
      this.selectedOptions = [];
    }
  }
}

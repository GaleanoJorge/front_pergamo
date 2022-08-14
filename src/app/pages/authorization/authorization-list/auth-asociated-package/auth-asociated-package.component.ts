import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ProcedurePackageService } from '../../../../business-controller/procedure-package.service';
import { ProcedureService } from '../../../../business-controller/procedure.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { numeric } from '@rxweb/reactive-form-validators';
import { multicast } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SelectAuthComponent } from './select-auth.component'; 
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { AuthPackageService } from '../../../../business-controller/auth-package.service';


@Component({
  selector: 'ngx-auth-asociated-package',
  templateUrl: './auth-asociated-package.component.html',
  styleUrls: ['./auth-asociated-package.component.scss'],
})
export class AuthAsociatedPackageComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  @Input() show: any;
  public messageError = null;
  
  public saved: any = null;

  public InscriptionForm: FormGroup;
  public title = 'Asignación autorizaciones para paquete: ';
  public headerFields: any[] = [
    'Estado',
    'ID',
    'Procedimiento',
    'Número de autorización',
    'Tipo de documento',
    'Número de documento',
    'Nombre completo',
    'Email',
    'Providencia, Vereda o Municipio',
    'Barrio',
    'Dirección',
    'Fecha de creación',
    'Tipo de atención',
    'Fecha de ejecución',
  ];
  public routes = [];
  public row;
  public selectedOptions: any[] = [];
  public selectedOptionsTemp: any[] = [];
  public selectedOptions2: any[] = [];
  public emit: any[] = [];
  public data = [];
  public dialog;
  public inscriptionstatus = 0;
  public selectedRows: any;
  public inscriptionId;
  public campus;
  

  public localidentify
  public manual_price: any[] = [];
  public package: any[] = [];
  public type_briefcase: any[] = [];
  public procedure_package_id: number;
  public filter: any[] = [];
  public filter2;
  public done = false;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      select: {
        title: this.headerFields[11],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (!this.done) {
            this.selectedOptions=[];
            this.parentData.selectedOptions=[];
            
            this.table.source.data.forEach(x =>{ 
              if(x.auth_package_id){
                this.parentData.selectedOptions.push(x.id);
              }
            });
            this.selectedOptions = this.parentData.selectedOptions;
            this.emit = this.parentData.selectedOptions;
            this.parentData.selectedOptions.forEach(x => {
              this.selectedOptions2.push(x);
            });
            this.done = true;
          }
          return {
            'data': row,
            'show': this.show,
            'valid': (!this.selectedOptions2.includes(row.id)) ? false : true,
            'selection': (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: SelectAuthComponent,
      },      id: {
        title: this.headerFields[1],
        type: 'string',
      },
      date: {
        title: this.headerFields[11],
        type: 'string',
      },
      services_briefcase: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.manual_price.name;
        },
      },
      auth_number: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value ? value : '--'
        },
      },
      assigned_management_plan: {
        title: this.headerFields[13],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if(value){
            return value.execution_date != "0000-00-00" ? value.execution_date : '--';
          } else {
            return '--';
          }
        },
      },
      'type_of_attention': {
        title: this.headerFields[12],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if( row.assigned_management_plan){
            return row.assigned_management_plan.management_plan.type_of_attention.name;
          } else {
            return '--';
          }
        },
      },
      'identification_type': {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.identification_type.name;
        },
      },
      'identification': {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.identification;
        },
      },
      nombre_completo: {
        title: this.headerFields[6],
        type: 'string',
      },
      'email': {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.email;
        },
      },
      'residence_municipality': {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.residence_municipality.name;
        },
      },
      'residence': {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.residence.name;
        },
      },
      residence_address: {
        title: this.headerFields[10],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.residence_address;
        },
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private procedurePackageS: ProcedurePackageService,
    private authPackageS: AuthPackageService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private e: ElementRef
  ) {
  }


  ngOnInit(): void {
    
  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions2.push(row.id);
      this.emit.push(row.id);
    } else {
      this.emit = [];
      let i = this.selectedOptions2.indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
      var j = 0;
      this.selectedOptions.forEach(element => {
        if (this.selectedOptions2.includes(element)) {
          this.emit.push(element);
        }
        j++;
      });
    }
    this.selectedOptions = this.emit;
    this.messageEvent.emit(this.selectedOptions);
    // this.RefreshData();
  }



  // RefreshData() {
  //   this.table.refresh();
  // }
 
  saveGroup() {
    var contador = 0;
    var err = 0;
    if (!this.selectedOptions.length) {
      this.toastS.danger(null, 'Debe seleccionar al menos un Menú');
    }
    else {
      var dta = {
        component_package_id: null,
        component_id: null,
      };
      this.selectedOptions.forEach(element => {
        dta.component_package_id = this.procedure_package_id;
        dta.component_id = element.id;
        this.procedurePackageS.Save(dta).then(x => {
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
      // this.RefreshData();
      this.selectedOptions = [];
    }
  }
}

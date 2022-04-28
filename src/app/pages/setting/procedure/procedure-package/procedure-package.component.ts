import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ProcedurePackageService } from '../../../../business-controller/procedure-package.service';
import { ProcedureService } from '../../../../business-controller/procedure.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { numeric } from '@rxweb/reactive-form-validators';
import { multicast } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SelectProcedureComponent } from './select-procedure.component';
import { AmountProcedureComponent } from './amount-procedure-package.component';
import { DynamicProcedurePackageComponent } from './dynamic-procedure-package.component';


@Component({
  selector: 'ngx-procedure-package',
  templateUrl: './procedure-package.component.html',
  styleUrls: ['./procedure-package.component.scss'],
})
export class ProcedurePackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  @Input() show: any;
  public messageError = null;


  public InscriptionForm: FormGroup;
  public title = 'Asignación procedimientos para paquete: ';
  public subtitle = 'Asignación procedimientos para paquete: ';
  public headerFields: any[] = ['ID', 'Cod', 'Cups', 'Nombre del procedimiento', 'Valor mínimo', 'Valor máximo', 'Valor dinamico', 'Valor dinamico'];
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



  public settings = {
    //selectMode: 'multi',

    columns: {
      select: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (!this.done) {
            this.selectedOptions = this.parentData.selectedOptions;
            this.emit = this.parentData.selectedOptions;
            this.parentData.selectedOptions.forEach(x => {
              this.selectedOptions2.push(x.procedure_id);
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
        renderComponent: SelectProcedureComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      equivalent: {
        title: this.headerFields[2],
        type: 'string',
      },
      name: {
        title: this.headerFields[3],
        type: 'string',
      },
      min_quantity: {
        title: this.headerFields[4],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // if(this.selectedOptions2.includes(row.id)){
          //   var localidentify = this.selectedOptions.find(item => item.procedure_id == row.id)
          // }
          var amo;
          this.selectedOptions.forEach(x => {
            if (x.procedure_id == row.id) {
              amo = x.min_quantity;
            }
          });
          // return {
          //   'data': row,
          //   'enabled': (!this.show) ? !this.selectedOptions2.includes(row.id) : true,
          //   'amount': this.selectedOptions2.includes(row.id) ? localidentify.min_quantity : '',
          //   'onchange': (input, row: any) => this.onAmountChange(input, row),
          // };
          return {
            'data': row,
            'enabled': (!this.show) ? !this.selectedOptions2.includes(row.id) : true,
            'amount': amo ? amo : '',
            'onchange': (input, row: any) => this.onAmountChange(input, row),
          };
        },
        renderComponent: AmountProcedureComponent,
      },
      max_quantity: {
        title: this.headerFields[5],
        type: 'custom',
        valuePrepareFunction: (value, row) => {

          // if(this.selectedOptions2.includes(row.id)){
          //   var localidentify = this.selectedOptions.find(item => item.procedure_id == row.id)
          // }
          // return {
          //   'data': row,
          //   'enabled': (!this.show) ? !this.selectedOptions2.includes(row.id) : true,
          //   'amount': this.selectedOptions2.includes(row.id) ? localidentify.max_quantity :'',
          //   'onchange': (input, row: any) => this.onMaxAmountChange(input, row),
          // };
          var amo;
          this.selectedOptions.forEach(x => {
            if (x.procedure_id == row.id) {
              amo = x.max_quantity;
            }
          });
          return {
            'data': row,
            'enabled': (!this.show) ? !this.selectedOptions2.includes(row.id) : true,
            'amount': amo ? amo : '',
            'onchange': (input, row: any) => this.onMaxAmountChange(input, row),
          };
        },
        renderComponent: AmountProcedureComponent,
      },
      dynamic: {
        title: this.headerFields[6],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // if(this.selectedOptions2.includes(row.id)){
          //   var localidentify = this.selectedOptions.find(item => item.procedure_id == row.id)
          // }
          // return {
          //   'data': row,
          //   'enabled': (!this.show) ? !this.selectedOptions2.includes(row.id) : true,
          //   'amount': this.selectedOptions2.includes(row.id) ? localidentify.dynamic == 1 ? false : true : false,
          //   'onchange': (input, row: any) => this.onDynamicChange(input, row),
          // };
          var amo;
          this.selectedOptions.forEach(x => {
            if (x.procedure_id == row.id) {
              amo = x.dynamic_charge;
            }
          });
          return {
            'data': row,
            'enabled': (!this.show) ? !this.selectedOptions2.includes(row.id) : true,
            'amount': amo == 1 ? true : false,
            'onchange': (input, row: any) => this.onDynamicChange(input, row),
          };
        },
        renderComponent: DynamicProcedurePackageComponent,
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private procedurePackageS: ProcedurePackageService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private e: ElementRef
  ) {
  }


  ngOnInit(): void {
    this.procedure_package_id = this.route.snapshot.params.id;
    

    /*this.procedurePackageS.GetByPackage(this.procedure_package_id).then(x => {
      this.package=x;
      var checkbox = this.e.nativeElement.querySelectorAll('input[type=checkbox]')
      console.log(checkbox);
    });*/

    this.routes = [
      {
        name: 'Procedimientos',
        route: '../../procedure',
      },
      {
        name: 'Paquete de procedimiento',
        route: '../../contract/briefcase',
      },
    ];
  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions2.push(row.id);
      var procedure_package = {
        procedure_id: row.id,
        max_quantity: null,
        min_quantity: null,
        dynamic_charge: false,
      }
      this.emit.push(procedure_package);
    } else {
      this.emit = [];
      let i = this.selectedOptions2.indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
      var j = 0;
      this.selectedOptions.forEach(element => {
        if (this.selectedOptions2.includes(element.procedure_id)) {
          this.emit.push(element);
        }
        j++;
      });
    }
    this.selectedOptions = this.emit;
    this.messageEvent.emit(this.selectedOptions);
    this.RefreshData();
  }

  onDynamicChange(input, row) {
    var i = 0;
    var mientras = this.selectedOptions;
    this.selectedOptions.forEach(element => {
      if (element.procedure_id == row.id) {
        mientras[i].dynamic_charge = input.target.checked;
      }
      i++
    });
    this.selectedOptions = mientras;
    this.messageEvent.emit(this.selectedOptions);
  }

  onAmountChange(input, row) {
    var i = 0;
    var mientras = this.selectedOptions;
    this.selectedOptions.forEach(element => {
      if (element.procedure_id == row.id) {
        mientras[i].min_quantity = input.target.valueAsNumber;
      }
      i++
    });
    this.selectedOptions = mientras;
    this.messageEvent.emit(this.selectedOptions);
  }

  onMaxAmountChange(input, row) {
    var i = 0;
    var mientras = this.selectedOptions;
    this.selectedOptions.forEach(element => {
      if (element.procedure_id == row.id) {
        if (mientras[i].min_quantity >= input.target.valueAsNumber) {
          this.toastS.warning('El valor máximo no puede exceder el valor mínimo', 'Valor invalido');
        } else {
          mientras[i].max_quantity = input.target.valueAsNumber;
        }
      }
      i++
    });
    this.selectedOptions = mientras;
    this.messageEvent.emit(this.selectedOptions);
  }

  // GetDataSelect(select: any[]) {

  //   this.selectedOptions2 = select;
  //   this.selectedOptions2.sort();
  //   this.selectedOptions.sort();
  //   if (this.selectedOptions.length > 0) {
  //     if (select.length < this.selectedOptions.length) {
  //       // this.selectedOptions2.forEach(element => {
  //       //   this.filter2 = this.selectedOptions.filter(option => option.id != element.id);
  //       //   if (this.filter2.length != 0) {
  //       //     var index = this.selectedOptions.indexOf(element.id);
  //       //     this.selectedOptions.splice(index, 1);
  //       //   }
  //       // });
  //     } else {
  //       // for(var i=0;i<=this.selectedOptions.length;i++){
  //       //   for(var j=0;j<=this.selectedOptions2.length;j++){
  //       //     if(this.selectedOptions2[j].id!=this.selectedOptions[i].id){
  //       //       this.selectedOptions.push(this.selectedOptions2[j]);
  //       //     }
  //       //   }
  //       // }
  //       this.selectedOptions2.forEach(element => {
  //         if (!this.selectedOptions.includes(element)) {
  //           this.selectedOptions.push(element);
  //         }
  //       });

  //       //this.selectedOptions.push(filter.pop);


  //     }
  //   } else {
  //     this.selectedOptions = this.selectedOptions.concat(this.selectedOptions2);
  //   }

  //   /*select.sort();
  //   this.selectedOptions.sort();
  //   if(JSON.stringify(select) == JSON.stringify(this.selectedOptions)){
  //     this.selectedOptionsTemp=select;
  //   }else{
  //     this.selectedOptionsTemp=select;
  //     if(select.length>this.selectedOptionsTemp.length){
  //     this.selectedOptions.forEach(element => {
  //       var filter = this.selectedOptionsTemp.filter(option => option.id != element.id);
  //         if (filter.length == 0) {
  //           this.selectedOptions.push(element);
  //         } else {
  //           var index = this.selectedOptions.indexOf(element.id);
  //           this.selectedOptions.splice(index, 1);
  //         }
  //         //this.selectedOptions.splice(index, 1);
  //         //this.selectedOptions=this.selectedOptions.concat(this.selectedOptionsTemp);

  //     });

  //   }else{
  //     this.selectedOptions=this.selectedOptions.concat(this.selectedOptionsTemp);
  //   }
  // }
  //   /*this.selectedOptionsTemp.forEach(element => {
  //     var filter = this.selectedOptions.filter(option => option.id == element.id);
  //     if (filter.length != 0) {
  //       this.selectedOptionsTemp = [];
  //       this.selectedOptionsTemp=select;
  //     } else {
  //       //var index = this.selectedOptions.indexOf(element.id);
  //       if (filter.length == 0) {
  //         this.selectedOptions.push(element);
  //       } else {
  //         var index = this.selectedOptions.indexOf(element.id);
  //         this.selectedOptions.splice(index, 1);
  //       }
  //       //this.selectedOptions.splice(index, 1);
  //       //this.selectedOptions=this.selectedOptions.concat(this.selectedOptionsTemp);
  //     }
  //   });
  //   /*if (this.selectedOptionsTemp.length >= select.length) {
  //     this.selectedOptions = [];
  //     this.selectedOptions=select;
  //     var status=true;
  //   } else {
  //     this.selectedOptionsTemp.forEach(element => {
  //       var filter = this.selectedOptions.filter(option => option.id == element.id);
  //       if (filter.length == 0) {
  //         this.selectedOptions.push(element);
  //       } else {
  //         var index = this.selectedOptions.indexOf(element.id);
  //         this.selectedOptions.splice(index, 1);
  //       }
  //     });
  //   }*/

  //   this.messageEvent.emit(this.selectedOptions);


  // }

  ChangeManual(inscriptionstatus) {
    this.inscriptionstatus = inscriptionstatus;
    this.table.changeEntity(`inscriptionsByCourse/${this.inscriptionstatus}`);
    // this.RefreshData();
  }
  RefreshData() {
    this.table.refresh();
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
  // saveGroup() {
  //   var contador = 0;
  //   var err = 0;
  //   if (!this.selectedOptions.length) {
  //     this.toastS.danger(null, 'Debe seleccionar al menos un Procedimiento');
  //   }
  //   else {
  //     var dta = {
  //       procedure_package_id: null,
  //       procedure_id: null,
  //     };
  //     this.selectedOptions.forEach(element => {
  //       dta.procedure_package_id = this.procedure_package_id;
  //       dta.procedure_id = element.id;
  //       this.procedurePackageS.Save(dta).then(x => {
  //       }).catch(x => {
  //         err++;
  //       });
  //       contador++;
  //     });
  //     if (contador > 0) {
  //       this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos');
  //     } else if (err > 0) {
  //       this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
  //     }
  //     this.RefreshData();
  //     this.selectedOptions = [];
  //   }
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
      this.RefreshData();
      this.selectedOptions = [];
    }
  }
}

import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ProcedurePackageService } from '../../../../business-controller/procedure-package.Service';
import { ProcedureService } from '../../../../business-controller/procedure.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { numeric } from '@rxweb/reactive-form-validators';
import { multicast } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SelectProcedureComponent } from './select-procedure.component';


@Component({
  selector: 'ngx-procedure-package',
  templateUrl: './procedure-package.component.html',
  styleUrls: ['./procedure-package.component.scss'],
})
export class ProcedurePackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  public messageError = null;


  public InscriptionForm: FormGroup;
  public title = 'Asignación procedimientos para paquete: ';
  public subtitle = 'Asignación procedimientos para paquete: ';
  public headerFields: any[] = ['ID', 'Cod', 'Cups', 'Nombre del procedimiento', 'Categoria del procedimiento', 'Pos', 'Rango de Edad ', 'Genero', 'Estado del procedimiento', 'Id de finalidad ', 'Tiempo'];
  public routes = [];
  public row;
  public selectedOptions: any[] = [];
  public selectedOptionsTemp: any[] = [];
  public selectedOptions2: any[] = [];
  public data = [];
  public dialog;
  public inscriptionstatus = 0;
  public selectedRows: any;
  public inscriptionId;
  public campus;

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
          return {
            'data': row,
            'valid': (!this.selectedOptions.includes(row.id)) ? false : true,
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
    this.selectedOptions = this.parentData;

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
      this.selectedOptions.push(row.id);
    } else {
      let i = this.selectedOptions.indexOf(row.id);
      i !== -1 && this.selectedOptions.splice(i, 1);
    }
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
}

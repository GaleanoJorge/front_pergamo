import {Component, OnInit,Input,TemplateRef,ViewChild,ElementRef,Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ProcedurePackageService} from '../../../../business-controller/procedure-package.Service';
import {ProcedureService} from '../../../../business-controller/procedure.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { numeric } from '@rxweb/reactive-form-validators';
import { multicast } from 'rxjs/operators';


@Component({
  selector: 'ngx-procedure-package',
  templateUrl: './procedure-package.component.html',
  styleUrls: ['./procedure-package.component.scss'],
})
export class ProcedurePackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  public messageError = null;
  

  public InscriptionForm: FormGroup;
  public title = 'Asignación procedimientos para paquete: ';
  public subtitle = 'Asignación procedimientos para paquete: ';
  public headerFields: any[] =  ['ID', 'Cod', 'Cups', 'Nombre del procedimiento', 'Categoria del procedimiento', 'Pos', 'Rango de Edad ', 'Genero', 'Estado del procedimiento', 'Id de finalidad ', 'Tiempo'];
  public routes = [];
  public row;
  public selectedOptions: any[] = [];
  public data= [];
  public dialog; 
  public inscriptionstatus = 0;
  public selectedRows: any;
  public inscriptionId;
  public campus;

  public manual_price: any[] = [];
  public package: any[] = [];
  public type_briefcase: any[] = [];
  public procedure_package_id:number;

  

  public settings = {  
    selectMode: 'multi',
    columns: {  
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


  GetDataSelect(select: any[]) {
    console.log(select);
    this.selectedOptions=[];
    select.forEach(element => {
      var manual_price=element;
      this.selectedOptions.push(manual_price);
    });
    this.messageEvent.emit(this.selectedOptions);
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
  saveGroup() {
    var contador=0;
    var err=0;
    if (!this.selectedOptions.length) {
      this.toastS.danger(null, 'Debe seleccionar al menos un Procedimiento');
    }
    else{
      var dta = {
        procedure_package_id:null,
        procedure_id: null,
    };
      this.selectedOptions.forEach(element => {
      dta.procedure_package_id=this.procedure_package_id;
      dta.procedure_id = element.id;
      this.procedurePackageS.Save(dta).then(x => {
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

import {Component, OnInit,Input,TemplateRef,ViewChild,ElementRef,Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ProcedurePackageService} from '../../../../../business-controller/procedure-package.service';
import {ProcedureService} from '../../../../../business-controller/procedure.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';
import { numeric } from '@rxweb/reactive-form-validators';
import { multicast } from 'rxjs/operators';


@Component({
  selector: 'ngx-procedure-package2',
  templateUrl: './procedure-package2.component.html',
  styleUrls: ['./procedure-package2.component.scss'],
})
export class ProcedurePackage2Component implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  public messageError = null;
  

  public InscriptionForm: FormGroup;
  public title = 'Información de paquete';
  public subtitle ;
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
    columns: {  
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      'procedure.code': {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, data) => {
          return data.procedure.code;
        },
      },
      'procedure.name': {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, data) => {
          return data.procedure.name;
        },
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


 
  RefreshData() {
    this.table.refresh();
    this.selectedOptions=[];
  }
  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }

}

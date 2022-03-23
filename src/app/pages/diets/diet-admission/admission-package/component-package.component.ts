import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { DietComponentService } from '../../../../business-controller/diet-componet.service';
import { SelectComponentComponent } from './select-component.component';
import { DietAdmissionComponentService } from '../../../../business-controller/diet-admission-component.service';


@Component({
  selector: 'ngx-component-package',
  templateUrl: './component-package.component.html',
  styleUrls: ['./component-package.component.scss'],
})
export class ComponentPackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any;
  public messageError = null;


  public InscriptionForm: FormGroup;
  public title = 'Asignación de Componentes: ';
  public subtitle = 'Platos: ';
  public headerFields: any[] = ['Nombre'];
  public routes = [];
  public row;
  public selectedOptions: any[] = [];
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
  public component_package_id: number;
  public filter: any[] = [];
  public filter2;



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
        renderComponent: SelectComponentComponent,
      },
      name: {
        title: this.headerFields[0],
        type: 'string',
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dietComponentS: DietComponentService,
    private formBuilder: FormBuilder,
    private dietAdmissionComponentS: DietAdmissionComponentService,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private e: ElementRef
  ) {
  }


  async ngOnInit(): Promise<void> {
    this.component_package_id = this.route.snapshot.params.id;
    this.parentData;

    this.getData(this.parentData);

    this.routes = [
      {
        name: 'Platos',
        route: '../../component',
      },
      {
        name: 'Paquete de Platos',
        route: '../../contract/briefcase',
      },
    ];

  }

  getData(id) {
    this.dietAdmissionComponentS.GetCollection({ diet_admission_id: id }).then(x => {
      x.forEach(element => {
        this.selectedOptions.push(element.diet_component_id);
      });
      
      if (!(this.selectedOptions.length > 0) && this.parentData) {
        this.getData(this.parentData);
      } else {
        this.RefreshData();
        this.messageEvent.emit(this.selectedOptions);
      }
    });
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

  ChangeManual(inscriptionstatus) {
    this.inscriptionstatus = inscriptionstatus;
    this.table.changeEntity(`inscriptionsByCourse/${this.inscriptionstatus}`);
  }
  RefreshData() {
    this.table.refresh();
  }
  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }

  saveGroup() {
    var contador = 0;
    var err = 0;
    if (!this.selectedOptions.length) {
      this.toastS.danger(null, 'Debe seleccionar al menos un Componente');
    }
    else {
      var dta = {
        component_package_id: null,
        component_id: null,
      };
      this.selectedOptions.forEach(element => {
        dta.component_package_id = this.component_package_id;
        dta.component_id = element.id;
        this.dietComponentS.Save(dta).then(x => {
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

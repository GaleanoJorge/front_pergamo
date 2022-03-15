import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { DietComponentService } from '../../../../business-controller/diet-componet.service';
import { SelectAdmissionsComponent } from './select-admissions.component';
import { UserBusinessService } from '../../../../business-controller/user-business.service';


@Component({
  selector: 'ngx-admissions-package',
  templateUrl: './admissions-package.component.html',
  styleUrls: ['./admissions-package.component.scss'],
})
export class AdmissionsPackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any;
  @Input() dishByMenu: any;
  @Input() menuId: any;
  public messageError = null;


  public InscriptionForm: FormGroup;
  public title = 'Pacientes admitidos: ';
  public subtitle = 'Admitidos: ';
  public headerFields: any[] = ['NOMBRE', 'SEDE', 'PISO', 'PABELLÓN', 'CAMA'];
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

  public position = 0;
  public entity;
  public customData;



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
        renderComponent: SelectAdmissionsComponent,
      },
      nombre_completo: {
        title: this.headerFields[0],
        type: 'string',
      },
      campus: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.admissions[0].campus.name;
        },
      },
      flat: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.admissions[0].location[0].flat.name;
        },
      },
      pavilion: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.admissions[0].location[0].pavilion.name;
        },
      },
      bed: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.admissions[0].location[0].bed.name;
        },
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dietComponentS: DietComponentService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private userBusinessS: UserBusinessService,
    private e: ElementRef
  ) {
  }


  async ngOnInit(): Promise<void> {
    this.component_package_id = this.route.snapshot.params.id;
    this.selectedOptions = this.parentData;

    this.entity = 'admissions';
    this.customData = 'admissions';

    await this.userBusinessS.GetByAdmission({ admission_route_id: 1 }).then(x => {
      this.customData = x;
    });

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

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions.push(row.admissions[0].id);
    } else {
      let i = this.selectedOptions.indexOf(row.admissions[0].id);
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
      this.toastS.danger(null, 'Debe seleccionar al menos un Plato');
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

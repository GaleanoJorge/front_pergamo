import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { DietAdmissionService } from '../../../business-controller/diet-admission.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { Router } from '@angular/router';
import { FormDietAdmissionComponent } from './form-diet-admission/form-diet-admission.component';
import { ActionsDietAdmissionComponent } from './actions-diet-admission.component';
import { UserBusinessService } from '../../../business-controller/user-business.service';

@Component({
  selector: 'ngx-diet-admission',
  templateUrl: './diet-admission.component.html',
  styleUrls: ['./diet-admission.component.scss'],
})
export class DietAdmissionComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'DIETAS DE ADMISIONES';
  public subtitle: string = 'ADMISIONES';
  public headerFields: any[] = ['NOMBRE', 'SEDE', 'PISO', 'PABELLÓN', 'CAMA'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public customData;


  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditAdmission.bind(this),
            'delete': this.DeleteConfirmAdmission.bind(this),
          };
        },
        renderComponent: ActionsDietAdmissionComponent,
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

  public routes = [
    {
      name: 'Admissiones',
      route: '../../setting/diet-admission',
    },
  ];

  constructor(
    private dietAdmissionS: DietAdmissionService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private userBusinessS: UserBusinessService,
    private datepipe: DateFormatPipe,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.customData = 'admissions';

    // await this.userBusinessS.GetByAdmission({ admission_route_id: 1 }).then(x => {
    //   this.customData = x;
    // });
  }

  RefreshData() {
    this.table.refresh();
  }

  NewAdmission() {
    this.dialogFormService.open(FormDietAdmissionComponent, {
      context: {
        title: 'CREAR NUEVO MENÚ',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAdmission(data) {
    this.dialogFormService.open(FormDietAdmissionComponent, {
      context: {
        title: 'EDITAR ADMISIÓN',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmAdmission(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteAdmission.bind(this),
      },
    });
  }

  DeleteAdmission(data) {
    return this.dietAdmissionS.Delete(data.id).then(x => {
      this.table.refresh();
      // this.dietAdmissionDishS.Delete(data.id);
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

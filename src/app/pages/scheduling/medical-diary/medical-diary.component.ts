import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicalDiaryService } from '../../../business-controller/medical-diary.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormMedicalDiaryComponent } from './form-medical-diary/form-medical-diary.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActionsMedicalDiaryComponent } from './actions.component';
import { CupsPackageComponent } from './cups-package/cups-package.component';


@Component({
  selector: 'ngx-medical-diary',
  templateUrl: './medical-diary.component.html',
  styleUrls: ['./medical-diary.component.scss']
})
export class MedicalDiaryComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Agenda Medica';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['Tipo de identificación', 'Identificación', 'Nombre', 'Correo', 'Rol'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public flat;
  public sede;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'assign': this.assignCups.bind(this)
          };
        },
        renderComponent: ActionsMedicalDiaryComponent,
      },
      identification_type: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      identification: {
        title: this.headerFields[1],
        type: 'string',
      },
      nombre_completo: {
        title: this.headerFields[2],
        type: 'string',
      },
      email: {
        title: this.headerFields[3],
        type: 'string',
      },
      user_role: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value) {
          return value[0].role.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Agenda Medica',
      route: '../../setting/medical-diary',
    },
  ];

  constructor(
    private medicalDiaryS: MedicalDiaryService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  // NewMedicalDiary() {
  //   this.dialogFormService.open(FormMedicalDiaryComponent, {
  //     context: {
  //       title: 'Crear nueva Agenda',
  //       saved: this.RefreshData.bind(this),
  //     },
  //   });
  // }

  EditMedicalDiary(data) {
    this.dialogFormService.open(FormMedicalDiaryComponent, {
      context: {
        title: 'Editar agenda',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  assignCups(data){
    this.dialogFormService.open(CupsPackageComponent, {
      context: {
        title: 'Editar agenda',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmMedicalDiary(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteMedicalDiary.bind(this),
      },
    });
  }

  DeleteMedicalDiary(data) {
    return this.medicalDiaryS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

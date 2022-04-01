import { AdmissionsService } from '../../../business-controller/admissions.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormClinicHistoryComponent } from './form-clinic-history/form-clinic-history.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { Actions4Component } from './actions.component';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { Location } from '@angular/common';


@Component({
  selector: 'ngx-clinic-history-list',
  templateUrl: './clinic-history-list.component.html',
  styleUrls: ['./clinic-history-list.component.scss'],
})
export class ClinicHistoryListComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  linearMode = true;
  public messageError = null;
  public title;
  public subtitle = 'por usuario';
  public headerFields: any[] = ['Consecutivo de ingreso', 'Ruta', 'Ambito', 'Programa', 'Sede', 'Piso', 'Pabellón', 'Cama/Consultorio', 'Contrato', 'Fecha Ingreso', 'Fecha Egreso', 'Salida Medica'];
  public routes = [];
  public course;
  public data = [];
  public user_id;
  public date_end: boolean = true;
  public cont = 0;
  public ambit;
  public program;
  public flat;
  public bed;
  public bed_id;
  public pavilion; 
  public record_id;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  
  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
  public settings = {
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditAdmissions.bind(this),
            'delete': this.DeleteConfirmAdmissions.bind(this),
            'refresh': this.RefreshData.bind(this),
          };
        },

        renderComponent: Actions4Component,
      },
      toggleLinearMode() {
        this.linearMode = !this.linearMode;
      },
      consecutive: {
        title: this.headerFields[0],
        width: '5%',
      },
      location: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          this.ambit = value[value.length - 1].scope_of_attention.name;
          this.program = value[value.length - 1].program.name;
          if (value[value.length - 1].pavilion) {
            this.flat = value[value.length - 1].flat.name;
            this.pavilion = value[value.length - 1].pavilion.name;
            this.bed = value[value.length - 1].bed.name;
            this.bed_id = value[value.length - 1].bed.id;

          }
          return value[value.length - 1].admission_route.name;
        },
      },
      scope_of_attention: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.ambit;
        },
      },
      program: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.program;
        },
      },
      campus: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      flat: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.flat;
        },
      },
      pavilion: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.pavilion;
        },
      },
      bed: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.bed;
        },
      },
      contract: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      entry_date: {
        title: this.headerFields[9],
        type: 'date',
      },
      discharge_date: {
        title: this.headerFields[10],
        type: 'date',
        valuePrepareFunction: (value, row) => {
          if (value == '0000-00-00 00:00:00' && this.cont != 1) {
            this.date_end = false;
            this.cont = + 1;
          } else if (this.cont == 0) {
            this.date_end = true;
          }
          return value;
        },
      },
      medical_date: {
        title: this.headerFields[11],
        type: 'date',
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private admissionsS: AdmissionsService,
    private router: Router,
    private dialogFormService: NbDialogService,
    private UserBS: UserBusinessService,
    private deleteConfirmService: NbDialogService,
    private chRecord: ChRecordService,
    private toastService: NbToastrService,
    private location: Location

  ) {
    this.routes = [
      {
        name: 'Pacientes',
        route: '../../list',
      },
      {
        name: 'Historia Clínica',
        route: '../../clinic-history/' + this.route.snapshot.params.user_id,
      },
    ];

  }

  GetParams() {
    return {
      user_id: this.route.snapshot.params.user_id,
    };
  }

  ngOnInit(): void {
    this.user_id = this.route.snapshot.params.user_id;
    this.record_id = this.route.snapshot.params.id;

    this.UserBS.GetUserById(this.user_id).then(x => {
      var user = x;
      this.title = 'Admisiones de paciente: ' + user.firstname + ' ' + user.lastname;
    });
  }

  async finish() {

    await this.chRecord.Update({
      id: this.record_id,
      status: 'CERRADO',
    }).then(x => {
      this.toastService.success('', x.message);
      this.location.back();
      if (this.saved) {
        this.saved();
      }
    }).catch(x => {
      this.isSubmitted = false;
      this.loading = false;
    });
  }

  RefreshData() {
   
    this.table.refresh();
  }

  NewAdmissions() {
    this.dialogFormService.open(FormClinicHistoryComponent, {
      context: {
        title: 'Crear nuevo ingreso',
        user_id: this.user_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAdmissions(data) {
    this.dialogFormService.open(FormClinicHistoryComponent, {
      context: {
        title: 'Editar tipo de ingreso',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  // ChangeState(data) {
  //   // data.status_id = data.status_id === 1 ? 2 : 1;

  //   this.toastrService.info('', 'Cambiando estado');

  //   this.regionS.Update(data).then((x) => {
  //     this.toastrService.success('', x.message);
  //     this.table.refresh();
  //   }).catch((x) => {
  //     this.toastrService.danger(x.message);
  //   });
  // }

  DeleteConfirmAdmissions(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteAdmissions.bind(this),
      },
    });
  }

  DeleteAdmissions(data) {
    return this.admissionsS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

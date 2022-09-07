import { Component, OnInit, ViewChild } from '@angular/core';
import { DiagnosisService } from '../../../business-controller/diagnosis.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDiagnosisComponent } from './form-diagnosis/form-diagnosis.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Diagnósticos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Código','Nombre'];
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
            'edit': this.EditDiagnosis.bind(this),
            'delete': this.DeleteConfirmDiagnosis.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      code: {
        title: this.headerFields[1],
        type: 'string',
      },
      name: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Diagnósticos',
      route: '../../setting/diagnosis',
    },
  ];

  constructor(
    private DiagnosisS: DiagnosisService,
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

  NewDiagnosis() {
    this.dialogFormService.open(FormDiagnosisComponent, {
      context: {
        title: 'Crear nuevo diagnóstico',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDiagnosis(data) {
    this.dialogFormService.open(FormDiagnosisComponent, {
      context: {
        title: 'Editar diagnóstico',
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

  DeleteConfirmDiagnosis(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDiagnosis.bind(this),
      },
    });
  }

  DeleteDiagnosis(data) {
    return this.DiagnosisS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { CiiuDivisionService } from '../../../business-controller/ciiu-division.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCiiuDivisionComponent } from './form-ciiu-division/form-ciiu-division.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-ciiu-division',
  templateUrl: './ciiu-division.component.html',
  styleUrls: ['./ciiu-division.component.scss']
})
export class CiiuDivisionComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'División de clasificación industrial';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Código', 'Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]},${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditCiiuDivision.bind(this),
            'delete': this.DeleteConfirmCiiuDivision.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      cid_codigo: {
        title: this.headerFields[1],
        type: 'string',
      },
      cid_name: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'División de clasificación industrial',
      route: '../../setting/ciiu-division',
    },
  ];

  constructor(
    private ciiuDivisionS: CiiuDivisionService,
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

  NewCiiuDivision() {
    this.dialogFormService.open(FormCiiuDivisionComponent, {
      context: {
        title: 'Crear nueva división de clasificación industrial',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCiiuDivision(data) {
    this.dialogFormService.open(FormCiiuDivisionComponent, {
      context: {
        title: 'Editar división de clasificación industrial',
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

  DeleteConfirmCiiuDivision(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCiiuDivision.bind(this),
      },
    });
  }

  DeleteCiiuDivision(data) {
    return this.ciiuDivisionS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

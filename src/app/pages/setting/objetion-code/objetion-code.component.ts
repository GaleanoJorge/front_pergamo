import { Component, OnInit, ViewChild } from '@angular/core';
// import { ObjetionCodeService } from '../../../business-controller/type-briefcase.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormObjetionCodeComponent } from './form-objetion-code/form-objetion-code.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ObjetionCodeService } from '../../../business-controller/objetion-code.service';


@Component({
  selector: 'ngx-objetion-code',
  templateUrl: './objetion-code.component.html',
  styleUrls: ['./objetion-code.component.scss']
})
export class ObjetionCodeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Codigo de objeción de glosas';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Código','Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
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
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditObjetionCode.bind(this),
            'delete': this.DeleteConfirmObjetionCode.bind(this),
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
      name: 'Código de Objeción',
      route: '../../setting/objetion-code',
    },
  ];

  constructor(
    private ObjetionCodeS: ObjetionCodeService,
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

  NewObjetionCode() {
    this.dialogFormService.open(FormObjetionCodeComponent, {
      context: {
        title: 'Crear nuevo tipo de Objeción',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditObjetionCode(data) {
    this.dialogFormService.open(FormObjetionCodeComponent, {
      context: {
        title: 'Editar tipo de Portafolio',
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

  DeleteConfirmObjetionCode(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteObjetionCode.bind(this),
      },
    });
  }

  DeleteObjetionCode(data) {
    return this.ObjetionCodeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

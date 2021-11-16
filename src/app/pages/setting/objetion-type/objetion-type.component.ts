import { Component, OnInit, ViewChild } from '@angular/core';
// import { ObjetionTypeService } from '../../../business-controller/type-briefcase.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormObjetionTypeComponent } from './form-objetion-type/form-objetion-type.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ObjetionTypeService } from '../../../business-controller/objetion-type.service';


@Component({
  selector: 'ngx-objetion-type',
  templateUrl: './objetion-type.component.html',
  styleUrls: ['./objetion-type.component.scss']
})
export class ObjetionTypeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipo de objeción de glosas';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
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
            'edit': this.EditObjetionType.bind(this),
            'delete': this.DeleteConfirmObjetionType.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Tipo de Objeción',
      route: '../../setting/objetion-type',
    },
  ];

  constructor(
    private ObjetionTypeS: ObjetionTypeService,
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

  NewObjetionType() {
    this.dialogFormService.open(FormObjetionTypeComponent, {
      context: {
        title: 'Crear nuevo tipo de Objeción',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditObjetionType(data) {
    this.dialogFormService.open(FormObjetionTypeComponent, {
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

  DeleteConfirmObjetionType(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteObjetionType.bind(this),
      },
    });
  }

  DeleteObjetionType(data) {
    return this.ObjetionTypeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

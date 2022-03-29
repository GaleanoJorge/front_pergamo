import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeBriefcaseService } from '../../../business-controller/type-briefcase.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormTypeBriefcaseComponent } from './form-type-briefcase/form-type-briefcase.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-type-briefcase',
  templateUrl: './type-briefcase.component.html',
  styleUrls: ['./type-briefcase.component.scss']
})
export class TypeBriefcaseComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipo de Portafolio';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Nombre'];
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
            'edit': this.EditTypeBriefcase.bind(this),
            'delete': this.DeleteConfirmTypeBriefcase.bind(this),
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
      name: 'Tipo de Portafolio',
      route: '../../setting/type-briefcase',
    },
  ];

  constructor(
    private TypeBriefcaseS: TypeBriefcaseService,
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

  NewTypeBriefcase() {
    this.dialogFormService.open(FormTypeBriefcaseComponent, {
      context: {
        title: 'Crear nuevo tipo de Portafolio',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditTypeBriefcase(data) {
    this.dialogFormService.open(FormTypeBriefcaseComponent, {
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

  DeleteConfirmTypeBriefcase(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteTypeBriefcase.bind(this),
      },
    });
  }

  DeleteTypeBriefcase(data) {
    return this.TypeBriefcaseS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

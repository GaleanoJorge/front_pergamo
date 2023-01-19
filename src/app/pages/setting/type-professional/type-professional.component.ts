import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeProfessionalService } from '../../../business-controller/type-professional.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormTypeProfessionalComponent } from './form-type-professional/form-type-professional.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-type-professional',
  templateUrl: './type-professional.component.html',
  styleUrls: ['./type-professional.component.scss']
})
export class TypeProfessionalComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipo de profesional';
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
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditTypeProfessional.bind(this),
            'delete': this.DeleteConfirmTypeProfessional.bind(this),
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
      name: 'Tipo de profesional',
      route: '../../setting/type-professional',
    },
  ];

  constructor(
    private TypeProfessionalS: TypeProfessionalService,
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

  NewTypeProfessional() {
    this.dialogFormService.open(FormTypeProfessionalComponent, {
      context: {
        title: 'Crear nuevo tipo de profesional',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditTypeProfessional(data) {
    this.dialogFormService.open(FormTypeProfessionalComponent, {
      context: {
        title: 'Editar tipo de profesional',
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

  DeleteConfirmTypeProfessional(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteTypeProfessional.bind(this),
      },
    });
  }

  DeleteTypeProfessional(data) {
    return this.TypeProfessionalS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

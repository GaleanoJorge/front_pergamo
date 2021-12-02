import { Component, OnInit, ViewChild } from '@angular/core';
import { AffiliateTypeService } from '../../../business-controller/affiliate-type.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormAffiliateTypeComponent } from './form-affiliate-type/form-affiliate-type.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-affiliate-type',
  templateUrl: './affiliate-type.component.html',
  styleUrls: ['./affiliate-type.component.scss']
})
export class AffiliateTypeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipo de afiliado';
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
            'edit': this.EditAffiliateType.bind(this),
            'delete': this.DeleteConfirmAffiliateType.bind(this),
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
      name: 'Tipo de afiliado',
      route: '../../setting/affiliate-type',
    },
  ];

  constructor(
    private AffiliateTypeS: AffiliateTypeService,
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

  NewAffiliateType() {
    this.dialogFormService.open(FormAffiliateTypeComponent, {
      context: {
        title: 'Crear nuevo tipo de afiliado',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAffiliateType(data) {
    this.dialogFormService.open(FormAffiliateTypeComponent, {
      context: {
        title: 'Editar tipo de afiliado',
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

  DeleteConfirmAffiliateType(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteAffiliateType.bind(this),
      },
    });
  }

  DeleteAffiliateType(data) {
    return this.AffiliateTypeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

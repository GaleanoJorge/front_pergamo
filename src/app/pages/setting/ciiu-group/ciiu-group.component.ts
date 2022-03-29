import { Component, OnInit, ViewChild } from '@angular/core';
import { CiiuGroupService } from '../../../business-controller/ciiu-group.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCiiuGroupComponent } from './form-ciiu-group/form-ciiu-group.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-ciiu-group',
  templateUrl: './ciiu-group.component.html',
  styleUrls: ['./ciiu-group.component.scss']
})
export class CiiuGroupComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Grupos de clasificación industrial';
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
            'edit': this.EditCiiuGroup.bind(this),
            'delete': this.DeleteConfirmCiiuGroup.bind(this),
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
      name: 'Grupos de clasificación industrial',
      route: '../../setting/ciiu-group',
    },
  ];

  constructor(
    private ciiuGroupS: CiiuGroupService,
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

  NewCiiuGroup() {
    this.dialogFormService.open(FormCiiuGroupComponent, {
      context: {
        title: 'Crear nuevo grupo de clasificación industrial',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCiiuGroup(data) {
    this.dialogFormService.open(FormCiiuGroupComponent, {
      context: {
        title: 'Editar grupos de clasificación industrial',
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

  DeleteConfirmCiiuGroup(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCiiuGroup.bind(this),
      },
    });
  }

  DeleteCiiuGroup(data) {
    return this.ciiuGroupS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

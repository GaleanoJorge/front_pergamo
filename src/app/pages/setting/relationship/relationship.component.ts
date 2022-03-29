import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormRelationshipComponent } from './form-relationship/form-relationship.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { RelationshipService } from '../../../business-controller/relationship.service';


@Component({
  selector: 'ngx-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.scss']
})
export class RelationshipComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Parentesco';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data: any[] = [];

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
            'edit': this.EditRelationship.bind(this),
            'delete': this.DeleteConfirmRelationship.bind(this),
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
      name: 'Parentesco',
      route: '../../setting/relationship',
    },
  ];

  constructor(
    private RelationshipS: RelationshipService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  async ngOnInit(): Promise<void> {
  }

  RefreshData() {

    this.table.refresh();
  }

  NewRelationship() {
    this.dialogFormService.open(FormRelationshipComponent, {
      context: {
        title: 'Crear nuevo parentesco',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditRelationship(data) {
    this.dialogFormService.open(FormRelationshipComponent, {
      context: {
        title: 'Editar parentesco',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmRelationship(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteRelationship.bind(this),
      },
    });
  }

  DeleteRelationship(data) {
    return this.RelationshipS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

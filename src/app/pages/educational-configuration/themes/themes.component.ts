import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemesService } from '../../../business-controller/themes.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormThemesComponent } from './form-themes/form-themes.component';
import { ActionsComponent } from '../../setting/sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Temas';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Descripción', 'Estado'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditThemes.bind(this),
            'delete': this.DeleteConfirmThemes.bind(this),
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
      description: {
        title: this.headerFields[2],
        type: 'string',
      },
      status_id: {
        title: this.headerFields[3],
        type: 'custom',
        width: '10%',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'changeState': this.ChangeState.bind(this),
          };
        },
        renderComponent: StatusFieldComponent,
      },
    },
  };

  public routes = [
    {
      name: 'Temas',
      route: '../../setting/themes',
    },
  ];

  constructor(
    private themeS: ThemesService,
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

  NewThemes() {
    this.dialogFormService.open(FormThemesComponent, {
      context: {
        title: 'Crear nuevo tema',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditThemes(data) {
    this.dialogFormService.open(FormThemesComponent, {
      context: {
        title: 'Editar tema',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    data.status_id = data.status_id === 1 ? 2 : 1;

    this.toastrService.info('', 'Cambiando estado');

    this.themeS.Update(data).then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    }).catch((x) => {
      this.toastrService.danger(x.message);
    });
  }

  DeleteConfirmThemes(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteThemes.bind(this),
      },
    });
  }

  DeleteThemes(data) {
    return this.themeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}


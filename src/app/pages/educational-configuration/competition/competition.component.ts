import { Component, OnInit, ViewChild } from '@angular/core';
import { CompetitionBusinessService } from '../../../business-controller/competition-business.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCompetitionComponent } from './form-competition/form-competition.component';
import { ActionsComponent } from '../../setting/sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Competencias';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Descripción'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
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
            'edit': this.EditCompetition.bind(this),
            'delete': this.DeleteConfirmCompetition.bind(this),
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
    },
  };

  public routes = [
    {
      name: 'Competencias',
      route: '../../setting/competition',
    },
  ];

  constructor(
    private competitionBS: CompetitionBusinessService,
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

  NewCompetition() {
    this.dialogFormService.open(FormCompetitionComponent, {
      context: {
        title: 'Crear nueva competencia',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCompetition(data) {
    this.dialogFormService.open(FormCompetitionComponent, {
      context: {
        title: 'Editar competencia',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }


  DeleteConfirmCompetition(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCompetition.bind(this),
      },
    });
  }

  DeleteCompetition(data) {
    return this.competitionBS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}


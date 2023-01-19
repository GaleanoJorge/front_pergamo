import { Component, OnInit, ViewChild } from '@angular/core';
import { NonWorkingDaysService } from '../../../business-controller/non-working-days.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormNonWorkingDaysComponent } from './form-non-working-days/form-non-working-days.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActionsDaysComponent } from './actions.component';


@Component({
  selector: 'ngx-non-working-days',
  templateUrl: './non-working-days.component.html',
  styleUrls: ['./non-working-days.component.scss']
})
export class NonWorkingDaysComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Dias no laborales';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = 
  [
    'ID',
    'Dia',
    'Descripción',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public dialog;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditNonWorkingDays.bind(this),
            'delete': this.DeleteConfirmNonWorkingDays.bind(this),
          };
        },
        renderComponent: ActionsDaysComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      day: {
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
      name: 'Días no laborales',
      route: '../../setting/non-working-days',
    },
  ];

  constructor(
    private NonWorkingDaysS: NonWorkingDaysService,
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

  NewNonWorkingDays() {
    this.dialogFormService.open(FormNonWorkingDaysComponent, {
      context: {
        title: 'Crear nuevo día no laboral',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditNonWorkingDays(data) {
    this.dialogFormService.open(FormNonWorkingDaysComponent, {
      context: {
        title: 'Editar tipo de profesional',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmNonWorkingDays(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteTypeProfessional.bind(this),
      },
    });
  }

  DeleteTypeProfessional(data) {
    return this.NonWorkingDaysS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

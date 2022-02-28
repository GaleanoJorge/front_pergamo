import { Component, OnInit, ViewChild } from '@angular/core';
import { DietTherapeuticService } from '../../../business-controller/diet-therapeutic.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDietTherapeuticComponent } from './form-diet-therapeutic/form-diet-therapeutic.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { DietTherapeuticComponentService } from '../../../business-controller/diet-therapeutic-component.service';


@Component({
  selector: 'ngx-diet-therapeutic',
  templateUrl: './diet-therapeutic.component.html',
  styleUrls: ['./diet-therapeutic.component.scss']
})
export class DietTherapeuticComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'DIETAS TERAPÉUTICAS';
  public subtitle: string = 'DIETAS TERAPÉUTICAS';
  public headerFields: any[] = ['ID', 'NOMBRE', 'CONSISTENCIA'];
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
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditDietTherapeutic.bind(this),
            'delete': this.DeleteConfirmDietTherapeutic.bind(this),
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
      diet_consistency: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Dietas terapéuticas',
      route: '../../setting/diet-therapeutic',
    },
  ];

  constructor(
    private DietTherapeuticS: DietTherapeuticService,
    private dietTherapeuticComponentS: DietTherapeuticComponentService,
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

  NewDietTherapeutic() {
    this.dialogFormService.open(FormDietTherapeuticComponent, {
      context: {
        title: 'Crear nueva dieta terapéutica',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDietTherapeutic(data) {
    this.dialogFormService.open(FormDietTherapeuticComponent, {
      context: {
        title: 'Editar dieta terapéutica',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmDietTherapeutic(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDietTherapeutic.bind(this),
      },
    });
  }

  DeleteDietTherapeutic(data) {
    return this.DietTherapeuticS.Delete(data.id).then(x => {
      this.table.refresh();
      this.dietTherapeuticComponentS.Delete(data.id);
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

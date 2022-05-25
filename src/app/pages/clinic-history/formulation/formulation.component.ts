import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-formulation',
  templateUrl: './formulation.component.html',
  styleUrls: ['./formulation.component.scss'],
})
export class FormulationComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = [
    'DESCRIPCIÓN',
    'DOSIS',
    'VÍA DE ADMINISTRACIÓN',
    'FRECUENCIA HORARIA ',
    'DÍAS DE TRATAMIENTO',
    'CANT. SOLIC ',
    'OBSERVACIONES',
  ];

  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public loading: boolean = false;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      product_generic: {
        title: this.headerFields[0],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.description;
        },

      dose: {
        title: this.headerFields[1],
        type: 'string',
        },
      },
      administration_route: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },

      },
      hourly_frequency: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      outpatient_formulation: {
        title: this.headerFields[4],
        type: 'string',
      },
      observation: {
        title: this.headerFields[5],
        type: 'string',
      },
    },
  };

  constructor(public userChangeS: UserChangeService) {}

  async ngOnInit() {}

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }
}

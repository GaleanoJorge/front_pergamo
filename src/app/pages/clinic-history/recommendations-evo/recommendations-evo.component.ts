import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { ChEvoSoapService } from '../../../business-controller/ch-evo-soap.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { Actions15Component } from './actions.component';
@Component({
  selector: 'ngx-recommendations-evo',
  templateUrl: './recommendations-evo.component.html',
  styleUrls: ['./recommendations-evo.component.scss'],
})
export class RecommendationsEvoComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record: any;
  @Input() type_record_id: any;
  @Input() has_input: boolean = false;
  @Input() medicine: boolean = false;
  @Input() enfermeryreco: boolean = false;
  @Input() nutrition: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public chreasonconsultation: any[];
  public chvitsigns: any[];
  public nameForm: String;
  public headerFields: any[] = ['Fecha', 'Educación Paciente/Familiar',
    'Recomendación', 'Observación',

  ];
  public movieForm: String;

  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            data: row,
            isNutrition: this.nutrition,
            // assigned: this.assigned_management_plan,
            // user: this.user,
            refresh: this.RefreshData.bind(this),
          };
        },
        renderComponent: Actions15Component,
      },
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform4(value);
        },
      },
      patient_family_education: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value != null) {
            return value;
          } else {
            return 'No'
          }

        },

      },
      recommendations_evo: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value.name;
          } else {
            return 'NO APLICA'
          }

        },
      },
      observations: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction: (value) => {
          if (value == null) {
            return "";
          } else if (this.nutrition) {
            return value.substr(0, 137);
          } else if (this. medicine || this.enfermeryreco) {
            return value;
          }
        },
      },
    },
  };

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe
  ) { }

  async ngOnInit() {
    console.log("Holis")
  }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
      if (this.type_record == 1) {
        this.messageEvent.emit(true);
        this.has_input = true;
      }
    }
  }
}

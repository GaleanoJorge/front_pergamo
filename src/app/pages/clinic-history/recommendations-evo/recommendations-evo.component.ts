import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { ChEvoSoapService } from '../../../business-controller/ch-evo-soap.service';
@Component({
  selector: 'ngx-recommendations-evo',
  templateUrl: './recommendations-evo.component.html',
  styleUrls: ['./recommendations-evo.component.scss'],
})
export class RecommendationsEvoComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public chreasonconsultation: any[];
  public chvitsigns: any[];
  public nameForm: String;
  public headerFields: any[] = [ 'Educación Paciente/Familiar',
    'Recomendación',
    'Análisis',
    'Plan (Diagnostico, Terapeutico, de seguimiento',
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
      patient_family_education: {
        title: this.headerFields[0],
        width: 'string',
      },

      recommendations_evo: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name + '-' + row.recommendations_evo.description;
        },
      },

      analisys: {
        title: this.headerFields[2],
        width: 'string',
      },
      plan: {
        title: this.headerFields[3],
        width: 'string',
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

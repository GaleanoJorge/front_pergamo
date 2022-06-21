import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-language-assessment',
  templateUrl: './language-assessment.component.html',
  styleUrls: ['./language-assessment.component.scss'],
})
export class LanguageAssessmentComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = [
    'Diagnóstico Médico',
    'Diagnóstico Terapéutico',
    'Motivo de la Consulta',
  ];
  
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;
  

  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {

      medical_diagnostic_id: {
        title: this.headerFields[0],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      therapeutic_diagnosis_id: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
       
      },
      reason_consultation: {
        title: this.headerFields[2],
        width: 'string',
      },
     
    },
  };

  constructor(public userChangeS: UserChangeService) {}

  async ngOnInit() {

  }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }
}

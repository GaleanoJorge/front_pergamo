import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-diagnostic-evo',
  templateUrl: './diagnostic-evo.component.html',
  styleUrls: ['./diagnostic-evo.component.scss'],
})
export class DiagnosticEvoComponent implements OnInit {
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
  public headerFields: any[] = ['Fecha','Diagnóstico', 'Clase', 'Tipo', 'Observación'];
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
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform4(value);
        },
	  },
      diagnosis: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      ch_diagnosis_class: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      ch_diagnosis_type: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      diagnosis_observation: {
        title: this.headerFields[4],
        width: 'string',
      }
    },
  };


  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe
  ) {

  }

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
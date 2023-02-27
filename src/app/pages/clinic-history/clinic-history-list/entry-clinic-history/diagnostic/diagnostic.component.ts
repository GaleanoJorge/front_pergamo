import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { BaseTableComponent } from "../../../../components/base-table/base-table.component";
import { FormGroup } from "@angular/forms";
import { Actions2Component } from "./actions.component";
import { UserChangeService } from "../../../../../business-controller/user-change.service";
import { DateFormatPipe } from "../../../../../pipe/date-format.pipe";
import { NbDialogService } from "@nebular/theme";
import { ChDiagnosisService } from "../../../../../business-controller/ch-diagnosis.service";
import { ConfirmDialogComponent } from "../../../../components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'ngx-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss'],
})
export class DiagnosticListComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record_id:any;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  
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
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {

          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'assigned': this.ch_diagnosis,
            'user': this.users,
            'delete': this.DeleteConfirmDiagnosis.bind(this),
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: Actions2Component,
      },

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

  ch_diagnosis: any;
  users: any;

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe,    
    private deleteConfirmService: NbDialogService,
    private chDiagnosisS: ChDiagnosisService,

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
      this.messageEvent.emit(true);
    }
  }

  DeleteConfirmDiagnosis(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteChDiagnosis.bind(this),
      },
    });
  }

  DeleteChDiagnosis(data) {
    return this.chDiagnosisS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
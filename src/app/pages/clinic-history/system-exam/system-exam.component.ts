import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { ChReasonConsultationService } from '../../../business-controller/ch-reason-consultation.service';
import { ChVitalSignsService } from '../../../business-controller/ch-vital-signs.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Actions7Component } from './actions.component';


@Component({
  selector: 'ngx-system-exam',
  templateUrl: './system-exam.component.html',
  styleUrls: ['./system-exam.component.scss'],
})
export class SystemExamComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record_id: any;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['Fecha', 'Lista', 'Revisión', 'Observación'];

  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public block: any = false;
  public count: number = 0;
  public loading: boolean = false;
  public user;
  public dialog;


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
            'user': this.user,
            'refresh': this.RefreshData.bind(this),
            'closeDialog': this.closeDialog.bind(this),
          };
        },
        renderComponent: Actions7Component,
      },

      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform4(value);
        },
      },

      type_ch_system_exam: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      revision: {
        title: this.headerFields[2],
        width: 'string',
      },
      observation: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction(value, row) {
          // this.count = this.count+1;
          if (value) {
            return value;
          } else {
            return 'NO APLICA'
          }
        },
      },
    },
  };

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe,
  ) {
  }

  async ngOnInit() {
  }

  closeDialog() {
    this.dialog.close();
  }

  RefreshData() {
    this.table.refresh();
  }

  ngOnchange(changes: SimpleChanges) {
    if (changes.count) {
      this.block = true;
    }
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
      this.messageEvent.emit(true);
    }
  }
}


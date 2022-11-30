import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { ChReasonConsultationService } from '../../../business-controller/ch-reason-consultation.service';
import { ChVitalSignsService } from '../../../business-controller/ch-vital-signs.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';


@Component({
  selector: 'ngx-nursing-physical-exam',
  templateUrl: './nursing-physical-exam.component.html',
  styleUrls: ['./nursing-physical-exam.component.scss'],
})
export class NursingPhysicalExamComponent implements OnInit {
  @Input() data: any = null;
  @Input() enfermery: any = null;
  @Input() record_id: any;
  @Input() has_input: boolean = false;
  @Input() type_record_id: any;
  @Output() messageEvent = new EventEmitter<any>();

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  linearMode = false;

  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['Fecha','Lista', 'Revisión'];

  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;
  public tableData: any = null;

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
          return this.datePipe.transform2(value);
        },
      },
      type_ch_physical_exam: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name + ' - Observación: ' + row.description;
        },
      },
      revision: {
        title: this.headerFields[2],
        width: 'string',
      },
    },
  };

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe,
  ) {
  }

  async ngOnInit() {
    console.log(this.has_input)
  }

  RefreshData() {
    this.table.refresh();
  }
  

  // ngAfterViewChecked(){
  //   this.tableData = this.table.source.data.length == 0 ? null: this.table.source.data;
  // }

  receiveMessage($event) {
    if (this.type_record_id == 1) {
      this.messageEvent.emit($event);
    }
    if($event==true){
      this.RefreshData();
    }
  }
}


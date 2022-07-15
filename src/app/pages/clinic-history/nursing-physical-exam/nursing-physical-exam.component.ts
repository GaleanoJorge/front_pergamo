import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { ChReasonConsultationService } from '../../../business-controller/ch-reason-consultation.service';
import { ChVitalSignsService } from '../../../business-controller/ch-vital-signs.service';


@Component({
  selector: 'ngx-nursing-physical-exam',
  templateUrl: './nursing-physical-exam.component.html',
  styleUrls: ['./nursing-physical-exam.component.scss'],
})
export class NursingPhysicalExamComponent implements OnInit {
  @Input() data: any = null;
  @Input() enfermery: any = null;
  @Input() record_id: any;
  @Input() type_record_id: any;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  linearMode = false;

  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['Lista', 'Revisión'];

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
      type_ch_physical_exam: {
        title: this.headerFields[0],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name + ' - Observación: ' + row.description;
        },
      },
      revision: {
        title: this.headerFields[1],
        width: 'string',
      },
    },
  };

  constructor(
    public userChangeS: UserChangeService,
  ) {
  }

  async ngOnInit() {
  }

  RefreshData() {
    this.table.refresh();
  }
  

  // ngAfterViewChecked(){
  //   this.tableData = this.table.source.data.length == 0 ? null: this.table.source.data;
  // }

  receiveMessage($event) {
    if($event==true){
      this.RefreshData();
    }
  }
}


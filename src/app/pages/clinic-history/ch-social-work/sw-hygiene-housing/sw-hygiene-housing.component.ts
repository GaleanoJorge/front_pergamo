
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-sw-hygiene-housing',
  templateUrl: './sw-hygiene-housing.component.html',
  styleUrls: ['./sw-hygiene-housing.component.scss'],
})
export class ChSwHygieneHousingComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();


  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Aseo', 'Iluminación', 'Ventilación', 'Plagas',  'Sanitario',  'Lugar de basuras'];
  public routes = [];
  public loading: boolean = false;
  public saved: any = null;
  public isSubmitted = false;
  public all_changes: any[];
  public saveEntry: any = 0;


  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },

    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform2(value);
        },
      },
      cleanliness: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return 'Condición: ' + (row.cleanliness != null ? row.cleanliness + '  ' : "")
            + 'Observación: ' + (row.obs_cleanliness != null ? row.obs_cleanliness + '' + '  ' : "")

            ;
        },
      },
      illumination: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return 'Condición: ' + (row.illumination != null ? row.illumination + '  ' : "")
            + 'Observación: ' + (row.obs_illumination != null ? row.obs_illumination + '' + '  ' : "")

            ;
        },
      },
      ventilation: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return 'Condición: ' + (row.ventilation != null ? row.ventilation + '  ' : "")
            + 'Observación: ' + (row.obs_ventilation != null ? row.obs_ventilation + '' + '  ' : "")

            ;
        },
      },
      pests: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return 'Condición: ' + (row.pests != null ? row.pests + '  ' : "")
            + 'Observación: ' + (row.obs_pests != null ? row.obs_pests + '' + '  ' : "")

            ;
        },
      },
      sanitary: {
        title: this.headerFields[5],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return 'Condición: ' + (row.sanitary != null ? row.sanitary + '  ' : "")
            + 'Observación: ' + (row.obs_sanitary != null ? row.obs_sanitary + '' + '  ' : "")

            ;
        },
      },
      trash: {
        title: this.headerFields[6],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return 'Condición: ' + (row.trash != null ? row.trash + '  ' : "")
            + 'Observación: ' + (row.obs_trash != null ? row.obs_trash + '' + '  ' : "")

            ;
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

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
      if (this.type_record_id == 1) {
        this.messageEvent.emit(true);
      }
    }
  }
}
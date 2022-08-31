import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-past-ot',
  templateUrl: './table-past-ot.component.html',
  styleUrls: ['./table-past-ot.component.scss']
})
export class TablePastOTComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['NUCLEO FAMILIAR', 
                                'NUCLEO HIJOS',
                                'OBSERVACIONES', 
                                'NIVEL ACADEMICO',
                                'ESTADO NIVEL ACADEMICO', 
                                'OBSERVACIONES',
                                'TRATAMIENTO TERAPEUTICO',
                                'OBSERVACION',
                                'FUMA?', 
                                'CONSTANCIA',
                                'CONSUME ALCOHOL?',
                                'CONSTANCIA', 
                                'PRACTICA DEPORTE?',
                                'CONSTANCIA',
                                'CUAL DEPORTE PRACTICA?',
                                'OBSERVACIONES',];

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

      mother: {
        title: this.headerFields[0],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return (row.mother != null ? row.mother  + ' ' : "") 
          + (row.dad != null ?  row.dad  + ' ' : "")
          + (row.spouse != null ?  row.spouse  + ' ' : "")
          + (row.sons != null ?  row.sons  + ' ' : "")
          + (row.uncles != null ?  row.uncles  + ' ' : "")
          + (row.grandparents != null ?  row.grandparents  + ' ' : "")
          + (row.others != null ?  row.others  + ' ' : "")
          ;
        },
      },

      number_childrens: {
        title: this.headerFields[1],
        width: 'string',
      },

      observation_family_struct: {
        title: this.headerFields[2],
        width: 'string',
      },
      academy: {
        title: this.headerFields[3],
        width: 'string',
      },

      level_academy: {
        title: this.headerFields[4],
        width: 'string',
      },
      observation_schooling_training: {
        title: this.headerFields[5],
        width: 'string',
      },

      terapy: {
        title: this.headerFields[6],
        width: 'string',
      },
      observation_terapy: {
        title: this.headerFields[7],
        width: 'string',
      },

      smoke: {
        title: this.headerFields[8],
        width: 'string',
      },

      f_smoke: {
        title: this.headerFields[9],
        width: 'string',
      },
      alcohol: {
        title: this.headerFields[10],
        width: 'string',
      },

      f_alcohol: {
        title: this.headerFields[11],
        width: 'string',
      },
      sport: {
        title: this.headerFields[12],
        width: 'string',
      },

      f_sport: {
        title: this.headerFields[13],
        width: 'string',
      },
      sport_practice_observation: {
        title: this.headerFields[14],
        width: 'string',
      },

      observation: {
        title: this.headerFields[15],
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

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }
}


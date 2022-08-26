import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-language-linguistic',
  templateUrl: './language-linguistic.component.html',
  styleUrls: ['./language-linguistic.component.scss'],
})
export class LanguageLinguisticComponent implements OnInit {
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
    'Fonético/Fonológico',
    'Sintáctico',
    'Morfosintáctico',
    'Semántico',
    'Pragmático',
    'Recepción',
    'Codificación',
    'Decodificación',
    'Producción',
    'Observaciones'
  ];

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
      phonetic_phonological: {
        title: this.headerFields[0],
        width: 'string',
      },
      syntactic: {
        title: this.headerFields[1],
        width: 'string',
      },
      morphosyntactic: {
        title: this.headerFields[2],
        width: 'string',
      },
      semantic: {
        title: this.headerFields[3],
        width: 'string',
      },
      pragmatic: {
        title: this.headerFields[4],
        width: 'string',
      },
      reception: {
        title: this.headerFields[5],
        width: 'string',
      },
      coding: {
        title: this.headerFields[6],
        width: 'string',
      },
      decoding: {
        title: this.headerFields[7],
        width: 'string',
      },
      production: {
        title: this.headerFields[8],
        width: 'string',
      },
      observations: {
        title: this.headerFields[9],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value;
          } else {
            return 'NO APLICA'
          }
        }
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

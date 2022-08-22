import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-language-speech',
  templateUrl: './language-speech.component.html',
  styleUrls: ['./language-speech.component.scss'],
})
export class LanguageSpeechComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = [
    'Respiración ',
    'Articulación',
    'Resonancia ',
    'Fluidez ',
    'Prosodia',
    'Observaciones',
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
      breathing: {
        title: this.headerFields[0],
        width: 'string',
        
      },
      joint: {
        title: this.headerFields[1],
        width: 'string',
      },
      resonance: {
        title: this.headerFields[2],
        width: 'string',
      },
      fluency: {
        title: this.headerFields[3],
        width: 'string',
      },
      prosody: {
        title: this.headerFields[4],
        width: 'string',
      },
      observations: {
        title: this.headerFields[5],
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
      if (this.type_record_id == 1) {
        this.messageEvent.emit(true);
      }
    }
  }
}

import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-language-communication',
  templateUrl: './language-communication.component.html',
  styleUrls: ['./language-communication.component.scss'],
})
export class LanguageCommunicationComponent implements OnInit {
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
    'Contacto Visual',
    'Normas De Cortesía',
    'Intención Comunicativa',
    'Propósito Comunicativo',
    'Modalidad Verbal Oral',
    'Modalidad Verbal Escrita',
    'Modalidad No Verbal- No Simbólica',
    'Modalidad No Verbal - Simbólica',
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

      eye_contact: {
        title: this.headerFields[0],
        width: 'string',
      },
      courtesy_rules: {
        title: this.headerFields[1],
        width: 'string',
       
      },
      communicative_intention: {
        title: this.headerFields[2],
        width: 'string',
      },
      communicative_purpose: {
        title: this.headerFields[3],
        width: 'string',
      },
      oral_verb_modality: {
        title: this.headerFields[4],
        width: 'string',
      },
      written_verb_modality: {
        title: this.headerFields[5],
        width: 'string',
       
      },
      nonsymbolic_nonverbal_modality: {
        title: this.headerFields[6],
        width: 'string',
      },
      symbolic_nonverbal_modality: {
        title: this.headerFields[7],
        width: 'string',
      },
      observations: {
        title: this.headerFields[8],
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

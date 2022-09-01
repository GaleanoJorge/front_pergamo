import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { ChEvoSoapService } from '../../../business-controller/ch-evo-soap.service';
@Component({
  selector: 'ngx-recommendations-evo',
  templateUrl: './recommendations-evo.component.html',
  styleUrls: ['./recommendations-evo.component.scss'],
})
export class RecommendationsEvoComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record: any;
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
  public headerFields: any[] = [ 'Educación Paciente/Familiar',
    'Recomendación', 'Observación',
  
  ];
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
      patient_family_education: {
        title: this.headerFields[0],
        width: 'string',
      },

      recommendations_evo: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          if(value){
            return value.name ; 
            }else{
              return 'NO APLICA'
            }
          
        },
      },
      observations: {
        title: this.headerFields[2],
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
      if (this.type_record == 1) {
        this.messageEvent.emit(true);
      }
    }
  }
}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-language-orofacial',
  templateUrl: './language-orofacial.component.html',
  styleUrls: ['./language-orofacial.component.scss'],
})
export class LanguageOrofacialComponent implements OnInit {
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
    'Simetría Derecho',	'Tono Derecho',	'Sensibilidad Derecho', 'Simetría Izquierdo', 'Tono Izquierdo', 'Sensibilidad Izquierdo'
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

      right_hermiface_symmetry: {
        title: this.headerFields[0],
        width: 'string',
      },
      right_hermiface_tone: {
        title: this.headerFields[1],
        width: 'string',
       
      },
      right_hermiface_sensitivity: {
        title: this.headerFields[2],
        width: 'string',
      },
      left_hermiface_symmetry: {
        title: this.headerFields[3],
        width: 'string',
      },
      left_hermiface_tone: {
        title: this.headerFields[4],
        width: 'string',
      },
      left_hermiface_sensitivity: {
        title: this.headerFields[5],
        width: 'string',
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
    }
  }
}

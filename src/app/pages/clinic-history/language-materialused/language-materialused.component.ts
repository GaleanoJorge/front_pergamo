import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-language-materialused',
  templateUrl: './language-materialused.component.html',
  styleUrls: ['./language-materialused.component.scss'],
})
export class LanguageMaterialusedComponent implements OnInit {
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
    'Elementos De Bioseguridad',
    'Materiales Didácticos',
    'Alimentos Y Líquidos',
    'Material De Papelería',
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

      biosecurity_elements: {
        title: this.headerFields[0],
        width: 'string',
      },
      didactic_materials: {
        title: this.headerFields[1],
        width: 'string',
       
      },
      liquid_food: {
        title: this.headerFields[2],
        width: 'string',
      },
      stationery: {
        title: this.headerFields[2],
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

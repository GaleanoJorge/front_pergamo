import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-r-n-materials-ot',
  templateUrl: './r-n-materials-ot.component.html',
  styleUrls: ['./r-n-materials-ot.component.scss']
})
export class RNMaterialsOTComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['Fecha','Nota1', 'Nota2', 'Nota3', 'Nota4', 'Nota5', 'Nota5', 'Nota7', 'Nota8', 'Nota9', 'Nota10'];

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

      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
        },

      check1_cognitive: {
        title: this.headerFields[1],
        width: 'string',

      },
      
      check2_colors: {
        title: this.headerFields[2],
        width: 'string',

      },
      check3_elements: {
        title: this.headerFields[3],
        width: 'string',
      },
   
      check4_balls: {
        title: this.headerFields[4],
        width: 'string',

      },
      check5_material_paper: {
        title: this.headerFields[5],
        width: 'string',
      },
      
      check6_material_didactic: {
        title: this.headerFields[6],
        width: 'string',

      },
      check7_computer: {
        title: this.headerFields[7],
        width: 'string',
      },
    
      check8_clay: {
        title: this.headerFields[8],
        width: 'string',

      },
      check9_colbon: {
        title: this.headerFields[9],
        width: 'string',
      },
      check10_pug: {
        title: this.headerFields[10],
        width: 'string',
      },


    },
  };

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe
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



import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-ps-awareness',
  templateUrl: './ps-awareness.component.html',
  styleUrls: ['./ps-awareness.component.scss'],
})
export class PsAwarenessComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;
  @Input() type_record_id: any = null;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();


  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = [
    'Fecha', 
    'Alerta o Vigil',
    'Hipervigilante',
    'Obnubilación o somnolencia',
    'En confusión mental',
    'En delirium',
    'En estado oniroide',
    'En estado crepuscular (automatismo o fugas ictales)',
    'Estupor o sopor',
    'En coma superficial',
    'En coma profundo',
    'Apariencia, Porte',
    'Actitud'

  ];
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
  
    watch: {
      title: this.headerFields[1],
      width: 'string',
 
    },
    hypervigilant: {
      title: this.headerFields[2],
      width: 'string',
   
    },
    obtundation: {
      title: this.headerFields[3],
      width: 'string',
   
    },
    confusion: {
      title: this.headerFields[4],
      width: 'string',
   
    },
    
    delirium: {
      title: this.headerFields[5],
      width: 'string',
    
    },
    oneiroid: {
      title: this.headerFields[6],
      width: 'string',

    },
    twilight: {
      title: this.headerFields[7],
      width: 'string',
  
    },
    stupor: {
      title: this.headerFields[8],
      width: 'string',
  
    },
    shallow: {
      title: this.headerFields[9],
      width: 'string',
     
    },
    deep: {
      title: this.headerFields[10],
      width: 'string',
      
    },
    appearance: {
      title: this.headerFields[11],
      width: 'string',
      valuePrepareFunction(value, row) {
          if (value) {
            return value;
          } else {
            return 'NO APLICA'
          }
        }     
      
    },
    attitude: {
      title: this.headerFields[12],
      width: 'string',
      valuePrepareFunction(value, row) {
          if (value) {
            var a =  value.replace(/[["]+/g, '');
            var b = a.replace(/]+/g,'');
            return (b.replace(/,+/g,', '));
          } else {
            return 'NO APLICA'
          }
        }     
      
    },
  }
}



  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe,
    private currency: CurrencyPipe,
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
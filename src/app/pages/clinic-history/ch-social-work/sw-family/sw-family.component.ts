
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TemperatureHumidityData } from '../../../../@core/data/temperature-humidity';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-sw-family',
  templateUrl: './sw-family.component.html',
  styleUrls: ['./sw-family.component.scss'],
})
export class SwFamilyComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;


  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Parentesco', 'Nombre completo', 'Apellidos', 'Tipo de documento', 'Número de identificación',
    'Rango de edad', 'Estado civil', 'Nivel Académico', 'Estado', 'Profesión',
    'Números de contacto', 'Correo electrónico', 'Discapacidad', 'Tipo de discapacidad', 'Cuidador Principal', 
    'Dirección'];
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
      relationship: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction: (value) => {
          return value.name;
        },
      },

      firstname: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return (row.firstname != null ? row.firstname + ' ' : "")
            + (row.middlefirstname != null ? row.middlefirstname : "")
            ;
        },
      },
      lastname: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return (row.lastname != null ? row.lastname + ' ' : "")
            + (row.middlelastname != null ? row.middlelastname : "")
            ;
        },
      },
      identification_type: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction(value,) {
          return value.code;
        },
      },
      identification: {
        title: this.headerFields[5],
        width: 'string',
      },
      range_age: {
        title: this.headerFields[6],
        width: 'string',
      },
      marital_status: {
        title: this.headerFields[7],
        width: 'string',
        valuePrepareFunction(value,) {
          return value.name;
        },
      },
      academic_level: {
        title: this.headerFields[8],
        width: 'string',
        valuePrepareFunction(value,) {
          return value.name;
        },
      },
      study_level_status: {
        title: this.headerFields[9],
        width: 'string',
        valuePrepareFunction(value,) {
          return value.name;
        },
      },
      activities: {
        title: this.headerFields[10],
        width: 'string',
        valuePrepareFunction(value,) {
          return value.name;
        },
      },
      phone: {
        title: this.headerFields[11],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return (row.phone != null ? row.phone + ' - ' : "")
            + (row.landline != null ? row.landline : "")
            ;
        },
      },
      email: {
        title: this.headerFields[12],
        width: 'string',
      },
      is_disability: {
        title: this.headerFields[13],
        width: 'string',
        valuePrepareFunction(value) {
          if (value == true) {
            return 'Si';
          } else {
            return 'No'
          }
        },
      },

      inability: {
        title: this.headerFields[14],
        width: 'string',
        valuePrepareFunction(value) {
          if(value){
            return value.name ; 
            }else{
              return 'NO APLICA'
            }
          
        },
      },
      carer: {
        title: this.headerFields[15],
        width: 'string',
        valuePrepareFunction(value) {
          if (value == 1) {
            return 'Si';
          } else {
            return 'No'
          }
        },
      },

      residence_address: {
        title: this.headerFields[16],
        width: 'string',
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
    }
  }
}
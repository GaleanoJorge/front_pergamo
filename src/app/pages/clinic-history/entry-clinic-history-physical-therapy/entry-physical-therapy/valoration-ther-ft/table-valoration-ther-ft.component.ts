import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-valoration-ther-ft',
  templateUrl: './table-valoration-ther-ft.component.html',
  styleUrls: ['./table-valoration-ther-ft.component.scss']
})
export class TableValorationTherFTComponent implements OnInit {
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
  public headerFields: any[] = ['¿Ha recibido tratamiento fisioterapéutico por la enfermedad que consulta o es remitido?',
                                '¿Hace ejercicio más allá de las actividades diarias?',
                                'Observaciones',
                                'En promedio, ¿Cuantos días por semana realiza ejercicio? ',
                                'En promedio, ¿Cuántos minutos al día realiza ejercicio? ',];

  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns:
     {
      illness:
       {
          title: this.headerFields[0],
          width: 'string',
       }, 
      
      sports:
       {
          title: this.headerFields[1],
          width: 'string',
       },
       
       obsertations:
       {
          title: this.headerFields[2],
          width: 'string',
       }, 

       days_number:
       {
          title: this.headerFields[3],
          width: 'string',
       }, 

       minutes_number:
       {
          title: this.headerFields[4],
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
      if (this.type_record_id == 1) {
        this.messageEvent.emit(true);
      }
    }
  }
}


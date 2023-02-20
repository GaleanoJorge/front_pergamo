import { Component, OnInit, ViewChild } from '@angular/core';
import { Actions2Component } from './actions.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { ActionsFileComponent } from './actions-file.component';
import { ActionsSemaphoreComponent } from './actions-semaphore.component';

@Component({
  selector: 'ngx-laboratory-list',
  templateUrl: './laboratory-list.component.html',
  styleUrls: ['./laboratory-list.component.scss'],
})
export class LaboratoryListComponent implements OnInit {

  public isSubmitted = false;
  public entity: string = 'ch_laboratory';
  public category_id: number = null;
  public messageError: string = "Parece que no cuenta con laboratorios en este momento";
  public title: string = 'Laboratorios';
  public subtitle: string = 'Lista de laboratorios';
  public headerFields: any[] = ['Nombre completo', 'Edad', 'Identificación', 'Laboratorio', 'Estado', 'Archivo', 'Fecha en que se ordenó', 'Fecha en que se tomó', 'Fecha de envío', 'Fecha de recepción', 'Fecha de interpretación', 'Observación de orden', 'Observación de toma', 'Observación de envío', 'Observación de recepción', 'Observación de interpretación'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];

  public semaphore = [
    { id: (0+1), color: "#FF7000", name: "Laboratorio ordenado" },
    { id: (1+1), color: "#FFFF00", name: "Laboratorio tomado" },
    { id: (2+1), color: "#7A39BB", name: "Laboratorio enviado" },
    { id: (3+1), color: "#0000FF", name: "Laboratorio recibido" },
    { id: (4+1), color: "#28B463", name: "Laboratorio interpretado" }
  ];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      semaphore: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
          };
        },
        renderComponent: ActionsSemaphoreComponent,
      },
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'refreshData': this.refreshData.bind(this)
          };
        },
        renderComponent: Actions2Component,
      },
      'medical_order.ch_record.admissions.patients.nombre_completo': {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          this.messageError = null;
          return row.medical_order.ch_record.admissions.patients.nombre_completo;
        },
      },
      'medical_order.ch_record.admissions.patients.age': {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.medical_order.ch_record.admissions.patients.age;
        },
      },
      'medical_order.ch_record.admissions.patients.identification': {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.medical_order.ch_record.admissions.patients.identification;
        },
      },
      'medical_order.services_briefcase.manual_price.procedure.name': {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.medical_order.services_briefcase.manual_price.procedure.name;
        },
      },
      'laboratory_status.name': {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.laboratory_status.name;
        },
      },
      file: {
        title: this.headerFields[5],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
          };
        },
        renderComponent: ActionsFileComponent,
      },
      'user_ch_laboratory_ordered': {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          let userChLaboratory = row.user_ch_laboratory.find(element => element.laboratory_status_id == 1);
          if(userChLaboratory){
            return this.datePipe.transform(userChLaboratory.created_at);
          }
          return "NO APLICA";
        },
      },
      'ordered_observation': {
        title: this.headerFields[11],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          let userChLaboratory = row.user_ch_laboratory.find(element => element.laboratory_status_id == 1);
          if(userChLaboratory && userChLaboratory.observation && userChLaboratory.observation != ''){
            return userChLaboratory.observation;
          }
          return "NO APLICA";
        },
      },
      'user_ch_laboratory_taken': {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          let userChLaboratory = row.user_ch_laboratory.find(element => element.laboratory_status_id == 2);
          if(userChLaboratory){
            return this.datePipe.transform(userChLaboratory.created_at);
          }
          return "NO APLICA";
        },
      },
      'taken_observation': {
        title: this.headerFields[12],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          let userChLaboratory = row.user_ch_laboratory.find(element => element.laboratory_status_id == 2);
          if(userChLaboratory && userChLaboratory.observation && userChLaboratory.observation != ''){
            return userChLaboratory.observation;
          }
          return "NO APLICA";
        },
      },
      'user_ch_laboratory_sent': {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          let userChLaboratory = row.user_ch_laboratory.find(element => element.laboratory_status_id == 3);
          if(userChLaboratory){
            return this.datePipe.transform(userChLaboratory.created_at);
          }
          return "NO APLICA";
        },
      },
      'sent_observation': {
        title: this.headerFields[13],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          let userChLaboratory = row.user_ch_laboratory.find(element => element.laboratory_status_id == 3);
          if(userChLaboratory && userChLaboratory.observation && userChLaboratory.observation != ''){
            return userChLaboratory.observation;
          }
          return "NO APLICA";
        },
      },
      'user_ch_laboratory_received': {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          let userChLaboratory = row.user_ch_laboratory.find(element => element.laboratory_status_id == 4);
          if(userChLaboratory){
            return this.datePipe.transform(userChLaboratory.created_at);
          }
          return "NO APLICA";
        },
      },
      'received_observation': {
        title: this.headerFields[14],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          let userChLaboratory = row.user_ch_laboratory.find(element => element.laboratory_status_id == 4);
          if(userChLaboratory && userChLaboratory.observation && userChLaboratory.observation != ''){
            return userChLaboratory.observation;
          }
          return "NO APLICA";
        },
      },
      'user_ch_laboratory_interpreted': {
        title: this.headerFields[10],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          let userChLaboratory = row.user_ch_laboratory.find(element => element.laboratory_status_id == 5);
          if(userChLaboratory){
            return this.datePipe.transform(userChLaboratory.created_at);
          }
          return "NO APLICA";
        },
      },
      'interpreted_observation': {
        title: this.headerFields[15],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          let userChLaboratory = row.user_ch_laboratory.find(element => element.laboratory_status_id == 5);
          if(userChLaboratory && userChLaboratory.observation && userChLaboratory.observation != ''){
            return userChLaboratory.observation;
          }
          return "NO APLICA";
        },
      },
    },
  };

  public routes = [
    {
      name: 'Laboratorios',
      route: '../list',
    },
  ];

  public refreshData(){
    this.table.refresh();
  }

  constructor(

    private datePipe: DateFormatPipe,

  ) {
  }

  ngOnInit(): void {

  }

  changeSemaphore($event: any) {
    this.table.changeEntity(`${this.entity}?semaphore=${$event}`, "laboratories");
  }

}

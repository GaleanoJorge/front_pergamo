import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActionsComponentSesion } from './actionssesion.component';

@Component({
  selector: 'ngx-my-sesion',
  templateUrl: './my-sesion.component.html',
  styleUrls: ['./my-sesion.component.scss']
})
export class MySesionComponent implements OnInit {
  public group_id;
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Sesiones';
  public subtitle: string = 'Gestión';
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      name: {
        title: 'Nombre',
        type: 'string',
      },
      session_date: {
        title: 'Fecha',
        type: 'string',
      },
      start_time: {
        title: 'Inicio',
        type: 'string',
      },
      closing_time: {
        title: 'Salida',
        type: 'string',
      },
      module: {
        title: 'Modulo',
        type: 'string',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent

          return value.name;
        },
      },
      actions: {
        title: 'Opciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent

          return {
            'data': row,
            // 'edit': this.EditSubarea.bind(this),
            // 'delete': this.DeleteConfirmSubarea.bind(this),
          };
        },
        renderComponent: ActionsComponentSesion,
      },
    },
  };
  constructor(

  ) { }

  ngOnInit(): void {

  }

}

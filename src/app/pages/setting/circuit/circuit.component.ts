import {Component, OnInit, ViewChild} from '@angular/core';
import {CircuitService} from '../../../business-controller/circuit.service';
import {StatusFieldComponent} from '.././sectional-council/status-field.component';
import {NbToastrService, NbDialogService} from '@nebular/theme';
import {FormCircuitComponent} from './form-circuit/form-circuit.component';
import {ActionsComponent} from '.././sectional-council/actions.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {BaseTableComponent} from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.scss'],
})
export class CircuitComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Circuitos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Distrito', 'Estado'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditCircuit.bind(this),
            'delete': this.DeleteConfirmCircuit.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      district: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value) {
          return value.name;
        },
      },
      status_id: {
        title: this.headerFields[3],
        type: 'custom',
        width: '10%',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'changeState': this.ChangeState.bind(this),
          };
        },
        renderComponent: StatusFieldComponent,
      },
    },
  };

  public routes = [
    {
      name: 'Circuito',
      route: '../../setting/circuit',
    },
  ];

  constructor(
    private circuitS: CircuitService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {
    this.table.refresh();
  }

  NewCircuit() {
    this.dialogFormService.open(FormCircuitComponent, {
      context: {
        title: 'Crear nuevo circuito',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCircuit(data) {
    this.dialogFormService.open(FormCircuitComponent, {
      context: {
        title: 'Editar circuito',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    data.status_id = data.status_id === 1 ? 2 : 1;

    this.toastrService.info('', 'Cambiando estado');

    this.circuitS.Update(data).then((x) => {
      this.toastrService.success('', x.message);
      this.table.refresh();
    }).catch((x) => {
      this.toastrService.danger(x.message);
    });
  }

  DeleteConfirmCircuit(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCircuit.bind(this),
      },
    });
  }

  DeleteCircuit(data) {
    return this.circuitS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

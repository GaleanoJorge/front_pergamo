import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionsConceptBaseComponent} from './actions-concept-base.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import {NbDialogService} from '@nebular/theme';
import {ConceptBaseBusinessService} from '../../../business-controller/concept-base-business.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'ngx-concept-base',
  templateUrl: './concept-base.component.html',
  styleUrls: ['./concept-base.component.scss'],
})
export class ConceptBaseComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Conceptos';
  public subtitle: string = 'Presupuesto';

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            // 'edit': this.EditSectional.bind(this),
            'delete': this.DeleteConfirmConcept.bind(this),
          };
        },
        renderComponent: ActionsConceptBaseComponent,
      },
      concepto: {
        title: 'Nombre',
        type: 'string',
      },
      tipo: {
        title: 'Tipo',
        type: 'string',
      },
      ciudad: {
        title: 'Ciudad',
        type: 'string',
      },
      'concept.validity_id': {
        title: 'Vigencia',
        type: 'string',
        valuePrepareFunction(value, data) {
          return data.vigencia;
        },
        sortDirection: 'desc',
      },
      unit_value: {
        title: 'Valor',
        valuePrepareFunction: (value, data) => {
          return this.currency.transform(value);
        },
      },
    },
  };

  public routes = [
    {
      name: 'Conceptos',
      route: '/pages/budget/concepts',
    },
  ];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private dialogFormService: NbDialogService,
    private conceptBaseBS: ConceptBaseBusinessService,
    private currency: CurrencyPipe,
  ) {
  }

  ngOnInit(): void {
  }

  DeleteConfirmConcept(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteConcept.bind(this),
      },
    });
  }

  DeleteConcept(data) {
    return this.conceptBaseBS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

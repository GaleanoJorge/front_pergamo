import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import {NbToastrService, NbDialogService} from '@nebular/theme';
import {ActionsScalesComponent} from './actionsScales.component';
import {AnswerTypeService} from '../../../business-controller/answer-type.service';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.scss'],
})
export class ScalesComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public messageError: string = null;
  public title: string = 'Escalas';
  public subtitle: string = '';
  public data = [];
  public headerFields: any[] = ['Nombre', 'Escala'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;

  public routes = [
    {
      name: 'Escalas',
      route: '/pages/pollconfiguration/scales',
    },
  ];

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'delete': this.DeleteConfirmAnswerType.bind(this),
          };
        },
        renderComponent: ActionsScalesComponent,
      },
      name: {
        title: this.headerFields[0],
        type: 'string',
      },
      answer_type: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          let text = '';
          for (let i = 0; i < row.answers.length; i++) {
            text += ' ' + row.answers[i].name + ',';
          }
          text = text.slice(0, 30);
          if (text.length === 30) {
            text += '...';
          }
          return text;
        },
      },
    },
  };

  constructor(
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private answerTS: AnswerTypeService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  DeleteConfirmAnswerType(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteAnswerType.bind(this),
      },
    });
  }

  DeleteAnswerType(data) {
    return this.answerTS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

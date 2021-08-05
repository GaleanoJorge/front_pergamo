import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActionsOrderComponent} from '../sections/actionsOrder.component';
import {ActionsComponent} from '../../setting/sectional-council/actions.component';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {OriginBusinessService} from '../../../business-controller/origin-business.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {AnswerQuestionService} from '../../../business-controller/answer-question.service';
import {AnswerService} from '../../../business-controller/answer.service';
import {FormAnswerComponent} from './form-answer/form-answer.component';

@Component({
  selector: 'ngx-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {
  @Input() question_id = null;
  public messageError = null;
  public title = 'Respuestas';

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditAnswer.bind(this),
            'delete': this.DeleteConfirmAnswer.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      name: {
        title: 'Respuesta',
        type: 'string',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return row.answer.name;
        },
      },
      value: {
        title: 'Valor',
        type: 'string',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return row.answer.value;
        },
      },
      order: {
        title: 'Orden',
        type: 'custom',
        width: '10%',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent

          return {
            'data': row,
            'up': this.up.bind(this),
            'down': this.down.bind(this),
          };
        },
        renderComponent: ActionsOrderComponent,
      },
    },
  };

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private originBS: OriginBusinessService,
    private toastrService: NbToastrService,
    private deleteConfirmService: NbDialogService,
    private dialogFormService: NbDialogService,
    private answerQS: AnswerQuestionService,
    private answerS: AnswerService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {
    this.table.refresh();
  }

  DeleteConfirmAnswer(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.answer.name,
        data: data,
        delete: this.DeleteAnswer.bind(this),
      },
    });
  }

  DeleteAnswer(data) {
    if (data.answer_type_id == null) {
      return this.answerQS.Delete(data.id).then(x => {
        return this.answerS.Delete(data.answer.id).then(y => {
          this.table.refresh();
          return Promise.resolve(y.message);
        }).catch(y => {
          throw y;
        });
      }).catch(x => {
        throw x;
      });
    } else {

    }

  }

  NewAnswer() {
    this.dialogFormService.open(FormAnswerComponent, {
      context: {
        title: 'Agregar respuesta',
        saved: this.RefreshData.bind(this),
        answer_type_id: null,
        question_id: this.question_id,
      },
    });
  }

  EditAnswer(data) {
    this.dialogFormService.open(FormAnswerComponent, {
      context: {
        title: 'Editar respuesta',
        data: data.answer,
        saved: this.RefreshData.bind(this),
        answer_type_id: data.answer.answer_type_id,
        question_id: this.question_id,
      },
    });
  }

  up(data) {
    this.answerQS.ChangeOrder(data.id, 'up').then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    }).catch((x) => {
      this.toastrService.danger(x.message);
    });
  }

  down(data) {
    this.answerQS.ChangeOrder(data.id, 'down').then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    }).catch((x) => {
      this.toastrService.danger(x.message);
    });
  }

}

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActionsOrderComponent} from '../sections/actionsOrder.component';
import {StatusFieldComponent} from '../../components/status-field/status-field.component';
import {ActionsQuestionSectionComponent} from './actionsQuestionsSection.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {AnswerService} from '../../../business-controller/answer.service';
import {QuestionService} from '../../../business-controller/question.service';
import {BaseTableComponent} from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() section_id = null;
  public messageError = null;
  public title = 'Preguntas';
  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            // 'edit': this.EditQuestion.bind(this),
            'delete': this.DeleteConfirmQuestion.bind(this),
          };
        },
        renderComponent: ActionsQuestionSectionComponent,
      },
      question_type: {
        title: 'Tipo',
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      name: {
        title: 'Pregunta',
        type: 'string',
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
      status_id: {
        title: 'Estado',
        type: 'custom',
        width: '10%',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'changeState': this.ChangeState.bind(this),
            'permission': 'configuracion-sections.update',
          };
        },
        renderComponent: StatusFieldComponent,
      },
    },
  };

  constructor(
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private scaleItemS: AnswerService,
    private questionS: QuestionService,
  ) {
  }

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  ngOnInit(): void {
  }

  RefreshTable() {
    this.table.refresh();
  }

  ChangeState(data) {
    data.status_id = data.status_id === 1 ? 2 : 1;

    this.questionS.Update(data).then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshTable();
    }).catch((x) => {
      this.toastrService.danger(x.message);
    });
  }

  DeleteConfirmQuestion(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteQuestion.bind(this),
      },
    });
  }

  DeleteQuestion(data) {
    return this.questionS.Delete(data.id).then(x => {
      this.RefreshTable();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  up(data) {
    this.questionS.ChangeOrder(data.id, 'up').then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshTable();
    });
  }

  down(data) {

    this.questionS.ChangeOrder(data.id, 'down').then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshTable();
    });
  }

}

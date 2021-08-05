import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActionsOrderComponent} from '../sections/actionsOrder.component';
import {ActionsScalesItemsComponent} from './actionsScalesItems.component';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {AnswerService} from '../../../business-controller/answer.service';
import {ActivatedRoute} from '@angular/router';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {FormScalesItemsComponent} from './form-scales-items/form-scales-items.component';
import {ActionsOrderScalesItemsComponent} from './actionsOrderScalesItems.component';

@Component({
  selector: 'ngx-scales-items',
  templateUrl: './scales-items.component.html',
  styleUrls: ['./scales-items.component.scss'],
})
export class ScalesItemsComponent implements OnInit {
  @Input() scale_id = null;
  public title = 'Items';
  public messageError: any = null;
  public answer_type_id = null;

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'edit': this.EditAnswer.bind(this),
            'delete': this.DeleteConfirmAnswer.bind(this),
          };
        },
        renderComponent: ActionsScalesItemsComponent,
      },
      name: {
        title: 'Escala',
        type: 'string',
      },
      value: {
        title: 'Valor',
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
            'total': this.table.getTotal(),
            'down': this.down.bind(this),
          };
        },
        renderComponent: ActionsOrderScalesItemsComponent,
      },
    },
  };

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private toastrService: NbToastrService,
    private scaleItemS: AnswerService,
    private route: ActivatedRoute,
    private dialogFormService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    this.answer_type_id = this.scale_id;
  }

  RefreshData() {
    this.table.refresh();
  }

  NewAnswer() {
    this.dialogFormService.open(FormScalesItemsComponent, {
      context: {
        title: 'Agregar Ítem escala',
        saved: this.RefreshData.bind(this),
        answer_type_id: this.answer_type_id,
      },
    });
  }

  EditAnswer(data) {
    this.dialogFormService.open(FormScalesItemsComponent, {
      context: {
        title: 'Editar Ítem escala',
        data,
        saved: this.RefreshData.bind(this),
        answer_type_id: this.answer_type_id,
      },
    });
  }

  DeleteConfirmAnswer(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteAnswer.bind(this),
      },
    });
  }

  DeleteAnswer(data) {
    return this.scaleItemS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  ChangeOrder(id, direcction) {
    this.scaleItemS.ChangeOrder(id, direcction).then(x => {
      this.toastrService.success(null, x.message);
      this.RefreshData();
    });
  }

  up(data) {
    this.scaleItemS.ChangeOrder(data.id, 'up').then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    });
  }

  down(data) {
    this.scaleItemS.ChangeOrder(data.id, 'down').then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    });
  }

}

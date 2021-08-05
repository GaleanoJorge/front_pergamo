import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {FormSectionSurveyComponent} from './form-section-survey/form-section-survey.component';
import {SurveySectionsBusinessService} from '../../../business-controller/survey-sections-business.service';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import {ActionsSectionComponent} from './actions.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {OrderComponent} from './order.component';

@Component({
  selector: 'ngx-sections-surveys',
  templateUrl: './sections-surveys.component.html',
  styleUrls: ['./sections-surveys.component.scss'],
})
export class SectionsSurveysComponent implements OnInit {
  @Input() survey_id = null;
  public data: any[] = [];
  public messageError: string = null;
  public dialog;
  public title = 'Secciones';
  public subtitle = '';

  constructor(
    private dialogFormService: NbDialogService,
    private surveySectionsBS: SurveySectionsBusinessService,
  ) {
  }

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
            'edit': this.EditSectionTemplate.bind(this),
            'delete': this.DeleteConfirmSection.bind(this),
          };
        },
        renderComponent: ActionsSectionComponent,
      },
      name: {
        title: 'Nombre',
      },
      weight: {
        title: 'Peso',
      },
      order: {
        title: 'Orden',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'total': this.table.getTotal(),
            'refreshData': this.refreshData.bind(this),
          };
        },
        renderComponent: OrderComponent,
      },
    },
  };

  ngOnInit(): void {

  }

  refreshData() {
    this.table.refresh();
  }

  NewSectionTemplate() {
    this.dialogFormService.open(FormSectionSurveyComponent, {
      context: {
        title: 'Crear nueva sección',
        survey_id: this.survey_id,
        refreshData: this.refreshData.bind(this),
      },
    });
  }

  EditSectionTemplate(data) {
    this.dialogFormService.open(FormSectionSurveyComponent, {
      context: {
        title: 'Editar sección',
        survey_id: this.survey_id,
        refreshData: this.refreshData.bind(this),
        data,
      },
    });
  }

  DeleteConfirmSection(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteSection.bind(this),
      },
    });
  }

  DeleteSection(data) {
    return this.surveySectionsBS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

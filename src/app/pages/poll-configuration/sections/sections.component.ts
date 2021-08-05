import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import {NbToastrService, NbDialogService} from '@nebular/theme';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {SectionService} from '../../../business-controller/section.service';
import {ActionsSectionComponent} from './actionsSection.component';

@Component({
  selector: 'ngx-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public messageError: string = null;
  public title: string = 'Secciones';
  public subtitle: string = '';
  public headerFields: any[] = ['Nombre', 'Escala', 'Preguntas'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public data = [];

  public routes = [
    {
      name: 'Secciones',
      route: '/pages/pollconfiguration/sections',
    },
  ];

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'delete': this.DeleteConfirmSection.bind(this),
          };
        },
        renderComponent: ActionsSectionComponent,
      },
      name: {
        title: this.headerFields[0],
        type: 'string',
      },
      answer_type: {
        title: this.headerFields[1],
        type: 'string',

        valuePrepareFunction: (value, row) => {
          if (value == null) {
            return;
          } else {
            return value.name;
          }

        },
      },
      questions: {
        title: `# ${this.headerFields[2]}`,
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.questions.length;
        },
      },
    },
  };

  constructor(
    private toastrService: NbToastrService,
    private deleteConfirmService: NbDialogService,
    private sectionS: SectionService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {
    this.table.refresh();
  }

  DeleteConfirmSection(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteSection.bind(this),
      },
    });
  }

  DeleteSection(data) {
    return this.sectionS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

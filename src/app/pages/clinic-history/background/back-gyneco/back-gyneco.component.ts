import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';


@Component({
  selector: 'ngx-back-gyneco',
  templateUrl: './back-gyneco.component.html',
  styleUrls: ['./back-gyneco.component.scss'],
})
export class BackgGynecoComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['Fecha', 'Estado', 'Edad gestional', 'Fecha prob. parto', 'Menarquia', 'FUR', 'Tipo', 'Cada', 'Duración', 'FUC', 'Resultado Citologia',
    'Biopsia', 'Resultado Biopsia', 'Momografía', 'Resultado Mamografía', 'Colposcopia', 'Result Colposcopia', 'Total gestas previas', 'Partos', 'Cesárias',
    'Abortos', 'Molas', 'Ectópicos', 'Hijos nacidos fallecidos', 'Hijos viven', 'Hijos fallecidos 1era semana', 'Hijos fallecidos despues 1era semana', 'Abortos espontáneos', 'Antecedentes gemelares', 'Ultimo embarazo planeado',
    'Fecha último parto', 'Ultimo peso', 'Método fracaso', 'Planifica', 'Método de planificación', 'Desde', 'Nro. Compañeros sexuales', 'Auto exámen seno', 'Cada', 'Observación Auto exámen', 'Flujo', 'Observación Flujo'];

  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
      },
      pregnancy_status: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      gestational_age: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      date_childbirth: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return this.datePipe.transform2(value);
          } else {
            return 'No Aplica';
          }
        },
      },
      menarche_years: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      last_menstruation: {
        title: this.headerFields[5],
        width: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return this.datePipe.transform2(value);
          } else {
            return 'No Aplica';
          }
        },
      },
      ch_type_gynecologists: {
        title: this.headerFields[6],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value.name;
          } else {
            return 'No Aplica';
          }
        },
      },
      time_menstruation: {
        title: this.headerFields[7],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      duration_menstruation: {
        title: this.headerFields[8],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      date_last_cytology: {
        title: this.headerFields[9],
        width: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return this.datePipe.transform2(value);
          } else {
            return 'No Aplica';
          }
        },
      },
      ch_rst_cytology_gyneco: {
        title: this.headerFields[10],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value.name;
          } else {
            return 'No Aplica';
          }
        },
      },
      date_biopsy: {
        title: this.headerFields[11],
        width: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return this.datePipe.transform2(value);
          } else {
            return 'No Aplica';
          }
        },
      },
      ch_rst_biopsy_gyneco: {
        title: this.headerFields[12],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value.name;
          } else {
            return 'No Aplica';
          }
        },
      },
      date_mammography: {
        title: this.headerFields[13],
        width: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return this.datePipe.transform2(value);
          } else {
            return 'No Aplica';
          }
        },
      },
      ch_rst_mammography_gyneco: {
        title: this.headerFields[14],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value.name;
          } else {
            return 'No Aplica';
          }
        },
      },
      date_colposcipia: {
        title: this.headerFields[15],
        width: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return this.datePipe.transform2(value);
          } else {
            return 'No Aplica';
          }
        },
      },
      ch_rst_colposcipia_gyneco: {
        title: this.headerFields[16],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value.name;
          } else {
            return 'No Aplica';
          }
        },
      },
      total_feats: {
        title: this.headerFields[17],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      childbirth_number: {
        title: this.headerFields[18],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      caesarean_operation: {
        title: this.headerFields[19],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      misbirth: {
        title: this.headerFields[20],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      molar_pregnancy: {
        title: this.headerFields[21],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      ectopic: {
        title: this.headerFields[22],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      dead_sons: {
        title: this.headerFields[23],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      living_sons: {
        title: this.headerFields[24],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      sons_dead_first_week: {
        title: this.headerFields[25],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      children_died_after_the_first_week: {
        title: this.headerFields[26],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      misbirth_unstudied: {
        title: this.headerFields[27],
        width: 'string',
        valuePrepareFunction(value) {
          if (value == 1) {
            return 'Si';
          } else {
            return 'No Aplica'
          }
        },
      },
      background_twins: {
        title: this.headerFields[28],
        width: 'string',
        valuePrepareFunction(value) {
          if (value == 1) {
            return 'Si';
          } else {
            return 'No Aplica'
          }
        },
      },
      last_planned_pregnancy: {
        title: this.headerFields[29],
        width: 'string',
        valuePrepareFunction(value) {
          if (value == 1) {
            return 'Si';
          } else {
            return 'No Aplica'
          }
        },
      },
      date_of_last_childbirth: {
        title: this.headerFields[30],
        width: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return this.datePipe.transform2(value);
          } else {
            return 'No Aplica';
          }
        },
      },
      last_weight: {
        title: this.headerFields[31],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value + 'Kg';
          } else {
            return 'No Aplica';
          }
        },
      },
      ch_failure_method_gyneco: {
        title: this.headerFields[32],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value.name;
          } else {
            return 'No Aplica';
          }
        },
      },
      ch_planning_gynecologists: {
        title: this.headerFields[33],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value.name;
          } else {
            return 'No Aplica';
          }
        },
      },
      ch_method_planning_gyneco: {
        title: this.headerFields[34],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value.name;
          } else {
            return 'No Aplica';
          }
        },
      },
      since_planning: {
        title: this.headerFields[35],
        width: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return this.datePipe.transform2(value);
          } else {
            return 'No Aplica';
          }
        },
      },
      sexual_partners: {
        title: this.headerFields[36],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      ch_exam_gynecologists: {
        title: this.headerFields[37],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value.name;
          } else {
            return 'No Aplica';
          }
        },
      },
      time_exam_breast_self: {
        title: this.headerFields[38],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      observation_breast_self_exam: {
        title: this.headerFields[39],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      ch_flow_gynecologists: {
        title: this.headerFields[40],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value.name;
          } else {
            return 'No Aplica';
          }
        },
      },
      observation_flow: {
        title: this.headerFields[41],
        width: 'string',
        valuePrepareFunction(value,) {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
    },
  };

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe,
  ) {
  }

  async ngOnInit() {
  }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
      if (this.type_record_id == 1) {
        this.messageEvent.emit(true);
      }
    }
  }
}


import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
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
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['Fecha', 'Estado', 'Edad gestional', 'Fecha prob. parto', 'Menarquia', 'FUR', 'Tipo', 'Cada', 'Duración', 'FUC', 'Resultado Citologia',
    'Biopsia', 'Resultado Biopsia', 'Momografía', 'Resultado Mamografía', 'Colposcopia', 'Result Colposcopia', 'Total gestas previas', 'Partos', 'Cesárias',
    'Abortos', 'Molas', 'Ectópicos', 'Hijos nacidos fallecidos', 'Hijos viven', 'Hijos fallecidos 1era semana', 'Hijos fallecidos despues 1era semana', 'Abortos espontáneos', 'Antecedentes gemelares', 'Ultimo embarazo planeado',
    'Fecha último parto', 'Ultimo peso', 'Método fracaso','Planifica', 'Método de planificación', 'Desde', 'Nro. Compañeros sexuales', 'Auto exámen seno', 'Cada', 'Observación Auto exámen', 'Flujo','Observación Flujo'];

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
      },
      gestational_age: {
        title: this.headerFields[2],
        width: 'string',
      },
      date_childbirth: {
        title: this.headerFields[3],
        width: 'string',
      },
      menarche_years: {
        title: this.headerFields[4],
        width: 'string',
      },
      last_menstruation: {
        title: this.headerFields[5],
        width: 'string',
      },
      ch_type_gynecologists: {
        title: this.headerFields[6],
        width: 'string',
        valuePrepareFunction(value,) {
          return value.name;
        },
      },
      time_menstruation: {
        title: this.headerFields[7],
        width: 'string',
      },
      duration_menstruation: {
        title: this.headerFields[8],
        width: 'string',
      },
      date_last_cytology: {
        title: this.headerFields[9],
        width: 'string',
      },
      ch_rst_cytology_gyneco: {
        title: this.headerFields[10],
        width: 'string',
        valuePrepareFunction(value,) {
          return value.name;
        },
      },
      date_biopsy: {
        title: this.headerFields[11],
        width: 'string',
      },
      ch_rst_biopsy_gyneco: {
        title: this.headerFields[12],
        width: 'string',
        valuePrepareFunction(value,) {
          return value.name;
        },
      },
      date_mammography: {
        title: this.headerFields[13],
        width: 'string',
      },
      ch_rst_mammography_gyneco: {
        title: this.headerFields[14],
        width: 'string',
        valuePrepareFunction(value,) {
          return value.name;
        },
      },
      date_colposcipia: {
        title: this.headerFields[15],
        width: 'string',
      },
      ch_rst_colposcipia_gyneco: {
        title: this.headerFields[16],
        width: 'string',
        valuePrepareFunction(value,) {
          return value.name;
        },
      },
      total_feats: {
        title: this.headerFields[17],
        width: 'string',
      },
      childbirth_number: {
        title: this.headerFields[18],
        width: 'string',
      },
      caesarean_operation: {
        title: this.headerFields[19],
        width: 'string',
      },
      misbirth: {
        title: this.headerFields[20],
        width: 'string',
      },
      molar_pregnancy: {
        title: this.headerFields[21],
        width: 'string',
      },
      ectopic: {
        title: this.headerFields[22],
        width: 'string',
      },
      dead_sons: {
        title: this.headerFields[23],
        width: 'string',
      },
      living_sons: {
        title: this.headerFields[24],
        width: 'string',
      },
      sons_dead_first_week: {
        title: this.headerFields[25],
        width: 'string',
      },
      children_died_after_the_first_week: {
        title: this.headerFields[26],
        width: 'string',
      },
      misbirth_unstudied: {
        title: this.headerFields[27],
        width: 'string',
        valuePrepareFunction(value) {
          if(value==1){
            return 'Si' ; 
            }else{
              return 'No'
            }
      },
    },
      background_twins: {
        title: this.headerFields[28],
        width: 'string',
        valuePrepareFunction(value) {
          if(value==1){
            return 'Si' ; 
            }else{
              return 'No'
            }
      },
    },
      last_planned_pregnancy: {
        title: this.headerFields[29],
        width: 'string',
        valuePrepareFunction(value) {
          if(value==1){
            return 'Si' ; 
            }else{
              return 'No'
            }
      },
    },
      date_of_last_childbirth: {
        title: this.headerFields[30],
        width: 'string',
      },
      last_weight: {
        title: this.headerFields[31],
        width: 'string',
      },
      ch_failure_method_gyneco: {
        title: this.headerFields[32],
        width: 'string',
        valuePrepareFunction(value,) {
          return value.name;
        },
      },
      ch_planning_gynecologists: {
        title: this.headerFields[33],
        width: 'string',        
        valuePrepareFunction(value,) {
          return value.name;
        },
      },
      ch_method_planning_gyneco: {
        title: this.headerFields[34],
        width: 'string',
        valuePrepareFunction(value,) {
          return value.name;
        },
      },
      since_planning: {
        title: this.headerFields[35],
        width: 'string',
      },
      sexual_partners: {
        title: this.headerFields[36],
        width: 'string',
      },
      ch_exam_gynecologists: {
        title: this.headerFields[37],
        width: 'string',
        valuePrepareFunction(value,) {
          return value.name;
        },
      },
      time_exam_breast_self: {
        title: this.headerFields[38],
        width: 'string',
      },
      observation_breast_self_exam: {
        title: this.headerFields[39],
        width: 'string',
      },
      ch_flow_gynecologists: {
        title: this.headerFields[40],
        width: 'string',
        valuePrepareFunction(value,) {
          return value.name;
        },
      },
      observation_flow: {
        title: this.headerFields[41],
        width: 'string',
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
    }
  }
}


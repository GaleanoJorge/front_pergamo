import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-mov-pat-m-ot',
  templateUrl: './table-mov-pat-m-ot.component.html',
  styleUrls: ['./table-mov-pat-m-ot.component.scss']
})
export class TableMovPatMOTComponent implements OnInit {
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
  public headerFields: any[] = ['FECHA',
                                'DESPLAZARSE-DERECHA', 
                                'DESPLAZARSE-IZQUIERDA',
                                'LEVANTARSE-DERECHA', 
                                'LEVANTARSE-IZQUIERDA',
                                'EMPUJAR-DERECHA', 
                                'EMPUJAR-IZQUIERDA',
                                'HALAR-DERECHA', 
                                'HALAR-IZQUIERDA',
                                'TRANSPORTAR-DERECHA', 
                                'TRANSPORTAR-IZQUIERDA',
                                'ALCANZAR-DERECHA', 
                                'ALCANZAR-IZQUIERDA',
                                'POSTURA BIPEDA-DERECHA', 
                                'POSTURA BIPEDA-IZQUIERDA',
                                'POSTURA SEDENTE-DERECHA', 
                                'POSTURA SEDENTE-IZQUIERDA',
                                'POSTURA CUNCLILLAS-DERECHA', 
                                'POSTURA CUNCLILLAS-IZQUIERDA',
                                'USO DE AMBAS MANOS-DERECHA', 
                                'USO DE AMBAS MANOS-IZQUIERDA',
                                'MOVIMIENTOS ALTERNOS-DERECHA', 
                                'MOVIMIENTOS ALTERNOS-IZQUIERDA',
                                'MOVIMIENTOS DISOCIADOS-DERECHA', 
                                'MOVIMIENTOS DISOCIADOS-IZQUIERDA',
                                'MOVIMIENTOS SIMULTANEOS-DERECHA', 
                                'MOVIMIENTOS SIMULTANEOS-IZQUIERDA', 
                                'COORDINACIÓN BIMANUAL-DERECHA', 
                                'COORDINACIÓN BIMANUAL-IZQUIERDA', 
                                'COORDINACIÓN MANO-OJO-DERECHA', 
                                'COORDINACIÓN MANO-OJO-IZQUIERDA', 
                                'COORDINACIÓN CABEZA-PIE-DERECHA', 
                                'COORDINACIÓN CABEZA-PIE-IZQUIERDA',];

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
      scroll_right: {
        title: this.headerFields[1],
        width: 'string',
      },

      scroll_left: {
        title: this.headerFields[2],
        width: 'string',
      },

      get_up_right: {
        title: this.headerFields[3],
        width: 'string',
      },
      get_up_left: {
        title: this.headerFields[4],
        width: 'string',
      },

      push_right: {
        title: this.headerFields[5],
        width: 'string',
      },
      push_left: {
        title: this.headerFields[6],
        width: 'string',
      },

      pull_right: {
        title: this.headerFields[7],
        width: 'string',
      },
      pull_left: {
        title: this.headerFields[8],
        width: 'string',
      },

      transport_right: {
        title: this.headerFields[9],
        width: 'string',
      },

      transport_left: {
        title: this.headerFields[10],
        width: 'string',
      },
      attain_right: {
        title: this.headerFields[11],
        width: 'string',
      },

      attain_left: {
        title: this.headerFields[12],
        width: 'string',
      },
      bipedal_posture_right: {
        title: this.headerFields[13],
        width: 'string',
      },

      bipedal_posture_left: {
        title: this.headerFields[14],
        width: 'string',
      },

      sitting_posture_right: {
        title: this.headerFields[15],
        width: 'string',
      },
      sitting_posture_left: {
        title: this.headerFields[16],
        width: 'string',
      },

      squat_posture_right: {
        title: this.headerFields[17],
        width: 'string',
      },
      squat_posture_left: {
        title: this.headerFields[18],
        width: 'string',
      },

      use_both_hands_right: {
        title: this.headerFields[19],
        width: 'string',
      },

      use_both_hands_left: {
        title: this.headerFields[20],
        width: 'string',
      },
      alternating_movements_right: {
        title: this.headerFields[21],
        width: 'string',
      },

      alternating_movements_left: {
        title: this.headerFields[22],
        width: 'string',
      },
      dissociated_movements_right: {
        title: this.headerFields[23],
        width: 'string',
      },

      dissociated_movements_left: {
        title: this.headerFields[24],
        width: 'string',
      },

      Simultaneous_movements_right: {
        title: this.headerFields[25],
        width: 'string',
      },
      Simultaneous_movements_left: {
        title: this.headerFields[26],
        width: 'string',
      },

      bimanual_coordination_right: {
        title: this.headerFields[27],
        width: 'string',
      },

      bimanual_coordination_left: {
        title: this.headerFields[28],
        width: 'string',
      },
      hand_eye_coordination_right: {
        title: this.headerFields[29],
        width: 'string',
      },

      hand_eye_coordination_left: {
        title: this.headerFields[30],
        width: 'string',
      },
      hand_foot_coordination_right: {
        title: this.headerFields[31],
        width: 'string',
      },

      hand_foot_coordination_left: {
        title: this.headerFields[32],
        width: 'string',
      },
      

    },
  };

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe

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


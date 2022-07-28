import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ChVitalSignsService } from '../../../business-controller/ch-vital-signs.service';
import { Actions12Component } from './actions.component';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UserChangeService } from '../../../business-controller/user-change.service';
@Component({
  selector: 'ngx-signs-evo',
  templateUrl: './signs-evo.component.html',
  styleUrls: ['./signs-evo.component.scss'],
})
export class SignsEvoComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;

  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Hora de Registro', 'Fr. Cardiaca', 'Fr. Respiratoria', 'Temp', 'Via de Toma', 'SatO2', 'Talla', 'Peso', 'IMC', 'Sistolica', 'Diastolica', 'Media',
    'Est. Neurologico', 'Est.Hidratación', 'Reacción Dcha.', 'Tamaño Dcha.', 'Reacción Izqda.', 'Tamaño Izqda.', 'Modo Ventilatorio', 'Tipo de Oxigeno', 'Lts por Mints.', 'Parametros', 'Sistolica Pulmonar', 'Diastolica Pulmonar', 'Media Pulomonar',
    'Cefálico', 'Abdominal', 'Toracico', 'Pulso', 'PVC', 'PIC', 'PPC', 'PIA', 'Glucometria', 'Observaciones'];
  public routes = [];
  public data = [];
  public loading: boolean = false;
  public saved: any = null;
  public isSubmitted = false;
  public all_changes: any[];
  public saveEntry: any = 0;


  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },

    columns: {
      clock: {
        title: this.headerFields[0],
        width: 'string',
      },
      cardiac_frequency: {
        title: this.headerFields[1],
        width: 'string',
      },
      respiratory_frequency: {
        title: this.headerFields[2],
        width: 'string',
      },

      temperature: {
        title: this.headerFields[3],
        width: 'string',
      },
      ch_vital_temperature: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value?.name;
        },
      },
      oxigen_saturation: {
        title: this.headerFields[5],
        width: 'string',
      },
      size: {
        title: this.headerFields[6],
        width: 'string',
      },
      weight: {
        title: this.headerFields[7],
        width: 'string',
      },
      body_mass_index: {
        title: this.headerFields[8],
        width: 'string',
      },
      pressure_systolic: {
        title: this.headerFields[9],
        width: 'string',
      },
      pressure_diastolic: {
        title: this.headerFields[10],
        width: 'string',
      },
      pressure_half: {
        title: this.headerFields[11],
        width: 'string',
      },
      ch_vital_neurological: {
        title: this.headerFields[12],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value?.name;
        },
      },
      ch_vital_hydration: {
        title: this.headerFields[13],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value?.name;
        },
      },
      pupil_size_right: {
        title: this.headerFields[14],
        width: 'string',
      },
      right_reaction: {
        title: this.headerFields[15],
        width: 'string',
      },
      pupil_size_left: {
        title: this.headerFields[16],
        width: 'string',
      },
      left_reaction: {
        title: this.headerFields[17],
        width: 'string',
      },
      ch_vital_ventilated: {
        title: this.headerFields[18],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value?.name;
        },
      },
      oxygen_type: {
        title: this.headerFields[19],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value?.name;
        },
      },
      liters_per_minute: {
        title: this.headerFields[20],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value?.name;
        },
      },
      parameters_signs: {
        title: this.headerFields[21],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value?.name;
        },
      },

      pulmonary_systolic: {
        title: this.headerFields[22],
        width: 'string',
      },
      pulmonary_diastolic: {
        title: this.headerFields[23],
        width: 'string',
      },

      pulmonary_half: {
        title: this.headerFields[24],
        width: 'string',
      },
      head_circunference: {
        title: this.headerFields[25],
        width: 'string',
      },
      abdominal_perimeter: {
        title: this.headerFields[26],
        width: 'string',
      },
      chest_perimeter: {
        title: this.headerFields[27],
        width: 'string',
      },

      pulse: {
        title: this.headerFields[28],
        width: 'string',
      },

      intracranial_pressure: {
        title: this.headerFields[29],
        width: 'string',
      },
      cerebral_perfusion_pressure: {
        title: this.headerFields[30],
        width: 'string',
      },
      intra_abdominal: {
        title: this.headerFields[31],
        width: 'string',
      },
      glucometry: {
        title: this.headerFields[32],
        width: 'string',
      },
      observations_glucometry: {
        title: this.headerFields[33],
        width: 'string',
      },
    },
  };

  constructor(
    private chvitalSignsS: ChVitalSignsService,
    private route: ActivatedRoute,
    private toastService: NbToastrService,
    public userChangeS: UserChangeService,

  ) {


  }
  GetParams() {
    return {
      record_id: this.route.snapshot.params.id,
    };
  }

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;
  }



  NewChVitalSigns() {
    this.chvitalSignsS.Save({

      record_id: this.record_id,
    }).then(x => {
      this.toastService.success('', x.message);
      if (this.saved) {
        this.saved();
      }
    }).catch(x => {
      this.isSubmitted = false;
      this.loading = false;
    });
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

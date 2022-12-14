import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-ch-historic-scales',
  templateUrl: './ch-historic-scales.component.html',
  styleUrls: ['./ch-historic-scales.component.scss'],
})
export class ChHistoricScalesComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() title: string = null;
  @Input() path: string = null;
  @Input() catch_info: string = null;
  @Input() ch_record_id: number = null;

  linearMode = true;
  public messageError = null;
  public headerFields: any[] = ['Fecha / Hora de Registro', 'Total', 'Riesgo', 'Puntaje', 'Clasificación', 'Calificación',
    'Riesgo clínico', 'Respuesta clínica', 'Gravedad del cuadro', 'Resultado', 'Definición',
    'Grado', 'Descripción', 'Intervención y seguimiento', 'Detalle', 'Interpretación'];

  public headerFieldsEsas: any[] = ['Fecha', 'Dolor', 'Cansancio', 'Náusea', 'Depresión',
    'Ansiedad', 'Somnolencia', 'Apetito', 'Bienestar', 'Falta de Aire', 'Dificultad para Dormir', 'Observación',];
  public headerFieldsPayette: any[] = ['Fecha', 'Calificación', 'Riesgo Nurticional', 'Recomendaciones'];
  public routes = [];
  public data = [];
  public loading: boolean = false;
  public saved: any = null;
  public isSubmitted = false;
  public subtitle = 'Registro Histórico';
  public settings;
  public entity;
  public customData;

  public settings_2 = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      total: {
        title: this.headerFields[1],
        type: 'string',
      },
      risk: {
        title: this.headerFields[2],
        type: 'string',
      }

    },
  };
  public settings_glasgow = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      total: {
        title: this.headerFields[3],
        type: 'string',
      },
    },
  };

  public settings_barthel = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      classification: {
        title: this.headerFields[3],
        type: 'string',
      },
      score: {
        title: this.headerFields[4],
        type: 'string',
      },
    },
  };

  public settings_1 = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      total: {
        title: this.headerFields[3],
        type: 'string',
      },
      classification: {
        title: this.headerFields[4],
        type: 'string',
      },

    },
  };

  public settings_payette = {
    columns: {
      created_at: {
        title: this.headerFieldsPayette[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      classification: {
        title: this.headerFieldsPayette[1],
        type: 'string',
      },
      risk: {
        title: this.headerFieldsPayette[2],
        type: 'string',
      },
      recommendations: {
        title: this.headerFieldsPayette[3],
        type: 'string',
      }

    },
  };

  public settings_news = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      qualification: {
        title: this.headerFields[5],
        type: 'string',
      },
      risk: {
        title: this.headerFields[6],
        type: 'string',
      },
      response: {
        title: this.headerFields[7],
        type: 'string',
      }

    },
  };

  public settings_hamilton = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      total: {
        title: this.headerFields[3],
        type: 'string',
      },
      qualification: {
        title: this.headerFields[8],
        type: 'string',
      },

    },
  };

  public settings_cam = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      result: {
        title: this.headerFields[9],
        type: 'string',
      },

    },
  };
  public settings_fac = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      level_title: {
        title: this.headerFields[4],
        type: 'string',
      },
      definition: {
        title: this.headerFields[10],
        type: 'string',
      },
    },
  };

  public settings_red = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      grade_title: {
        title: this.headerFields[12],
        type: 'string',
      },
      definition: {
        title: this.headerFields[10],
        type: 'string',
      },

    },
  };

  public settings_karnofsky = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      score_value: {
        title: this.headerFields[3],
        type: 'string',
      },
      score_title: {
        title: this.headerFields[12],
        type: 'string',
      },

    },
  };

  public settings_ecog = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      grade_title: {
        title: this.headerFields[11],
        type: 'string',
      },
      definition: {
        title: this.headerFields[10],
        type: 'string',
      },

    },
  };

  public settings_pNutrition = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      total: {
        title: this.headerFields[3],
        type: 'string',
      },
      risk: {
        title: this.headerFields[2],
        type: 'string',
      },
      classification: {
        title: this.headerFields[13],
        type: 'string',
      }

    },
  };
  public settings_flacc = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      total: {
        title: this.headerFields[3],
        type: 'string',
      },
      classification: {
        title: this.headerFields[4],
        type: 'string',
      },
    },
  };

  public settings_esas = {
    columns: {
      created_at: {
        title: this.headerFieldsEsas[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      pain_value: {
        title: this.headerFieldsEsas[1],
        type: 'string',
      },
      tiredness_value: {
        title: this.headerFieldsEsas[2],
        type: 'string',
      },
      retching_value: {
        title: this.headerFieldsEsas[3],
        type: 'string',
      },
      depression_value: {
        title: this.headerFieldsEsas[4],
        type: 'string',
      },
      anxiety_value: {
        title: this.headerFieldsEsas[5],
        type: 'string',
      },
      drowsiness_value: {
        title: this.headerFieldsEsas[6],
        type: 'string',
      },
      appetite_value: {
        title: this.headerFieldsEsas[7],
        type: 'string',
      },
      welfare_value: {
        title: this.headerFieldsEsas[8],
        type: 'string',
      },
      breathing_value: {
        title: this.headerFieldsEsas[9],
        type: 'string',
      },
      sleep_value: {
        title: this.headerFieldsEsas[10],
        type: 'string',
      },
      observation: {
        title: this.headerFieldsEsas[11],
        type: 'string',
      },

    },
  };

  public settings_pain = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      range_value: {
        title: this.headerFields[3],
        type: 'string',
      },
      range_title: {
        title: this.headerFields[14],
        type: 'string',
      },
    },
  };

  public settings_wong = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      pain_value: {
        title: this.headerFields[3],
        type: 'string',
      },
      pain_title: {
        title: this.headerFields[14],
        type: 'string',
      },
    },
  };

  public settings_jh_downton = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      total: {
        title: this.headerFields[3],
        type: 'string',
      },
      risk: {
        title: this.headerFields[15],
        type: 'string',
      },
    },
  };

  public settings_pps = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      score_value: {
        title: this.headerFields[3],
        type: 'string',
      },
      score_title: {
        title: this.headerFields[12],
        type: 'string',
      },

    },
  };

  public settings_lawton = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform(value);
        },
      },
      total: {
        title: this.headerFields[3],
        type: 'string',
      },
      risk: {
        title: this.headerFields[4],
        type: 'string',
      }
    },
  };

  constructor(
    private route: ActivatedRoute,
    private toastService: NbToastrService,
    public datePipe: DateFormatPipe,

  ) {
  }
  GetParams() {
    return {
      ch_record_id: this.route.snapshot.params.id,
    };
  }

  ngOnInit(): void {
    this.entity = this.path + '?ch_record_id=' + this.ch_record_id;
    this.customData = this.catch_info;
    if (this.path == 'chScaleBarthel') {
      this.settings = this.settings_barthel;
    } else if (this.path == 'chScaleNorton') {
      this.settings = this.settings_2;
    } else if (this.path == 'chScaleGlasgow') {
      this.settings = this.settings_glasgow;
    } else if (this.path == 'chScalePayette') {
      this.settings = this.settings_payette;
    } else if (this.path == 'ch_scale_fragility') {
      this.settings = this.settings_1;
    } else if (this.path == 'ch_scale_news') {
      this.settings = this.settings_news;
    } else if (this.path == 'ch_scale_pap') {
      this.settings = this.settings_1;
    } else if (this.path == 'ch_scale_hamilton') {
      this.settings = this.settings_hamilton;
    } else if (this.path == 'ch_scale_cam') {
      this.settings = this.settings_cam;
    } else if (this.path == 'ch_scale_fac') {
      this.settings = this.settings_fac;
    } else if (this.path == 'ch_scale_red_cross') {
      this.settings = this.settings_red;
    } else if (this.path == 'ch_scale_karnofsky') {
      this.settings = this.settings_karnofsky;
    } else if (this.path == 'ch_scale_ecog') {
      this.settings = this.settings_ecog;
    } else if (this.path == 'ch_scale_pediatric_nutrition') {
      this.settings = this.settings_pNutrition;
    } else if (this.path == 'ch_scale_flacc') {
      this.settings = this.settings_flacc;
    } else if (this.path == 'ch_scale_esas') {
      this.settings = this.settings_esas;
    } else if (this.path == 'ch_scale_ppi') {
      this.settings = this.settings_1;
    } else if (this.path == 'ch_scale_zarit') {
      this.settings = this.settings_1;
    } else if (this.path == 'ch_scale_pain') {
      this.settings = this.settings_pain;
    } else if (this.path == 'ch_scale_wong_baker') {
      this.settings = this.settings_wong;
    } else if (this.path == 'ch_scale_pfeiffer') {
      this.settings = this.settings_1;
    } else if (this.path == 'ch_scale_jh_downton') {
      this.settings = this.settings_jh_downton;
    } else if (this.path == 'ch_scale_screening') {
      this.settings = this.settings_2;
    } else if (this.path == 'ch_scale_pps') {
      this.settings = this.settings_pps;
    } else if (this.path == 'ch_scale_braden') {
      this.settings = this.settings_2;
    } else if (this.path == 'ch_scale_lawton') {
      this.settings = this.settings_lawton;
}
}

  RefreshData() {
    this.table.refresh();
  }
}

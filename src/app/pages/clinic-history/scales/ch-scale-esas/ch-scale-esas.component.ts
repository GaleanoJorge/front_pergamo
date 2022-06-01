import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DateFormatPipe } from '../../..//../pipe/date-format.pipe';
import { ChHistoricScalesComponent } from '../ch-historic-scales/ch-historic-scales.component';

@Component({
  selector: 'ngx-ch-scale-esas',
  templateUrl: './ch-scale-esas.component.html',
  styleUrls: ['./ch-scale-esas.component.scss'],
})
export class ChScaleEsasComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() refresh16;

  linearMode = true;
  public messageError = null;
  public title: string = 'Registros Escala ESAS';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Dolor', 'Cansancio', 'Náusea',  'Depresión', 
  'Ansiedad', 'Somnolencia', 'Apetito', 'Bienestar', 'Falta de Aire', 'Dificultad para Dormir', 'Observación',];
  public routes = [];
  public data = [];
  public ch_record_id;
  public loading: boolean = false;
  public saved: any = null;
  public isSubmitted = false;

  public settings = {
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform2(value);
        },
      },
      pain_value: {
        title: this.headerFields[1],
        type: 'string',
      },
      tiredness_value: {
        title: this.headerFields[2],
        type: 'string',
      },
      retching_value: {
        title: this.headerFields[3],
        type: 'string',
      },
      depression_value: {
        title: this.headerFields[4],
        type: 'string',
      },
      anxiety_value: {
        title: this.headerFields[5],
        type: 'string',
      },
      drowsiness_value: {
        title: this.headerFields[6],
        type: 'string',
      },
      appetite_value: {
        title: this.headerFields[7],
        type: 'string',
      },
      welfare_value: {
        title: this.headerFields[8],
        type: 'string',
      },
      breathing_value: {
        title: this.headerFields[9],
        type: 'string',
      },
      sleep_value: {
        title: this.headerFields[10],
        type: 'string',
      },
      observation: {
        title: this.headerFields[11],
        type: 'string',
      },


    },
  };

  constructor(
    private dialogFormService: NbDialogService,
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

  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.refresh16.currentValue==true){
      this.RefreshData();
    }

  }

  ngOnInit(): void {
    this.ch_record_id = this.route.snapshot.params.id;
  }
  Historic() {
    this.dialogFormService.open(ChHistoricScalesComponent, {
      context: {
        title: 'Escala Esas',
        path: 'ch_scale_esas',
        catch_info: 'ch_scale_esas',
        ch_record_id: this.ch_record_id,
      },
    });
  }

  RefreshData() {
    this.table.refresh();
  }
}

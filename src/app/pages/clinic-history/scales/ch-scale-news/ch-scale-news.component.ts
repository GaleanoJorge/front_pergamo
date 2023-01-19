import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { ChHistoricScalesComponent } from '../ch-historic-scales/ch-historic-scales.component';

@Component({
  selector: 'ngx-ch-scale-news',
  templateUrl: './ch-scale-news.component.html',
  styleUrls: ['./ch-scale-news.component.scss'],
})
export class ChScaleNewsComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() refresh7;
  
  linearMode = true;
  public messageError = null;
  public title: string = 'Registros Escala News';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha / Hora de Registro', 'Calificación', 'Riesgo Clínico', 'Respuesta clínica'];
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
          return this.datePipe.transform(value);
        },
      },
      qualification: {
        title: this.headerFields[1],
        type: 'string',
      },
      risk: {
        title: this.headerFields[2],
        type: 'string',
      },
      response: {
        title: this.headerFields[3],
        type: 'string',
      }

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
    if(changes.refresh7.currentValue==true){
      this.RefreshData();
    }

  }

  ngOnInit(): void {
    this.ch_record_id = this.route.snapshot.params.id;
    if(this.refresh7==true){
      this.RefreshData;
    }
  }
  Historic() {
    this.dialogFormService.open(ChHistoricScalesComponent, {
      context: {
        title: 'Escala News',
        path: 'ch_scale_news',
        catch_info: 'ch_scale_news',
        ch_record_id: this.ch_record_id,
      },
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
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { ChHistoricScalesComponent } from '../ch-historic-scales/ch-historic-scales.component';

@Component({
  selector: 'ngx-ch-scale-karnofsky',
  templateUrl: './ch-scale-karnofsky.component.html',
  styleUrls: ['./ch-scale-karnofsky.component.scss'],
})
export class ChScaleKarnofskyComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() refresh13;

  linearMode = true;
  public messageError = null;
  public title: string = 'Registros Escala Karnofsky';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha / Hora de Registro', 'Puntaje', 'Descripción'];
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
      score_value: {
        title: this.headerFields[1],
        type: 'string',
      },
      score_title: {
        title: this.headerFields[2],
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
    if(changes.refresh13.currentValue==true){
      this.RefreshData();
    }

  }


  ngOnInit(): void {
    this.ch_record_id = this.route.snapshot.params.id;
  }
  Historic() {
    this.dialogFormService.open(ChHistoricScalesComponent, {
      context: {
        title: 'Escala Karnofsky',
        path: 'ch_scale_karnofsky',
        catch_info: 'ch_scale_karnofsky',
        ch_record_id: this.ch_record_id,
      },
    });
  }

  RefreshData() {
    this.table.refresh();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { ChHistoricScalesComponent } from '../ch-historic-scales/ch-historic-scales.component';

@Component({
  selector: 'ngx-ch-scale-fac',
  templateUrl: './ch-scale-fac.component.html',
  styleUrls: ['./ch-scale-fac.component.scss'],
})
export class ChScaleFacComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  linearMode = true;
  public messageError = null;
  public title: string = 'Registros Escala FAC';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Clasificación', 'Definición'];
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
      level_title: {
        title: this.headerFields[1],
        type: 'string',
      },
      definition: {
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

  ngOnInit(): void {
    this.ch_record_id = this.route.snapshot.params.id;
  }

  Historic() {
    this.dialogFormService.open(ChHistoricScalesComponent, {
      context: {
        title: 'Escala FAC',
        path: 'ch_scale_fac',
        catch_info: 'ch_scale_fac',
        ch_record_id: this.ch_record_id,
      },
    });
  }

  RefreshData() {
    this.table.refresh();
  }
}

import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { ChHistoricScalesComponent } from '../ch-historic-scales/ch-historic-scales.component';

@Component({
  selector: 'ngx-ch-scale-hamilton',
  templateUrl: './ch-scale-hamilton.component.html',
  styleUrls: ['./ch-scale-hamilton.component.scss'],
})
export class ChScaleHamiltonComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() refresh9;
  
  linearMode = true;
  public messageError = null;
  public title: string = 'Registros Escala Hamilton';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha','Puntaje', 'Gravedad del cuadro'];
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
      total: {
        title: this.headerFields[1],
        type: 'string',
      },
      qualification: {
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
    if(changes.refresh9.currentValue==true){
      this.RefreshData();
    }

  }
  ngOnInit(): void {
    this.ch_record_id = this.route.snapshot.params.id;
  }
  Historic() {
    this.dialogFormService.open(ChHistoricScalesComponent, {
      context: {
        title: 'Escala Hamilton',
        path: 'ch_scale_hamilton',
        catch_info: 'ch_scale_hamilton',
        ch_record_id: this.ch_record_id,
      },
    });
  }


  RefreshData() {
    this.table.refresh();
  }
}

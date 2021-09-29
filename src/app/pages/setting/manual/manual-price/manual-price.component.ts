import { Component,Input, OnInit, ViewChild } from '@angular/core';
import { ManualPriceService } from '../../../../business-controller/manual-price.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsComponent2 } from '../manual-price/actions.component';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-manual-price',
  templateUrl: './manual-price.component.html',
  styleUrls: ['./manual-price.component.scss']
})
export class ManualPriceComponent implements OnInit {
  @Input() manual_id: number = null;

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Detalle de Procedimientos asociados a manual tarifario';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Procedimiento','Valor','Tipo de Valor'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'delete': this.DeleteConfirmManualPrice.bind(this),
          };
        },
        renderComponent: ActionsComponent2,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      procedure: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      value: {
        title: this.headerFields[2],
        type: 'string',
      },
      price_type: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Manual Tarifario',
      route: '../../setting/manual',
    },
  ];

  constructor(
    private ManualPriceS: ManualPriceService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.manual_id = this.route.snapshot.params.id;
  }

  RefreshData() {

    this.table.refresh();
  }

  // ChangeState(data) {
  //   // data.status_id = data.status_id === 1 ? 2 : 1;

  //   this.toastrService.info('', 'Cambiando estado');

  //   this.regionS.Update(data).then((x) => {
  //     this.toastrService.success('', x.message);
  //     this.table.refresh();
  //   }).catch((x) => {
  //     this.toastrService.danger(x.message);
  //   });
  // }

  DeleteConfirmManualPrice(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteManualPrice.bind(this),
      },
    });
  }

  DeleteManualPrice(data) {
    return this.ManualPriceS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

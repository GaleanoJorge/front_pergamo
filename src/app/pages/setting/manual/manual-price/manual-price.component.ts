import { Component,Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ManualPriceService } from '../../../../business-controller/manual-price.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsComponent2 } from '../manual-price/actions.component';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ManualService } from '../../../../business-controller/manual.service';
import { ProcedureMassiveComponent } from '../procedure-massive/procedure-massive.component';

@Component({
  selector: 'ngx-manual-price',
  templateUrl: './manual-price.component.html',
  styleUrls: ['./manual-price.component.scss']
})
export class ManualPriceComponent implements OnInit {
  @Input() manual_id: number = null;

  public isSubmitted = false;
  public messageError: string = null;
  public title: string;
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Procedimiento','Valor','Tipo de Valor','Medicamento'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public manual;
  public result;
  public settings;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public conf = {
    pager: {
      display: true,
      perPage: 10,
    },
    actions: false,
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

  public conf2 = {
    pager: {
      display: true,
      perPage: 10,
    },
    actions: false,
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
      product: {
        title: this.headerFields[4],
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
    private ManualS: ManualService,
    private deleteConfirmService: NbDialogService,
    private route: ActivatedRoute,
  ) {
  }

  async ngOnInit() {
    await this.ManualS.GetCollection().then(x => {
      this.manual=x;
    });
    this.manual_id = this.route.snapshot.params.id;
    this.result=this.manual.find(manual => manual.id == this.route.snapshot.params.id);
    if(this.result.type_manual==0){
      this.table.changeEntity(`ManualPrice/ProcedureByManual/`+this.manual_id,`manual_price`);
      this.title = 'Detalle de Procedimientos asociados a manual tarifario';
      this.settings=this.conf;
    }else if(this.result.type_manual==1){
      this.table.changeEntity(`ManualPrice/ProcedureByManual2/`+this.manual_id,`manual_price`);
      this.title = 'Detalle de Medicamentos asociados a manual tarifario';
      this.settings=this.conf2;
    }

  }

  async findmanual(){
    
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

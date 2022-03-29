import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Actions2Component } from './actions.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormContractComponent } from './form-contract/form-contract.component';
import { ContractService } from '../../../business-controller/contract.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss'],
})
export class ContractListComponent implements OnInit {

  public isSubmitted = false;
  public entity:string;
  public category_id:number=null;
  public messageError: string = null;
  public title: string = 'Contratos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','# contrato','Estado', 'Nombre','Fecha inicio','Fecha fin', 'Valor'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}`;
  public icon: string = 'nb-star';
  public data = [];


  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditContract.bind(this),
            'delete': this.DeleteConfirmContract.bind(this),
          };
        },
        renderComponent: Actions2Component,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      number_contract: {
        title: this.headerFields[1],
        type: 'string',
      },
      contract_status: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      name: {
        title: this.headerFields[3],
        type: 'string',
      },
      start_date: {
        title: this.headerFields[4],
        type: 'string',
      },
      finish_date: {
        title: this.headerFields[5],
        type: 'string',
      },
      amount: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if(value==0){
            return 'Indefinido';
            }else{
              return value;
            }
        },
      },
    },
  };

  public routes = [
    {
      name: 'Contratos',
      route: '../contract/list',
    },
  ];

  constructor(
    private contractS: ContractService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private datepipe: DateFormatPipe,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {
    this.table.refresh();
  }

  NewContract() {
    this.dialogFormService.open(FormContractComponent, {
      context: {
        title: 'Crear nuevo contrato',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditContract(data) {
    this.dialogFormService.open(FormContractComponent, {
      context: {
        title: 'Editar contrato',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  

  DeleteConfirmContract(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteContract.bind(this),
      },
    });
  }

  DeleteContract(data) {
    return this.contractS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

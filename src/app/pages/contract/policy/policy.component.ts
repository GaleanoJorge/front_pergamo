import { Component, OnInit, ViewChild } from '@angular/core';
import { PolicyService } from '../../../business-controller/policy.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormPolicyComponent } from './form-policy/form-policy.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from '../../../business-controller/contract.service';
import { environment } from '../../../../environments/environment.prod';
import { Actions2Component } from './actions2.component';
import { ActionsEDComponent } from './actions.component';



@Component({
  selector: 'ngx-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  public isSubmitted = false;
  public entity:string;
  public messageError: string = null;
  public title: string = 'Documentos de pólizas';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Tipo de póliza', 'Aseguradora de la póliza','Valor de la póliza','Fecha de inicio', 'Fecha de finalización', 'Documento'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data: any [] = [];
  public routes = [];
  public datain;
  public contract = [];
  public contract_id:number;
  public previewFile:string;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          this.datain=row;
          return {
            'data': row,
            'delete': this.DeleteConfirmPolicy.bind(this),
          };
        },
        renderComponent: ActionsEDComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      policy_type: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      insurance_carrier: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.insurance_carrier?.name;
        }
      },
      policy_value: {
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
      policy_file: {
        title: this.headerFields[6],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
          };
        },
        renderComponent: Actions2Component,
      },
    },
  };

  

  constructor(
    private PolicyS: PolicyService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private route: ActivatedRoute,
    private ContractS: ContractService,
  ) {
  }

  async ngOnInit() {
    if(this.route.snapshot.params.id){
      this.contract_id = this.route.snapshot.params.id;
      this.entity = this.contract_id ? 'Policy/FileByContract/' + this.contract_id : 'policy';
    }else{
      this.entity='policy';
    }
    
    this.routes = [
      {
        name: 'Contrato',
        route: '../../list',
      },
      {
        name: 'Pólizas',
        route: '../../policy/' + this.contract_id,
      },
    ];

    await this.ContractS.GetCollection().then(x=> {
      this.contract = x;
    });
    var element = this.contract.find(item => item.id == this.contract_id)
    this.title = 'Pólizas del contracto: ' + element.name;
    
  }

  RefreshData() {

    this.table.refresh();
  }

  NewPolicy() {
    this.dialogFormService.open(FormPolicyComponent, {
      context: {
        title: 'Crear nueva póliza',
        saved: this.RefreshData.bind(this),
        contract_id:this.contract_id,
      },
    });
  }

  EditPolicy(data) {
    this.dialogFormService.open(FormPolicyComponent, {
      context: {
        title: 'Editar póliza',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
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

  DeleteConfirmPolicy(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePolicy.bind(this),
      },
    });
  }

  DeletePolicy(data) {
    return this.PolicyS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

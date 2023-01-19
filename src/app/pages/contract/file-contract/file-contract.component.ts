import { Component, OnInit, ViewChild } from '@angular/core';
import { FileContractService } from '../../../business-controller/file-contract.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormFileContractComponent } from './form-file-contract/form-file-contract.component';
import { ActionsFileComponent } from './actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions2Component } from './actions2.component';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-file-contract',
  templateUrl: './file-contract.component.html',
  styleUrls: ['./file-contract.component.scss']
})
export class FileContractComponent implements OnInit {

  public isSubmitted = false;
  public entity:string;
  public routes = [];
  public messageError: string = null;
  public title: string = 'Documentos del contrato';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Documento'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public contract_id:number;

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
          return {
            'data': row,
            'edit': this.EditFileContract.bind(this),
            'delete': this.DeleteConfirmFileContract.bind(this),
          };
        },
        renderComponent: ActionsFileComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      file: {
        title: this.headerFields[2],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
          };
        },
        renderComponent: Actions2Component,

      }
    },
  };

  constructor(
    private FileContractS: FileContractService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    if(this.route.snapshot.params.id){
      this.contract_id = this.route.snapshot.params.id;
      this.entity = this.contract_id ? 'FileContract/FileByContract/' + this.contract_id : 'file_contract';
    }else{
      this.entity='file_contract';
    }

    this.routes = [
      {
        name: 'Contratos',
        route: '../../list',
      },
      {
        name: 'Documentos del contrato',
        route: '../../file-contract/' + this.contract_id,
      },
    ];
    
  }
  back() {
    this.location.back();

 }


  RefreshData() {

    this.table.refresh();
  }

  NewFileContract() {
    this.dialogFormService.open(FormFileContractComponent, {
      context: {
        title: 'Crear nuevo documento del contrato',
        saved: this.RefreshData.bind(this),
        contract_id:this.contract_id,
      },
    });
  }

  EditFileContract(data) {
    this.dialogFormService.open(FormFileContractComponent, {
      context: {
        title: 'Editar documento del contrato',
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

  DeleteConfirmFileContract(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteFileContract.bind(this),
      },
    });
  }

  DeleteFileContract(data) {
    return this.FileContractS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

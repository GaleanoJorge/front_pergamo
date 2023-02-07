import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormInformedConsentsComponent } from './form-informed-consents/form-informed-consents.component';
import { ActionsInformedComponent } from './actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { Actions23Component } from './actions2.component';
import { ConsentsInformedService } from '../../../business-controller/consents-informed.service';

@Component({
  selector: 'ngx-informed-consents',
  templateUrl: './informed-consents.component.html',
  styleUrls: ['./informed-consents.component.scss']
})
export class InformedConsentsComponent implements OnInit {

  // @Input() ch_record: any;
  public isSubmitted = false;
  public entity:string;
  public routes = [];
  public messageError: string = null;
  public title: string = 'Consentimientos informados';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Documento'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public ch_record:number;

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
        renderComponent: ActionsInformedComponent,
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
        renderComponent: Actions23Component,

      }
    },
  };

  constructor(
    private ConsentsInformedS: ConsentsInformedService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    if(this.route.snapshot.params.id){
      this.ch_record = this.route.snapshot.params.id;
      // this.entity = this.ch_record ? 'InformedConsents/FileByRecord/' + this.ch_record : 'consents_informed';
      this.entity = this.ch_record ? 'InformedConsents/FileByRecord/' + this.ch_record : 'consents_informed';
    }else{
      this.entity='consents_informed';
    }

    this.routes = [
      {
        name: 'Registro Historia Clinica',
        route: '../../list',
      },
      {
        name: 'Consentimientos informados',
        route: '../../informed-consents/' + this.ch_record,
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
    this.dialogFormService.open(FormInformedConsentsComponent, {
      context: {
        title: 'Crear nuevo documento del contrato',
        saved: this.RefreshData.bind(this),
        ch_record:this.ch_record,
      },
    });
  }

  EditFileContract(data) {
    this.dialogFormService.open(FormInformedConsentsComponent, {
      context: {
        title: 'Editar documento del contrato',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

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
    return this.ConsentsInformedS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

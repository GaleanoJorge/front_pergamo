import { Component, OnInit, ViewChild } from '@angular/core';
import { BriefcaseService } from '../../../business-controller/briefcase.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormBriefcaseComponent } from './form-briefcase/form-briefcase.component';
import { ActionsComponent } from './actions.component';
import { Actions3Component } from './actions3.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CampusBriefcaseService } from '../../../business-controller/campus-briefcase.service';
import { ContractService } from '../../../business-controller/contract.service';
import { ItemRolePermissionBusinessService } from '../../../business-controller/item-role-permission-business.service';


@Component({
  selector: 'ngx-briefcase',
  templateUrl: './briefcase.component.html',
  styleUrls: ['./briefcase.component.scss']
})
export class BriefcaseComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public messageError: string = null;
  public title: string;
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Sede', 'Cobertura', 'Modalidad', 'Tipo de autorización', 'Estado'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public id;
  public campus_briefcase: any[];
  public campus: string;
  public contract_id: number;
  public contract: any[] = [];
  public role_permisos = [];
  public result;

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
            'role_permisos': this.role_permisos,
            'edit': this.EditBriefcase.bind(this),
            'delete': this.DeleteConfirmBriefcase.bind(this),
          };

        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      campus: {
        title: this.headerFields[2],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'campus': this.campus_briefcase,
            'data': row,
          };
        },
        renderComponent: Actions3Component,
      },
      coverage: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      modality: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      type_auth: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value == 1) {
            return 'Post';
          } else {
          return 'Pre';
          }
        },
      },
      status: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Contratos',
      route: '../../list',
    },
    {
      name: 'Portafolio',
      route: '../../briefcase',
    },
  ];

  constructor(
    private BriefcaseS: BriefcaseService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private route: ActivatedRoute,
    private CampusBriefcaseS: CampusBriefcaseService,
    private ContractS: ContractService,
  ) {
  }

  async ngOnInit() {
    var permisos = JSON.parse(localStorage.getItem('permissions'));
    permisos.forEach(x => {
      if (x.item_id == 116) {
        this.role_permisos.push(x.permission_id);
      }
    });
    this.contract_id = this.route.snapshot.params.id;
    if (this.route.snapshot.params.id) {
      this.contract_id = this.route.snapshot.params.id;
      this.entity = this.contract_id ? 'briefcasecontract/briefcaseByContract/' + this.contract_id : 'briefcase';
    } else {
      this.entity = 'briefcase';
    }
    this.CampusBriefcaseS.GetCollection().then(x => {
      this.campus_briefcase = x;
    });
    await this.ContractS.GetCollection().then(x => {
      this.contract = x;
    });
    this.result = this.contract.find(contract => contract.id == this.route.snapshot.params.id);
    this.title = 'Portafolios de ' + this.result.name;
  }
  async GetAmount(id) {
    await this.CampusBriefcaseS.GetByBriefcase(id).then(x => {
      var arrdta = [];
      this.campus_briefcase = x.data;
      this.campus_briefcase.forEach(element => {
        arrdta.push(element.campus.name);
      });
      this.campus = arrdta.join();
    });
  }
  RefreshData() {

    this.table.refresh();
  }

  NewBriefcase() {
    this.dialogFormService.open(FormBriefcaseComponent, {
      context: {
        title: 'Crear nuevo portafolio',
        saved: this.RefreshData.bind(this),
        contract_id: this.contract_id,
      },
    });
  }

  EditBriefcase(data) {
    this.dialogFormService.open(FormBriefcaseComponent, {
      context: {
        title: 'Editar portafolio',
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

  DeleteConfirmBriefcase(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteBriefcase.bind(this),
      },
    });
  }

  DeleteBriefcase(data) {
    return this.BriefcaseS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

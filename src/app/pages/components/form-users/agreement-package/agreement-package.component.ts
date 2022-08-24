import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup } from '@angular/forms';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { Component,  EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AgreementCheckComponent } from './agreement-check.component';
import { UserPharmacyStockService } from '../../../../business-controller/user-pharmacy-stock.service';
import { UserRoleBusinessService } from '../../../../business-controller/user-role-business.service';

@Component({
  selector: 'ngx-agreement-package',
  templateUrl: './agreement-package.component.html',
  styleUrls: ['./agreement-package.component.scss'],
})
export class AgreementPackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  @Input() agreementData: any = [];
  public messageError = null;

  public form: FormGroup;
  public title = 'Asignación de convenios para PAD';
  public subtitle = '';
  public headerFields: any[] = ['ID', 'Identificación', 'Verificación', 'Nombre', 'Administrador'];
  public routes = [];
  public row;
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];
  public emit: any[] = [];
  public data: any = [];
  public dialog;
  public inscriptionstatus = 0;
  public selectedRows: any;
  public inscriptionId;
  public entity;
  public customData;
  public users;
  public saved: any = null;


  public procedure_package_id: number;
  public done = false;

  public settings = {
    columns: {
      select: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (!this.done) {
            this.selectedOptions = this.agreementData.selectedOptions;
            this.emit = this.agreementData.selectedOptions;
            this.agreementData.selectedOptions.forEach(x => {
              this.selectedOptions2.push(x.company_id);
            });
            this.done = true;
          }
          return {
            'data': row,
            'valid': (!this.selectedOptions2.includes(row.id)) ? false : true,
            'selection': (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: AgreementCheckComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      identification: {
        title: this.headerFields[1],
        type: 'string',
      },
      verification: {
        title: this.headerFields[2],
        type: 'string',
      },
      name: {
        title: this.headerFields[3],
        type: 'string',
      },
    },
  };

  constructor(
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private UserPharmacyStockS: UserPharmacyStockService,
    private userRoleS: UserRoleBusinessService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.data = {
    };

    this.selectedOptions = this.agreementData.sele
  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions2.push(row.id);
      var diet = {
        company_id: row.id,
      };
      this.emit.push(diet);
    } else {
      this.emit = [];
      let i = this.selectedOptions2.indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
      var j = 0;
      this.selectedOptions.forEach(element => {
        if (this.selectedOptions2.includes(element.company_id)) {
          this.emit.push(element);
        }
        j++;
      });
    }
    this.selectedOptions = this.emit;
    this.messageEvent.emit(this.selectedOptions);
  }
  // RefreshData() {
  //   this.table.refresh();
  // }
  saveGroup() {
    if (!this.selectedOptions.length) {
      this.toastS.danger(null, 'Debe seleccionar al menos un item');
    }
    else {
      this.userRoleS.UpdateRoles({
        user_id: this.data.id,
        roles: JSON.stringify(this.selectedOptions),
      }).then(x => {
        this.toastS.success(x.message, 'Correcto');
        // this.RefreshData();
        if (this.saved) {
          this.saved();
        }
      }).catch(x => {
      });
    }
  }
}

import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { Component,  EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { CupsCheckComponent } from './cups-check.component';
import { UserPharmacyStockService } from '../../../../business-controller/user-pharmacy-stock.service';
import { UserRoleBusinessService } from '../../../../business-controller/user-role-business.service';
import { AssistanceProcedureService } from '../../../../business-controller/assistance-procedure.service';


@Component({
  selector: 'ngx-cups-package',
  templateUrl: './cups-package.component.html',
  styleUrls: ['./cups-package.component.scss'],
})
export class CupsPackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  @Input() data: any;

  public messageError = null;
  public form: FormGroup;
  public title = 'CUPS DEL USUARIO';
  public subtitle = '';
  public headerFields: any[] = ['ID', 'Nombre', 'Tipo', 'Estado'];
  public routes = [];
  public row;
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];
  public emit: any[] = [];
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
            this.data.assistance.assistance_procedure?.forEach(x => {
              this.selectedOptions2.push(x.procedure_id);
            });
            this.selectedOptions = this.selectedOptions2;
            this.done = true;
          }
          return {
            'data': row,
            'valid': (!this.selectedOptions2.includes(row.id)) ? false : true,
            'selection': (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: CupsCheckComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      code: {
        title: this.headerFields[1],
        type: 'string',
      },
      equivalent: {
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
    protected dialogRef: NbDialogRef<any>,
    private userRoleS: UserRoleBusinessService,
    private AssistanceProcedureS: AssistanceProcedureService
  ) {
  }

  async ngOnInit(): Promise<void> {
  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions2.push(row.id);
    } else {
      let i = this.selectedOptions2.indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
    }
    this.selectedOptions = this.selectedOptions2;
  }
  // RefreshData() {
  //   this.table.refresh();
  // }
  close() {
    this.dialogRef.close();
  }
  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }
  saveGroup() {
    if (!this.selectedOptions.length) {
      this.toastS.danger(null, 'Debe seleccionar al menos un item');
    }
    else {
      this.AssistanceProcedureS.UpdateProcedures({
        assistance_id: this.data.assistance_id,
        procedure: JSON.stringify(this.selectedOptions),
      }).then(x => {
        this.toastS.success(x.message, 'Correcto');
        // this.RefreshData();
        this.close();
        if (this.saved) {
          this.saved();
        }
      }).catch(x => {
      });
    }
  }
}

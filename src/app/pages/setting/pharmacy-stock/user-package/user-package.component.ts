import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { Component,  EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { UserComponent } from './user.component';
import { UserPharmacyStockService } from '../../../../business-controller/user-pharmacy-stock.service';

@Component({
  selector: 'ngx-user-package',
  templateUrl: './user-package.component.html',
  styleUrls: ['./user-package.component.scss'],
})
export class UserPackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  public messageError = null;

  public form: FormGroup;
  public title = 'USUARIOS';
  public subtitle = '';
  public headerFields: any[] = ['IDENTIFICACIÓN', 'NOMBRE COMPLETO'];
  public routes = [];
  public row;
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];
  public emit: any[] = [];
  public data = [];
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
  public settings;

  public settings_supplies = {
    columns: {
      select: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (!this.done) {
            this.data['user_pharmacy_stock'].forEach(x => {
              this.selectedOptions2.push(x.user_id);
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
        renderComponent: UserComponent,
      },
      identification: {
        title: this.headerFields[0],
        type: 'string',

      },
      nombre_completo: {
        title: this.headerFields[1],
        type: 'string',
      }
    },
  };

  constructor(
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private UserPharmacyStockS: UserPharmacyStockService,
    protected dialogRef: NbDialogRef<any>,
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
      this.toastS.danger(null, 'Debe seleccionar al menos un Usuario');
    }
    else {
      this.UserPharmacyStockS.Save({
        pharmacy_stock_id: this.data['id'],
        users: JSON.stringify(this.selectedOptions),
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

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActionsComponent } from '../../setting/sectional-council/actions.component';
import { FormCategoryApprovalComponent } from '../category-approval/form-category-approval/form-category-approval.component';
import { NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { CategoryApprovalBusinessService } from '../../../business-controller/category-approval-business.service';
import { StatsApprovalComponent } from './stats-approval.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-category-approval',
  templateUrl: './category-approval.component.html',
  styleUrls: ['./category-approval.component.scss'],
})
export class CategoryApprovalComponent implements OnInit {
  @Input() category_id: number = null;

  public title = 'Acuerdo de Aprobación';
  public messageError = null;
  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'edit': this.EditModule.bind(this),
            'delete': this.DeleteConfirmModule.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: 'ID',
        type: 'string',
      },
      approval_file: {
        title: 'Archivo de Aprobación',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
          };
        },
        renderComponent: StatsApprovalComponent
        ,
      },
      approval_date: {
        title: 'Fecha de Aprobación',
        type: 'date',
        valuePrepareFunction: (value, row) => {
          return this.CambiarFecha(value)

        },
      },
    },
  };


  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private dialogFormService: NbDialogService,
    private categoryApprovalBS: CategoryApprovalBusinessService,
    public datepipe: DateFormatPipe,
  ) {
  }
  public approval_date: any;
  public data: any;
  ngOnInit(): void {

  }

  CambiarFecha(value) {
    var fecha = this.datepipe.transform2(value);
    return fecha;
  }
  RefreshData() {
    this.table.refresh();
  }

  NewModule() {
    this.dialogFormService.open(FormCategoryApprovalComponent, {
      context: {
        title: 'Crear nuevo acuerdo de Aprobación',
        saved: this.RefreshData.bind(this),
        category_id: this.category_id,
        moduleEdit: false,
      },
    });
  }

  EditModule(data) {
    this.data = data;
    data.approval_date = this.datepipe.transform2(data.approval_date);
    this.dialogFormService.open(FormCategoryApprovalComponent, {
      context: {
        title: 'Editar acuerdo de Aprobación',
        data,
        saved: this.RefreshData.bind(this),
        moduleEdit: false,
        category_id: this.category_id,

      },
    });
  }

  DeleteConfirmModule(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteModule.bind(this),
      },
    });
  }

  DeleteModule(data) {
    return this.categoryApprovalBS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

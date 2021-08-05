import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActionsComponent } from '../../setting/sectional-council/actions.component';
import { FormCategoryApprovalComponent } from '../category-approval/form-category-approval/form-category-approval.component';
import { NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { CategoryApprovalBusinessService } from '../../../business-controller/category-approval-business.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss'],
})
export class SubCategoryComponent implements OnInit {
  @Input() category_id: number = null;
  public category;
  

  public title = 'Subprogramas';
  public messageError = null;
  public settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'string',
      },
      name: {
        title: 'Nombre',
        type: 'string',
      },
      description: {
        title: 'Descripción',
        type: 'string',
      },
      category: {
        title: 'Programa padre',
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if(row.category_parent_id==null){
          return 'N/A';
          }else{
            return row.category.name;
          }
        },
      },
  }
};


  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private dialogFormService: NbDialogService,
    private categoryApprovalBS: CategoryApprovalBusinessService,
    public datepipe: DateFormatPipe,
  ) {
  }
  public data: any;
  ngOnInit(): void {

  }


  RefreshData() {
    this.table.refresh();
  }


}

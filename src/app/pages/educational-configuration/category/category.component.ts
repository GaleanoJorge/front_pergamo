import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { CategoryBusinessService } from '../../../business-controller/category-business.service';
import { NewCategoryService } from '../../../business-controller/new-category.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ActionsCategoryComponent } from './actions-category.component';
import { ActionsCategory2Component } from './actions-category2.component';

@Component({
  selector: 'ngx-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Input() origin_id?= null;

  public categories = [];
  public selectedItemNgModel: number;
  public title = 'Programas';
  public entity: string;
  public createLink: string;
  public messageError = null;
  public modal;
  public program;

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            // 'delete': this.DeleteConfirmProgram.bind(this),
          };
        },
        renderComponent: ActionsCategoryComponent,
      },
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
        sort:false,
        valuePrepareFunction: (value, row) => {
          if(row.category_parent_id==null){
          return 'N/A';
          }else{
            return row.category.name;
          }
        },
      },
    },
  };

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private dialogFormService: NbDialogService,
    private categoryBS: CategoryBusinessService,
    private categoryNBS: NewCategoryService,
    private toastService: NbToastrService,
    private toastS: NbToastrService
  ) {
  }

  ngOnInit(): void {
    if (this.origin_id) {
      this.settings.columns.actions = {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'delete': this.DeleteCategoryOriginConfirm.bind(this),
          };
        },
        renderComponent: ActionsCategory2Component,
      };
    }
    this.entity = this.origin_id ? 'category/categoryByOrigin/' + this.origin_id : 'category';
    this.createLink = this.origin_id ? '/pages/educationalconfiguration/origin/' + this.origin_id + '/category/create' : 'create';
    this.categoryNBS.GetAll().then(x => {
      this.categories = x;
    });
  }

  DeleteCategoryOriginConfirm(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCategoryOrigin.bind(this),
      },
    });
  }
  ChangeProgram(program){
      this.program = program;
      this.table.changeEntity(`category/byprogram/${this.program}`);
      // this.RefreshData();
  
  }

  DeleteCategoryOrigin(data) {
    let dataFilter = data.categories_origin;
    let id = dataFilter.filter(dataFilter => dataFilter.origin_id == this.origin_id)[0].id;
    return this.categoryBS.DeleteCategoryOrigin(id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  AddCategoryOrigin() {
    if(this.selectedItemNgModel){
    this.categoryBS.SaveCategoryOrigin({
      origin_id: this.origin_id,
      category_id: this.selectedItemNgModel
    }).then(x => {
      this.toastService.success('', x.message);
      this.table.refresh();
      this.modal.close();
    }).catch(x => {
      this.toastService.danger('', x);
    });
    }else{
      this.toastS.danger(null, 'Debe seleccionar un programa');
    }
  }
  open(dialog: TemplateRef<any>) {
    this.modal = this.dialogFormService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

}

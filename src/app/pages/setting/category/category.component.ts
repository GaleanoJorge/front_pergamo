import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { StatusBusinessService } from '../../../business-controller/status-business.service';
import { Category } from '../../../models/category';
import { CategoryBusinessService } from '../../../business-controller/category-business.service';
import { Origin } from '../../../models/origin';
import { OriginBusinessService } from '../../../business-controller/origin-business.service';

@Component({
  selector: 'ngx-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public categoryForm: FormGroup;
  public origins: Origin[] = [];
  public isSubmitted = false;
  public messageError: string = null;
  public category: Category;
  public dialog;
  routes = [
    {
      name: "Categorías",
      route: "../../setting/categories"
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    public categoryBS: CategoryBusinessService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    public statusBS: StatusBusinessService,
    public originBS: OriginBusinessService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      category_parent_id: [''],
      origin_id: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      description: [''],
      status_id: ['', Validators.compose([Validators.required])]
    });
    this.statusBS.GetCollection().then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
    this.originBS.GetCollection().then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
    this.GetCategories();
  }

  saveCategory() {
    this.isSubmitted = true;
    if (!this.categoryForm.invalid)
      if (this.category)
        this.categoryBS.Update({
          id: this.category.id,
          categoria_padre: this.categoryForm.controls.category_parent_id.value,
          origen: this.categoryForm.controls.origin_id.value,
          nombre: this.categoryForm.controls.name.value,
          estado: this.categoryForm.controls.status_id.value,
          descripcion: this.categoryForm.controls.description.value
        }).then(x => {
          this.toastrService.success("", x.message);
          this.GetCategories();
        }).catch(x => {
          this.messageError = x;
        });
      else
        this.categoryBS.Save({
          categoria_padre: this.categoryForm.controls.category_parent_id.value,
          origen: this.categoryForm.controls.origin_id.value,
          nombre: this.categoryForm.controls.name.value,
          estado: this.categoryForm.controls.status_id.value,
          descripcion: this.categoryForm.controls.description.value
        }).then(x => {
          this.toastrService.success("", x.message);
          this.GetCategories();
        }).catch(x => {
          this.messageError = x;
        });
  }

  ConfirmDelete(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }

  Cancel() {
    this.category = null;
    this.categoryForm.setValue({
      category_parent_id: '',
      origin_id: '',
      name: '',
      description: '',
      status_id: '',
    });
  }

  DeleteCategory() {
    this.dialog.close();
    if (this.category)
      this.categoryBS.Delete(this.category.id).then(x => {
        this.toastrService.success("", x.message);
        this.GetCategories();
      }).catch(x => {
        this.messageError = x;
      });
  }

  EditCategory(category: Category) {
    this.category = category;
    this.categoryForm.setValue({
      category_parent_id: category.category_parent_id,
      origin_id: category.origin_id,
      name: category.name,
      description: category.description,
      status_id: category.status_id
    });
  }

  GetCategories() {
    this.isSubmitted = false;
    this.Cancel();
    this.categoryBS.GetSingleCollection().then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }

}

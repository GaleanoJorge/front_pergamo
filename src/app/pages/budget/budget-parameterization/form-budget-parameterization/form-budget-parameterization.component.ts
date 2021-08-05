import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidityService} from '../../../../business-controller/validity.service';
import {CategoriesOriginBusinessService} from '../../../../business-controller/categories-origin-business.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-form-budget-parameterization',
  templateUrl: './form-budget-parameterization.component.html',
  styleUrls: ['./form-budget-parameterization.component.scss'],
})
export class FormBudgetParameterizationComponent implements OnInit {
  @Input() title = 'Parametrización de presupuesto';
  @Input() messageError = null;
  @Input() routes = null;

  public form: FormGroup;
  public origins = [];
  public categoriesList = [];
  public loadingData = false;

  public isSubmitted = false;
  public categories = [];

  constructor(
    private formBuilder: FormBuilder,
    private validityS: ValidityService,
    private categoriesOriginBS: CategoriesOriginBusinessService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.categoriesOriginBS.GetAuxData().then(x => {
      this.origins = x.origins;
      this.categoriesList = x.categories;
    });

    this.form = this.formBuilder.group({
      origin_id: ['', Validators.compose([Validators.required])],
      category_id: ['', Validators.compose([Validators.required])],
    });

    this.onChange();
  }

  onChange() {
    this.form.get('category_id').valueChanges.subscribe(val => {
      this.categories = [];
      if (val) {
        this.searchCategoryOrigin();
      }
    });
  }

  searchCategoryOrigin() {
    this.loadingData = true;
    this.categoriesOriginBS.GetByOrigin({
      origin_id: this.form.get('origin_id').value,
      category_id: this.form.get('category_id').value,
    }).then(x => {
      this.categories = x;
      this.loadingData = false;
    }).catch(e => {
      this.loadingData = false;
    });
  }

  async save() {
    this.messageError = null;
    this.isSubmitted = true;

    if (this.form.invalid) return false;

    if (!this.categories.length) {
      this.toastService.danger(null, 'No se han encontrado programas para guardar la información');
      return false;
    }

    try {
      const response = await this.categoriesOriginBS.setArray({
        data: this.categories,
      });

      this.toastService.success(null, response.message);
    } catch (e) {
      this.messageError = e;
    }
  }
}

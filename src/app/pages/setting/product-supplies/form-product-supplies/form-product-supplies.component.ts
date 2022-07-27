import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategoryService } from '../../../../business-controller/product-category.service';
import { ProductSubcategoryService } from '../../../../business-controller/product-subcategory.service';
import { ProductSuppliesService } from '../../../../business-controller/product-supplies.service';
import { ProductGroupService } from '../../../../business-controller/product-group.service';
import { SuppliesMeasureService } from '../../../../business-controller/supplies-measure.service';
import { ProductDoseService } from '../../../../business-controller/product_dose.service';


@Component({
  selector: 'ngx-form-product-supplies',
  templateUrl: './form-product-supplies.component.html',
  styleUrls: ['./form-product-supplies.component.scss']
})
export class FormProductSuppliesComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public product_subcategory: any[];
  public size_supplies_measure: any[];
  public measure_supplies_measure: any[];
  public consumption_unit: any[];
  public product_group: any[];
  public product_category: any[];
  public showMedicine: boolean = false;
  public subcategory: string;
  public size_supplies: string;
  public measure_supplies: string;
  public product_dose: any[];
  public showDose: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private ProductSuppliesS: ProductSuppliesService,
    private toastService: NbToastrService,
    private ProductCategoryS: ProductCategoryService,
    private ProductSubcategoryS: ProductSubcategoryService,
    private ProductGroupS: ProductGroupService,
    private SuppliesMeasureS: SuppliesMeasureService,
    private prodDoseS: ProductDoseService,

  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        minimum_stock: '',
        maximum_stock: '',
        size: '',
        measure: '',
        stature: '',
        measure_supplies_measure_id: '',
        size_supplies_measure_id: '',
        product_dose_id: '',
        dose: '',
      };
    }

    this.form = this.formBuilder.group({
      minimum_stock: [this.data.minimum_stock, Validators.compose([Validators.required])],
      maximum_stock: [this.data.maximum_stock, Validators.compose([Validators.required])],
      size: [this.data.size],
      measure: [this.data.measure],
      stature: [this.data.stature],
      product_group_id: [this.data.product_group_id],
      product_category_id: [this.data.product_category_id],
      product_subcategory_id: [this.data.product_subcategory_id],
      measure_supplies_measure_id: [this.data.measure_supplies_measure_id],
      size_supplies_measure_id: [this.data.size_supplies_measure_id],
      product_dose_id: [this.data.product_dose_id],
      dose: [this.data.dose],

    });


    await this.ProductGroupS.GetCollection({
      id: 2,
    }).then(x => {
      this.product_group = x;
    });


    this.SuppliesMeasureS.GetCollection().then(x => {
      this.size_supplies_measure = x;
    });
    this.SuppliesMeasureS.GetCollection().then(x => {
      this.measure_supplies_measure = x;
    });

    await this.prodDoseS.GetCollection().then(x => {
      this.product_dose = x;
    });


    this.onChanges();
  }

  onChange2(tipoId) {
    if (tipoId == 2) {
      this.showDose = true;
    } else {
      this.showDose = false;
    }
  }

  selectsubcategory(event: Event) {
    let Subcat = this.product_subcategory.find(x => x.id == event);
    this.subcategory = Subcat.name;
    // this.form.controls.description.setValue(this.subcategory);
  }
  selectSizesup(event: Event) {
    let SizeSup = this.size_supplies_measure.find(x => x.id == event);
    this.size_supplies = SizeSup.name;
    // this.form.controls.description.setValue(this.size_supplies);
  }
  selectMeasureSupplies(event: Event) {
    let SupMea = this.measure_supplies_measure.find(x => x.id == event);
    this.measure_supplies = SupMea.name;
    // this.form.controls.description.setValue(this.measure_supplies);
  }

  close() {
    this.dialogRef.close();
  }
  onChange(tipoId) {
    if (tipoId == 1) {
      this.showMedicine = true;
    } else {
      this.showMedicine = false;
    }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.ProductSuppliesS.Update({
          id: this.data.id,
          size: this.form.controls.size.value,
          measure: this.form.controls.measure.value,
          stature: this.form.controls.stature.value,
          description: this.form.controls.measure.value != null ? this.form.controls.size.value == null ? this.subcategory + " " + this.form.controls.measure.value + " " + this.measure_supplies + " x " + this.form.controls.stature.value : this.subcategory + " " + this.form.controls.size.value + " " + this.size_supplies + " x " + this.form.controls.measure.value + " " + this.measure_supplies : this.subcategory + " " + this.form.controls.stature.value,
          minimum_stock: this.form.controls.minimum_stock.value,
          maximum_stock: this.form.controls.maximum_stock.value,
          size_supplies_measure_id: this.form.controls.size_supplies_measure_id.value,
          measure_supplies_measure_id: this.form.controls.measure_supplies_measure_id.value,
          product_dose_id: this.form.controls.product_dose_id.value,
          dose: this.form.controls.dose.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.ProductSuppliesS.Save({
          size: this.form.controls.size.value,
          measure: this.form.controls.measure.value,
          stature: this.form.controls.stature.value,
          size_supplies_measure_id: this.form.controls.size_supplies_measure_id.value,
          measure_supplies_measure_id: this.form.controls.measure_supplies_measure_id.value,
          description: this.form.controls.measure.value != null ? this.form.controls.size.value == null ? this.subcategory + " " + this.form.controls.measure.value + " " + this.measure_supplies + " x " + this.form.controls.stature.value : this.subcategory + " " + this.form.controls.size.value + " " + this.size_supplies + " x " + this.form.controls.measure.value + " " + this.measure_supplies : this.subcategory + " " + this.form.controls.stature.value,
          minimum_stock: this.form.controls.minimum_stock.value,
          maximum_stock: this.form.controls.maximum_stock.value,
          product_dose_id: this.form.controls.product_dose_id.value,
          dose: this.form.controls.dose.value,

        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    }
  }

  onChanges() {
    this.form.get('product_group_id').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.product_category = [];
      } else {
        this.GetCategories(val).then();
      }
      this.form.patchValue({
        product_subcategory_id: '',
      });
    });

    this.form.get('product_category_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.product_subcategory = [];
      } else {
        this.GetSubcategory(val).then();
      }
      this.form.patchValue({
        product_subcategory_id: '',
      });
    });
  }

  onChanges2() {
    this.form.get('product_dose_id').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.product_dose = [];
      } else {
        this.GetCategories(val).then();
      }
    });
  }


  GetCategories(product_group_id, job = false) {
    if (!product_group_id || product_group_id === '') return Promise.resolve(false);
    return this.ProductCategoryS.GetProductCategoryByGroup(product_group_id).then(x => {
      this.product_category = x;
      return Promise.resolve(true);
    });
  }

  GetSubcategory(product_category_id, job = false) {
    if (!product_category_id || product_category_id === '') return Promise.resolve(false);
    return this.ProductSubcategoryS.GetProductSubcategoryByCategory(product_category_id).then(x => {
      this.product_subcategory = x;
      return Promise.resolve(true);
    });
  }
}
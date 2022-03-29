import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {FixedAssetsService} from '../../../../business-controller/fixed-assets.service';
import { ProductPresentationService} from '../../../../business-controller/product-presentation.service';
import {ProductGroupService} from '../../../../business-controller/product-group.service';
import {ProductCategoryService} from '../../../../business-controller/product-category.service';
import {ProductSubcategoryService} from '../../../../business-controller/product-subcategory.service';
import {ConsumptionUnitService} from '../../../../business-controller/consumption-unit.service';
import {FactoryService} from '../../../../business-controller/factory.service';
import {TypeAssetsService} from '../../../../business-controller/type-assets.service';


@Component({
  selector: 'ngx-form-fixed-assets',
  templateUrl: './form-fixed-assets.component.html',
  styleUrls: ['./form-fixed-assets.component.scss']
})
export class FormFixedAssetsComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public product_presentation: any [];
  public product_subcategory: any [];
  public product_group: any [];
  public product_category: any [];
  public consumption_unit: any [];
  public factory: any [];
  public type_assets: any [];




  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private FixedAssetsS: FixedAssetsService,
    private toastService: NbToastrService,
    private ProductPresentationS: ProductPresentationService,
    private ProductGroupS: ProductGroupService,
    private ConsumptionUnitS: ConsumptionUnitService,
    private FactoryS: FactoryService,
    private TypeAssetsS: TypeAssetsService,
    private ProductCategoryS: ProductCategoryService,
    private ProductSubcategoryS: ProductSubcategoryService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        name: '',
        product_presentation_id: '',
        product_subcategory_id: '',
        consumption_unit_id: '',
        factory_id:'',
        type_assets_id:'',
        plate_number:'',
      };   
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      product_presentation_id: [this.data.product_presentation_id, Validators.compose([Validators.required])],
      product_subcategory_id: [this.data.product_subcategory_id, Validators.compose([Validators.required])],
      consumption_unit_id: [this.data.consumption_unit_id, Validators.compose([Validators.required])],
      factory_id: [this.data.factory_id, Validators.compose([Validators.required])],
      type_assets_id: [this.data.type_assets_id, Validators.compose([Validators.required])],
      plate_number: [this.data.plate_number, Validators.compose([Validators.required])],
      product_group_id:[],
      product_category_id:[],
    });

    await this.ProductPresentationS.GetCollection().then(x => {
      this.product_presentation=x;
    });
    await this.ProductGroupS.GetCollection().then(x => {
      this.product_group=x;
    });
    await this.ConsumptionUnitS.GetCollection().then(x => {
      this.consumption_unit=x;
    });

    await this.FactoryS.GetCollection().then(x => {
      this.factory=x;
    });
    await this.TypeAssetsS.GetCollection().then(x => {
      this.type_assets=x;
    });
    this.onChanges();
  }

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.FixedAssetsS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          product_presentation_id: this.form.controls.product_presentation_id.value,
          product_subcategory_id: this.form.controls.product_subcategory_id.value,
          consumption_unit_id: this.form.controls.consumption_unit_id.value,
          factory_id: this.form.controls.factory_id.value,
          type_assets_id: this.form.controls.type_assets_id.value,
          plate_number: this.form.controls.plate_number.value,
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
        
        this.FixedAssetsS.Save({
          name: this.form.controls.name.value,
          product_presentation_id: this.form.controls.product_presentation_id.value,
          product_subcategory_id: this.form.controls.product_subcategory_id.value,
          consumption_unit_id: this.form.controls.consumption_unit_id.value,
          factory_id: this.form.controls.factory_id.value,
          type_assets_id: this.form.controls.type_assets_id.value,
          plate_number: this.form.controls.plate_number.value,  
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

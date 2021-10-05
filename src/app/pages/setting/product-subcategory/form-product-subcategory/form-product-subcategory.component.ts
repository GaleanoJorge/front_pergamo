import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {ProductSubcategoryService} from '../../../../business-controller/product-subcategory.service';
import {ProductCategoryService} from '../../../../business-controller/product-category.service';


@Component({
  selector: 'ngx-form-product-subcategory',
  templateUrl: './form-product-subcategory.component.html',
  styleUrls: ['./form-product-subcategory.component.scss']
})
export class FormProductSubcategoryComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public product_category: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private ProductSubcategoryS: ProductSubcategoryService,
    private ProductCategoryS: ProductCategoryService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        product_category_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      product_category_id: [this.data.product_category_id, Validators.compose([Validators.required])],
    });

    this.ProductCategoryS.GetCollection().then(x => {
      this.product_category=x;
    });

  }
  

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.ProductSubcategoryS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          product_category_id: this.form.controls.product_category_id.value,
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
        this.ProductSubcategoryS.Save({
          name: this.form.controls.name.value,
          product_category_id: this.form.controls.product_category_id.value,
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

}

import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NomProductService } from '../../../../business-controller/nom-product.service';
import { ProductSubcategoryService } from '../../../../business-controller/product-subcategory.service';


@Component({
  selector: 'ngx-form-nom-product',
  templateUrl: './form-nom-product.component.html',
  styleUrls: ['./form-nom-product.component.scss']
})
export class FormNomProductComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public product_sub_category: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private NomProductS: NomProductService,
    private ProductCategoryS: ProductSubcategoryService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        product_subcategory_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      product_subcategory_id: [this.data.product_subcategory_id, Validators.compose([Validators.required])],
    });

    this.ProductCategoryS.GetCollection().then(x => {
      this.product_sub_category=x;
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
        this.NomProductS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          product_subcategory_id: this.form.controls.product_subcategory_id.value,
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
        this.NomProductS.Save({
          name: this.form.controls.name.value,
          product_subcategory_id: this.form.controls.product_subcategory_id.value,
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

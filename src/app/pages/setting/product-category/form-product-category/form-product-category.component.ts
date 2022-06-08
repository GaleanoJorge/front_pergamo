import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {ProductCategoryService} from '../../../../business-controller/product-category.service';
import {ProductGroupService} from '../../../../business-controller/product-group.service';


@Component({
  selector: 'ngx-form-product-category',
  templateUrl: './form-product-category.component.html',
  styleUrls: ['./form-product-category.component.scss']
})
export class FormProductCategoryComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public product_group:any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private ProductCategoryS: ProductCategoryService,
    private ProductGroupS: ProductGroupService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        product_group_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      product_group_id: [this.data.product_group_id, Validators.compose([Validators.required])],
    });

    this.ProductGroupS.GetCollection().then(x => {
      this.product_group=x;
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
        this.ProductCategoryS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          product_group_id: this.form.controls.product_group_id.value,
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
        this.ProductCategoryS.Save({
          name: this.form.controls.name.value,
          product_group_id: this.form.controls.product_group_id.value,
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

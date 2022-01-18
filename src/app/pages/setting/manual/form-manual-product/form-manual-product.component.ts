import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {ProcedureService} from '../../../../business-controller/procedure.service';
import {ProcedureTypeService} from '../../../../business-controller/procedure-type.service';
import { PriceTypeService } from '../../../../business-controller/price-type.service';
import { ManualPriceService } from '../../../../business-controller/manual-price.service';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';


@Component({
  selector: 'ngx-form-manual-product',
  templateUrl: './form-manual-product.component.html',
  styleUrls: ['./form-manual-product.component.scss']
})
export class FormManualProductComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() manual_id;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public procedure_category: any [];
  public gender: any [];
  public procedure_age: any [];
  public procedure_purpose: any [];
  public purpose_service: any [];
  public procedure_type: any [];
  public pbs_type: any [];
  public status: any [];
  public product_gen: any[];
  public showSelect: Boolean = false;
  public price_type: any[] = [];
  public product_id;



  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private ProcedureS: ProcedureService,
    private toastService: NbToastrService,
    private  ManualPriceS: ManualPriceService,
    private ProcedureTypeS: ProcedureTypeService,
    private PriceTypeS: PriceTypeService,
    private ProductGenS: ProductGenericService,

  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        name: '',
        manual_id:'',
        value:'',
        price_type_id:'',
        product_id:'',
        manual_procedure_type_id:'',
      };   
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      manual_id: [this.data.manual_id],
      value: [this.data.value, Validators.compose([Validators.required])],
      price_type_id: [this.data.price_type_id, Validators.compose([Validators.required])],
      product_id: [this.data.procedure_id],
      manual_procedure_type_id: [this.data.manual_procedure_type_id, Validators.compose([Validators.required])],
    });


    await this.ProcedureTypeS.GetCollection().then(x => {
      x.shift();
      this.procedure_type=x;
    });
    await this.ProductGenS.GetCollection().then(x => {
      this.product_gen=x;
    });
    this.PriceTypeS.GetCollection().then(x => {
      this.price_type=x;
    });
  }
  onChange(tipoId) {
    if(tipoId==2){
      this.showSelect=true;
    }else{
      this.showSelect=false;
    }
}

public saveCode(e): void {
  var filter = this.product_gen.filter(product => product.description==e.target.value);
 this.product_id= filter[0].id;
 console.log(this.product_id);
  this.form.controls.name.setValue(e.target.value);

}

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.ManualPriceS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          manual_id: this.manual_id,
          value: this.form.controls.value.value,
          price_type_id: this.form.controls.price_type_id.value,
          product_id: this.product_id,
          manual_procedure_type_id: this.form.controls.manual_procedure_type_id.value,
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
        this.ManualPriceS.Save({
          name: this.form.controls.name.value,
          manual_id: this.manual_id,
          value: this.form.controls.value.value,
          price_type_id: this.form.controls.price_type_id.value,
          product_id: this.product_id,
          manual_procedure_type_id: this.form.controls.manual_procedure_type_id.value,
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

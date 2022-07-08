import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChSuppliesTherapyService } from '../../../business-controller/ch_supplies_therapy.Service';
import { ProductSuppliesService } from '../../../business-controller/product-supplies.service';


@Component({
  selector: 'ngx-form-supplies-therapy',
  templateUrl: './form-supplies-therapy.component.html',
  styleUrls: ['./form-supplies-therapy.component.scss']
})
export class FormSuppliesTherapyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public checked: boolean;
  public suppliesP: any[] = [];
  public product;
 


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private SuppliesS: ChSuppliesTherapyService,
    private productS : ProductSuppliesService,

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        product_id: '',
        amount: '',
        justification: '',

      };
    }

   this.productS.GetCollection().then(x => {
      this.suppliesP = x;
    });
  

    this.form = this.formBuilder.group({
      product_id: [this.data[0] ? this.data[0].product_id : this.data.product_id,],
      amount: [this.data[0] ? this.data[0].amount : this.data.amount,],
      justification: [this.data[0] ? this.data[0].justification : this.data.justification,],
    
           
    });    

    }

    toggle(checked: boolean) {
      this.checked = checked;
    }

    saveCode(e): void {
      var localidentify = this.suppliesP.find(item => item.size == e);
  
      if (localidentify) {
        this.product = localidentify.id;
      } else {
        this.product = null;
        this.form.controls.product.setErrors({ 'incorrect': true });
        this.toastService.warning('', 'Debe seleccionar un item de la lista');
      }
    }
    

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.SuppliesS.Update({
          id: this.data.id,
          product_id: this.product,
          amount: this.form.controls.amount.value,
          justification: this.form.controls.justification.value,
          type_record_id: 1,
          ch_record_id: this.record_id,

        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.SuppliesS.Save({
          product_id: this.product,
          amount: this.form.controls.amount.value,
          justification: this.form.controls.justification.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({  product_id: '', amount: '',  justification:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          if (this.form.controls.has_caregiver.value == true) {
            this.isSubmitted = true;
            this.loading = true;
          } else {
            this.isSubmitted = false;
            this.loading = false;
          }

        });
      }

    }
  }

}

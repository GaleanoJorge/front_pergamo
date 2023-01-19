import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';
import { PharmacyRequestShippingService } from '../../../../business-controller/pharmacy-request-shipping.service';
import { PharmacyStockService } from '../../../../business-controller/pharmacy-stock.service';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { ProductSuppliesService } from '../../../../business-controller/product-supplies.service';
import { ServicesBriefcaseService } from '../../../../business-controller/services-briefcase.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-form-insume-request',
  templateUrl: './form-insume-request.component.html',
  styleUrls: ['./form-insume-request.component.scss']
})
export class FormInsumeRequestComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() parentData: any;
  @Input() record_id: number;
  @Input() user: any;
  @Input() admissions_id: number;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public product_supplies_id: any[];
  public request_pharmacy_stock_id: any[];
  public briefcase;
  public user_pad;

  constructor(
    private formBuilder: FormBuilder,
    private pharmaProdS: PharmacyProductRequestService,
    private pharmaS: PharmacyStockService,
    private toastService: NbToastrService,
    private serviceBriefcaseS: ServicesBriefcaseService,
    private authS: AuthService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        request_amount: '',
        product_supplies_id: '',
        request_pharmacy_stock_id: '',
      };
    }

    this.authS.GetUser();

    this.form = this.formBuilder.group({
      request_amount: [this.data.request_amount, Validators.compose([Validators.required])],
      product_supplies_id: [this.data.product_supplies_id],
      request_pharmacy_stock_id: [this.data.request_pharmacy_stock_id, Validators.compose([Validators.required])],
    });

    await this.pharmaS.GetCollection({type:2} ).then(x => {
      this.request_pharmacy_stock_id = x;
    });
    if(this.user){
      var localidentify = this.user.admissions.find(item => item.id == this.admissions_id);
      if(localidentify){

        await this.serviceBriefcaseS.GetByBriefcase({ type: '3', patient:this.user.id }, localidentify.briefcase_id).then(x => {
          this.product_supplies_id = x;
        });
      } else {
        this.toastService.warning('','Error en admisión');
      }
    }

    this.onChanges();

  }

  onChanges() {
    this.form.get('product_supplies_id').valueChanges.subscribe(val => {
      // console.log(val);
      if (val === '') {
      } else {
        this.briefcase = this.product_supplies_id.find(item => item.manual_price.insume.description == val);
      }

    });
  }

  saveCode(e): void {
    var localidentify = this.product_supplies_id.find(item => item.manual_price.insume.description == e);

    if (localidentify) {
      this.briefcase = localidentify;
    } else {
      this.briefcase = null;
    }
  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.pharmaProdS.Update({
          id: this.data.id,
          request_amount: this.form.controls.request_amount.value,
          record_id: this.record_id,
          type_record_id: 1,
          status: 'PATIENT',
          product_supplies_id: this.briefcase.manual_price.insume.id,
          own_pharmacy_stock_id: this.form.controls.request_pharmacy_stock_id.value,
          user_request_pad_id: this.authS.GetUser().id,
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
        await this.pharmaProdS.Save({
          request_amount: this.form.controls.request_amount.value,
          status: 'PATIENT',
          services_briefcase_id: this.briefcase.id,
          own_pharmacy_stock_id: this.form.controls.request_pharmacy_stock_id.value,
          product_supplies_id: this.briefcase.manual_price.insume.id,
          admissions_id: this.admissions_id,
          type_record_id: 1,
          user_request_pad_id: this.authS.GetUser().id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ 
            request_amount: '',
            product_supplies_id: '',
            request_pharmacy_stock_id: '' 
          });
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

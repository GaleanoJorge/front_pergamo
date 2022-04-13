import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {ProductService} from '../../../../business-controller/product.service';
import {FactoryService} from '../../../../business-controller/factory.service';
import { ProductGenericService} from '../../../../business-controller/product-generic.service';
import {InvimaStatusService} from '../../../../business-controller/invima-status.service';
import {StorageConditionsService} from '../../../../business-controller/storage-conditions.service';
import {RiskService} from '../../../../business-controller/risk.service';



@Component({
  selector: 'ngx-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public factory: any [];
  public product_generic: any [];
  public invima_status: any [];
  public storage_conditions: any [];
  public risk: any [];




  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private ProductS: ProductService,
    private toastService: NbToastrService,
    private  FactoryS: FactoryService,
    private ProductGenericS: ProductGenericService,
    private InvimaStatusS: InvimaStatusService,
    private StorageConditionsS: StorageConditionsService,
    private RiskS: RiskService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        code: '',
        name: '',
        factory_id: '',
        product_generic_id: '',
        invima_registration: '',
        invima_status_id: '',
        sanitary_registration_id: '',
        storage_conditions_id: '',
        risk_id:'',
        code_cum_file:'',
        code_cum_consecutive:'',
        regulated_drug:'',
        high_price:'',
        maximum_dose:'',
        indications:'',
        contraindications:'',
        applications:'',
        minimum_stock:'',
        maximum_stock:'',
        generate_iva:'',
        date_cum:'',
      };   
    }    
    this.form = this.formBuilder.group({      
      code: [this.data.code, Validators.compose([Validators.required])],
      name: [this.data.name, Validators.compose([Validators.required])],
      factory_id: [this.data.factory_id, Validators.compose([Validators.required])],
      product_generic_id: [this.data.product_generic_id, Validators.compose([Validators.required])],
      invima_registration: [this.data.invima_registration, Validators.compose([Validators.required])],
      invima_status_id: [this.data.invima_status_id, Validators.compose([Validators.required])],
      sanitary_registration_id: [this.data.sanitary_registration_id, Validators.compose([Validators.required])],
      storage_conditions_id: [this.data.storage_conditions_id, Validators.compose([Validators.required])],
      risk_id: [this.data.risk_id, Validators.compose([Validators.required])],
      code_cum_file: [this.data.code_cum_file, Validators.compose([Validators.required])],
      code_cum_consecutive: [this.data.code_cum_consecutive, Validators.compose([Validators.required])],
      regulated_drug: [this.data.regulated_drug, Validators.compose([Validators.required])],
      high_price: [this.data.high_price, Validators.compose([Validators.required])],
      maximum_dose: [this.data.maximum_dose, Validators.compose([Validators.required])],
      indications: [this.data.indications, Validators.compose([Validators.required])],
      contraindications: [this.data.contraindications, Validators.compose([Validators.required])],
      applications: [this.data.applications, Validators.compose([Validators.required])],
      minimum_stock: [this.data.minimum_stock, Validators.compose([Validators.required])],
      maximum_stock: [this.data.maximum_stock, Validators.compose([Validators.required])],
      generate_iva: [this.data.generate_iva, Validators.compose([Validators.required])],
      date_cum: [this.data.date_cum, Validators.compose([Validators.required])],
    });

    await this.FactoryS.GetCollection().then(x => {
      this.factory=x;
    });
    await this.ProductGenericS.GetCollection().then(x => {
      this.product_generic=x;
    });
    await this.InvimaStatusS.GetCollection().then(x => {
      this.invima_status=x;
    });
    await this.StorageConditionsS.GetCollection().then(x => {
      this.storage_conditions=x;
    });

    await this.RiskS.GetCollection().then(x => {
      this.risk=x;
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
        this.ProductS.Update({
          id: this.data.id,
          code: this.form.controls.code.value,
          name: this.form.controls.name.value,
          factory_id: this.form.controls.factory_id.value,
          product_generic_id: this.form.controls.product_generic_id.value,
          invima_registration: this.form.controls.invima_registration.value,
          invima_status_id: this.form.controls.invima_status_id.value,
          sanitary_registration_id: this.form.controls.sanitary_registration_id.value,
          storage_conditions_id: this.form.controls.storage_conditions_id.value,
          risk_id: this.form.controls.risk_id.value,
          code_cum_file: this.form.controls.code_cum_file.value,
          code_cum_consecutive: this.form.controls.code_cum_consecutive.value,
          regulated_drug: this.form.controls.regulated_drug.value,
          high_price: this.form.controls.high_price.value,
          maximum_dose: this.form.controls.maximum_dose.value,
          indications: this.form.controls.indications.value,
          contraindications: this.form.controls.contraindications.value,
          applications: this.form.controls.applications.value,
          minimum_stock: this.form.controls.minimum_stock.value,
          maximum_stock: this.form.controls.maximum_stock.value,
          generate_iva: this.form.controls.generate_iva.value,
          date_cum: this.form.controls.date_cum.value,
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
        
        this.ProductS.Save({
          code: this.form.controls.code.value,
          name: this.form.controls.name.value,
          factory_id: this.form.controls.factory_id.value,
          product_generic_id: this.form.controls.product_generic_id.value,
          invima_registration: this.form.controls.invima_registration.value,
          invima_status_id: this.form.controls.invima_status_id.value,
          sanitary_registration_id: this.form.controls.sanitary_registration_id.value,
          storage_conditions_id: this.form.controls.storage_conditions_id.value,
          risk_id: this.form.controls.risk_id.value,
          code_cum_file: this.form.controls.code_cum_file.value,
          code_cum_consecutive: this.form.controls.code_cum_consecutive.value,
          regulated_drug: this.form.controls.regulated_drug.value,
          high_price: this.form.controls.high_price.value,
          maximum_dose: this.form.controls.maximum_dose.value,
          indications: this.form.controls.indications.value,
          contraindications: this.form.controls.contraindications.value,
          applications: this.form.controls.applications.value,
          minimum_stock: this.form.controls.minimum_stock.value,
          maximum_stock: this.form.controls.maximum_stock.value,
          generate_iva: this.form.controls.generate_iva.value,    
          date_cum: this.form.controls.date_cum.value,    
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

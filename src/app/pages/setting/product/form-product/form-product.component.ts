import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { ProductService } from '../../../../business-controller/product.service';
import { FactoryService } from '../../../../business-controller/factory.service';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { InvimaStatusService } from '../../../../business-controller/invima-status.service';
import { StorageConditionsService } from '../../../../business-controller/storage-conditions.service';
import { RiskService } from '../../../../business-controller/risk.service';
import { PackingService } from '../../../../business-controller/packing.service';

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
  public factory: any[];
  public product_generic: any[] = [];
  public invima_status: any[];
  public storage_conditions: any[];
  public packing: any[];
  public showReg: boolean = false;
  public product_id;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private ProductS: ProductService,
    private toastService: NbToastrService,
    private FactoryS: FactoryService,
    private ProductGenericS: ProductGenericService,
    private InvimaStatusS: InvimaStatusService,
    private StorageConditionsS: StorageConditionsService,
    private packingS: PackingService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        name: '',
        factory_id: '',
        product_generic_id: '',
        invima_registration: '',
        invima_status_id: '',
        sanitary_registration_id: '',
        storage_conditions_id: '',
        code_cum_file: '',
        code_cum_consecutive: '',
        regulated_drug: '',
        high_price: '',
        maximum_dose: '',
        indications: '',
        contraindications: '',
        applications: '',
        date_cum: '',
        value_circular: '',
        circular: '',
        unit_packing: '',
        packing_id: '',
        refrigeration: '',
        useful_life: '',
        code_cum: '',
      };
    }
    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      factory_id: [this.data.factory_id, Validators.compose([Validators.required])],
      product_generic_id: [this.product_id, Validators.compose([Validators.required])],
      invima_registration: [this.data.invima_registration, Validators.compose([Validators.required])],
      invima_status_id: [this.data.invima_status_id, Validators.compose([Validators.required])],
      sanitary_registration_id: [this.data.sanitary_registration_id, Validators.compose([Validators.required])],
      storage_conditions_id: [this.data.storage_conditions_id, Validators.compose([Validators.required])],
      code_cum_file: [this.data.code_cum_file, Validators.compose([Validators.required])],
      code_cum_consecutive: [this.data.code_cum_consecutive, Validators.compose([Validators.required])],
      regulated_drug: [this.data.regulated_drug, Validators.compose([Validators.required])],
      high_price: [this.data.high_price],
      maximum_dose: [this.data.maximum_dose],
      indications: [this.data.indications],
      contraindications: [this.data.contraindications],
      applications: [this.data.applications],
      value_circular: [this.data.value_circular],
      circular: [this.data.circular],
      date_cum: [this.data.date_cum, Validators.compose([Validators.required])],
      unit_packing: [this.data.unit_packing, Validators.compose([Validators.required])],
      packing_id: [this.data.packing_id, Validators.compose([Validators.required])],
      refrigeration: [this.data.refrigeration, Validators.compose([Validators.required])],
      useful_life: [this.data.useful_life, Validators.compose([Validators.required])],
      code_cum: [this.data.code_cum, Validators.compose([Validators.required])],
    });

    await this.FactoryS.GetCollection().then(x => {
      this.factory = x;
    });
    await this.ProductGenericS.GetCollection().then(x => {
      this.product_generic = x;
    });
    await this.InvimaStatusS.GetCollection().then(x => {
      this.invima_status = x;
    });
    await this.StorageConditionsS.GetCollection().then(x => {
      this.storage_conditions = x;
    });
    await this.packingS.GetCollection().then(x => {
      this.packing = x;
    });

    this.form.get("regulated_drug").valueChanges.subscribe(val => {
      if (val == 0) {
        this.showReg = false;
      } else {
        this.showReg = true;
      }
    });
    this.onchangeForm(1);
  }

  close() {
    this.dialogRef.close();
  }

  saveCode(e): void {
    var localidentify = this.product_generic.find(item => item.description == e);

    if (localidentify) {
      this.product_id = localidentify.id;
    } else {
      this.product_id = null;
      this.form.controls.product_generic_id.setErrors({ 'incorrect': true });
      this.toastService.warning('', 'Debe seleccionar un item de la lista');
    }
  }

  onchangeForm(event) {
    var cum = this.form.controls.code_cum_file.value;
    var consec = this.form.controls.code_cum_consecutive.value;
    if (consec == '') {
     this.form.patchValue({code_cum: cum});
    } else {
      var concaten = cum + " - " + consec;
     this.form.patchValue({code_cum: concaten});
    }
  }


  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.ProductS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          factory_id: this.form.controls.factory_id.value,
          product_generic_id: this.product_id,
          invima_registration: this.form.controls.invima_registration.value,
          invima_status_id: this.form.controls.invima_status_id.value,
          sanitary_registration_id: this.form.controls.sanitary_registration_id.value,
          storage_conditions_id: this.form.controls.storage_conditions_id.value,
          code_cum_file: this.form.controls.code_cum_file.value,
          code_cum_consecutive: this.form.controls.code_cum_consecutive.value,
          regulated_drug: this.form.controls.regulated_drug.value,
          high_price: this.form.controls.high_price.value,
          maximum_dose: this.form.controls.maximum_dose.value,
          indications: this.form.controls.indications.value,
          contraindications: this.form.controls.contraindications.value,
          applications: this.form.controls.applications.value,
          value_circular: this.form.controls.value_circular.value,
          circular: this.form.controls.circular.value,
          date_cum: this.form.controls.date_cum.value,
          unit_packing: this.form.controls.unit_packing.value,
          packing_id: this.form.controls.packing_id.value,
          refrigeration: this.form.controls.refrigeration.value,
          useful_life: this.form.controls.useful_life.value,
          code_cum: this.form.controls.code_cum.value,
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
          name: this.form.controls.name.value,
          factory_id: this.form.controls.factory_id.value,
          product_generic_id: this.product_id,
          invima_registration: this.form.controls.invima_registration.value,
          invima_status_id: this.form.controls.invima_status_id.value,
          sanitary_registration_id: this.form.controls.sanitary_registration_id.value,
          storage_conditions_id: this.form.controls.storage_conditions_id.value,
          code_cum_file: this.form.controls.code_cum_file.value,
          code_cum_consecutive: this.form.controls.code_cum_consecutive.value,
          regulated_drug: this.form.controls.regulated_drug.value,
          high_price: this.form.controls.high_price.value,
          maximum_dose: this.form.controls.maximum_dose.value,
          indications: this.form.controls.indications.value,
          contraindications: this.form.controls.contraindications.value,
          applications: this.form.controls.applications.value,
          value_circular: this.form.controls.value_circular.value,
          circular: this.form.controls.circular.value,
          date_cum: this.form.controls.date_cum.value,
          unit_packing: this.form.controls.unit_packing.value,
          packing_id: this.form.controls.packing_id.value,
          refrigeration: this.form.controls.refrigeration.value,
          useful_life: this.form.controls.useful_life.value,
          code_cum: this.form.controls.code_cum.value,
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

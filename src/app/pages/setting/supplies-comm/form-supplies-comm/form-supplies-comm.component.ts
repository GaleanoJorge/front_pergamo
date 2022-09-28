import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../business-controller/product.service';
import { FactoryService } from '../../../../business-controller/factory.service';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { InvimaStatusService } from '../../../../business-controller/invima-status.service';
import { StorageConditionsService } from '../../../../business-controller/storage-conditions.service';
import { PackingService } from '../../../../business-controller/packing.service';
import { ProductSuppliesService } from '../../../../business-controller/product-supplies.service';
import { ProductSuppliesComService } from '../../../../business-controller/product-supplies-com.service';

@Component({
  selector: 'ngx-form-supplies-comm',
  templateUrl: './form-supplies-comm.component.html',
  styleUrls: ['./form-supplies-comm.component.scss']
})
export class FormSuppliesCommComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public factory: any[];
  public product_supplies: any[];
  public invima_status: any[];
  public storage_conditions: any[];
  public packing: any[];
  public product_id ;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private ProductSuppliesComS: ProductSuppliesComService,
    private toastService: NbToastrService,
    private FactoryS: FactoryService,
    private ProductSuppliesS: ProductSuppliesService,
    private InvimaStatusS: InvimaStatusService,
    private StorageConditionsS: StorageConditionsService,
    private packingS: PackingService,
    private toastS: NbToastrService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        name: '',
        factory_id: '',
        product_supplies_id: '',
        invima_registration: '',
        invima_status_id: '',
        sanitary_registration_id: '',
        packing_id: '',
        unit_packing: '',
        code_udi: '',
        useful_life: '',
        date_cum: '',
      };
    }
    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      product_supplies_id: [this.data.product_supplies_id, Validators.compose([Validators.required])],
      factory_id: [this.data.factory_id, Validators.compose([Validators.required])],
      invima_registration: [this.data.invima_registration, Validators.compose([Validators.required])],
      invima_status_id: [this.data.invima_status_id, Validators.compose([Validators.required])],
      date_cum: [this.data.date_cum, Validators.compose([Validators.required])],
      sanitary_registration_id: [this.data.sanitary_registration_id, Validators.compose([Validators.required])],
      code_udi: [this.data.code_udi],
      unit_packing: [this.data.unit_packing, Validators.compose([Validators.required])],
      packing_id: [this.data.packing_id, Validators.compose([Validators.required])],
      useful_life: [this.data.useful_life, Validators.compose([Validators.required])],
    });

    await this.FactoryS.GetCollection().then(x => {
      this.factory = x;
    });
    await this.ProductSuppliesS.GetCollection().then(x => {
      this.product_supplies = x;
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
  }

  close() {
    this.dialogRef.close();
  }

  saveCode(e): void {
    var localidentify = this.product_supplies.find(item => item.description == e);

    if (localidentify) {
      this.product_id = localidentify.id;
    } else {
      this.product_id = null;
      this.form.controls.product_supplies_id.setErrors({'incorrect': true });
      this.toastService.warning('', 'Debe seleccionar un item de la lista');
    }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.ProductSuppliesComS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          product_supplies_id: this.product_id,
          factory_id: this.form.controls.factory_id.value,
          invima_registration: this.form.controls.invima_registration.value,
          invima_status_id: this.form.controls.invima_status_id.value,
          sanitary_registration_id: this.form.controls.sanitary_registration_id.value,
          code_udi: this.form.controls.code_udi.value,
          date_cum: this.form.controls.date_cum.value,
          unit_packing: this.form.controls.unit_packing.value,
          packing_id: this.form.controls.packing_id.value,
          useful_life: this.form.controls.useful_life.value,
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

        this.ProductSuppliesComS.Save({
          name: this.form.controls.name.value,
          product_supplies_id: this.product_id,
          factory_id: this.form.controls.factory_id.value,
          invima_registration: this.form.controls.invima_registration.value,
          invima_status_id: this.form.controls.invima_status_id.value,
          sanitary_registration_id: this.form.controls.sanitary_registration_id.value,
          code_udi: this.form.controls.code_udi.value,
          date_cum: this.form.controls.date_cum.value,
          unit_packing: this.form.controls.unit_packing.value,
          packing_id: this.form.controls.packing_id.value,
          useful_life: this.form.controls.useful_life.value,
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
  onDatechange1($event) {
    var date = new Date($event.target.value);
    var now_date = new Date;

    if (date < now_date) {
      this.form.controls.date_cum.setErrors({ 'incorrect': true });
      this.toastS.danger(null, 'Confirmar estado del registro sanitario');
    } else {
      this.form.controls.date_cum.setErrors(null);
    }
  }
}

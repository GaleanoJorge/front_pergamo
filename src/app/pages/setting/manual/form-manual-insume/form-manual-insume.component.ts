import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { ProcedureService } from '../../../../business-controller/procedure.service';
import { ProcedureTypeService } from '../../../../business-controller/procedure-type.service';
import { PriceTypeService } from '../../../../business-controller/price-type.service';
import { ManualPriceService } from '../../../../business-controller/manual-price.service';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { ProductSuppliesService } from '../../../../business-controller/product-supplies.service';
import { PatientService } from '../../../../business-controller/patient.service';
  

@Component({
  selector: 'ngx-form-manual-insume',
  templateUrl: './form-manual-insume.component.html',
  styleUrls: ['./form-manual-insume.component.scss']
})
export class FormManualInsumeComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() manual_id;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public procedure_category: any[];
  public gender: any[];
  public procedure_age: any[];
  public procedure_purpose: any[];
  public purpose_service: any[];
  public procedure_type: any[];
  public pbs_type: any[];
  public status: any[];
  public product_supplies: any[];
  public showSelect: Boolean = false;
  public price_type: any[] = [];
  public supplies_id;
  public patient_id;
  public patient: any[] = [];



  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ManualPriceS: ManualPriceService,
    private PriceTypeS: PriceTypeService,
    private ProductSupS: ProductSuppliesService,
    private patientS: PatientService,

  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        name: '',
        manual_id: '',
        value: '',
        price_type_id: '',
        product_id: '',
        description: '',
        has_auth: null,
        patient_id: ''
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
      product_id: [this.data.procedure_id, Validators.compose([Validators.required])],
      has_auth: [this.data.has_auth],
      patient_id: [this.data.patient_id],
      description:[this.data.description]
    });

    await this.ProductSupS.GetCollection().then(x => {
      this.product_supplies = x;
    });
    await this.patientS.GetByAdmission(1).then(x => {
      this.patient = x;
    });
    this.PriceTypeS.GetCollection().then(x => {
      this.price_type = x;
    });
  }
  onChange(tipoId) {
    if (tipoId == 2) {
      this.showSelect = true;
    } else {
      this.showSelect = false;
    }
  }

  checkProduct($event, value) {
    if ($event.relatedTarget != null && $event.relatedTarget.className.includes("productAutocompleteOption")) {
      return;
    }
    if (this.form.controls.product_id.value == null || this.form.controls.product_id.value == '') {
      return;
    }
    var filter = this.product_supplies.find((productOne) => productOne.description == value);
    if (!filter) {
      this.form.controls.product_id.setValue('');
    }
  }

  checkPatient($event, value) {
    if ($event.relatedTarget != null && $event.relatedTarget.className.includes("patientDatalistOption")) {
      return;
    }
    if (this.form.controls.patient_id.value == null || this.form.controls.patient_id.value == '') {
      return;
    }
    var filter = this.patient.find((patientOne) => patientOne.identification == value);
    if (!filter) {
      this.form.controls.patient_id.setValue('');
    }
  }

  public saveCode(e): void {
    var filter = this.product_supplies.find(insume => insume.description == e.target.value);
    if (filter) {
      this.supplies_id = filter.id;
      // console.log(this.supplies_id);
      this.form.controls.name.setValue(e.target.value);
    } else {
      this.supplies_id = null;
      this.toastService.warning('', 'Debe seleccionar un item de la lista');
      this.form.controls.name.setErrors({ 'incorrect': true });
      this.form.controls.name.setValue('');
    }
  }

  public saveCode2(e): void {

    var filter = this.patient.filter(patient => patient.identification == e.target.value);
    if (filter) {
      this.patient_id = filter[0].id;

    }

    else {
      this.toastService.warning('', 'Debe seleccionar un paciente de la lista');
      this.form.controls.patient_id.setErrors({ 'incorrect': true });
    }
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
          supplies_id: this.supplies_id,
          manual_procedure_type_id: 2,
          description: this.form.controls.description.value,
          has_auth: this.form.controls.has_auth.value,
          patient_id: this.patient_id,
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
          supplies_id: this.supplies_id,
          manual_procedure_type_id: 2,
          has_auth: this.form.controls.has_auth.value,
          description: this.form.controls.description.value,
          patient_id: this.patient_id,
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

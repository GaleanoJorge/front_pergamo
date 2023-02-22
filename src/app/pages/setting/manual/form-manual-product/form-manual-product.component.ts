import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { ProcedureService } from '../../../../business-controller/procedure.service';
import { ProcedureTypeService } from '../../../../business-controller/procedure-type.service';
import { PriceTypeService } from '../../../../business-controller/price-type.service';
import { ManualPriceService } from '../../../../business-controller/manual-price.service';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { PatientService } from '../../../../business-controller/patient.service';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'ngx-form-manual-product',
  templateUrl: './form-manual-product.component.html',
  styleUrls: ['./form-manual-product.component.scss'],
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
  public procedure_category: any[];
  public gender: any[];
  public procedure_age: any[];
  public procedure_purpose: any[];
  public purpose_service: any[];
  public procedure_type: any[];
  public pbs_type: any[];
  public status: any[];
  public product_gen: any[];
  public showSelect: Boolean = false;
  public price_type: any[] = [];
  public product_id;
  public patient_id;
  public patient: any[] = [];

  public filteredProductOptions$: Observable<string[]>;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private ProcedureS: ProcedureService,
    private toastService: NbToastrService,
    private ManualPriceS: ManualPriceService,
    private ProcedureTypeS: ProcedureTypeService,
    private PriceTypeS: PriceTypeService,
    private ProductGenS: ProductGenericService,
    private patientS: PatientService
  ) {}

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        name: '',
        manual_id: '',
        value: '',
        price_type_id: '',
        product_id: '',
        description: '',
        patient_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      manual_id: [this.data.manual_id],
      value: [this.data.value, Validators.compose([Validators.required])],
      price_type_id: [
        this.data.price_type_id,
        Validators.compose([Validators.required]),
      ],
      product_id: [this.data.procedure_id, Validators.compose([Validators.required])],
      description: [this.data.description],
      patient_id: [this.data.patient_id],
    });

    await this.ProcedureTypeS.GetCollection().then((x) => {
      x.shift();
      this.procedure_type = x;
    });
    await this.ProductGenS.GetCollection().then((x) => {
      this.product_gen = x;
      this.filteredProductOptions$ = of(this.product_gen);
      this.onFilter();
    });
    await this.patientS.GetByAdmission(1).then((x) => {
      this.patient = x;
    });
    this.PriceTypeS.GetCollection().then((x) => {
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

  onFilter() {
    this.filteredProductOptions$ = this.form
      .get('product_id')
      .valueChanges.pipe(
        startWith(''),
        map((filterString) => this.filter(filterString))
      );
  }

  fillGenericName($event){
    
    var filter = this.product_gen.find((product) => product.description == $event);
    if (filter) {
      this.product_id = filter.id;
      this.form.controls.name.setValue($event);
    } else {
      this.product_id;
      this.toastService.warning('', 'Debe seleccionar un item de la lista');
      this.form.controls.name.setErrors({ incorrect: true });
      this.form.controls.name.setValue('');
    }
  }

  checkProduct($event, value) {
    if ($event.relatedTarget != null && $event.relatedTarget.className.includes("productAutocompleteOption")) {
      return;
    }
    if (this.form.controls.product_id.value == null || this.form.controls.product_id.value == '') {
      return;
    }
    var filter = this.product_gen.find((productOne) => productOne.description == value);
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

  private filter(value: string): string[] {
    const filterValue = value?.toUpperCase();
    return this.product_gen.filter((optionValue) =>
      optionValue.description.includes(filterValue)
    );
  }

  public saveCode(e): void {
    var filter = this.product_gen.find((product) => product.description == e);
    if (filter) {
      this.product_id = filter.id;
      // console.log(this.product_id);
      this.form.controls.name.setValue(e);
    } else {
      this.product_id;
      this.toastService.warning('', 'Debe seleccionar un item de la lista');
      this.form.controls.name.setErrors({ incorrect: true });
      this.form.controls.name.setValue('');
    }
  }

  close() {
    this.dialogRef.close();
  }

  public saveCode2(e): void {
    var filter = this.patient.filter(
      (patient) => patient.identification == e.target.value
    );
    if (filter) {
      this.patient_id = filter[0].id;
    } else {
      this.toastService.warning(
        '',
        'Debe seleccionar un diagnostico de la lista'
      );
      this.form.controls.patient_id.setErrors({ incorrect: true });
    }
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
          manual_procedure_type_id: 2,
          description: this.form.controls.description.value,
          patient_id: this.patient_id,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.close();
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
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
          manual_procedure_type_id: 2,
          description: this.form.controls.description.value,
          patient_id: this.patient_id,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.close();
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      }
    }
  }
}

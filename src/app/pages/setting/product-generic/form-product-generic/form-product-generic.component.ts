import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { MeasurementUnitsService } from '../../../../business-controller/measurement-units.service';
import { ProductPresentationService } from '../../../../business-controller/product-presentation.service';
import { PbsTypeService } from '../../../../business-controller/pbs-type.service';
import { ProductGroupService } from '../../../../business-controller/product-group.service';
import { ProductCategoryService } from '../../../../business-controller/product-category.service';
import { ProductSubcategoryService } from '../../../../business-controller/product-subcategory.service';
import { ConsumptionUnitService } from '../../../../business-controller/consumption-unit.service';
import { AdministrationRouteService } from '../../../../business-controller/administration-route.service';
import { ProductConcentrationService } from '../../../../business-controller/product-concentration.service';
import { ProductDoseService } from '../../../../business-controller/product_dose.service';
import { NomProductService } from '../../../../business-controller/nom-product.service';
import { MultidoseConcentrationService } from '../../../../business-controller/multidose-concentration.service';


@Component({
  selector: 'ngx-form-product-generic',
  templateUrl: './form-product-generic.component.html',
  styleUrls: ['./form-product-generic.component.scss']
})
export class FormProductGenericComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public drug_concentration: any[];
  public measurement_units: any[];
  public product_presentation: any[];
  public pbs_type: any[];
  public nom_product: any[];
  public product_subcategory: any[];
  public consumption_unit: any[];
  public administration_route: any[];
  public product_group: any[];
  public product_category: any[];
  public product_dose: any[];
  public multidose_concentration: any[];
  public showMedicine: boolean = false;
  public showPbs: boolean = false;
  public showInsumo: boolean = false;
  public subcategory: string;
  public dose: string;
  public nomProduct: string;
  public drugconcentration: string;
  public measurementunits: string;
  public productpresentation: string;
  public multidoseconcentration: string;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private ProcedureGenericS: ProductGenericService,
    private toastService: NbToastrService,
    private MeasurementUnitS: MeasurementUnitsService,
    private ProductPresentationS: ProductPresentationService,
    private ProductGroupS: ProductGroupService,
    private ConsumptionUnitS: ConsumptionUnitService,
    private AdministrationRouteS: AdministrationRouteService,
    private PbsTypeS: PbsTypeService,
    private ProductConcentrationS: ProductConcentrationService,
    private ProductCategoryS: ProductCategoryService,
    private ProductSubcategoryS: ProductSubcategoryService,
    private NomProductS: NomProductService,
    private prodDoseS: ProductDoseService,
    private MultidoseConcentrationS: MultidoseConcentrationService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        drug_concentration_id: '',
        measurement_units_id: '',
        product_presentation_id: '',
        description: '',
        pbs_type_id: '',
        nom_product_id: '',
        administration_route_id: '',
        special_controller_medicine: '',
        code_atc: '',
        minimum_stock: '',
        maximum_stock: '',
        product_dose_id: '',
        dose: '',
        prod_ambulatory: false,
        prod_domiciliary: false,
      };
    }

    this.form = this.formBuilder.group({
      drug_concentration_id: [this.data.drug_concentration_id, Validators.compose([Validators.required])],
      measurement_units_id: [this.data.measurement_units_id, Validators.compose([Validators.required])],
      product_presentation_id: [this.data.product_presentation_id, Validators.compose([Validators.required])],
      description: [this.data.description],
      pbs_type_id: [this.data.pbs_type_id, Validators.compose([Validators.required])],
      nom_product_id: [this.data.nom_product_id, Validators.compose([Validators.required])],
      minimum_stock: [this.data.minimum_stock, Validators.compose([Validators.required])],
      maximum_stock: [this.data.maximum_stock, Validators.compose([Validators.required])],
      administration_route_id: [this.data.administration_route_id],
      special_controller_medicine: [this.data.special_controller_medicine],
      code_atc: [this.data.code_atc],
      product_group_id: [this.data.product_group_id],
      product_category_id: [this.data.product_category_id],
      product_subcategory_id: [this.data.product_subcategory_id],
      product_dose_id: [this.data.product_dose_id],
      dose: [this.data.dose],
      multidose_concentration_id: [this.data.multidose_concentration_id],
      prod_ambulatory: [this.data.prod_ambulatory],
      prod_domiciliary: [this.data.prod_domiciliary],
    });

    this.form.controls.description.disable();

    await this.MeasurementUnitS.GetCollection().then(x => {
      this.measurement_units = x;
    });
    await this.ProductPresentationS.GetCollection().then(x => {
      this.product_presentation = x;
    });
    await this.ProductGroupS.GetCollection({ id: 1 }).then(x => {
      this.product_group = x;
    });
    await this.ConsumptionUnitS.GetCollection().then(x => {
      this.consumption_unit = x;
    });

    await this.AdministrationRouteS.GetCollection().then(x => {
      this.administration_route = x;
    });
    await this.PbsTypeS.GetCollection().then(x => {
      this.pbs_type = x;
    });
    await this.prodDoseS.GetCollection().then(x => {
      this.product_dose = x;
    });
    await this.ProductConcentrationS.GetCollection().then(x => {
      this.drug_concentration = x;
    });
    await this.MultidoseConcentrationS.GetCollection().then(x => {
      this.multidose_concentration = x;
    });

    this.onChanges();
    this.onChanges1();
    this.onChanges2();
  }

  selectsubcategory(event: Event) {
    let Subcat = this.nom_product.find(x => x.id == event);
    this.nomProduct = Subcat.name;
    this.form.controls.description.setValue(this.nomProduct);
  }
  selectdrug(event: Event) {
    let drug = this.drug_concentration.find(x => x.id == event);
    this.drugconcentration = drug.value;
    this.form.controls.description.setValue(this.nomProduct + " " + this.drugconcentration);
  }
  selectmeasurement(event: Event) {
    let measurement = this.measurement_units.find(x => x.id == event);
    this.measurementunits = measurement.code;
    this.form.controls.description.setValue(this.nomProduct + " " + this.drugconcentration + " " + this.measurementunits);
  }
  selectpresentation(event: Event) {
    let presentation = this.product_presentation.find(x => x.id == event);
    this.productpresentation = presentation.name;
    this.form.controls.description.setValue(this.nomProduct + " " + this.drugconcentration + " " + this.measurementunits + " " + this.productpresentation);
  }

  selectmulticoncen(event: Event) {
    let concentration = this.multidose_concentration.find(x => x.id == event);
    this.multidoseconcentration = concentration.name;
    this.form.controls.description.setValue(this.nomProduct + " " + this.drugconcentration + " " + this.measurementunits + " " + this.productpresentation + " - " + this.form.controls.dose.value + " " + this.multidoseconcentration);
  }

  close() {
    this.dialogRef.close();
  }
  onChange(tipoId) {
    if (tipoId == 1) {
      this.showMedicine = true;
    } else {
      this.showMedicine = false;
    }
  }

  onChange1(tipoId) {
    if (tipoId == 3) {
      this.showPbs = true;
    } else {
      this.showPbs = false;
    }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.ProcedureGenericS.Update({
          id: this.data.id,
          drug_concentration_id: this.form.controls.drug_concentration_id.value,
          measurement_units_id: this.form.controls.measurement_units_id.value,
          product_presentation_id: this.form.controls.product_presentation_id.value,
          description: this.form.controls.dose.value != null ? this.nomProduct + " " + this.drugconcentration + " " + this.measurementunits + " " + this.productpresentation + "  -  " + this.form.controls.dose.value + " " + this.multidoseconcentration : this.nomProduct + " " + this.drugconcentration + " " + this.measurementunits + " " + this.productpresentation,
          pbs_type_id: this.form.controls.pbs_type_id.value,
          nom_product_id: this.form.controls.nom_product_id.value,
          administration_route_id: this.form.controls.administration_route_id.value,
          special_controller_medicine: this.form.controls.special_controller_medicine.value,
          code_atc: this.form.controls.code_atc.value,
          minimum_stock: this.form.controls.minimum_stock.value,
          maximum_stock: this.form.controls.maximum_stock.value,
          product_dose_id: this.form.controls.product_dose_id.value,
          dose: this.form.controls.dose.value,
          multidose_concentration_id: this.form.controls.multidose_concentration_id.value,
          prod_domiciliary: this.form.controls.prod_domiciliary.value,
          prod_ambulatory: this.form.controls.prod_ambulatory.value,
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
        this.ProcedureGenericS.Save({
          drug_concentration_id: this.form.controls.drug_concentration_id.value,
          measurement_units_id: this.form.controls.measurement_units_id.value,
          product_presentation_id: this.form.controls.product_presentation_id.value,
          description: this.form.controls.dose.value != null ? this.nomProduct + " " + this.drugconcentration + " " + this.measurementunits + " " + this.productpresentation + "  -  " + this.form.controls.dose.value + " " + this.multidoseconcentration : this.nomProduct + " " + this.drugconcentration + " " + this.measurementunits + " " + this.productpresentation,
          pbs_type_id: this.form.controls.pbs_type_id.value,
          nom_product_id: this.form.controls.nom_product_id.value,
          administration_route_id: this.form.controls.administration_route_id.value,
          special_controller_medicine: this.form.controls.special_controller_medicine.value,
          code_atc: this.form.controls.code_atc.value,
          minimum_stock: this.form.controls.minimum_stock.value,
          maximum_stock: this.form.controls.maximum_stock.value,
          product_dose_id: this.form.controls.product_dose_id.value,
          dose: this.form.controls.dose.value,
          multidose_concentration_id: this.form.controls.multidose_concentration_id.value,
          prod_domiciliary: this.form.controls.prod_domiciliary.value,
          prod_ambulatory: this.form.controls.prod_ambulatory.value,
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

  onChanges() {
    this.form.get('product_group_id').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.product_category = [];
      } else {
        this.GetCategories(val).then();
      }
      this.form.patchValue({
        product_subcategory_id: '',
      });
    });

    this.form.get('product_category_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.product_subcategory = [];
      } else {
        this.GetSubcategory(val).then();
      }
      this.form.patchValue({
        nom_product_id: '',
      });
    });

    this.form.get('product_subcategory_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.nom_product = [];
      } else {
        this.GetNomProd(val).then();
      }
    });
  }


  onChanges1() {
    this.form.get('pbs_type_id').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.pbs_type = [];
      } else {
        this.GetCategories(val).then();
      }
    });
  }

  onChanges2() {
    this.form.get('product_dose_id').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.product_dose = [];
      } else {
        this.GetCategories(val).then();
      }
    });
  }

  GetCategories(product_group_id, job = false) {
    if (!product_group_id || product_group_id === '') return Promise.resolve(false);
    return this.ProductCategoryS.GetProductCategoryByGroup(product_group_id).then(x => {
      this.product_category = x;
      return Promise.resolve(true);
    });
  }

  GetSubcategory(product_category_id, job = false) {
    if (!product_category_id || product_category_id === '') return Promise.resolve(false);
    return this.ProductSubcategoryS.GetProductSubcategoryByCategory(product_category_id).then(x => {
      this.product_subcategory = x;
      return Promise.resolve(true);
    });
  }

  GetNomProd(product_subcategory_id, job = false) {
    if (!product_subcategory_id || product_subcategory_id === '') return Promise.resolve(false);
    return this.NomProductS.GetProductSubcategoryByCategory(product_subcategory_id).then(x => {
      this.nom_product = x;
      return Promise.resolve(true);
    });
  }
}
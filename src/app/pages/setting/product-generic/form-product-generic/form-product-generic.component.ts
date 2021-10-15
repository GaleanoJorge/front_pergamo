import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {ProductGenericService} from '../../../../business-controller/product-generic.service';
import {MeasurementUnitsService} from '../../../../business-controller/measurement-units.service';
import { ProductPresentationService} from '../../../../business-controller/product-presentation.service';
import {PbsTypeService} from '../../../../business-controller/pbs-type.service';
import {ProductGroupService} from '../../../../business-controller/product-group.service';
import {ProductCategoryService} from '../../../../business-controller/product-category.service';
import {ProductSubcategoryService} from '../../../../business-controller/product-subcategory.service';
import {ConsumptionUnitService} from '../../../../business-controller/consumption-unit.service';
import {AdministrationRouteService} from '../../../../business-controller/administration-route.service';
import {ProductConcentrationService} from '../../../../business-controller/product-concentration.service';


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
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public drug_concentration: any [];
  public measurement_units: any [];
  public product_presentation: any [];
  public pbs_type: any [];
  public product_subcategory: any [];
  public consumption_unit: any [];
  public administration_route: any [];
  public product_group: any [];
  public product_category: any [];
  public showMedicine:boolean=false;
  public showInsumo:boolean=false;
  public subcategory:string;
  public drugconcentration:string;
  public measurementunits:string;
  public productpresentation:string;




  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private ProcedureGenericS: ProductGenericService,
    private toastService: NbToastrService,
    private  MeasurementUnitS: MeasurementUnitsService,
    private ProductPresentationS: ProductPresentationService,
    private ProductGroupS: ProductGroupService,
    private ConsumptionUnitS: ConsumptionUnitService,
    private AdministrationRouteS: AdministrationRouteService,
    private PbsTypeS: PbsTypeService,
    private ProductConcentrationS: ProductConcentrationService,
    private ProductCategoryS: ProductCategoryService,
    private ProductSubcategoryS: ProductSubcategoryService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        name: '',
        drug_concentration_id: '',
        measurement_units_id: '',
        product_presentation_id: '',
        description: '',
        pbs_type_id: '',
        product_subcategory_id: '',
        consumption_unit_id: '',
        administration_route_id:'',
        special_controller_medicine:'',
        code_atc:'',
        implantable:'',
        reuse:'',
        invasive:'',
        consignment:'',
      };   
    }
    
    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      drug_concentration_id: [this.data.drug_concentration_id, Validators.compose([Validators.required])],
      measurement_units_id: [this.data.measurement_units_id, Validators.compose([Validators.required])],
      product_presentation_id: [this.data.product_presentation_id, Validators.compose([Validators.required])],
      description: [this.data.description],
      pbs_type_id: [this.data.pbs_type_id, Validators.compose([Validators.required])],
      product_subcategory_id: [this.data.product_subcategory_id, Validators.compose([Validators.required])],
      consumption_unit_id: [this.data.consumption_unit_id, Validators.compose([Validators.required])],
      administration_route_id: [this.data.administration_route_id],
      special_controller_medicine: [this.data.special_controller_medicine],
      code_atc: [this.data.code_atc],
      implantable: [this.data.implantable],
      reuse: [this.data.reuse],
      invasive: [this.data.invasive],
      consignment: [this.data.consignment],
      product_group_id:[],
      product_category_id:[],
    });

    this.form.controls.description.disable();

    await this.MeasurementUnitS.GetCollection().then(x => {
      this.measurement_units=x;
    });
    await this.ProductPresentationS.GetCollection().then(x => {
      this.product_presentation=x;
    });
    await this.ProductGroupS.GetCollection().then(x => {
      this.product_group=x;
    });
    await this.ConsumptionUnitS.GetCollection().then(x => {
      this.consumption_unit=x;
    });

    await this.AdministrationRouteS.GetCollection().then(x => {
      this.administration_route=x;
    });
    await this.PbsTypeS.GetCollection().then(x => {
      this.pbs_type=x;
    });
    await this.ProductConcentrationS.GetCollection().then(x => {
      this.drug_concentration=x;
    });
    this.onChanges();
  }

  selectsubcategory(event: Event){
    let Subcat=this.product_subcategory.find(x => x.id == event);
   this.subcategory=Subcat.name;
   this.form.controls.description.setValue(this.form.controls.name.value + " " + this.subcategory);
  }
  selectdrug(event: Event){
    let drug=this.drug_concentration.find(x => x.id == event);
   this.drugconcentration=drug.value;
   this.form.controls.description.setValue(this.form.controls.name.value + " " + this.subcategory + " " +  this.drugconcentration);
  }
  selectmeasurement(event: Event){
    let measurement=this.measurement_units.find(x => x.id == event);
   this.measurementunits=measurement.name;
   this.form.controls.description.setValue(this.form.controls.name.value + " " + this.subcategory + " " +  this.drugconcentration + " " + this.measurementunits);
  }
  selectpresentation(event: Event){
    let presentation=this.product_presentation.find(x => x.id == event);
   this.productpresentation=presentation.name;
   this.form.controls.description.setValue(this.form.controls.name.value + " " + this.subcategory + " " +  this.drugconcentration + " " + this.measurementunits + " " +  this.productpresentation);
  }
  
  close() {
    this.dialogRef.close();
  }

  onChange(tipoId) {
    if(tipoId==1){
      this.showMedicine=true;
      this.showInsumo=false;
    }else{
      this.showInsumo=true;
      this.showMedicine=false;
    }
}

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.ProcedureGenericS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          drug_concentration_id: this.form.controls.drug_concentration_id.value,
          measurement_units_id: this.form.controls.measurement_units_id.value,
          product_presentation_id: this.form.controls.product_presentation_id.value,
          description: this.form.controls.name.value + " " + this.subcategory + " " +  this.drugconcentration + " " + this.measurementunits + " " +  this.productpresentation,
          pbs_type_id: this.form.controls.pbs_type_id.value,
          product_subcategory_id: this.form.controls.product_subcategory_id.value,
          consumption_unit_id: this.form.controls.consumption_unit_id.value,
          administration_route_id: this.form.controls.administration_route_id.value,
          special_controller_medicine: this.form.controls.special_controller_medicine.value,
          code_atc: this.form.controls.code_atc.value,
          implantable: this.form.controls.implantable.value,
          reuse: this.form.controls.reuse.value,
          invasive: this.form.controls.invasive.value,
          consignment: this.form.controls.consignment.value,
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
          name: this.form.controls.name.value,
          drug_concentration_id: this.form.controls.drug_concentration_id.value,
          measurement_units_id: this.form.controls.measurement_units_id.value,
          product_presentation_id: this.form.controls.product_presentation_id.value,
          description: this.form.controls.name.value + " " + this.subcategory + " " +  this.drugconcentration + " " + this.measurementunits + " " +  this.productpresentation,
          pbs_type_id: this.form.controls.pbs_type_id.value,
          product_subcategory_id: this.form.controls.product_subcategory_id.value,
          consumption_unit_id: this.form.controls.consumption_unit_id.value,
          administration_route_id: this.form.controls.administration_route_id.value,    
          special_controller_medicine: this.form.controls.special_controller_medicine.value,
          code_atc: this.form.controls.code_atc.value,
          implantable: this.form.controls.implantable.value,
          reuse: this.form.controls.reuse.value,
          invasive: this.form.controls.invasive.value,
          consignment: this.form.controls.consignment.value,      
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
        product_subcategory_id: '',
      });
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

}

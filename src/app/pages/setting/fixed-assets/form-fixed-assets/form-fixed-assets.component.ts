import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FixedAssetsService } from '../../../../business-controller/fixed-assets.service';
import { FixedPropertyService } from '../../../../business-controller/fixed-property.service';
import { FixedTypeService } from '../../../../business-controller/fixed-type.service';
import { FixedClasificationService } from '../../../../business-controller/fixed-clasification.service';
import { FixedConditionService } from '../../../../business-controller/fixed-condition.service';
import { CompanyCategoryService } from '../../../../business-controller/company-category.service';
import { CampusService } from '../../../../business-controller/campus.service';
import { FixedNomProductService } from '../../../../business-controller/fixed-nom-product.service';
import { FrequencyService } from '../../../../business-controller/frequency.service';
import { RiskService } from '../../../../business-controller/risk.service';
import { BiomedicalClassificationService } from '../../../../business-controller/biomedical-classification.service';
import { FixedStockService } from '../../../../business-controller/fixed-stock.service';


@Component({
  selector: 'ngx-form-fixed-assets',
  templateUrl: './form-fixed-assets.component.html',
  styleUrls: ['./form-fixed-assets.component.scss']
})
export class FormFixedAssetsComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public fixed_clasification: any[];
  public fixed_property: any[];
  public fixed_condition: any[];
  public fixed_nom_product: any[];
  public company: any[];
  public fixed_stock: any[];
  public fixed_type: any[];
  public showProv: boolean = false;
  public showCondi: boolean = false;
  public showBiomed: boolean = false;
  public clasification_risk_id: any[];
  public biomedical_classification_id: any[];
  public periodicity_frequency_id: any[];
  public calibration_frequency_id: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private FixedAssetsS: FixedAssetsService,
    private toastService: NbToastrService,
    private FixedPropertyS: FixedPropertyService,
    private FixedTypeS: FixedTypeService,
    private CompanyCategoryS: CompanyCategoryService,
    private FixedConditionS: FixedConditionService,
    private FixedStockS: FixedStockService,
    private FixedNomProductS: FixedNomProductService,
    private FixedClasificationS: FixedClasificationService,
    private FrequencyS: FrequencyService,
    private RiskS: RiskService,
    private BiomedicalClassificationS: BiomedicalClassificationService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        fixed_property_id: '',
        obs_property: '',
        plaque: '',
        model: '',
        mark: '',
        serial: '',
        fixed_nom_product_id: '',
        detail_description: '',
        color: '',
        fixed_condition_id: '',
        fixed_stock_id: '',

        calibration_certificate: '',
        health_register: '',
        warranty: '',
        cv: '',
        last_maintenance: '',
        last_pame: '',
        interventions_carriet: '',
        type: '',
        mobile_fixed: '',
        clasification_risk_id: '',
        biomedical_classification_id: '',
        code_ecri: '',
        form_acquisition: '',
        date_adquisicion: '',
        date_warranty: '',
        useful_life: '',
        cost: '',
        maker: '',
        phone_maker: '',
        email_maker: '',
        power_supply: '',
        predominant_technology: '',
        volt: '',
        stream: '',
        power: '',
        frequency_rank: '',
        temperature_rank: '',
        humidity_rank: '',
        manuals: '',
        guide: '',
        periodicity_frequency_id: '',
        calibration_frequency_id: '',
      };
    } else if (this.data.fixed_type_id == 2) {
      this.showBiomed = true;
    }

    this.form = this.formBuilder.group({
      fixed_clasification_id: [this.data.fixed_clasification_id],
      fixed_nom_product_id: [this.data.fixed_nom_product_id],
      fixed_type_id: [this.data.fixed_type_id],
      fixed_property_id: [this.data.fixed_property_id, Validators.compose([Validators.required])],
      obs_property: [this.data.obs_property],
      plaque: [this.data.plaque],
      company_id: [this.data.company_id],
      model: [this.data.model],
      mark: [this.data.mark, Validators.compose([Validators.required])],
      serial: [this.data.serial],
      detail_description: [this.data.detail_description, Validators.compose([Validators.required])],
      color: [this.data.color, Validators.compose([Validators.required])],
      fixed_condition_id: [this.data.fixed_condition_id, Validators.compose([Validators.required])],
      fixed_stock_id: [this.data.fixed_stock_id, Validators.compose([Validators.required])],
      calibration_certificate: [this.data.calibration_certificate],
      health_register: [this.data.health_register],
      warranty: [this.data.warranty],
      cv: [this.data.cv],
      last_maintenance: [this.data.last_maintenance],
      last_pame: [this.data.last_pame],
      interventions_carriet: [this.data.interventions_carriet],
      type: [this.data.type],
      mobile_fixed: [this.data.mobile_fixed],
      clasification_risk_id: [this.data.clasification_risk_id],
      biomedical_classification_id: [this.data.biomedical_classification_id],
      code_ecri: [this.data.code_ecri],
      form_acquisition: [this.data.form_acquisition],
      date_adquisicion: [this.data.date_adquisicion],
      date_warranty: [this.data.date_warranty],
      useful_life: [this.data.useful_life],
      cost: [this.data.cost],
      maker: [this.data.maker],
      phone_maker: [this.data.phone_maker],
      email_maker: [this.data.email_maker],
      power_supply: [this.data.power_supply],
      predominant_technology: [this.data.predominant_technology],
      volt: [this.data.volt],
      stream: [this.data.stream],
      power: [this.data.power],
      frequency_rank: [this.data.frequency_rank],
      temperature_rank: [this.data.temperature_rank],
      humidity_rank: [this.data.humidity_rank],
      manuals: [this.data.manuals],
      guide: [this.data.guide],
      periodicity_frequency_id: [this.data.periodicity_frequency_id],
      calibration_frequency_id: [this.data.calibration_frequency_id],
    });

    this.FixedPropertyS.GetCollection().then(x => {
      this.fixed_property = x;
    });
    this.FixedConditionS.GetCollection().then(x => {
      this.fixed_condition = x;
    });
    this.CompanyCategoryS.GetCollection().then(x => {
      this.company = x;
    });
    this.FixedTypeS.GetCollection().then(x => {
      this.fixed_type = x;
    });

    this.RiskS.GetCollection().then(x => {
      this.clasification_risk_id = x;
    });

    this.FrequencyS.GetCollection().then(x => {
      this.periodicity_frequency_id = x;
    });

    this.FrequencyS.GetCollection().then(x => {
      this.calibration_frequency_id = x;
    });

    this.FixedStockS.GetCollection().then(x => {
      this.fixed_stock = x;
    });

    this.BiomedicalClassificationS.GetCollection().then(x => {
      this.biomedical_classification_id = x;
    });


    this.onChanges();
    this.onChanges1();
    this.onChanges2();
  }
  onChange(tipoId) {
    if (tipoId == 2) {
      this.showBiomed = true;
    } else {
      this.showBiomed = false;
    }
  }

  onChange1(tipoId) {
    if (tipoId == 3) {
      this.showProv = true;
    } else {
      this.showProv = false;
    }
  }

  onChange2(tipoId) {
    if (tipoId == 3) {
      this.showCondi = true;
    } else {
      this.showCondi = false;
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
        this.FixedAssetsS.Update({
          id: this.data.id,
          fixed_clasification_id: this.form.controls.fixed_clasification_id.value,
          fixed_property_id: this.form.controls.fixed_property_id.value,
          obs_property: this.form.controls.obs_property.value,
          plaque: this.form.controls.plaque.value,
          model: this.form.controls.model.value,
          mark: this.form.controls.mark.value,
          serial: this.form.controls.serial.value,
          fixed_nom_product_id: this.form.controls.fixed_nom_product_id.value,
          detail_description: this.form.controls.detail_description.value,
          color: this.form.controls.color.value,
          company_id: this.form.controls.company_id.value,
          fixed_condition_id: this.form.controls.fixed_condition_id.value,
          status_prod: 'INGRESADO',
          fixed_type_id: this.form.controls.fixed_type_id.value,
          fixed_stock_id: this.form.controls.fixed_stock_id.value,
          calibration_certificate: this.form.controls.calibration_certificate.value,
          health_register: this.form.controls.health_register.value,
          warranty: this.form.controls.warranty.value,
          cv: this.form.controls.cv.value,
          last_maintenance: this.form.controls.last_maintenance.value,
          last_pame: this.form.controls.last_pame.value,
          interventions_carriet: this.form.controls.interventions_carriet.value,
          type: this.form.controls.type.value,
          mobile_fixed: this.form.controls.mobile_fixed.value,
          clasification_risk_id: this.form.controls.clasification_risk_id.value,
          biomedical_classification_id: this.form.controls.biomedical_classification_id.value,
          code_ecri: this.form.controls.code_ecri.value,
          form_acquisition: this.form.controls.form_acquisition.value,
          date_adquisicion: this.form.controls.date_adquisicion.value,
          date_warranty: this.form.controls.date_warranty.value,
          useful_life: this.form.controls.useful_life.value,
          cost: this.form.controls.cost.value,
          maker: this.form.controls.maker.value,
          phone_maker: this.form.controls.phone_maker.value,
          email_maker: this.form.controls.email_maker.value,
          power_supply: this.form.controls.power_supply.value,
          predominant_technology: this.form.controls.predominant_technology.value,
          volt: this.form.controls.volt.value,
          stream: this.form.controls.stream.value,
          power: this.form.controls.power.value,
          frequency_rank: this.form.controls.frequency_rank.value,
          temperature_rank: this.form.controls.temperature_rank.value,
          humidity_rank: this.form.controls.humidity_rank.value,
          manuals: this.form.controls.manuals.value,
          guide: this.form.controls.guide.value,
          periodicity_frequency_id: this.form.controls.periodicity_frequency_id.value,
          calibration_frequency_id: this.form.controls.calibration_frequency_id.value,

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

        this.FixedAssetsS.Save({
          fixed_clasification_id: this.form.controls.fixed_clasification_id.value,
          fixed_property_id: this.form.controls.fixed_property_id.value,
          obs_property: this.form.controls.obs_property.value,
          plaque: this.form.controls.plaque.value,
          model: this.form.controls.model.value,
          mark: this.form.controls.mark.value,
          serial: this.form.controls.serial.value,
          fixed_nom_product_id: this.form.controls.fixed_nom_product_id.value,
          detail_description: this.form.controls.detail_description.value,
          color: this.form.controls.color.value,
          company_id: this.form.controls.company_id.value,
          fixed_condition_id: this.form.controls.fixed_condition_id.value,
          status_prod: 'INGRESADO',
          fixed_type_id: this.form.controls.fixed_type_id.value,
          fixed_stock_id: this.form.controls.fixed_stock_id.value,

          calibration_certificate: this.form.controls.calibration_certificate.value,
          health_register: this.form.controls.health_register.value,
          warranty: this.form.controls.warranty.value,
          cv: this.form.controls.cv.value,
          last_maintenance: this.form.controls.last_maintenance.value,
          last_pame: this.form.controls.last_pame.value,
          interventions_carriet: this.form.controls.interventions_carriet.value,
          type: this.form.controls.type.value,
          mobile_fixed: this.form.controls.mobile_fixed.value,
          clasification_risk_id: this.form.controls.clasification_risk_id.value,
          biomedical_classification_id: this.form.controls.biomedical_classification_id.value,
          code_ecri: this.form.controls.code_ecri.value,
          form_acquisition: this.form.controls.form_acquisition.value,
          date_adquisicion: this.form.controls.date_adquisicion.value,
          date_warranty: this.form.controls.date_warranty.value,
          useful_life: this.form.controls.useful_life.value,
          cost: this.form.controls.cost.value,
          maker: this.form.controls.maker.value,
          phone_maker: this.form.controls.phone_maker.value,
          email_maker: this.form.controls.email_maker.value,
          power_supply: this.form.controls.power_supply.value,
          predominant_technology: this.form.controls.predominant_technology.value,
          volt: this.form.controls.volt.value,
          stream: this.form.controls.stream.value,
          power: this.form.controls.power.value,
          frequency_rank: this.form.controls.frequency_rank.value,
          temperature_rank: this.form.controls.temperature_rank.value,
          humidity_rank: this.form.controls.humidity_rank.value,
          manuals: this.form.controls.manuals.value,
          guide: this.form.controls.guide.value,
          periodicity_frequency_id: this.form.controls.periodicity_frequency_id.value,
          calibration_frequency_id: this.form.controls.calibration_frequency_id.value,

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
    this.form.get('fixed_type_id').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.fixed_clasification = [];
      } else {
        this.GetCategories(val).then();
      }
      this.form.patchValue({
        fixed_nom_product_id: '',
      });
    });

    this.form.get('fixed_clasification_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.fixed_nom_product = [];
      } else {
        this.GetSubcategory(val).then();
      }
    });
  }


  onChanges1() {
    this.form.get('fixed_property_id').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.fixed_property = [];
      }
    });
  }

  onChanges2() {
    this.form.get('fixed_condition_id').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.fixed_condition = [];
      }
    });
  }

  GetCategories(fixed_type_id, job = false) {
    if (!fixed_type_id || fixed_type_id === '') return Promise.resolve(false);
    return this.FixedClasificationS.GetProductCategoryByGroup(fixed_type_id).then(x => {
      this.fixed_clasification = x;
      return Promise.resolve(true);
    });
  }

  GetSubcategory(fixed_clasification_id, job = false) {
    if (!fixed_clasification_id || fixed_clasification_id === '') return Promise.resolve(false);
    return this.FixedNomProductS.GetProductSubcategoryByCategory(fixed_clasification_id).then(x => {
      this.fixed_nom_product = x;
      return Promise.resolve(true);
    });
  }
}

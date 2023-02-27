import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChFormulationService } from '../../../../business-controller/ch-formulation.service';
import { ActivatedRoute } from '@angular/router';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { AdministrationRouteService } from '../../../../business-controller/administration-route.service';
import { HourlyFrequencyService } from '../../../../business-controller/hourly-frequency.service';
import { ServicesBriefcaseService } from '../../../../business-controller/services-briefcase.service';
import { PatientService } from '../../../../business-controller/patient.service';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';
import { AuthService } from '../../../../services/auth.service';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { ProductSuppliesService } from '../../../../business-controller/product-supplies.service';
import { OxigenAdministrationWayService } from '../../../../business-controller/oxigen-administration-way.service';

@Component({
  selector: 'ngx-form-formulation',
  templateUrl: './form-formulation.component.html',
  styleUrls: ['./form-formulation.component.scss'],
})
export class FormFormulationComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() user: any = null;
  @Input() admission: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public loading_screen: boolean = true;
  public disabled: boolean = false;
  public show_all: boolean = false;
  public showTable;
  public record_id;
  public administration_route_id: any[];
  public hourly_frequency_id: any[];
  public service_briefcase_id: number;
  public dose;
  public treatment_days;
  public outpatient_formulation;
  public product_gen: any[];
  public product_supplies: any[];
  public all_peoducts: any[] = null;
  public briefcase_products: any[] = null;
  public product_id;
  public product;
  public valor;
  public unidad;
  public identificator;
  public user2;
  public show: boolean = true;
  public input: boolean = false;
  public all_changes: any[];
  public own_user: any = null;
  public loadAuxData;
  public product_supplies_id;
  public oxigen_administration_way: any = null;
  public is_oxigen: boolean = false;
  public administration_hours = [
    { id: 0, name: 0 },
    { id: 1, name: 1 },
    { id: 2, name: 2 },
    { id: 3, name: 3 },
    { id: 4, name: 4 },
    { id: 5, name: 5 },
    { id: 6, name: 6 },
    { id: 7, name: 7 },
    { id: 8, name: 8 },
    { id: 9, name: 9 },
    { id: 10, name: 10 },
    { id: 11, name: 11 },
    { id: 12, name: 12 },
  ];
  public administration_minutes = [
    { id: 0, name: 0 },
    { id: 5, name: 5 },
    { id: 10, name: 10 },
    { id: 15, name: 15 },
    { id: 20, name: 20 },
    { id: 25, name: 25 },
    { id: 30, name: 30 },
    { id: 35, name: 35 },
    { id: 40, name: 40 },
    { id: 45, name: 45 },
    { id: 50, name: 50 },
    { id: 55, name: 55 },
  ];
  public oxigen_flow = [
    { id: 0, name: 0 },
    { id: 0.25, name: 0.25 },
    { id: 0.5, name: 0.5 },
    { id: 1, name: 1 },
    { id: 2, name: 2 },
    { id: 3, name: 3 },
    { id: 4, name: 4 },
    { id: 5, name: 5 },
    { id: 6, name: 6 },
    { id: 7, name: 7 },
    { id: 8, name: 8 },
    { id: 9, name: 9 },
    { id: 10, name: 10 },
    { id: 11, name: 11 },
    { id: 12, name: 12 },
    { id: 13, name: 13 },
    { id: 14, name: 14 },
    { id: 15, name: 15 },
    { id: 20, name: 20 },
    { id: 25, name: 25 },
    { id: 30, name: 30 },
    { id: 35, name: 35 },
    { id: 40, name: 40 },
    { id: 45, name: 45 },
    { id: 50, name: 50 },
    { id: 55, name: 55 },
    { id: 60, name: 60 },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private AdministrationRouteS: AdministrationRouteService,
    private HourlyFrequencyS: HourlyFrequencyService,
    private ChFormulationS: ChFormulationService,
    private route: ActivatedRoute,
    private servicesBriefcaseS: ServicesBriefcaseService,
    private patienBS: PatientService,
    private ProductGS: ProductGenericService,
    private PharmacyProductRequestS: PharmacyProductRequestService,
    public userChangeS: UserChangeService,
    private authService: AuthService,
    private productSuppliesS: ProductSuppliesService,
    private OxigenAdministrationWayS: OxigenAdministrationWayService,
  ) {
  }

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;
    if (!this.data) {
      this.data = {
        product_id: '',
        required: '',
        medical_formula: 0,
        administration_route_id: '',
        hourly_frequency_id: '',
        treatment_days: '',
        outpatient_formulation: '',
        dose: '',
        observation: '',
        number_mipres: '',
        product_supplies_id: '',
        num_supplies: '',
      };
    };


    this.loadForm(false).then();
    await Promise.all([
      this.GetAuxData(),
    ]);
    this.loadAuxData = false;
    this.loadForm();
  }

  async GetAuxData() {
    await this.servicesBriefcaseS.GetByBriefcase({ type: '2' }, this.admission.briefcase_id).then(x => {
      if (x.length > 0) {
        this.product_gen = x;
        this.briefcase_products = x;
      }
      this.loading_screen = false;
    });

    await this.AdministrationRouteS.GetCollection().then(x => {
      this.administration_route_id = x;
    });

    await this.HourlyFrequencyS.GetCollection().then(x => {
      this.hourly_frequency_id = x;
    });

    await this.productSuppliesS.GetCollection().then(x => {
      this.product_supplies = x;
    });


    await this.userChangeS.GetCollection().then(x => {
      this.all_changes = x;
    });
    this.own_user = this.authService.GetUser();

    return Promise.resolve(true);
  }

  async loadForm(force = true) {
    if (this.loadAuxData && force) return false;
    this.form = this.formBuilder.group({
      required: [this.data.required, Validators.compose([Validators.required])],
      medical_formula: [this.data.medical_formula == 0 ? false : true],
      product_gen: [this.product_gen != null ? this.product_gen['description'] : null, Validators.compose([Validators.required])],
      product_id: [this.data.product_id,],
      dose: [this.data.dose,],
      administration_route_id: [this.data.administration_route_id,],
      hourly_frequency_id: [this.data.hourly_frequency_id,],
      treatment_days: [this.data.treatment_days,],
      outpatient_formulation: [this.data.outpatient_formulation],
      number_mipres: [this.data.number_mipres],
      observation: [this.data.observation],
      product_supplies_id: [this.data.product_supplies_id],
      num_supplies: [this.data.num_supplies],
      oxigen_administration_way_id: [''],
      oxigen_flow: [''],
    });
    this.show_all = true;

    this.onChange();
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      await this.ChFormulationS.Save({
        required: this.form.controls.required.value,
        administration_route_id: this.form.controls.administration_route_id.value,
        dose: this.is_oxigen ? this.form.controls.oxigen_flow.value : this.form.controls.dose.value,
        hourly_frequency_id: this.form.controls.hourly_frequency_id.value,
        medical_formula: this.form.controls.required.value == 'medicine' ? this.form.controls.medical_formula.value : 1,
        number_mipres: this.form.controls.number_mipres.value,
        observation: this.form.controls.observation.value,
        outpatient_formulation: this.form.controls.outpatient_formulation.value,
        product_generic_id: this.form.controls.required.value == 'medicine' ? this.product_id : null,
        treatment_days: this.form.controls.treatment_days.value,
        oxigen_administration_way_id: this.form.controls.oxigen_administration_way_id.value,
        type_record_id: 5,
        ch_record_id: this.record_id,
        services_briefcase_id: this.form.controls.required.value == 'medicine' ? this.service_briefcase_id : null,
        product_supplies_id: this.form.controls.required.value == 'supplies' ? this.product_supplies_id : null,
        num_supplies: this.form.controls.num_supplies.value,
        pharmacy_product_request_id: false,
      })
        .then((x) => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.valor = '';
          this.unidad = '';
          this.form.patchValue({
            required: '',
            medical_formula: '',
            product_gen: '',
            product_id: '',
            dose: '',
            administration_route_id: '',
            hourly_frequency_id: '',
            treatment_days: '',
            outpatient_formulation: '',
            number_mipres: '',
            observation: '',
            product_supplies_id: '',
            num_supplies: '',
          });
          if (this.saved) {
            this.saved();
          }
        })
        .catch((x) => {
          this.toastService.danger('Error', x);
          this.isSubmitted = false;
          this.loading = false;
        });

    } else {

      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }

  }


  onChangesFormulation(event, id) {
    var presentmedic;
    var dose = this.form.controls.dose.value;
    var hourly_frequency_id = this.form.controls.hourly_frequency_id.value != '' ? this.hourly_frequency_id.find(item => item.id == this.form.controls.hourly_frequency_id.value).value : 1;
    var treatment_days = this.form.controls.treatment_days.value;
    this.product = this.product_gen.find(item => (this.show ? item.manual_price.product.id : item.id) == this.product_id);
    presentmedic = this.getConcentration((this.show ? this.product.manual_price.product.product_dose_id == 2 : this.product.product_dose_id == 2) ? (this.show ? this.product.manual_price.product.dose : this.product.dose) : (this.show ? this.product.manual_price.product.drug_concentration.value : this.product.drug_concentration.value));
    // if (this.admission.location.at(-1).scope_of_attention_id == 1) {
    //   var elementos_x_aplicacion = dose / presentmedic;
    // } else {
    if ((this.show ? this.product.manual_price.product.product_dose_id == 2 : this.product.product_dose_id == 2)) {
      var elementos_x_aplicacion = dose / presentmedic;
    } else {
      var elementos_x_aplicacion = Math.ceil(dose / presentmedic);
    }
    // }


    var operate = Math.ceil(elementos_x_aplicacion * (24 / hourly_frequency_id) * treatment_days);
    this.form.controls.outpatient_formulation.setValue(operate);
  }

  async onChange() {

    this.form.get('required').valueChanges.subscribe(val => {
      if (val == 'medicine') {

        this.form.controls.dose.setValidators(Validators.compose([Validators.required]));
        this.form.controls.administration_route_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.hourly_frequency_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.treatment_days.setValidators(Validators.compose([Validators.required]));

        this.form.patchValue({ medical_formula: '' });
        this.form.patchValue({ product_gen: '' });
        this.form.patchValue({ product_id: '' });
        this.form.patchValue({ dose: '' });
        this.form.patchValue({ administration_route_id: '' });
        this.form.patchValue({ hourly_frequency_id: '' });
        this.form.patchValue({ treatment_days: '' });
        this.form.patchValue({ outpatient_formulation: '' });
        this.form.patchValue({ number_mipres: '' });
        this.form.patchValue({ observation: '' });
        this.form.patchValue({ oxigen_administration_way_id: '' });
        this.form.patchValue({ oxigen_flow: '' });

        this.form.controls.product_supplies_id.clearValidators();
        this.form.controls.product_supplies_id.setErrors(null);
        this.form.controls.num_supplies.clearValidators();
        this.form.controls.num_supplies.setErrors(null);
        this.form.controls.oxigen_administration_way_id.clearValidators();
        this.form.controls.oxigen_administration_way_id.setErrors(null);
        this.form.controls.oxigen_flow.clearValidators();
        this.form.controls.oxigen_flow.setErrors(null);

      } else {
        this.is_oxigen = false;
        this.form.controls.product_supplies_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.num_supplies.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ product_supplies_id: '' });
        this.form.patchValue({ num_supplies: '' });

        this.form.controls.medical_formula.clearValidators();
        this.form.controls.medical_formula.setErrors(null);
        this.form.controls.product_gen.clearValidators();
        this.form.controls.product_gen.setErrors(null);
        this.form.controls.product_id.clearValidators();
        this.form.controls.product_id.setErrors(null);
        this.form.controls.dose.clearValidators();
        this.form.controls.dose.setErrors(null);
        this.form.controls.administration_route_id.clearValidators();
        this.form.controls.administration_route_id.setErrors(null);
        this.form.controls.hourly_frequency_id.clearValidators();
        this.form.controls.hourly_frequency_id.setErrors(null);
        this.form.controls.treatment_days.clearValidators();
        this.form.controls.treatment_days.setErrors(null);
        this.form.controls.outpatient_formulation.clearValidators();
        this.form.controls.outpatient_formulation.setErrors(null);
        this.form.controls.number_mipres.clearValidators();
        this.form.controls.number_mipres.setErrors(null);
        this.form.controls.observation.clearValidators();
        this.form.controls.observation.setErrors(null);
        this.form.controls.oxigen_administration_way_id.clearValidators();
        this.form.controls.oxigen_administration_way_id.setErrors(null);
        this.form.controls.oxigen_flow.clearValidators();
        this.form.controls.oxigen_flow.setErrors(null);

      };
    });
  }
  getConcentration(value: string) {
    var rr = 0;
    if (value.includes('/')) {
      var spl = value.split('/');
      var num = spl[0];
      var den = +spl[1];
      rr = this.numWithPlus(num);

    } else {
      rr = this.numWithPlus(value);
    }
    return rr;
  }

  numWithPlus(num: string): number {
    if (num.includes('(') || num.includes(')')) {
      num = num.slice(0, 1);
      num = num.slice(num.length - 1, num.length);
      if (num.includes('+')) {
        var spl2 = num.split('+');
        var r = 0;
        spl2.forEach(element => {
          r += +element;
        });
        return r;
      }
    } else {
      if (num.includes('+')) {
        var spl2 = num.split('+');
        var r = 0;
        spl2.forEach(element => {
          r += +element;
        });
        return r;
      } else {
        return +num;
      }
    }
  }

  saveCode1(e, identificator): void {
    this.identificator = identificator;
    // if (this.identificator == 1) {
    //   this.product = this.product_gen.find(item => item.manual_price.name == e);
    // } else {
    //   this.product = this.product_gen.find(item => item.description == e);
    // }
    this.product = this.product_gen.find(item => (!this.show ? item.description : item.manual_price.product.description) == e);

    if (this.product) {
      this.oxigen_identification(this.product.manual_price.product.nom_product_id);
      this.service_briefcase_id = this.show ? this.product.id : null;
      this.product_id = this.show ? this.product.manual_price.product.id : this.product.id;
      if (identificator == 1) {
        this.form.controls.product_gen.setErrors(null);
      } else {
        this.form.controls.product_id.setErrors(null);
      }
    } else {
      this.oxigen_identification(0);
      this.service_briefcase_id = null;
      this.product_id = null;
      this.toastService.warning('', 'Debe seleccionar un Medicamento de la lista');
      if (identificator == 1) {
        this.form.controls.product_gen.setErrors({ 'incorrect': true });
      } else {
        this.form.controls.product_id.setErrors({ 'incorrect': true });
      }

    }
    
    
    this.onChangesFormulation(1, e)
  }

  oxigen_identification(val) {
    //identificar si el medicamento es oxigeno
    if (val == 301) {
      this.is_oxigen = true;
      this.form.controls.oxigen_administration_way_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.oxigen_flow.setValidators(Validators.compose([Validators.required]));

      this.form.controls.dose.clearValidators();
      this.form.controls.dose.setErrors(null);
      this.form.controls.administration_route_id.clearValidators();
      this.form.controls.administration_route_id.setErrors(null);
      this.form.controls.hourly_frequency_id.clearValidators();
      this.form.controls.hourly_frequency_id.setErrors(null);
      this.form.controls.treatment_days.clearValidators();
      this.form.controls.treatment_days.setErrors(null);
      this.valor = '';
      this.unidad = 'l/min';
      if (this.oxigen_administration_way == null) {
        this.OxigenAdministrationWayS.GetCollection().then(x => {
          this.oxigen_administration_way = x;
        });
      }
    } else {
      this.is_oxigen = false;
      this.form.controls.dose.setValidators(Validators.compose([Validators.required]));
      this.form.controls.administration_route_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.hourly_frequency_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.treatment_days.setValidators(Validators.compose([Validators.required]));

      this.form.patchValue({ oxigen_administration_way_id: '' });
      this.form.patchValue({ oxigen_flow: '' });

      this.form.controls.product_supplies_id.clearValidators();
      this.form.controls.product_supplies_id.setErrors(null);
      this.form.controls.num_supplies.clearValidators();
      this.form.controls.num_supplies.setErrors(null);
      this.form.controls.oxigen_administration_way_id.clearValidators();
      this.form.controls.oxigen_administration_way_id.setErrors(null);
      this.form.controls.oxigen_flow.clearValidators();
      this.form.controls.oxigen_flow.setErrors(null);
      this.valor = this.getConcentration((this.show ? this.product.manual_price.product.product_dose_id == 2 : this.product.product_dose_id == 2) ? (this.show ? this.product.manual_price.product.dose : this.product.dose) : (this.show ? this.product.manual_price.product.drug_concentration.value : this.product.drug_concentration.value));
      this.unidad = this.product.product_dose_id == 2 ? this.numerador_measurement_units(this.show ? this.product.manual_price.product.multidose_concentration.name : this.product.multidose_concentration.name) :
        this.numerador_measurement_units(this.show ? this.product.manual_price.product.measurement_units.code : this.product.measurement_units.code);
    }
  }
  // readProductGen(x) {
  //   var r = [];
  //   var i = 0;
  //   x.forEach(element => {
  //     r[i] = element['manual_price']['product'];
  //     i++;
  //   });
  //   return r;
  // }

  saveCodeR(e): void {
    var localidentify = this.product_supplies.find(item => item.description == e);

    if (localidentify) {
      this.product_supplies_id = localidentify.id;
    } else {
      this.product_supplies_id = null;
      this.toastService.warning('', 'Debe seleccionar una opción de la lista');
    }
  }

  eventSelections(input) {
    this.product_id = null
    this.product = null;
    this.product_gen = null;
    this.service_briefcase_id = null;
    this.form.patchValue({ product_gen: '' });
    if (input == false) {
      this.show = true;
      this.input = false;
      this.form.controls.product_gen.setValidators(Validators.compose([Validators.required]));
      this.form.controls.product_gen.updateValueAndValidity();
      this.form.controls.product_id.clearValidators();
      this.form.controls.product_id.setErrors(null);
      // this.patienBS.GetUserById(this.user).then(x => {
      //   this.user2 = x;
      // });
      // if (this.user2 != null) {
      // }
      if (this.briefcase_products == null) {
        this.servicesBriefcaseS.GetByBriefcase({ type: '2' }, this.admission.briefcase_id).then(x => {
          this.product_gen = x;
          this.briefcase_products = x;
        });
      } else {
        this.product_gen = this.briefcase_products;
      }
    } else {
      this.input = true;
      this.show = false;
      this.form.controls.product_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.product_id.updateValueAndValidity();
      this.form.controls.product_gen.clearValidators();
      this.form.controls.product_gen.setErrors(null);
      if (this.all_peoducts == null) {
        this.ProductGS.GetCollection().then(x => {
          this.product_gen = x;
          this.all_peoducts = x;
        });
      } else {
        this.product_gen = this.all_peoducts;
      }
    }
  }

  numerador_measurement_units(val) {
    var rr = '';
    if (val.includes('/')) {
      var spl = val.split('/');
      var num = spl[0];
      var den = +spl[1];
      rr = num;

    } else {
      rr = val;
    }
    return rr;
  }

}

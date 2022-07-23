import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChFormulationService } from '../../../../business-controller/ch-formulation.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { AdministrationRouteService } from '../../../../business-controller/administration-route.service';
import { HourlyFrequencyService } from '../../../../business-controller/hourly-frequency.service';
import { ManagementPlanService } from '../../../../business-controller/management-plan.service';
import { ServicesBriefcaseService } from '../../../../business-controller/services-briefcase.service';
import { PatientService } from '../../../../business-controller/patient.service';
import { ProductDoseService } from '../../../../business-controller/product_dose.service';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';

@Component({
  selector: 'ngx-form-formulation',
  templateUrl: './form-formulation.component.html',
  styleUrls: ['./form-formulation.component.scss'],
})
export class FormFormulationComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() user: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public record_id;
  public administration_route_id: any[];
  public hourly_frequency_id: any[];
  public dose;
  public treatment_days;
  public outpatient_formulation;
  public product_gen: any[];
  public product_id;
  public localidentify;
  public identificator;
  public user2;
  public show: boolean = true;
  public input: boolean = false;


  public loadAuxData;


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
  ) {
  }

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;
    if (!this.data) {
      this.data = {
        product_id: '',
        administration_route_id: '',
        hourly_frequency_id: '',
        medical_formula: '',
        treatment_days: '',
        outpatient_formulation: '',
        dose: '',
        observation: '',
        number_mipres: '',
        dose_apply: '',

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
    await this.patienBS.GetUserById(this.user).then(x => {
      this.user2 = x;
    });

    await this.AdministrationRouteS.GetCollection().then(x => {
      this.administration_route_id = x;
    });

    await this.HourlyFrequencyS.GetCollection().then(x => {
      this.hourly_frequency_id = x;
    });

    await this.servicesBriefcaseS.GetByBriefcase({ type: '2' }, this.user2.admissions.at(-1).briefcase_id).then(x => {
      this.product_gen = x;
    });

    return Promise.resolve(true);
  }


  async loadForm(force = true) {
    if (this.loadAuxData && force) return false;

    this.form = this.formBuilder.group({
      medical_formula: [this.data.medical_formula],
      product_gen: [this.product_gen,],
      product_id: [this.data.product_id,],
      dose: [this.data.dose, Validators.compose([Validators.required])],
      dose_apply: [this.data.dose_apply],
      administration_route_id: [this.data.administration_route_id, Validators.compose([Validators.required])],
      hourly_frequency_id: [this.data.hourly_frequency_id, Validators.compose([Validators.required])],
      treatment_days: [this.data.treatment_days, Validators.compose([Validators.required])],
      outpatient_formulation: [this.data.outpatient_formulation],
      number_mipres: [this.data.number_mipres],
      observation: [this.data.observation],
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      await this.ChFormulationS.Save({
        administration_route_id: this.form.controls.administration_route_id.value,
        dose: this.form.controls.dose.value,
        dose_apply: this.form.controls.dose_apply.value,
        hourly_frequency_id: this.form.controls.hourly_frequency_id.value,
        medical_formula: this.form.controls.medical_formula.value,
        number_mipres: this.form.controls.number_mipres.value,
        observation: this.form.controls.observation.value,
        outpatient_formulation: this.form.controls.outpatient_formulation.value,
        product_generic_id: this.product_id,
        treatment_days: this.form.controls.treatment_days.value,
        type_record_id: 5,
        ch_record_id: this.record_id,
      })
        .then((x) => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({
            product_generic_id: '', dose_apply: '', administration_route_id: '', hourly_frequency_id: '', medical_formula: '',
            treatment_days: '', outpatient_formulation: '', dose: '', observation: '', number_mipres: ''
          });
          if (this.saved) {
            this.saved();
          }
        })
        .catch((x) => {
          this.isSubmitted = false;
          this.loading = false;
        });
    } if (this.input = true) {
      await this.PharmacyProductRequestS.Save({
        services_briefcase_id: this.product_id,
        request_amount: this.form.controls.outpatient_formulation.value,
        observation: this.form.controls.observation.value,
        admissions_id: this.user2.admissions,
        status: 'SOLICITADO',
        own_pharmacy_stock_id: this.data.id,
      })
        .then((x) => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({
            product_generic_id: '', request_amount: '', observation: '', status: '',
            own_pharmacy_stock_id: ''
          });
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


  onChangesFormulation(event, id) {

    var presentmedic;
    var dose = this.form.controls.dose.value;
    var hourly_frequency_id = this.hourly_frequency_id.find(item => item.id == this.form.controls.hourly_frequency_id.value).value;
    var treatment_days = this.form.controls.treatment_days.value;


    this.localidentify = this.product_gen.find(item => item.id == this.product_id);
    if (this.localidentify.manual_price) {
      presentmedic = this.getConcentration(this.localidentify.manual_price.product.drug_concentration.value);
    } else {
      presentmedic = this.getConcentration(this.localidentify.drug_concentration.value);
    }

    var operate = dose * (24 / hourly_frequency_id) * treatment_days;
    // var operate = (dose / presentmedic) * (24 / hourly_frequency_id) * treatment_days;
    this.form.controls.outpatient_formulation.setValue(operate);
  }


  getConcentration(value: string) {
    var rr = 0;
    if (value.includes('/')) {
      var spl = value.split('/');
      var num = spl[0];
      var den = +spl[1];
      rr = this.numWithPlus(num) / den;

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
    if (this.identificator == 2) {
      this.localidentify = this.product_gen.find(item => item.description == e);
    } else {
      this.localidentify = this.product_gen.find(item => item.manual_price.name == e);
    }

    if (this.localidentify) {
      this.product_id = this.localidentify.id;
      this.form.controls.product_gen.setErrors(null);
    } else {
      this.product_id = null;
      this.toastService.warning('', 'Debe seleccionar un Medicamento de la lista');
      this.form.controls.product_gen.setErrors({ 'incorrect': true });

    }
  }
  eventSelections(input) {
    if (input == false) {
      this.show = true;
      this.product_gen = null;
      this.patienBS.GetUserById(this.user).then(x => {
        this.user2 = x;
      });
      this.servicesBriefcaseS.GetByBriefcase({type:'2'},this.user2.admissions[this.user2.admissions.length - 1].briefcase_id).then(x => {
        this.product_gen = x;
      });
    } else {
      this.show = false;
      this.ProductGS.GetCollection().then(x => {
        this.product_gen = x;
      });







      

    }
  }

}

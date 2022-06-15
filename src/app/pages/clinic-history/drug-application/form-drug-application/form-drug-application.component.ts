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

@Component({
  selector: 'ngx-form-drug-application',
  templateUrl: './form-drug-application.component.html',
  styleUrls: ['./form-drug-application.component.scss'],
})
export class FormDrugApplicationComponent implements OnInit {
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
  public admissions_id;
  public management_plan_id: any[];
  public administration_route_id: any[];
  public hourly_frequency_id: any[];
  public dose;
  public treatment_days;
  public currency: any;
  public outpatient_formulation;
  public product_gen: any[];
  public product_id;
  public product_dose_id: any[];
  public localidentify;
  public user2;
  public show=true;


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    // private ProductGenericS: ProductGenericService,
    // private AdministrationRouteS: AdministrationRouteService,
    // private HourlyFrequencyS: HourlyFrequencyService,
    private ChFormulationS: ChFormulationService,
    private route: ActivatedRoute,
    // private ManagementPlanS: ManagementPlanService,
    private servicesBriefcaseS: ServicesBriefcaseService,
    // private patienBS: PatientService,
    private ProductGS: ProductGenericService,
    // private ProductDoseS: ProductDoseService
  ) {
  }

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;
    if (!this.data) {
      this.data = {
        product_id: '',
        product_gen: '',
        administration_route_id: '',
        hourly_frequency_id: '',
        medical_formula: '',
        treatment_days: '',
        outpatient_formulation: '',
        dose: '',
        observation: '',
        number_mipres: '',
        
      };
    };

    // await this.patienBS.GetUserById(this.user).then(x => {
    //   this.user2 = x;
    // });

    // this.ManagementPlanS.GetCollection().then(x => {
    //   this.management_plan_id = x;
    // });
    // this.AdministrationRouteS.GetCollection().then(x => {
    //   this.administration_route_id = x;
    // });

    // this.HourlyFrequencyS.GetCollection().then(x => {
    //   this.hourly_frequency_id = x;
    // });
    // this.ProductDoseS.GetCollection().then(x => {
    //   this.product_dose_id = x;
    // });
    // this.servicesBriefcaseS.GetByBriefcase({type:'2'},this.user2.admissions[this.user2.admissions.length - 1].briefcase_id).then(x => {
    //   this.product_gen = x;
    // });

    this.form = this.formBuilder.group({
      //product_id: [this.data.product_id,],
      product_gen: [this.product_id,],
      administration_route_id: [this.data.administration_route_id, Validators.compose([Validators.required])],
      hourly_frequency_id: [this.data.hourly_frequency_id, Validators.compose([Validators.required])],
      treatment_days: [this.data.treatment_days, Validators.compose([Validators.required])],
      outpatient_formulation: [this.data.outpatient_formulation],
      dose: [this.data.dose, Validators.compose([Validators.required])],
      observation: [this.data.observation],
      number_mipres: [this.data.number_mipres],
        });
  
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChFormulationS.Update({
            id: this.data.id,
            product_id: this.form.controls.product_id.value,
            administration_route_id: this.form.controls.administration_route_id.value,
            hourly_frequency_id: this.form.controls.hourly_frequency_id.value,
            medical_formula: this.form.controls.medical_formula.value,
            treatment_days: this.form.controls.treatment_days.value,
            outpatient_formulation: this.form.controls.outpatient_formulation.value,
            dose: this.form.controls.dose.value,
            observation: this.form.controls.observation.value,
            number_mipres: this.form.controls.number_mipres.value,
            type_record_id: 5,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            if (this.saved) {
              this.saved();
            }
          })
          .catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });

      } else {
        await this.ChFormulationS.Save({
            product_id: this.form.controls.product_id.value,
            administration_route_id: this.form.controls.administration_route_id.value,
            hourly_frequency_id: this.form.controls.hourly_frequency_id.value,
            medical_formula: this.form.controls.medical_formula.value,
            treatment_days: this.form.controls.treatment_days.value,
            outpatient_formulation: this.form.controls.outpatient_formulation.value,
            dose: this.form.controls.dose.value,
            observation: this.form.controls.observation.value,
            number_mipres: this.form.controls.number_mipres.value,
            product_dose_id: this.form.controls.product_dose_id.value,
            type_record_id: 5,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({ product_id: '', administration_route_id: '', hourly_frequency_id: '', medical_formula: '',
            treatment_days: '',outpatient_formulation: '', dose: '',observation: '', number_mipres:'', product_dose_id:'' });
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


 onChangesFormulation(event, id) {
    if ((this.form.controls.product_id.value || this.form.controls.product_gen.value) &&
      (this.form.controls.product_id.value != '' || this.form.controls.product_gen.value != '') &&
      this.form.controls.dose.value &&
      this.form.controls.dose.value != '' &&
      this.form.controls.hourly_frequency_id.value &&
      this.form.controls.hourly_frequency_id.value != '' &&
      this.form.controls.treatment_days.value &&
      this.form.controls.treatment_days.value != '' 
    ) {
      var presentmedic = 1;
      var dose = this.form.controls.dose.value;
      var hourly_frequency_id = 1;
      var treatment_days = this.form.controls.treatment_days.value; 
      this.hourly_frequency_id.forEach(element =>{
        if (element.id ==  this.form.controls.hourly_frequency_id.value){
          hourly_frequency_id = element.value;
        }
      });
      this.product_gen.forEach(element =>{
        if (element.id ==  this.form.controls.product_id.value){
          presentmedic = element.manual_price.product.drug_concentration.value;
        }
      });
      var operate =  (dose/presentmedic) * ( 24 / hourly_frequency_id ) * treatment_days;
      this.form.controls.outpatient_formulation.setValue(operate);
    } 
    else {
      this.form.controls.outpatient_formulation.setValue('');
    }
  }

  saveCode1(e): void {
    this.localidentify = this.product_gen.find(item => item.manual_price.name == e);

    if ( this.localidentify) {
      this.product_id =  this.localidentify.id;
      this.form.controls.product_gen.setErrors(null);
    } else {
      this.product_id = null;
      this.toastService.warning('', 'Debe seleccionar un Medicamento de la lista');
      this.form.controls.product_gen.setErrors({'incorrect': true});

    }
  }
  eventSelections(input) {
   if(input==true){
     this.show=false;
    this.ProductGS.GetCollection().then(x => {
      this.product_gen = x;
    });
   }else{
     this.product_gen=null;
    this.show=true;

    this.servicesBriefcaseS.GetByBriefcase({type:'2'},this.user2.admissions[this.user2.admissions.length - 1].briefcase_id).then(x => {
      this.product_gen = x;
    });
   }
  }

}

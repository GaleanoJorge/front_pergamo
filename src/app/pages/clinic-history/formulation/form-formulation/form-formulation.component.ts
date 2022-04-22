import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChFormulationService } from '../../../../business-controller/ch-formulation.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { AdministrationRouteService } from '../../../../business-controller/administration-route.service';
import { HourlyFrequencyService } from '../../../../business-controller/hourly-frequency.service';

@Component({
  selector: 'ngx-form-formulation',
  templateUrl: './form-formulation.component.html',
  styleUrls: ['./form-formulation.component.scss'],
})
export class FormFormulationComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public record_id;
  public admissions_id;
  public product_generic_id;
  public administration_route_id;
  public hourly_frequency_id;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private route: ActivatedRoute,
    private ProductGenericS: ProductGenericService,
    private AdministrationRouteS: AdministrationRouteService,
    private HourlyFrequencyS: HourlyFrequencyService,
    private ChFormulationS: ChFormulationService,


  ) {
    
  }

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });

    if (!this.data) {
      this.data = {
        product_generic_id: '',
        administration_route_id: '',
        hourly_frequency_id: '',
        medical_formula: '',
        treatment_days: '',
        outpatient_formulation: '',
        observation: '',
        
      };
    };

    this.ProductGenericS.GetCollection().then(x => {
      this.product_generic_id = x;
    });
    this.AdministrationRouteS.GetCollection().then(x => {
      this.administration_route_id = x;
    });

    this.HourlyFrequencyS.GetCollection().then(x => {
      this.hourly_frequency_id = x;
    });
    this.form = this.formBuilder.group({
      
      product_generic_id: [this.data.product_generic_id, Validators.compose([Validators.required])],
      administration_route_id: [this.data.administration_route_id, Validators.compose([Validators.required])],
      hourly_frequency_id: [this.data.hourly_frequency_id, Validators.compose([Validators.required])],
      medical_formula: [this.data.medical_formula, Validators.compose([Validators.required])],
      treatment_days: [this.data.treatment_days, Validators.compose([Validators.required])],
      outpatient_formulation: [this.data.outpatient_formulation],
      observation: [this.data.observation, Validators.compose([Validators.required])]
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
            product_generic_id: this.form.controls.product_generic_id.value,
            administration_route_id: this.form.controls.administration_route_id.value,
            hourly_frequency_id: this.form.controls.hourly_frequency_id.value,
            medical_formula: this.form.controls.medical_formula.value,
            treatment_days: this.form.controls.treatment_days.value,
            outpatient_formulation: this.form.controls.outpatient_formulation.value,
            observation: this.form.controls.observation.value,
            type_record_id: 4,
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
            product_generic_id: this.form.controls.product_generic_id.value,
            administration_route_id: this.form.controls.administration_route_id.value,
            hourly_frequency_id: this.form.controls.hourly_frequency_id.value,
            medical_formula: this.form.controls.medical_formula.value,
            treatment_days: this.form.controls.treatment_days.value,
            outpatient_formulation: this.form.controls.outpatient_formulation.value,
            observation: this.form.controls.observation.value,
            type_record_id: 4,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({ product_generic_id: '', administration_route_id: '', hourly_frequency_id: '',
            treatment_days: '',outpatient_formulation: '',observation: '' });
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

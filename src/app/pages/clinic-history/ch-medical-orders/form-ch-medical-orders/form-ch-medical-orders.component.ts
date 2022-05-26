import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEvoSoapService } from '../../../../business-controller/ch-evo-soap.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { HourlyFrequencyService } from '../../../../business-controller/hourly-frequency.service';
import { ProductService } from '../../../../business-controller/product.service';
import { ChMedicalOrdersService } from '../../../../business-controller/ch-medical-orders.service';
import { ProcedureService } from '../../../../business-controller/procedure.service';

@Component({
  selector: 'ngx-form-ch-medical-orders',
  templateUrl: './form-ch-medical-orders.component.html',
  styleUrls: ['./form-ch-medical-orders.component.scss'],
})
export class FormChMedicalOrdersComponent implements OnInit {
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
  public procedure_id: any[];
  public hourly_frequency_id: any[];

  constructor(
    private formBuilder: FormBuilder,
    private evoSoapS: ChEvoSoapService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private route: ActivatedRoute,
    private HourlyFrequencyS: HourlyFrequencyService,
    private ProductS: ProcedureService,
    private ChMedicalOrdersS: ChMedicalOrdersService,
  ) {}

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });

    if (!this.data) {
      this.data = {
        ambulatory_medical_order:'',
        procedure_id: '',
        amount: '',
        hourly_frequency_id: '',
        observations: '',
        
      };
    };

    this.ProductS.GetCollection().then(x => {
      this.procedure_id = x;
    });
    this.HourlyFrequencyS.GetCollection().then(x => {
      this.hourly_frequency_id = x;
    });

    this.form = this.formBuilder.group({
      ambulatory_medical_order: [this.data.ambulatory_medical_order],
      procedure_id: [this.data.procedure_id],
      amount: [this.data.amount],
      hourly_frequency_id: [this.data.hourly_frequency_id],
      observations: [this.data.observations],
     
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChMedicalOrdersS
          .Update({
            id: this.data.id,
            ambulatory_medical_order: this.form.controls.ambulatory_medical_order.value,
            procedure_id: this.form.controls.procedure_id.value,
            amount: this.form.controls.amount.value,
            hourly_frequency_id: this.form.controls.hourly_frequency_id.value,
            observations: this.form.controls.observations.value,
            type_record_id: 6,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.ChMedicalOrdersS
          .Save({
            ambulatory_medical_order: this.form.controls.ambulatory_medical_order.value,
            procedure_id: this.form.controls.procedure_id.value,
            amount: this.form.controls.amount.value,
            hourly_frequency_id: this.form.controls.hourly_frequency_id.value,
            observations: this.form.controls.observations.value,
            type_record_id: 6,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({ ambulatory_medical_order: '', procedure_id: '', amount: '', hourly_frequency:'',observations:'' });
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

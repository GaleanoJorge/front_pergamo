import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEvoSoapService } from '../../../../business-controller/ch-evo-soap.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { HourlyFrequencyService } from '../../../../business-controller/hourly-frequency.service';
import { SpecialFieldService } from '../../../../business-controller/special-field.service';
import { ChInterconsultationService } from '../../../../business-controller/ch-interconsultation.service';
import { SpecialtyService } from '../../../../business-controller/specialty.service';

@Component({
  selector: 'ngx-form-ch-interconsultation',
  templateUrl: './form-ch-interconsultation.component.html',
  styleUrls: ['./form-ch-interconsultation.component.scss'],
})
export class FormChInterconsultationComponent implements OnInit {
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
  public specialty_id: any[];
  public hourly_frequency_id: any[];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private route: ActivatedRoute,
    private HourlyFrequencyS: HourlyFrequencyService,
    private SpecialtyS: SpecialtyService,
    private ChInterconsultationS: ChInterconsultationService
  ) {}

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });

    if (!this.data) {
      this.data = {
        specialty_id: '',
        amount: '',
        hourly_frequency_id: '',
        observations: '',
      };
    };

    this.SpecialtyS.GetCollection().then(x => {
      this.specialty_id = x;
    });
    this.HourlyFrequencyS.GetCollection().then(x => {
      this.hourly_frequency_id = x;
    });

    this.form = this.formBuilder.group({
      specialty_id: [this.data.specialty_id],
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
        await this.ChInterconsultationS
          .Update({
            id: this.data.id,
            specialty_id: this.form.controls.specialty_id.value,
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
        await this.ChInterconsultationS
          .Save({
            specialty_id: this.form.controls.specialty_id.value,
            amount: this.form.controls.amount.value,
            hourly_frequency_id: this.form.controls.hourly_frequency_id.value,
            observations: this.form.controls.observations.value,
            type_record_id: 6,
            ch_record_id: this.record_id,

          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({ specialty_id: '', amount: '', hourly_frequency_id: '', observations:'' });
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

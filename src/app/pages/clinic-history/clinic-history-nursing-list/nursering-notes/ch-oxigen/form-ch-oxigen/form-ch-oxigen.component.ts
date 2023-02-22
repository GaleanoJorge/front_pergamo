import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientPositionService } from '../../../../../../business-controller/patient-position.service';
import { ChRecordService } from '../../../../../../business-controller/ch_record.service';
import { OxygenTypeService } from '../../../../../../business-controller/oxygen_type.service';
import { LitersPerMinuteService } from '../../../../../../business-controller/liters_per_minute.service';
import { ChOxigenService } from '../../../../../../business-controller/ch-oxigen.service';
import { ChPositionService } from '../../../../../../business-controller/ch_position.service';

@Component({
  selector: 'ngx-form-ch-oxigen',
  templateUrl: './form-ch-oxigen.component.html',
  styleUrls: ['./form-ch-oxigen.component.scss'],
})
export class FormChOxigenComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public admissions_id;
  public medical_diagnostic_id: any[];
  public therapeutic_diagnosis_id: any[];
  public diagnosis_id;
  public diagnosis: any[];
  public ostomy_id: any[] = [];
  public patient_positions: any[] = [];

  public oxygen_type: any[] = [];
  public liters_per_minute: any[] = [];

  public loadAuxData = true;

  constructor(

    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private patientPositionS: PatientPositionService,
    private chRecord: ChRecordService,
    private OxygenTypeS: OxygenTypeService,
    private LitersPerMinuteS: LitersPerMinuteService,
    private chOxigenS : ChOxigenService,
    private ChPositionS: ChPositionService,

    private route: ActivatedRoute

  ) { }

  async ngOnInit(): Promise<void> {

    this.record_id = this.route.snapshot.params.id;

    if (!this.data || this.data.length == 0) {
      this.data = {
        oxygen_type_id: '',
        liters_per_minute_id: '',
      };
    }

    this.form = this.formBuilder.group({
      oxygen_type_id: [
        this.data[0] ? this.data[0].patient_position_id : this.data.patient_position_id,
        Validators.compose([Validators.required])
      ],
      liters_per_minute_id: [
        this.data[0] ? this.data[0].observation : this.data.observation,
        Validators.compose([Validators.required])
      ],

    });

    this.loadForm(false).then();

    await Promise.all([
      this.GetAuxData(),
    ]);
    this.loadAuxData = false;
    this.loadForm();

  }

  async GetAuxData() {

    await this.OxygenTypeS.GetCollection({ status_id: 1 }).then(x => {
      this.oxygen_type = x;
    });

    await this.LitersPerMinuteS.GetCollection({ status_id: 1 }).then(x => {
      this.liters_per_minute = x;
    });
    // await this.chOxigenS.ByRecord(this.record_id, this.type_record).then(x => {
    //   x;
    //   if (x.length > 0) {
    //     this.data = x
    //     this.disabled = true
    //   }
    //   this.loading = false;
    // });
    // this.onChange();
    this.loading = false;

    return Promise.resolve(true);
  }

  async loadForm(force = true) {
    if (this.loadAuxData && force) return false;

    this.form = this.formBuilder.group({
      oxygen_type_id: [
        this.data[0] ? this.data[0].oxygen_type_id : this.data.oxygen_type_id,
        Validators.compose([Validators.required])
      ],
      liters_per_minute_id: [
        this.data[0] ? this.data[0].observation : this.data.liters_per_minute_id,
        Validators.compose([Validators.required])
      ],

    });

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.chOxigenS.Update({
          id: this.data.id,
          oxygen_type_id: this.form.controls.oxygen_type_id.value,
          liters_per_minute_id: this.form.controls.liters_per_minute_id.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,

        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.chOxigenS.Save({
          oxygen_type_id: this.form.controls.oxygen_type_id.value,
          liters_per_minute_id: this.form.controls.liters_per_minute_id.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
              oxygen_type_id: '',
              liters_per_minute_id: '',
          });
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
        this.messageEvent.emit(true);
      }

    }
  }

}
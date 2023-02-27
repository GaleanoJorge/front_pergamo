import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientPositionService } from '../../../../../../../business-controller/patient-position.service';
import { ChRecordService } from '../../../../../../../business-controller/ch_record.service';
import { ChPositionService } from '../../../../../../../business-controller/ch_position.service';
@Component({
  selector: 'ngx-form-ch-position',
  templateUrl: './form-ch-position.component.html',
  styleUrls: ['./form-ch-position.component.scss'],
})
export class FormChPositionComponent implements OnInit {
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
  public botton_title: string = 'Guardar';

  public loadAuxData = true;





  constructor(

    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private patientPositionS: PatientPositionService,
    private chRecord: ChRecordService,
    private ChPositionS: ChPositionService,

    private route: ActivatedRoute

  ) { }

  async ngOnInit(): Promise<void> {

    this.record_id = this.route.snapshot.params.id;

    if (!this.data || this.data.length == 0) {
      this.data = {
        patient_position_id: '',
        observation: '',
      };
    }

    this.form = this.formBuilder.group({
      patient_position_id: [
        this.data[0] ? this.data[0].patient_position_id : this.data.patient_position_id,
        Validators.compose([Validators.required])
      ],
      observation: [
        this.data[0] ? this.data[0].observation : this.data.observation,
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

    await this.patientPositionS.GetCollection().then(x => {
      this.patient_positions = x;
    });

    if (this.type_record == 1) {
      await this.ChPositionS.ByRecord(this.record_id, this.type_record).then(x => {
        x;
        if (x.length > 0) {
          this.data = x
          // this.disabled = true
          this.isSubmitted = false;
          this.botton_title = 'Actualizar';
          // this.form.controls.observation.disable();
        }
        this.loading = false;
      });
    }

    // this.onChange();
    this.loading = false;

    return Promise.resolve(true);
  }

  async loadForm(force = true) {
    if (this.loadAuxData && force) return false;

    this.form = this.formBuilder.group({
      patient_position_id: [
        this.data[0] ? this.data[0].patient_position_id : this.data.patient_position_id,
        Validators.compose([Validators.required])
      ],
      observation: [
        this.data[0] ? this.data[0].observation : this.data.observation,
      ],

    });

  }


  async save() {
    // this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChPositionS.Update({
          id: this.data.id,
          patient_position_id: this.form.controls.patient_position_id.value,
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,

        }).then(x => {
          this.isSubmitted = false;
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.ChPositionS.Save({
          patient_position_id: this.form.controls.patient_position_id.value,
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.data.id = x.data.ch_position.id;
          this.isSubmitted = false;
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          if (this.type_record == 1) {
            // this.form.controls.observation.disable();
            this.isSubmitted = false; 
            // this.disabled = true
            this.botton_title = 'Actualizar';
          } else {
            this.form.patchValue({
              patient_position_id: '',
              observation: '',
            });
            this.isSubmitted = false;
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
        // this.messageEvent.emit(true);
      }

    }
  }
 
}
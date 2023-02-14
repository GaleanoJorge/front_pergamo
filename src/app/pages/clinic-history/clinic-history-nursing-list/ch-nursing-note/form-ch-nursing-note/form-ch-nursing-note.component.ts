import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientPositionService } from '../../../../../business-controller/patient-position.service';
import { ChRecordService } from '../../../../../business-controller/ch_record.service';
import { ChNursingNoteService } from '../../../../../business-controller/ch-nursing-note.service';

@Component({
  selector: 'ngx-form-ch-nursing-note',
  templateUrl: './form-ch-nursing-note.component.html',
  styleUrls: ['./form-ch-nursing-note.component.scss'],
})
export class FormChNursingNoteComponent implements OnInit {
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

  public loadAuxData = true;





  constructor(

    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private patientPositionS: PatientPositionService,
    private chRecord: ChRecordService,
    private ChNursingNoteS: ChNursingNoteService,

    private route: ActivatedRoute

  ) { }

  async ngOnInit(): Promise<void> {

    this.record_id = this.route.snapshot.params.id;

    if (!this.data || this.data.length == 0) {
      this.data = {
        observation: '',
      };
    }

    this.form = this.formBuilder.group({
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

    if (this.type_record == 1) {
      await this.ChNursingNoteS.ByRecord(this.record_id, this.type_record).then(x => {
        x;
        if (x.length > 0) {
          this.data = x
          this.disabled = true
          this.isSubmitted = true
          this.form.controls.observation.disable();
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
      observation: [
        this.data[0] ? this.data[0].observation : this.data.observation,
      ],

    });

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChNursingNoteS.Update({
          id: this.data.id,
          observation: this.form.controls.observation.value,
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
        await this.ChNursingNoteS.Save({
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          if (this.type_record == 1) {
            this.form.controls.observation.disable();
            this.isSubmitted = true;
            this.disabled = true
          } else {
            this.form.patchValue({
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
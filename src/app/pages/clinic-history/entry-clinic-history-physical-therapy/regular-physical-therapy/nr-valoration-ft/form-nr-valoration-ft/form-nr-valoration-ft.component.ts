import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiagnosisService } from '../../../../../../business-controller/diagnosis.service';
import { ChEValorationFTService } from '../../../../../../business-controller/ch_e_valoration_f_t.service';

@Component({
  selector: 'ngx-form-nr-valoration-ft',
  templateUrl: './form-nr-valoration-ft.component.html',
  styleUrls: ['./form-nr-valoration-ft.component.scss']
})
export class FormNRValorationFTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public diagnosis: any[];
  public ch_e_valoration_f_t: any[];
  public ch_diagnosis_id;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private DiagnosisS: DiagnosisService,
    private ChEValorationFTService: ChEValorationFTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
        patient_state: '',
      };
    }



    this.form = this.formBuilder.group({

      ch_diagnosis_id: [this.data[0] ? this.data[0].ch_diagnosis_id : this.data.ch_diagnosis_id, Validators.compose([Validators.required])],
      patient_state: [this.data[0] ? this.data[0].patient_state : this.data.patient_state, Validators.compose([Validators.required])],
      
    });

    this.ChEValorationFTService.GetCollection().then(x => {
      this.ch_e_valoration_f_t = x;
    });
  }

  public diagnosticConut = 0;

  searchDiagnostic($event) {
    this.diagnosticConut++;
    if (this.diagnosticConut == 3) {
      this.diagnosticConut = 0;
      if ($event.length >= 3) {
        this.DiagnosisS.GetCollection({
          search: $event,
        }).then(x => {
          this.diagnosis = x;
        });
      } else {
        this.DiagnosisS.GetCollection({
          search: '',
        }).then(x => {
          this.diagnosis = x;
        });
      }
    }
  }

  saveCode(e): void {
    var localidentify = this.diagnosis.find(item => item.name == e);
    if (localidentify) {
      this.ch_diagnosis_id = localidentify.id;
    } else {
      this.ch_diagnosis_id = null;
      this.form.controls.ch_diagnosis_id.setErrors({ 'incorrect': true });
      this.toastService.warning('', 'Debe seleccionar un item de la lista');
    }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
          this.ChEValorationFTService.Update({
          id: this.data.id,
          ch_diagnosis_id: this.form.controls.ch_diagnosis_id.value,
          patient_state: this.form.controls.patient_state.value,
          type_record_id: 3,
          ch_record_id: this.record_id,

        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({ch_diagnosis_id:'',  patient_state:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChEValorationFTService.Save({
          ch_diagnosis_id: this.ch_diagnosis_id,
          patient_state: this.form.controls.patient_state.value,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({ch_diagnosis_id:'',  patient_state:''});
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
}

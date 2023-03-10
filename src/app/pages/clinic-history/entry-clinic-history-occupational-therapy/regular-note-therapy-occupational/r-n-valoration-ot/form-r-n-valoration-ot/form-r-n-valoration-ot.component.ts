import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DiagnosisService } from '../../../../../../business-controller/diagnosis.service';
import { ChEValorationOTService } from '../../../../../../business-controller/ch_e_valoration_o_t.service';
import { ChRNValorationOTService } from '../../../../../../business-controller/ch_r_n_valoration_o_t.service';

@Component({
  selector: 'ngx-form-r-n-valoration-ot',
  templateUrl: './form-r-n-valoration-ot.component.html',
  styleUrls: ['./form-r-n-valoration-ot.component.scss']
})
export class FormRNValorationOtComponent implements OnInit {

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
  public diagnosisr: any[];
  public ch_e_valoration_o_t: any[];
  public ch_diagnosis_id;
  public concatDiagnosis;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private DiagnosisS: DiagnosisService,
    private ChEValorationOTS: ChEValorationOTService,
    private ChRNValorationOTS: ChRNValorationOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        patient_state: '',
      };
    }

 

    this.form = this.formBuilder.group({
      ch_diagnosis_id: [this.concatDiagnosis],
      patient_state: [this.data.patient_state,],
    });

    // this.diagnosisS.GetCollection().then(x => {
    //   this.diagnosis = x;
    // });

    // this.ChEValorationOTS.GetCollection().then(x => {
    //   this.ch_e_valoration_o_t = x;
    // });

    this.ChEValorationOTS.GetCollection({
      record_id: this.record_id,
      type_record_id: 1,
    }).then(x => {
      this.diagnosisr = x; 
      this.concatDiagnosis= this.diagnosisr[0].ch_diagnosis.code + ' - ' +  this.diagnosisr[0].ch_diagnosis.name;
    });
  }

  public diagnosticConut = 0;

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
          this.ChRNValorationOTS.Update({
          id: this.data.id,
          patient_state: this.form.controls.patient_state.value,
          type_record_id: 3,
          ch_record_id: this.record_id,

        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({ patient_state:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChRNValorationOTS.Save({
          patient_state: this.form.controls.patient_state.value,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({ patient_state:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }
    } else{
      this.toastService.danger('ingrese todos los campos solicitados');
    }
  }

}

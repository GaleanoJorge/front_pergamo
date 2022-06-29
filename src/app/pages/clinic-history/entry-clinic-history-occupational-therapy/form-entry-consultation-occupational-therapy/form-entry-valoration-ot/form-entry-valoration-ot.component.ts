import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChReasonConsultationService } from '../../../../../business-controller/ch-reason-consultation.service';
import { ChExternalCauseService } from '../../../../../business-controller/ch-external-cause.service';
import { DiagnosisService } from '../../../../../business-controller/diagnosis.service';
import { threadId } from 'worker_threads';
import { ChEValorationOTService } from '../../../../../business-controller/ch_e_valoration_o_t.service';



@Component({
  selector: 'ngx-form-entry-valoration-ot',
  templateUrl: './form-entry-valoration-ot.component.html',
  styleUrls: ['./form-entry-valoration-ot.component.scss']
})
export class FormEntryValorationOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public ch_external_cause: any[];
  public diagnosis: any[];

  public ch_diagnosis_id;


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private diagnosisS: DiagnosisService,
    private ChEValorationOTS: ChEValorationOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        ch_diagnosis_id: '',
        recomendations: '',
      };
    }

    this.diagnosisS.GetCollection().then(x => {
      this.diagnosis = x;
    });


    this.form = this.formBuilder.group({
      ch_diagnosis_id: [this.data[0] ? this.data[0].ch_diagnosis_id : this.data.ch_diagnosis_id,],
      recomendations: [this.data[0] ? this.data[0].recomendations : this.data.recomendations,],
    });

    if (this.data.ocupation != '') {
      this.form.controls.ch_diagnosis_id.disable();
      this.form.controls.recomendations.disable();
      this.disabled = true;
    } else {
      this.form.controls.ch_diagnosis_id.enable();
      this.form.controls.recomendations.enable();
      this.disabled = false;
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

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChEValorationOTS.Update({
          id: this.data.id,
          ch_diagnosis_id: this.form.controls.ch_diagnosis_id.value,
          recomendations: this.form.controls.recomendations.value,
          type_record_id: 1,
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
        await this.ChEValorationOTS.Save({
          ch_diagnosis_id: this.ch_diagnosis_id,
          recomendations: this.form.controls.recomendations.value,
          type_record_id: 1,
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
      }

    }
  }

}

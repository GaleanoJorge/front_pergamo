import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DiagnosisService } from '../../../../../../business-controller/diagnosis.service';
import { ChEValorationOTService } from '../../../../../../business-controller/ch_e_valoration_o_t.service';

@Component({
  selector: 'ngx-form-valoration-ot',
  templateUrl: './form-valoration-ot.component.html',
  styleUrls: ['./form-valoration-ot.component.scss']
})
export class FormValorationOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public diagnosis: any[];
  public ch_e_valoration_o_t: any[];
  public ch_diagnosis_id;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private DiagnosisS: DiagnosisService,
    private ChEValorationOTS: ChEValorationOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
        recomendations: '',
      };
    }



    this.form = this.formBuilder.group({
      ch_diagnosis_id: [this.data.ch_diagnosis_id,],
      recomendations: [this.data.recomendations,],
    });

    // this.diagnosisS.GetCollection().then(x => {
    //   this.diagnosis = x;
    // });
    this.ChEValorationOTS.GetCollection().then(x => {
      this.ch_e_valoration_o_t = x;
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
    if (this.diagnosis) {
      var localidentify = this.diagnosis.find(item => item.name == e);
  
      if (localidentify) {
        this.ch_diagnosis_id = localidentify.id;
      } else {
        this.ch_diagnosis_id = null;
        this.toastService.warning('', 'Debe seleccionar un item de la lista');
        this.form.controls.ch_diagnosis_id.setErrors({ 'incorrect': true });
      }
    } else {
      this.ch_diagnosis_id = null;
      this.toastService.warning('', 'Debe seleccionar un item de la lista');
      this.form.controls.ch_diagnosis_id.setErrors({ 'incorrect': true });
    }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
          this.ChEValorationOTS.Update({
          id: this.data.id,
          ch_diagnosis_id: this.form.controls.ch_diagnosis_id.value,
          recomendations: this.form.controls.recomendations.value,
          type_record_id: 1,
          ch_record_id: this.record_id,

        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({ch_diagnosis_id:'',  recomendations:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChEValorationOTS.Save({
          ch_diagnosis_id: this.ch_diagnosis_id,
          recomendations: this.form.controls.recomendations.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({ch_diagnosis_id:'',  recomendations:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }
    }else{
      this.toastService.danger('ingrese todos los campos solicitados');
    }
  }
}

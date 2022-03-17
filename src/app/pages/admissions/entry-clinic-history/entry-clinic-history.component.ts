import { AdmissionsService } from '../../../business-controller/admissions.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { Actions6Component } from './actions.component';
import { FormEntryClinicHistoryComponent } from './form-entry-clinic-history/form-entry-clinic-history.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChDiagnosisClassService } from '../../../business-controller/ch-diagnosis-class.service';
import { ChDiagnosisTypeService } from '../../../business-controller/ch-diagnosis-type.service';
import { ChDiagnosisService } from '../../../business-controller/ch-diagnosis.service';
import { ChVitalHydrationService } from '../../../business-controller/ch-vital-hydration.service';
import { ChVitalTemperatureService } from '../../../business-controller/ch-vital-temperature.service';
import { ChVitalVentilatedService } from '../../../business-controller/ch-vital-ventilated.service';
import { ChVitalSignsService } from '../../../business-controller/ch-vital-signs.service';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { DiagnosisService } from '../../../business-controller/diagnosis.service';
import { ChVitalNeurologicalService } from '../../../business-controller/ch-vital-neurological.service';
import { ChReasonConsultationService } from '../../../business-controller/ch-reason-consultation.service';


@Component({
  selector: 'ngx-entry-clinic-history',
  templateUrl: './entry-clinic-history.component.html',
  styleUrls: ['./entry-clinic-history.component.scss'],
})
export class EntryClinicHistoryComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public diagnosis: any[];
  public chdiagnosis: any[];
  public chdiagnosistype: any[];
  public chdiagnosisclass: any[];
  public chvitalhidra: any[];
  public chvitaltemp: any[];
  public ch_vital_neurological: any[];
  public chvitalventi: any[];
  public chvitsigns: any[];

  public cont = 0;
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private chreasonConsultS: ChReasonConsultationService,
    public userChangeS: UserChangeService,
    private chdiagnosisClassS: ChDiagnosisClassService,
    private chdiagnosistypeS: ChDiagnosisTypeService,
    private diagnosisS: DiagnosisService,
    private chdiagnosisS: ChDiagnosisService,
    private chvitHydrationS: ChVitalHydrationService,
    private chvitNeuroS: ChVitalNeurologicalService,
    private chvitTemperatureS: ChVitalTemperatureService,
    private chvitventilatedS: ChVitalVentilatedService,
    private chvitSignsS: ChVitalSignsService,
  ) {

  }

  ngOnInit() {
    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
      };
    }
    this.chdiagnosisClassS.GetCollection().then(x => {
      this.chdiagnosisclass = x;
    });
    this.chdiagnosistypeS.GetCollection().then(x => {
      this.chdiagnosistype = x;
    });
    this.diagnosisS.GetCollection().then(x => {
      this.diagnosis = x;
    });
    this.chdiagnosisS.GetCollection().then(x => {
      this.chdiagnosis = x;
    });
    this.chvitHydrationS.GetCollection().then(x => {
      this.chvitalhidra = x;
    });
    this.chvitNeuroS.GetCollection().then(x => {
      this.ch_vital_neurological = x;
    });
    this.chvitTemperatureS.GetCollection().then(x => {
      this.chvitaltemp = x;
    });
    this.chvitventilatedS.GetCollection().then(x => {
      this.chvitalventi = x;
    });
    this.chvitSignsS.GetCollection().then(x => {
      this.chvitsigns = x;
    });


    this.form = this.formBuilder.group({
      ch_entry_review_system_id: [this.data.ch_entry_review_system_id, Validators.compose([Validators.required])],//el que es ciclico
      diagnosis_id: [this.data.diagnosis_id, Validators.compose([Validators.required])],
      ch_diagnosis_id: [this.data.ch_diagnosis_id, Validators.compose([Validators.required])],
      ch_diagnosis_class_id: [this.data.ch_diagnosis_class_id, Validators.compose([Validators.required])],
      ch_diagnosis_type_id: [this.data.ch_diagnosis_type_id, Validators.compose([Validators.required])],
      ch_vital_hydration_id: [this.data.ch_vital_hydration_id, Validators.compose([Validators.required])],
      ch_vital_ventilated_id: [this.data.ch_vital_ventilated_id, Validators.compose([Validators.required])],
      ch_vital_temperature_id: [this.data.ch_vital_temperature_id, Validators.compose([Validators.required])],
      ch_vital_neurological_id: [this.data.ch_vital_neurological_id, Validators.compose([Validators.required])],
      ch_vital_signs_id: [this.data.ch_vital_signs_id, Validators.compose([Validators.required])],
      ch_entry_id: [this.data.ch_entry_id, Validators.compose([Validators.required])],

    });
  }
  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid && this.saveEntry) {
      this.loading = true;
      if (this.data.id) { }
      await this.chreasonConsultS.Update({});
    }
  }

  saveMcEa() {
  }
  saveRxSystem() {
  }
  saveExFisic() {
  }
  saveVitalSgns() {
  }
  saveDiagnostic() {
  }

}


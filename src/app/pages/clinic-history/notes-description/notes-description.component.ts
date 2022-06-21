import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { ChReasonConsultationService } from '../../../business-controller/ch-reason-consultation.service';
import { ChVitalSignsService } from '../../../business-controller/ch-vital-signs.service';
import { ChDiagnosisService } from '../../../business-controller/ch-diagnosis.service';
import { ChPhysicalExamService } from '../../../business-controller/ch_physical_exam.service';
import { VALUE } from '@syncfusion/ej2-angular-filemanager';


@Component({
  selector: 'ngx-notes-description',
  templateUrl: './notes-description.component.html',
  styleUrls: ['./notes-description.component.scss'],
})
export class NotesDescriptionComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  //@Input() vital: any;
  linearMode = false;
  public messageError = null;
  public title = '';
  public subtitle = '';
  public headerFields: any[] = ['POSICIÓN ACTUAL', 'CUERO CABELLUDO', 'OSTOMIA', 'OXIGENO','TIPO DE OXIGENO','LITROS POR MINUTO', 'UNIDAD', 'BAÑAR'];
  public routes = [];
  public user_id;
  public chreasonconsultation: any[];
  public physical: any[];
  public chvitsigns: any[];
  public chdiagnosis: any[];
  public nameForm: String;
  public movieForm: String;


  public record_id;
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private chreasonconsultS: ChReasonConsultationService,
    private chphysicalS: ChPhysicalExamService,
    private chvitalSignsS: ChVitalSignsService,
    private chdiagnosisS: ChDiagnosisService,
    public userChangeS: UserChangeService,


  ) {
  }

  public settings = {
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
          };
        },
      },
      patient_position: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      hair_revision: {
        title: this.headerFields[1],
        type: 'string',
      },
      ostomy: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      has_oxigen: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value == 0) {
            return 'NO APLICA';
          } else {
            return 'APLICA';
          }
        },
      },
      oxygen_type: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value) {
            return value.name;
          } else {
            return 'NO APLICA';
          }
        },
      },
      liters_per_minute: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value) {
            return value.name;
          } else {
            return 'NO APLICA';
          }
        },
      },
      unit_arrangement: {
        title: this.headerFields[6],
        type: 'string',
      },
      patient_dry: {
        title: this.headerFields[7],
        type: 'string',
      },
    },
  };
  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;
    // if (!this.data) {
    //   this.data = {
    //     ch_diagnosis_id: '',
    //   };
    // }

    // await this.chreasonconsultS.GetCollection({ ch_record_id: this.record_id }).then(x => {
    //   this.chreasonconsultation = x;
    // });
    // await this.chvitalSignsS.GetCollection({ ch_record_id: this.record_id }).then(x => {
    //   this.chvitsigns = x;
    // });
    // await this.chdiagnosisS.GetCollection({ ch_record_id: this.record_id }).then(x => {
    //   this.chdiagnosis = x;
    // });
    // await this.chphysicalS.GetCollection({ ch_record_id: this.record_id }).then(x => {
    //   this.physical = x;
    // });

    // this.form = this.formBuilder.group({
    //   ch_entry_review_system_id: [this.data.ch_entry_review_system_id, Validators.compose([Validators.required])],//el que es ciclico
    //   diagnosis_id: [this.data.diagnosis_id, Validators.compose([Validators.required])],
    //   ch_diagnosis_id: [this.data.ch_diagnosis_id, Validators.compose([Validators.required])],
    //   ch_diagnosis_class_id: [this.data.ch_diagnosis_class_id, Validators.compose([Validators.required])],
    //   ch_diagnosis_type_id: [this.data.ch_diagnosis_type_id, Validators.compose([Validators.required])],
    //   ch_vital_hydration_id: [this.data.ch_vital_hydration_id, Validators.compose([Validators.required])],
    //   ch_vital_ventilated_id: [this.data.ch_vital_ventilated_id, Validators.compose([Validators.required])],
    //   ch_vital_temperature_id: [this.data.ch_vital_temperature_id, Validators.compose([Validators.required])],
    //   ch_vital_neurological_id: [this.data.ch_vital_neurological_id, Validators.compose([Validators.required])],
    //   ch_vital_signs_id: [this.data.ch_vital_signs_id, Validators.compose([Validators.required])],
    //   ch_entry_id: [this.data.ch_entry_id, Validators.compose([Validators.required])],

    // });
  }
  // async save() {
  //   this.isSubmitted = true;
  //   if (!this.form.invalid && this.saveEntry) {
  //     this.loading = true;
  //     if (this.data.id) { }
  //     await this.chreasonconsultS.Update({});
  //     await this.chvitalSignsS.Update({});
  //   }
  // }

  // saveMcEa() {
  // }

  // saveRxSystem() {
  // }

  // saveExFisic() {
  // }

  // saveVitalSgns() {
  // }

  // saveDiagnostic() {
  // }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData()
    }
  }
}


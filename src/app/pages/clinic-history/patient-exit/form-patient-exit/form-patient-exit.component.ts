import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChPatientExitService } from '../../../../business-controller/ch-patient-exit.service';
import { ReasonExitService } from '../../../../business-controller/reason-exit.service';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { ChDiagnosisService } from '../../../../business-controller/ch-diagnosis.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { AuthService } from '../../../../services/auth.service';
import { Location } from '@angular/common';
import { exit } from 'process';
@Component({
  selector: 'ngx-form-patient-exit',
  templateUrl: './form-patient-exit.component.html',
  styleUrls: ['./form-patient-exit.component.scss'],
})
export class FormPatientExitComponent implements OnInit {
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
  public death_diagnosis_id: any[];
  public ch_diagnosis: any[];
  public exit_diagnosis_id: any[];
  public relations_diagnosis_id: any[];
  public reason_exit: any[];
  public show: boolean;
  public show_death: boolean = false;
  public show_inputs: boolean = false;
  public diagnosis: any[] = [];
  public diagnosis_id;
  public exit_diagnosis;
  public relations_diagnosis;
  public user_id;
  public user;
  public own_user;
  public currentRole:any; 
  public exit;
  

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChPatientExitS: ChPatientExitService,
    private ReasonExitS: ReasonExitService,
    private DiagnosisS: DiagnosisService,
    private ChDiagnosisS: ChDiagnosisService,
    private route: ActivatedRoute,
    private chRecord:ChRecordService,
    private UserBS: UserBusinessService,
    private authService: AuthService, 
    private location: Location,
    
  ) {

  }


  GetParams() {
    return {
      user_id: this.route.snapshot.params.user_id,
    };
  }

  ngOnInit(): void {

    this.record_id = this.route.snapshot.params.id;
    this.currentRole = this.authService.GetRole();
    this.own_user = this.authService.GetUser();

    this.chRecord.GetCollection({
      record_id: this.record_id
    }).then(x => {
      this.user = x[0]['admissions']['patients'];
      this.title = 'Admisiones de paciente: ' + this.user.firstname + ' ' + this.user.lastname;
    });
  

    this.record_id = this.route.snapshot.params.id;
    if (!this.data) {
      this.data = {
        exit_status: '',
        legal_medicine_transfer: '',
        date_time: '',
        death_diagnosis_id: '',
        medical_signature: '',
        death_certificate_number: '',
        ch_diagnosis_id: '',
        exit_diagnosis_id: '',
        relations_diagnosis_id: '',
        reason_exit_id:'',

      };
    }

    this.ReasonExitS.GetCollection().then(x => {
      this.reason_exit = x;
    });

    this.DiagnosisS.GetCollection().then(x => {
      this.diagnosis = x;
    });
    this.ChDiagnosisS.GetCollection().then(x => {
      this.ch_diagnosis = x;
    });
   

    this.form = this.formBuilder.group({
      exit_status: [this.data.exit_status,Validators.compose([Validators.required]),],
      legal_medicine_transfer: [this.data.legal_medicine_transfer],
      date_time: [this.data.date_time],
      death_diagnosis_id: [this.data.death_diagnosis_id],
      ch_diagnosis_id: [this.data.ch_diagnosis_id],
      medical_signature: [this.data.medical_signature],
      death_certificate_number: [this.data.death_certificate_number],
      exit_diagnosis_id: [this.data[0] ? this.returnCode( this.data[0].exit_diagnosis_id ): this.data.exit_diagnosis_id,Validators.compose([Validators.required]),],
      relations_diagnosis_id: [this.data[0] ? this.returnCode( this.data[0].relations_diagnosis_id ): this.data.relations_diagnosis_id,Validators.compose([Validators.required]),],
     

      reason_exit_id: [this.data.reason_exit_id],
     
    });
  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false; 

      if (this.data.id) {
        await this.ChPatientExitS.Update({
          id: this.data.id,
          exit_status: this.form.controls.exit_status.value,
          legal_medicine_transfer: this.form.controls.legal_medicine_transfer.value,
          date_time: this.form.controls.date_time.value,
          death_diagnosis_id: this.form.controls.death_diagnosis_id.value,
          ch_diagnosis_id: this.form.controls.ch_diagnosis_id.value,
          medical_signature: this.form.controls.medical_signature.value,
          death_certificate_number: this.form.controls.death_certificate_number.value,
          exit_diagnosis_id: this.exit_diagnosis_id,
          relations_diagnosis_id: this.relations_diagnosis_id,
          reason_exit_id: this.form.controls.reason_exit_id.value,
          type_record_id: 10,
          ch_record_id: this.record_id,
        }).then((x) => {
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
        await this.ChPatientExitS.Save({
          id: this.data.id,
          exit_status: this.form.controls.exit_status.value,
          legal_medicine_transfer: this.form.controls.legal_medicine_transfer.value,
          date_time: this.form.controls.date_time.value,
          death_diagnosis_id: this.form.controls.death_diagnosis_id.value,
          ch_diagnosis_id: this.form.controls.ch_diagnosis_id,
          exit_diagnosis_id: this.exit_diagnosis_id,
          medical_signature: this.form.controls.medical_signature.value,
          death_certificate_number: this.form.controls.death_certificate_number.value,
          relations_diagnosis_id: this.relations_diagnosis_id,
          reason_exit_id: this.form.controls.reason_exit_id.value,
          type_record_id: 10,
          ch_record_id: this.record_id,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.exit = this.finish.bind(this),
            this.messageEvent.emit(true);
            this.form.setValue({exit_status: '', legal_medicine_transfer: '', date_time: '', death_diagnosis_id: '', });
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
 
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })

//   eventSelections(input) {
//     if(input==true){
//       this.show=false;
     
//    }
// }

async ShowDeath(e) {
  if (e == 1) {
    this.show_death = true;
    this.show_inputs = true;
  } else {
    this.show_inputs = false;
    this.show_death = false;
  }
}

returnCode(diagnosis_id){
  var localName = this.diagnosis.find(item => item.id == diagnosis_id);
  var nombre_diagnosis
  if(localName){
    nombre_diagnosis = localName.name;
  } else {
    nombre_diagnosis = ''
  }
  return nombre_diagnosis;
}

saveCode(e, valid): void {
  var localidentify = this.diagnosis.find(item => item.name == e);

  if (localidentify) {
    if (valid==1){
      this.exit_diagnosis = localidentify.id;
    } else {
      this.relations_diagnosis = localidentify.id;
    }
  } else {
    if (valid==1){
      this.exit_diagnosis = null;
    } else {
      this.relations_diagnosis = null;
    }
    this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
    this.form.controls.diagnosis_id.setErrors({'incorrect': true});
  }
}

async finish() {

  await this.chRecord.Update({
    id: this.record_id,
    status: 'CERRADO',
    user: this.user,
    role: this.currentRole,
    user_id: this.own_user.id,
  }).then(x => {
    this.toastService.success('', x.message);
    this.location.back();
    if (this.saved) {
      this.saved();
    }
  }).catch(x => {
    this.isSubmitted = false;
    this.loading = false;
  });
}

}
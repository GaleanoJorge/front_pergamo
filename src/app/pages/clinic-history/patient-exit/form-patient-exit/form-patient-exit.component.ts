import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChPatientExitService } from '../../../../business-controller/ch-patient-exit.service';
import { ReasonExitService } from '../../../../business-controller/reason-exit.service';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { ChDiagnosisService } from '../../../../business-controller/ch-diagnosis.service';
import { AuthService } from '../../../../services/auth.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { Location } from '@angular/common';
import { AdmissionsService } from '../../../../business-controller/admissions.service';



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
  public death_diagnosis_id;
  public ch_diagnosis: any[];
  public exit_diagnosis_id;
  public relations_diagnosis_id;
  public reason_exit: any[];
  public show: boolean=false;
  public show2: boolean=false;
  public show_death: boolean = false;
  public show_inputs: boolean = false;
  public diagnosis: any[] = [];
  public diagnosis_id;
  public ch_diagnosis_id;
  public exit_diagnosis;
  public relations_diagnosis;
  public user_id;
  public user;
  public own_user;
  public currentRole:any; 
  public exit;
  public reason_exit_id;

  

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChPatientExitS: ChPatientExitService,
    private ReasonExitS: ReasonExitService,
    private DiagnosisS: DiagnosisService,
    private ChDiagnosisS: ChDiagnosisService,
    private route: ActivatedRoute,
    private authService: AuthService, 
    private chRecord: ChRecordService,
    private admissionS: AdmissionsService,
    private location: Location,
    private router: Router,

  ) {

  }


  GetParams() {
    return {
      user_id: this.route.snapshot.params.user_id,
    };
  }

  ngOnInit():void {

    this.record_id = this.route.snapshot.params.id;
    this.currentRole = this.authService.GetRole();
    this.own_user = this.authService.GetUser();
  
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

    this.form = this.formBuilder.group({

      exit_status: [this.data.exit_status,Validators.compose([Validators.required])],
      legal_medicine_transfer: [this.data.legal_medicine_transfer],
      date_time: [this.data.date_time],
      death_diagnosis_id: [this.data.death_diagnosis_id],
      ch_diagnosis_id: [this.data[0] ? this.returnCode( this.data[0].ch_diagnosis_id ): this.data.ch_diagnosis_id],
      medical_signature: [this.data.medical_signature],
      death_certificate_number: [this.data.death_certificate_number],
      exit_diagnosis_id: [this.data[0] ? this.returnCode( this.data[0].exit_diagnosis_id ): this.data.exit_diagnosis_id],
      relations_diagnosis_id: [this.data[0] ? this.returnCode( this.data[0].relations_diagnosis_id ): this.data.relations_diagnosis_id],
      reason_exit_id: [this.data.reason_exit_id],
     
    });

    this.onChanges();

    this.ReasonExitS.GetCollection().then(y => {
      this.reason_exit= y;
    });

    this.DiagnosisS.GetCollection().then(x => {
      this.diagnosis = x;
    });
    this.ChDiagnosisS.GetCollection().then(x => {
      this.ch_diagnosis = x;
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
        }).then(x => {
            this.toastService.success('', x.message);
            if (this.saved) {
              this.saved();
            }
          })
          .catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.ChPatientExitS.Save({
          id: this.data.id,
          exit_status: this.form.controls.exit_status.value,
          legal_medicine_transfer: this.form.controls.legal_medicine_transfer.value,
          date_time: this.form.controls.date_time.value,
          death_diagnosis_id: this.death_diagnosis_id,
          ch_diagnosis_id: this.ch_diagnosis_id,
          exit_diagnosis_id: this.exit_diagnosis_id,
          medical_signature: this.form.controls.medical_signature.value,
          death_certificate_number: this.form.controls.death_certificate_number.value,
          relations_diagnosis_id: this.relations_diagnosis_id,
          reason_exit_id: this.reason_exit_id,
          type_record_id: 10,
          ch_record_id: this.record_id,

        }).then(x => {
          this.toastService.success('', x.message);
          this.chRecord.Update({
            id: this.record_id,
            status: 'CERRADO',
            user: this.authService.GetUser().id,
            role: this.currentRole,
            user_id: this.own_user.id,
          }).then(z => {
            this.admissionS.Update({
              id:  z.data.ch_record.admissions_id,
              medical_date:new Date(),
              user_medical_id:this.authService.GetUser().id,
            }).then(y => {
              this.location.back();
              this.toastService.success('', y.message);

              if (this.saved) {
                this.saved();
              }
            }).catch(y => {
              this.isSubmitted = false;
              this.loading = false;
            });
           
            this.location.back();
            if (this.saved) {
              this.saved();
            }
          }).catch(z => {
            this.isSubmitted = false;
            this.loading = false;
          });
          this.router.navigateByUrl('/pages/pad/list');

          this.messageEvent.emit(true);
          this.form.setValue({ patient_family_education:'', recommendations_evo_id: '', description:'', });
          if (this.saved) {
            this.saved();
          }
        // })
        //   .then(x => {
        //     this.toastService.success('', x.message);
        //     // this.exit = this.finish.bind(this),
        //     this.messageEvent.emit(true);
        //     this.form.setValue({exit_status: '', legal_medicine_transfer: '', date_time: '', death_diagnosis_id: '', });
        //     if (this.saved) {
        //       this.saved();
        //     }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
          this.messageEvent.emit(true);
      }
    }
  }

  onChanges() {
    this.form.get('exit_status').valueChanges.subscribe(val => {
      if (val==1) {
        this.show=true;
        this.show2=false;
        this.form.get('ch_diagnosis_id').setValidators(Validators.required);
        this.form.get('exit_diagnosis_id').setValidators(Validators.required);
        this.form.get('relations_diagnosis_id').setValidators(Validators.required);
        this.form.get('reason_exit_id').setValidators(Validators.required);
        this.form.controls.date_time.clearValidators();
        this.form.controls.date_time.setErrors(null);
        this.form.controls.legal_medicine_transfer.clearValidators();
        this.form.controls.legal_medicine_transfer.setErrors(null);
        this.form.controls.death_diagnosis_id.clearValidators();
        this.form.controls.death_diagnosis_id.setErrors(null);
        this.form.controls.medical_signature.clearValidators();
        this.form.controls.medical_signature.setErrors(null);
        this.form.controls.death_certificate_number.clearValidators();
        this.form.controls.death_certificate_number.setErrors(null);
      } else {
        this.show=false;
        this.show2=true;
        this.form.get('date_time').setValidators(Validators.required);
        this.form.get('legal_medicine_transfer').setValidators(Validators.required);
        this.form.get('death_diagnosis_id').setValidators(Validators.required);
        this.form.get('medical_signature').setValidators(Validators.required);
        this.form.get('death_certificate_number').setValidators(Validators.required);
        this.form.controls.ch_diagnosis_id.clearValidators();
        this.form.controls.ch_diagnosis_id.setErrors(null);
        this.form.controls.exit_diagnosis_id.clearValidators();
        this.form.controls.exit_diagnosis_id.setErrors(null);
        this.form.controls.relations_diagnosis_id.clearValidators();
        this.form.controls.relations_diagnosis_id.setErrors(null);
        this.form.controls.reason_exit_id.clearValidators();
        this.form.controls.reason_exit_id.setErrors(null);

      }
    });


  }

 
  // toBase64 = file => new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => resolve(reader.result);
  //   reader.onerror = error => reject(error);
  // })

// async ShowDeath(e) {
//   if (e == 1) {
//     this.show_death = true;
//     this.show_inputs = true;
//   } else {
//     this.show_inputs = false;
//     this.show_death = false;
//   }
// }

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
      this.exit_diagnosis_id = localidentify.id;
    } else if(valid==2) {
      this.relations_diagnosis_id = localidentify.id;
    }else if(valid==3){
      this.death_diagnosis_id = localidentify.id;
    }else if(valid==4){
      var localidentify = this.ch_diagnosis.find(item => item.diagnosis.name == e);
      this.ch_diagnosis_id = localidentify.id;
    }
  } else {
    if (valid==1){
      this.exit_diagnosis = null;
      this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
      this.form.controls.exit_diagnosis_id.setErrors({'incorrect': true});
    } else if(valid==2) {
      this.relations_diagnosis = null;
      this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
      this.form.controls.relations_diagnosis_id.setErrors({'incorrect': true});
    }else if(valid==3){
      this.death_diagnosis_id = null;
      this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
      this.form.controls.death_diagnosis_id.setErrors({'incorrect': true});
    }else{
      this.ch_diagnosis_id = null;
      this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
      this.form.controls.ch_diagnosis_id.setErrors({'incorrect': true});
    }
   
  }
}


saveCodeR(e): void {
  var localidentify = this.reason_exit.find(item => item.name == e);

  if (localidentify) {
    this.reason_exit_id = localidentify.id;
  } else {
    this.reason_exit_id = null;
  }
}
// async finish() {

//   await this.chRecord.Update({
//     id: this.record_id,
//     status: 'CERRADO',
//     user: this.user,
//     role: this.currentRole,
//     user_id: this.own_user.id,
//   }).then(x => {
//     this.toastService.success('', x.message);
//     this.location.back();
//     if (this.saved) {
//       this.saved();
//     }
//   }).catch(x => {
//     this.isSubmitted = false;
//     this.loading = false;
//   });
// }

}
import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ChReasonConsultationService } from '../../../business-controller/ch-reason-consultation.service';
import { ChPhysicalExamService } from '../../../business-controller/ch_physical_exam.service';
import { ChDiagnosisService } from '../../../business-controller/ch-diagnosis.service';
import { ChVitalSignsService } from '../../../business-controller/ch-vital-signs.service';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { CifDiagnosisTlService } from '../../../business-controller/cif-diagnosis-tl.service';
import { AuthService } from '../../../services/auth.service';
import { Location } from '@angular/common';
import { ConfirmDialogCHComponent } from '../clinic-history-list/confirm-dialog/confirm-dialog.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-regularlanguage-list',
  templateUrl: './regularlanguage-list.component.html',
  styleUrls: ['./regularlanguage-list.component.scss'],
})
export class RegularLanguageListComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  //@Input() vital: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public user;
  public own_user;
  public cifdiagnosistl: any[];
  public physical: any[];
  public chvitsigns: any[];
  public chdiagnosis: any[];
  public nameForm: String;
  public movieForm: String;
  public admissions_id;
  public signatureImage: string;
  public currentRole: any;
  public saved: any = null;
  public has_input: any = null; // ya existe registro de ingreso
  public input_done: boolean = false; // ya se registró algo en el ingreso
 


  public record_id;
  public int: 0;
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private CifDiagnosisTlS: CifDiagnosisTlService,
    private chphysicalS: ChPhysicalExamService,
    private chvitalSignsS: ChVitalSignsService,
    private chdiagnosisS: ChDiagnosisService,
    public userChangeS: UserChangeService,
    private chRecord: ChRecordService,
    private location: Location,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,
    

  ) {

  }

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;
    this.own_user = this.authService.GetUser();
    this.chRecord.GetCollection({
      record_id: this.record_id
    }).then(x => {
      this.has_input = x[0]['has_input']; // se añade el resultado de la variable has_input
      if (this.has_input == true) { // si tiene ingreso se pone como true la variable que valida si ya se realizó el registro de ingreso para dejar finalizar la HC
        this.input_done = true;
      }
      this.user = x[0]['admissions']['patients'];
    });
    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
      };
    }

    this.chRecord.GetCollection(this.record_id).then(x => {
      this.admissions_id=x;
     
    });

    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
      };
    }

    await this.CifDiagnosisTlS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.cifdiagnosistl = x;
    });
    await this.chvitalSignsS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chvitsigns = x;
    });
    await this.chdiagnosisS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chdiagnosis = x;
    });
    await this.chphysicalS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.physical = x;
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
      await this.CifDiagnosisTlS.Update({});
      
    }
  }

  public back(): void {
    this.location.back();
  }

  close() {
    if (this.input_done) { // validamos si se realizó ingreso para dejar terminal la HC, de lo contrario enviamos un mensaje de alerta 
      this.deleteConfirmService.open(ConfirmDialogCHComponent, {
        context: {
          signature: true,
          title: 'Finalizar registro.',
          delete: this.finish.bind(this),
          showImage: this.showImage.bind(this),
          // save: this.saveSignature.bind(this),
          textConfirm: 'Finalizar registro'
        },
      });
    } else {
      this.toastService.warning('Debe diligenciar el ingreso', 'AVISO')
    }
  }

  showImage(data) {
    this.int++;
    if (this.int == 1) {
      this.signatureImage = null;
    } else {
      this.signatureImage = data;

    }
  }
  // async saveSignature() {
  //   var formData = new FormData();
  //   formData.append('firm_file', this.signatureImage);
  //   console.log(this.signatureImage);
  // }

  async finish(firm) {
    // if(this.signatureImage!=null){
      var formData = new FormData();
      formData.append('id', this.record_id,);
      formData.append('status', 'CERRADO');
      formData.append('user', this.user);
      formData.append('role', this.currentRole);
      formData.append('user_id', this.own_user.id);
      formData.append('firm_file', this.signatureImage);
      
      try {

        let response;
        
        response = await this.chRecord.UpdateCH(formData, this.record_id);
        this.location.back();
        this.toastService.success('', response.message);
        //this.router.navigateByUrl('/pages/clinic-history/ch-record-list/1/2/1');
        this.messageError = null;
        if (this.saved) {
          this.saved();
        }
      } catch (response) {
        this.messageError = response;
        this.isSubmitted = false;
        this.loading = false;
        throw new Error(response);
      }
    // }else{
    //   this.toastService.danger('Debe diligenciar la firma');
  
    // }

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

  receiveMessage($event) {
    if ($event == true) {
      this.messageEvent.emit($event);
    }
  }
}


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
import { Location } from '@angular/common';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmDialogCHComponent } from '../clinic-history-list/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss'],
})
export class LanguageListComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() user: any = null;
  @Input() type_record_id: any = null;
  @Input() has_input: boolean = false;
  @Input() record_id;
  @Output() messageEvent = new EventEmitter<any>();

  //@Input() vital: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public cifdiagnosistl: any[];
  public physical: any[];
  public chvitsigns: any[];
  public chdiagnosis: any[];
  public nameForm: String;
  public movieForm: String;
  
  public signatureImage: string;
  public currentRole: any;
  public own_user;
  public int = 0;
  public saved: any = null;
  


 
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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
      await this.chvitalSignsS.Update({});
    }
  }

  public back(): void {
    this.location.back();
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
    if(this.signatureImage!=null){
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
        return true;
      } catch (response) {
        this.messageError = response;
        this.isSubmitted = false;
        this.loading = false;
        throw new Error(response);
      }
    }else{
      this.toastService.danger('Debe diligenciar la firma');
      return false;
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

  receiveMessage($event) {
    if ($event == true) {
      this.messageEvent.emit($event);
    }
  }

  // recibe la señal de que se realizó un registro en alguna de las tablas de ingreso
  inputMessage($event) {
    if ($event) {
      this.messageEvent.emit(true);
    }
  }
}


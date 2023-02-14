import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChReasonConsultationService } from '../../../../business-controller/ch-reason-consultation.service';
import { ChPhysicalExamService } from '../../../../business-controller/ch_physical_exam.service';
import { ChVitalSignsService } from '../../../../business-controller/ch-vital-signs.service';
import { ChDiagnosisService } from '../../../../business-controller/ch-diagnosis.service';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-evolution-list',
  templateUrl: './evolution-list.component.html',
  styleUrls: ['./evolution-list.component.scss'],
})
export class EvolutionListComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() admission: any = null;
  @Input() type_record_id: any = null;
  @Input() medicine: boolean = true;
  @Input() user: any = null;

 
  @Input() type_record: any;
  @Output() messageEvent = new EventEmitter<any>();

  //@Input() vital: any;
  linearMode = false;
  public messageError = null; 
  public title;
  public routes = [];
  public user_id;
  public chreasonconsultation: any[];
  public physical: any[];
  public chvitsigns: any[];
  public chdiagnosis: any[];
  public nameForm: String;
  public movieForm: String;
  public admissions_id;


  public record_id;
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;

  public show1=false;
  public show2=false;
  public show3=false;
  public show4=false;
  public show5=false;
  public show6=false;
  public show7=false;
  public show8=false;
  public show9=false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private chreasonconsultS: ChReasonConsultationService,
    private chphysicalS: ChPhysicalExamService,
    private chvitalSignsS: ChVitalSignsService,
    private chdiagnosisS: ChDiagnosisService,
    public userChangeS: UserChangeService,
    private chRecord: ChRecordService,
    

  ) {

  }

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;

    // this.chRecord.GetCollection(this.record_id).then(x => {
    //   this.admissions_id=x;
     
    // });

    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
      };
    }

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

  receiveMessage($event) {
    if ($event == true) {
      this.messageEvent.emit($event);
    }
  }

  filterStepper($event){
    return $event.target.textContent;
  }

  goto($event) {
    let selectedStep =  this.filterStepper($event);
    if (selectedStep == '2' || selectedStep == 'Ex Físico') {
      this.show1 = true;
    } else if (selectedStep == '3' || selectedStep == 'Antecedentes') {
      this.show2 = true;
    }
    else if (selectedStep == '4' || selectedStep == 'Signos Vitales') {
      this.show3 = true;
    }
    else if (selectedStep == '5' || selectedStep == 'Diagnóstico') {
      this.show4 = true;
    }
    else if (selectedStep == '6' || selectedStep == 'Ostomías') {
      this.show5 = true;
    }
    else if (selectedStep == '7' || selectedStep == 'AP') {
      this.show6 = true;
    }
    else if (selectedStep == '8' || selectedStep == 'Recomendaciones') {
      this.show7 = true;
    }
    else if (selectedStep == '9' || selectedStep == 'Dietas') {
      this.show8 = true;
    }
  }
}


import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ChReasonConsultationService } from '../../../../business-controller/ch-reason-consultation.service';
import { ChPhysicalExamService } from '../../../../business-controller/ch_physical_exam.service';
import { ChVitalSignsService } from '../../../../business-controller/ch-vital-signs.service';
import { ChDiagnosisService } from '../../../../business-controller/ch-diagnosis.service';
import { UserChangeService } from '../../../../business-controller/user-change.service';


@Component({
  selector: 'ngx-nursering-notes',
  templateUrl: './nursering-notes.component.html',
  styleUrls: ['./nursering-notes.component.scss'],
})
export class NurseringNotesComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() admission: any = null;
  @Input() is_pad: boolean = false;
  @Input() type_record_id: any = null;
  @Input() enfermeryreco: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  timeLeft: number = 2;
  interval;

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
  public showLiq = true;

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

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
      };
    }

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid && this.saveEntry) {
      this.loading = true;
      if (this.data.id) { }
      await this.chreasonconsultS.Update({});
      await this.chvitalSignsS.Update({});
    }
  }

  public onStepChange(event: any): void {
    console.log(event);
  }


  receiveMessage($event) {
    if ($event == true) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.showLiq = false;
          this.timeLeft--;
        } else {
          this.showLiq = true;
          clearInterval(this.interval);
        }
      }, 1000)
    }
  }
  filterStepper($event){
    return $event.target.textContent;
  }


  goto($event) {
    let selectedStep =  this.filterStepper($event);
    if (selectedStep == '2' || selectedStep == 'Ex Físico') {
      this.show1 = true;
    } else if (selectedStep == '3' || selectedStep == 'Signos Vitales') {
      this.show2 = true;
    } else if (selectedStep == '4' || selectedStep == 'Procedimientos de enfermeria') {
      this.show3 = true;
    }
    else if (selectedStep == '5' || selectedStep == 'Plan de cuidados') {
      this.show4 = true;
    }
    else if (selectedStep == '6' || selectedStep == 'Control de líquidos') {
      this.show5 = true;
    }
    else if (selectedStep == '7' || selectedStep == 'Recomendaciones') {
      this.show6 = true;
    }
  }
}


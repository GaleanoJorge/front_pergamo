import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { ChReasonConsultationService } from '../../../business-controller/ch-reason-consultation.service';
import { ChVitalSignsService } from '../../../business-controller/ch-vital-signs.service';
import { ChDiagnosisService } from '../../../business-controller/ch-diagnosis.service';
import { ChPhysicalExamService } from '../../../business-controller/ch_physical_exam.service';


@Component({
  selector: 'ngx-entry-clinic-history-nursing',
  templateUrl: './entry-clinic-history-nursing.component.html',
  styleUrls: ['./entry-clinic-history-nursing.component.scss'],
})
export class EntryClinicHistoryNursingComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
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

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;


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

  saveMcEa() {
    // console.log('adentro');
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


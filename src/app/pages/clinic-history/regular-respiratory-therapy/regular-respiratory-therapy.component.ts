import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChPhysicalExamService } from '../../../business-controller/ch_physical_exam.service';
import { ChVitalSignsService } from '../../../business-controller/ch-vital-signs.service';
import { ChDiagnosisService } from '../../../business-controller/ch-diagnosis.service';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ChRespiratoryTherapyService } from '../../../business-controller/ch_respiratory_therapy.service';


@Component({
  selector: 'ngx-regular-respiratory-therapy',
  templateUrl: './regular-respiratory-therapy.component.html',
  styleUrls: ['./regular-respiratory-therapy.component.scss'],
})
export class RegularRespiratoryTherapyComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  //@Input() vital: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public chrespiratoryconsultation: any[];
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
    private chrespiratoryconsultS: ChRespiratoryTherapyService,
    private chphysicalS: ChPhysicalExamService,
    private chvitalSignsS: ChVitalSignsService,
    private chdiagnosisS: ChDiagnosisService,
    public userChangeS: UserChangeService,    


  ) {

  }

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;
    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
      };
    }

    await this.chrespiratoryconsultS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chrespiratoryconsultation = x;
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
     
    });
  }
  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid && this.saveEntry) {
      this.loading = true;
      if (this.data.id) { }
      await this.chrespiratoryconsultS.Update({});
      await this.chvitalSignsS.Update({});
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
}


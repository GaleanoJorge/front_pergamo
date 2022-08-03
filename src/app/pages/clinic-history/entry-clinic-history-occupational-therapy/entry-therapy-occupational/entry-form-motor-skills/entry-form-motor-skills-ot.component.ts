import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEMSAcuityOTService } from '../../../../../business-controller/ch_e_m_s_acuity_o_t.service';
import { ChEMSFunPatOTService } from '../../../../../business-controller/ch_e_m_s_fun_pat_o_t.service';
import { ChEMSIntPatOTService } from '../../../../../business-controller/ch_e_m_s_int_pat_o_t.service';
import { ChEMSMovPatOTService } from '../../../../../business-controller/ch_e_m_s_mov_pat_o_t.service';
import { ChEMSThermalOTService } from '../../../../../business-controller/ch_e_m_s_thermal_o_t.service';
import { ChEMSDisAuditoryOTService } from '../../../../../business-controller/ch_e_m_s_dis_auditory_o_t.service';
import { ChEMSDisTactileOTService } from '../../../../../business-controller/ch_e_m_s_dis_tactile_o_t.service';
import { ChEMSComponentOTService } from '../../../../../business-controller/ch_e_m_s_component_o_t.service';
import { ChEMSTestOTService } from '../../../../../business-controller/ch_e_m_s_test_o_t.service';
import { ChEMSCommunicationOTService } from '../../../../../business-controller/ch_e_m_s_communication_o_t.service';
import { ChEMSAssessmentOTService } from '../../../../../business-controller/ch_e_m_s_assessment_o_t.service';
import { ChEMSWeeklyOTService } from '../../../../../business-controller/ch_e_m_s_weekly_o_t.service';




@Component({
  selector: 'ngx-entry-form-motor-skills-ot',
  templateUrl: './entry-form-motor-skills-ot.component.html',
  styleUrls: ['./entry-form-motor-skills-ot.component.scss']
})
export class EntryFormMotorSkillsOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id;
  @Input() type_record_id;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public saveEntry: any = 0;
  @Output() messageEvent = new EventEmitter<any>();
  public chfunpat: any[];
  public chintpat: any[];
  public chmovpat: any[];
  public chthermal: any[];
  public chauditory: any[];
  public chatactile: any[];
  public chacuity: any[];
  public chcomponent: any[];
  public chtest: any[];
  public chcommunication: any[];
  public chassessment: any[];
  public chweekly: any[];
  public show: any;


  constructor(
    private formBuilder: FormBuilder,
    private ChEMSFunPatOTService: ChEMSFunPatOTService,
    private ChEMSIntPatOTService: ChEMSIntPatOTService,
    private ChEMSMovPatOTService: ChEMSMovPatOTService,
    private ChEMSThermalOTService: ChEMSThermalOTService,
    private ChEMSDisAuditoryOTService: ChEMSDisAuditoryOTService,
    private ChEMSDisTactileOTService: ChEMSDisTactileOTService,
    private ChEMSAcuityOTService: ChEMSAcuityOTService,
    private ChEMSComponentOTService: ChEMSComponentOTService,
    private ChEMSTestOTService: ChEMSTestOTService,
    private ChEMSCommunicationOTService: ChEMSCommunicationOTService,
    private ChEMSAssessmentOTService: ChEMSAssessmentOTService,
    private ChEMSWeeklyOTService: ChEMSWeeklyOTService,


  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
      };
    }

    this.ChEMSFunPatOTService.GetCollection({
      ch_record_id: this.record_id,
      type_record_id: 1
    }).then(x => {
      this.chfunpat = x;
    });

    this.ChEMSIntPatOTService.GetCollection({
      ch_record_id: this.record_id,
      type_record_id: 1
    }).then(x => {
      this.chintpat = x;
    });

    this.ChEMSMovPatOTService.GetCollection({
      ch_record_id: this.record_id,
      type_record_id: 1
    }).then(x => {
      this.chmovpat = x;
    });

    this.ChEMSThermalOTService.GetCollection({
      ch_record_id: this.record_id,
      type_record_id: 1
    }).then(x => {
      this.chthermal = x;
    });

    this.ChEMSDisAuditoryOTService.GetCollection({
      ch_record_id: this.record_id,
      type_record_id: 1
    }).then(x => {
      this.chauditory = x;
    });

    this.ChEMSDisTactileOTService.GetCollection({
      ch_record_id: this.record_id,
      type_record_id: 1
    }).then(x => {
      this.chatactile = x;
    });

    this.ChEMSAcuityOTService.GetCollection({ 
      ch_record_id: this.record_id,
      type_record_id: 1
    }).then(x => {
      this.chacuity = x;
    });

    this.ChEMSComponentOTService.GetCollection({ 
      ch_record_id: this.record_id,
      type_record_id: 1
    }).then(x => {
      this.chcomponent = x;
    });

    this.ChEMSTestOTService.GetCollection({ 
      ch_record_id: this.record_id,
      type_record_id: 1
    }).then(x => {
      this.chtest = x;
    });

    this.ChEMSCommunicationOTService.GetCollection({ 
      ch_record_id: this.record_id,
      type_record_id: 1
    }).then(x => {
      this.chcommunication = x;
    });

    this.ChEMSAssessmentOTService.GetCollection({ 
      ch_record_id: this.record_id,
      type_record_id: 1
    }).then(x => {
      this.chassessment = x;
    });

    this.ChEMSWeeklyOTService.GetCollection({ 
      ch_record_id: this.record_id,
      type_record_id: 1
    }).then(x => {
      this.chweekly = x;
    });

    this.form = this.formBuilder.group({


      ch_e_m_s_fun_pat_ot: [this.data.ch_e_m_s_fun_pat_ot, Validators.compose([Validators.required])],
      ch_e_m_s_int_pat_ot: [this.data.ch_e_m_s_int_pat_ot, Validators.compose([Validators.required])],      
      ch_e_m_s_mov_pat_o_t: [this.data.ch_e_m_s_mov_pat_o_t, Validators.compose([Validators.required])],
      ch_e_m_s_thermal_o_t: [this.data.ch_e_m_s_thermal_o_t, Validators.compose([Validators.required])],
      ch_e_m_s_dis_auditory_o_t: [this.data.ch_e_m_s_dis_auditory_o_t, Validators.compose([Validators.required])],
      ch_e_m_s_dis_tactile_o_t: [this.data.ch_e_m_s_dis_tactile_o_t, Validators.compose([Validators.required])],
      ch_e_m_s_acuity_o_t: [this.data.ch_e_m_s_acuity_o_t, Validators.compose([Validators.required])],
      ch_e_m_s_component_o_t: [this.data.ch_e_m_s_component_o_t, Validators.compose([Validators.required])],
      ch_e_m_s_test_o_t: [this.data.ch_e_m_s_test_o_t, Validators.compose([Validators.required])],
      ch_e_m_s_communication_o_t: [this.data.ch_e_m_s_communication_o_t, Validators.compose([Validators.required])],
      ch_e_m_s_assessment_o_t: [this.data.ch_e_m_s_assessment_o_t, Validators.compose([Validators.required])],
      ch_e_m_s_weekly_o_t: [this.data.ch_e_m_s_weekly_o_t, Validators.compose([Validators.required])],

    });

  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid && this.saveEntry) {
      this.loading = true;
      if (this.data.id) { }

     this.ChEMSFunPatOTService.Update({});
     this.ChEMSIntPatOTService.Update({});
     this.ChEMSMovPatOTService.Update({});
     this.ChEMSThermalOTService.Update({});
     this.ChEMSDisAuditoryOTService.Update({});
     this.ChEMSDisTactileOTService.Update({});
     this.ChEMSAcuityOTService.Update({});
     this.ChEMSComponentOTService.Update({});
     this.ChEMSTestOTService.Update({});
     this.ChEMSCommunicationOTService.Update({});
     this.ChEMSAssessmentOTService.Update({});
     this.ChEMSWeeklyOTService.Update({});

    }
  }

  // tablock(e) {
  //   switch (e.tabTitle) {
  //     case "INGRESO": {
  //       this.show = 1;
  //       break;
  //     }
  //     case "NOTA REGULAR": {
  //       this.show = 2;
  //       break;
  //     }
  //   }
  // }

  receiveMessage($event) {
    if ($event == true) {
      this.messageEvent.emit($event);
    }
  }
}



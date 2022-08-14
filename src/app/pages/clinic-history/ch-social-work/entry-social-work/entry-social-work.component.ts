import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRespiratoryTherapyService } from '../../../../business-controller/ch_respiratory_therapy.service';
import { ChVitalSignsService } from '../../../../business-controller/ch-vital-signs.service';
import { ChOxygenTherapyService } from '../../../../business-controller/ch_oxygen_therapy.service';
import { ChRtSessionsService } from '../../../../business-controller/ch_rt_sessions.service';
import { ChSuppliesTherapyService } from '../../../../business-controller/ch_supplies_therapy.Service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { UserChangeService } from '../../../../business-controller/user-change.service';

@Component({
  selector: 'ngx-entry-social-work',
  templateUrl: './entry-social-work.component.html',
  styleUrls: ['./entry-social-work.component.scss'],
})
export class EntrySocialWorkComponent implements OnInit {
  
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
  public teraphyRespiratory: any[];
  //public assRespiratory: any[];
  public suppliesTeraphyRespiratory: any[];
  public sessionsTeraphyRespiratory: any[];



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
    private chvitalSignsS: ChVitalSignsService,
    public userChangeS: UserChangeService,
    public ChOxygenTherapyS: ChOxygenTherapyService,    
    private RtSessionsS: ChRtSessionsService,    
    private SuppliesS: ChSuppliesTherapyService,
    //public AssS: ChAssessmentTherapyService,


  ) {

  }

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id1;
    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
      };
    }

    await this.chrespiratoryconsultS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chrespiratoryconsultation = x;
    });

    await this.ChOxygenTherapyS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.teraphyRespiratory = x;
    });

    await this.RtSessionsS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.sessionsTeraphyRespiratory = x;
    });

    await this.SuppliesS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.suppliesTeraphyRespiratory = x;
    });

    // await this.AssS.GetCollection({ ch_record_id: this.record_id }).then(x => {
    // this.assRespiratory = x;
    // });


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
      await this.ChOxygenTherapyS.Update({});      
      await this.RtSessionsS.Update({});
      await this.SuppliesS.Update({});
      // await this.AssS.Update({});
    }
  }

  receiveMessage($event) {
    if ($event == true) {
      this.messageEvent.emit($event);
    }
  }
}

import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { ChEOccHistoryOTService } from '../../../business-controller/ch_e_occ_history_o_t.service';
import { ChEValorationOTService } from '../../../business-controller/ch_e_valoration_o_t.service';
import { ChEPastOTService } from '../../../business-controller/ch_e_past_o_t.service';
import { ChEDailyActivitiesOTService } from '../../../business-controller/ch_e_daily_activities_o_t.service';


@Component({
  selector: 'ngx-ch-occupational-therapy.component',
  templateUrl: './ch-occupational-therapy.component.html',
  styleUrls: ['./ch-occupational-therapy.component.scss'],
})
export class ClinicHistoryOccupationalTherapy implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  //@Input() vital: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public chvaloration: any[];
  public chpast: any[];
  public chocuupationalhistory: any[];
  public chdailyactivities: any[];
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
    private ChEOccHistoryOTServiceS: ChEOccHistoryOTService,
    private ChEValorationOTService: ChEValorationOTService,
    private ChEPastOTService: ChEPastOTService,
    private ChEDailyActivitiesOTService: ChEDailyActivitiesOTService,
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

    await this.ChEValorationOTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chvaloration = x;
      
    });
    await this.ChEOccHistoryOTServiceS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chocuupationalhistory = x;
      
    });
    await this.ChEPastOTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chpast = x;
      
    });
    await this.ChEDailyActivitiesOTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chdailyactivities = x;
      
    });


    this.form = this.formBuilder.group({
      ch_e_occ_history_o_t_id: [this.data.ch_e_occ_history_o_t_id, Validators.compose([Validators.required])],
      ch_e_valoration_o_t: [this.data.ch_e_valoration_o_t, Validators.compose([Validators.required])],
      ch_e_past_o_t: [this.data.ch_e_valoration_o_t, Validators.compose([Validators.required])],
      ch_e_daily_activities_o_t: [this.data.ch_e_valoration_o_t, Validators.compose([Validators.required])],

    });
  }
  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid && this.saveEntry) {
      this.loading = true;
      if (this.data.id) { }
      await this.ChEValorationOTService.Update({});
      await this.ChEOccHistoryOTServiceS.Update({});
      await this.ChEPastOTService.Update({});
      await this.ChEDailyActivitiesOTService.Update({});


    }
  }

  receiveMessage($event) {
    if ($event == true) {
      this.messageEvent.emit($event);
    }
  }
}


import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { ChEOccHistoryOTService } from '../../../business-controller/ch_e_occ_history_o_t.service';
import { ChEValorationOTService } from '../../../business-controller/ch_e_valoration_o_t.service';
import { ChEPastOTService } from '../../../business-controller/ch_e_past_o_t.service';
import { ChEDailyActivitiesOTService } from '../../../business-controller/ch_e_daily_activities_o_t.service';
import { ChRNValorationOTService } from '../../../business-controller/ch_r_n_valoration_o_t.service';
import { ChRNTherapeuticObjOTService } from '../../../business-controller/ch_r_n_therapeutic_obj_o_t.service';
import { ChRNMaterialsOTService } from '../../../business-controller/ch_r_n_materials_o_t.service';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';


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
  public user;
  public chvaloration: any[];
  public chpast: any[];
  public chocuupationalhistory: any[];
  public chdailyactivities: any[];
  public chreasonconsultation: any[];
  public chrnvaloration: any[];
  public rntherapeutic: any[];
  public chrnmaterials: any[];
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
    private chRecord: ChRecordService,
    private ChRNValorationOTS: ChRNValorationOTService,
    private ChRNTherapeuticObjOTS: ChRNTherapeuticObjOTService,
    private ChRNMaterialsOTService: ChRNMaterialsOTService,
    public datePipe: DateFormatPipe,

  ) {

  }

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;
    this.chRecord.GetCollection({
      record_id: this.record_id
    }).then(x => {
      this.user = x[0]['admissions']['patients'];
    });
    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
      };
    }
    
    await this.ChEValorationOTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chvaloration = x;
      
    });

    await this.ChRNValorationOTS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chrnvaloration = x;
      
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



    await this.ChRNTherapeuticObjOTS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.rntherapeutic = x;
      
    });

    await this.ChRNMaterialsOTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chrnmaterials = x;
      
    });


    this.form = this.formBuilder.group({
      ch_e_occ_history_o_t_id: [this.data.ch_e_occ_history_o_t_id, Validators.compose([Validators.required])],
      ch_e_valoration_o_t: [this.data.ch_e_valoration_o_t, Validators.compose([Validators.required])],
      ch_e_past_o_t: [this.data.ch_e_past_o_t, Validators.compose([Validators.required])],
      ch_e_daily_activities_o_t: [this.data.ch_e_daily_activities_o_t, Validators.compose([Validators.required])],
      ch_r_n_materials_o_t: [this.data.ch_r_n_materials_o_t, Validators.compose([Validators.required])],

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
      await this.ChRNValorationOTS.Update({});
      await this.ChRNTherapeuticObjOTS.Update({});
      await this.ChRNMaterialsOTService.Update({});


    }
  }

  receiveMessage($event) {
    if ($event == true) {
      this.messageEvent.emit($event);
    }
  }
}


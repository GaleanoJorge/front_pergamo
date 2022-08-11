import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ChEValorationFTService } from '../../../business-controller/ch_e_valoration_f_t.service';
import { ChEValorationTherFTService } from '../../../business-controller/ch_e_valoration_ther_f_t.service';
import { ChEPainFTService } from '../../../business-controller/ch_e_pain_f_t.service';
import { ChESysIntegumentaryFTService } from '../../../business-controller/ch_e_sys_integumentary_f_t.service';
import { ChESysMusculoskeletalFTService } from '../../../business-controller/ch_e_sys_musculoskeletal_f_t.service';
import { ChEMuscularStrengthFTService } from '../../../business-controller/ch_e_muscular-strength_f_t.service';
import { ChESensibilityFTService } from '../../../business-controller/ch_e_sensibility_f_t.service';
import { ChEMuscularToneFTService } from '../../../business-controller/ch_e_muscular_tone_f_t.service';
import { ChEReflectionFTService } from '../../../business-controller/ch_e_reflection_f_t.service';
import { ChEFlexibilityFTService } from '../../../business-controller/ch_e_flexibility_f_t.service';
import { ChEBalanceFTService } from '../../../business-controller/ch_e_balance_f_t.service';
import { ChEPositionFTService } from '../../../business-controller/ch_e_position_f_t.service';
import { ChEMarchFTService } from '../../../business-controller/ch_e_march_f_t.service';
import { ChEDiagnosisFTService } from '../../../business-controller/ch_e_diagnosis_f_t.service';
import { ChETherGoalsFTService } from '../../../business-controller/ch_e_ther_goals_f_t.service';
import { ChEWeeklyFTService } from '../../../business-controller/ch_e_weekly_f_t.service';


@Component({
  selector: 'ngx-ch-physic-therapy.component',
  templateUrl: './ch-physic-therapy.component.html',
  styleUrls: ['./ch-physic-therapy.component.scss'],
})
export class ClinicHistoryPhysicTherapy implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  //@Input() vital: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user;
  public nameForm: String;
  public movieForm: String;
  public show: any;
  public signatureImage: string;
  public currentRole: any;
  public own_user;
  public saved: any = null;
  public chftvaloration: any[];
  public chvitsigns: any[];
  public chftvalorationTher: any[];
  public chpain: any[];
  public chsysintegumentary: any[];
  public chsysmusculoskeletal: any[];
  public chmuscularstrength: any[];
  public chsensibility: any[];
  public chmusculartone: any[];
  public chreflection: any[];
  public chflexibility: any[];
  public chbalance: any[];
  public chposition: any[];
  public chmarch: any[];
  public chdiagnosis: any[];
  public chthergoals: any[];
  public chweekly: any[];
  


  public record_id;
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public userChangeS: UserChangeService,
    private chRecord: ChRecordService,
    public datePipe: DateFormatPipe,
    private admissionsS: AdmissionsService,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,
    private location: Location,
    private authService: AuthService,
    private ChEValorationFTService: ChEValorationFTService,
    private ChEValorationTherFTService: ChEValorationTherFTService,
    private ChEPainFTService: ChEPainFTService,
    private ChESysIntegumentaryFTService: ChESysIntegumentaryFTService,
    private ChESysMusculoskeletalFTService: ChESysMusculoskeletalFTService,
    private ChEMuscularStrengthFTService: ChEMuscularStrengthFTService,
    private ChESensibilityFTService: ChESensibilityFTService,
    private ChEMuscularToneFTService: ChEMuscularToneFTService,
    private ChEReflectionFTService: ChEReflectionFTService,
    private ChEFlexibilityFTService: ChEFlexibilityFTService,
    private ChEBalanceFTService: ChEBalanceFTService,
    private ChEPositionFTService: ChEPositionFTService,
    private ChEMarchFTService: ChEMarchFTService,
    private ChEDiagnosisFTService: ChEDiagnosisFTService,
    private ChETherGoalsFTService: ChETherGoalsFTService,
    private ChEWeeklyFTService: ChEWeeklyFTService,

  ) {

  }

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;
    this.own_user = this.authService.GetUser();
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
    

    this.ChEValorationFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chftvaloration = x;
      
    });

    this.ChEValorationTherFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chftvalorationTher = x;
      
    });

    this.ChEPainFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chpain = x;
      
    });

    this.ChESysIntegumentaryFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chsysintegumentary = x;
      
    });

    this.ChESysMusculoskeletalFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chsysmusculoskeletal = x;
      
    });

    this.ChEMuscularStrengthFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chmuscularstrength = x;
      
    });

    this.ChESensibilityFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chsensibility = x;
      
    });

    this.ChEMuscularToneFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chmusculartone = x;
      
    });
    
    this.ChEReflectionFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chreflection = x;
      
    });

    this.ChEFlexibilityFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chflexibility = x;
      
    });

    this.ChEBalanceFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chbalance = x;
      
    });

    this.ChEPositionFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chposition = x;
      
    });

    this.ChEMarchFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chmarch = x;
      
    });
    
    this.ChEDiagnosisFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chdiagnosis = x;
      
    });
    
    this.ChETherGoalsFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chthergoals = x;
      
    });

    this.ChEWeeklyFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chweekly = x;
      
    });



    this.form = this.formBuilder.group({
      ch_e_valoration_f_t: [this.data.ch_e_valoration_f_t, Validators.compose([Validators.required])],
      ch_e_valoration_ther_f_t: [this.data.ch_e_valoration_ther_f_t, Validators.compose([Validators.required])],
      ch_e_pain_f_t: [this.data.ch_e_pain_f_t, Validators.compose([Validators.required])],
      ch_e_sys_integumentary_f_t: [this.data.ch_e_sys_integumentary_f_t, Validators.compose([Validators.required])],
      ch_e_sys_musculoskeletal_f_t: [this.data.ch_e_sys_musculoskeletal_f_t, Validators.compose([Validators.required])],
      ch_e_muscular_strength_f_t: [this.data.ch_e_muscular_strength_f_t, Validators.compose([Validators.required])],
      ch_e_sensibility_f_t: [this.data.ch_e_sensibility_f_t, Validators.compose([Validators.required])],
      ch_e_muscular_tone_f_t: [this.data.ch_e_muscular_tone_f_t, Validators.compose([Validators.required])],
      ch_e_reflection_f_t: [this.data.ch_e_reflection_f_t, Validators.compose([Validators.required])],
      ch_e_flexibility_f_t: [this.data.ch_e_flexibility_f_t, Validators.compose([Validators.required])],
      ch_e_balance_f_t: [this.data.ch_e_balance_f_t, Validators.compose([Validators.required])],
      ch_e_position_f_t: [this.data.ch_e_position_f_t, Validators.compose([Validators.required])],
      ch_e_march_f_t: [this.data.ch_e_march_f_t, Validators.compose([Validators.required])],
      ch_e_diagnosis_f_t: [this.data.ch_e_diagnosis_f_t, Validators.compose([Validators.required])],
      ch_e_ther_goals_f_t: [this.data.ch_e_ther_goals_f_t, Validators.compose([Validators.required])],
      ch_e_weekly_f_t: [this.data.ch_e_weekly_f_t, Validators.compose([Validators.required])],

    });
  }
  save() {
    this.isSubmitted = true;
    if (!this.form.invalid && this.saveEntry) {
      this.loading = true;
      if (this.data.id) { }
      this.ChEValorationFTService.Update({});
      this.ChEValorationTherFTService.Update({});
      this.ChEPainFTService.Update({});
      this.ChESysIntegumentaryFTService.Update({});
      this.ChESysMusculoskeletalFTService.Update({});
      this.ChEMuscularStrengthFTService.Update({});
      this.ChESensibilityFTService.Update({});
      this.ChEMuscularToneFTService.Update({});
      this.ChEReflectionFTService.Update({});
      this.ChEFlexibilityFTService.Update({});
      this.ChEBalanceFTService.Update({});
      this.ChEPositionFTService.Update({});
      this.ChEMarchFTService.Update({});
      this.ChEDiagnosisFTService.Update({});
      this.ChETherGoalsFTService.Update({});
      this.ChEWeeklyFTService.Update({});
      


    }
  }

  public back(): void {
    this.location.back();
  }

  close() {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        //signature: true, 
        title: 'Finalizar registro.',
        delete: this.finish.bind(this),
        //showImage: this.showImage.bind(this),
        // save: this.saveSignature.bind(this),
        textConfirm:'Finalizar registro'
      },
    });
  }

  showImage(data) {
    this.signatureImage = data;
  }

  // async saveSignature() {
  //   var formData = new FormData();
  //   formData.append('firm_file', this.signatureImage);
  //   console.log(this.signatureImage);
  // }

  async finish() {

   await this.chRecord.Update({
      id: this.record_id,
      status: 'CERRADO',
      user: this.user,
      role: this.currentRole,
      user_id: this.own_user.id,
    }).then(x => {
      this.toastService.success('', x.message);
      this.location.back();
      if (this.saved) {
        this.saved();
      }
    }).catch(x => {
      this.isSubmitted = false;
      this.loading = false;
    });
  }

  RefreshData() {

    this.table.refresh();
  }





  receiveMessage($event) {
    if ($event == true) {
      this.messageEvent.emit($event);
    }
  }

  tablock(e) {
    switch (e.tabTitle) {
      case "INGRESO": {
        this.show = 1;
        break;
      }
      case "NOTA REGULAR": {
        this.show = 2;
        break;
      }
    }
  }

 

  DeleteAdmissions(data) {
    return this.admissionsS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}


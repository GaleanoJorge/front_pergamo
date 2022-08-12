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
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ConfirmDialogCHComponent } from '../clinic-history-list/confirm-dialog/confirm-dialog.component';


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
  public show: any;
  public signatureImage: string;
  public currentRole: any;
  public own_user;
  public int;
  public saved: any = null;


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
    public datePipe: DateFormatPipe,
    private admissionsS: AdmissionsService,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,
    private location: Location,
    private authService: AuthService,
    private ChEOccHistoryOTServiceS: ChEOccHistoryOTService,
    private ChEValorationOTService: ChEValorationOTService,
    private ChEPastOTService: ChEPastOTService,
    private ChEDailyActivitiesOTService: ChEDailyActivitiesOTService,
    private chRecord: ChRecordService,
    private ChRNValorationOTS: ChRNValorationOTService,
    private ChRNTherapeuticObjOTS: ChRNTherapeuticObjOTService,
    private ChRNMaterialsOTService: ChRNMaterialsOTService,

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
    
     this.ChEValorationOTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chvaloration = x;
      
    });

     this.ChRNValorationOTS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chrnvaloration = x;
      
    });
     this.ChEOccHistoryOTServiceS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chocuupationalhistory = x;
      
    });
     this.ChEPastOTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chpast = x;
      
    });
     this.ChEDailyActivitiesOTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chdailyactivities = x;
      
    });



     this.ChRNTherapeuticObjOTS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.rntherapeutic = x;
      
    });

     this.ChRNMaterialsOTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
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
  save() {
    this.isSubmitted = true;
    if (!this.form.invalid && this.saveEntry) {
      this.loading = true;
      if (this.data.id) { }
      this.ChEValorationOTService.Update({});
      this.ChEOccHistoryOTServiceS.Update({});
      this.ChEPastOTService.Update({});
      this.ChEDailyActivitiesOTService.Update({});
      this.ChRNValorationOTS.Update({});
      this.ChRNTherapeuticObjOTS.Update({});
      this.ChRNMaterialsOTService.Update({});


    }
  }

  public back(): void {
    this.location.back();
  }

  close() {
    this.deleteConfirmService.open(ConfirmDialogCHComponent, {
      context: {
        signature: true, 
        title: 'Finalizar registro.',
        delete: this.finish.bind(this),
        showImage: this.showImage.bind(this),
        // save: this.saveSignature.bind(this),
        textConfirm:'Finalizar registro'
      },
    });
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
    } catch (response) {
      this.messageError = response;
      this.isSubmitted = false;
      this.loading = false;
      throw new Error(response);
    }
  
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


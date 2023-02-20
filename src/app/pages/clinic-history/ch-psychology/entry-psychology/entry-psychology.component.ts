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
import { AuthService } from '../../../../services/auth.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { Location } from '@angular/common';
import { NbDialogService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-entry-psychology',
  templateUrl: './entry-psychology.component.html',
  styleUrls: ['./entry-psychology.component.scss'],
})
export class EntryPsychologyComponent implements OnInit {
  
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() has_input: Boolean = false;
  @Input() type_record_id: Boolean = false;
  @Input() record_id: any = null;
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
  public suppliesTeraphyRespiratory: any[];
  public sessionsTeraphyRespiratory: any[];

  public signatureImage: string;
  public currentRole: any;
  public own_user;
  public int = 0;
  public saved: any = null;
  public user;


  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;
  public show1 = false;
  public show2 = false;
  public show3 = false;
  public show4 = false;
  public show5 = false;
  public show6 = false;
  public show7 = false;


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
    private authService: AuthService,
    private chRecord: ChRecordService,
    private location: Location,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,


  ) {

  }

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id1;
    this.own_user = this.authService.GetUser();
    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
      };
    }

    this.form = this.formBuilder.group({


    });
  }
 
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
    if (selectedStep == '2' || selectedStep == 'Ex. Mental') {
      this.show1 = true;
    } else if (selectedStep == '3' || selectedStep == 'Pensamiento') {
      this.show2 = true;
    } else if (selectedStep == '4' || selectedStep == 'Lenguaje') {
      this.show3 = true;
    }
    else if (selectedStep == '5' || selectedStep == 'Esfera Afectiva"') {
      this.show4 = true;
    }
    else if (selectedStep == '6' || selectedStep == 'Fun. Sintesís') {
      this.show5 = true;
    }
    else if (selectedStep == '7' || selectedStep == 'V. Multiaxial') {
      this.show6 = true;
    }
    else if (selectedStep == '8' || selectedStep == 'Intervención') {
      this.show7 = true;
    }
  }

}


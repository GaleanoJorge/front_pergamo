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
import { ConfirmDialogCHComponent } from '../../clinic-history-list/confirm-dialog/confirm-dialog.component';

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
  public has_input: any = null; // ya existe registro de ingreso
  public input_done: boolean = false; // ya se registró algo en el ingreso

  public signatureImage: string;
  public currentRole: any;
  public own_user;
  public int = 0;
  public saved: any = null;
  public user;



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
    this.chRecord.GetCollection({
      record_id: this.record_id
    }).then(x => {
      this.has_input = x[0]['has_input']; // se añade el resultado de la variable has_input
      if (this.has_input == true) { // si tiene ingreso se pone como true la variable que valida si ya se realizó el registro de ingreso para dejar finalizar la HC
        this.input_done = true;
      }
      this.user = x[0]['admissions']['patients'];
    });
    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
      };
    }

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

  public back(): void {
    this.location.back();
  }

  close() {
    if (this.input_done) { // validamos si se realizó ingreso para dejar terminal la HC, de lo contrario enviamos un mensaje de alerta 
      this.deleteConfirmService.open(ConfirmDialogCHComponent, {
        context: {
          signature: true,
          title: 'Finalizar registro.',
          delete: this.finish.bind(this),
          showImage: this.showImage.bind(this),
          // save: this.saveSignature.bind(this),
          textConfirm: 'Finalizar registro'
        },
      });
    } else {
      this.toastService.warning('Debe diligenciar el ingreso', 'AVISO')
    }
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
    if(this.signatureImage!=null){
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
        return true;
      } catch (response) {
        this.messageError = response;
        this.isSubmitted = false;
        this.loading = false;
        throw new Error(response);
      }
    }else{
      this.toastService.danger('Debe diligenciar la firma');
      return false;
    }
      
  }

  receiveMessage($event) {
    if ($event == true) {
      this.messageEvent.emit($event);
    }
  }

  // recibe la señal de que se realizó un registro en alguna de las tablas de ingreso
  inputMessage($event) {
    this.input_done = true;
  }
}


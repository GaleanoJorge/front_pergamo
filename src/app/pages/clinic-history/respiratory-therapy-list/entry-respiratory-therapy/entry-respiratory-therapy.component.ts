import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ChRespiratoryTherapyService } from '../../../../business-controller/ch_respiratory_therapy.service';
import { ChVitalSignsService } from '../../../../business-controller/ch-vital-signs.service';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { ChOxygenTherapyService } from '../../../../business-controller/ch_oxygen_therapy.service';
import { ChRtSessionsService } from '../../../../business-controller/ch_rt_sessions.service';
import { ChSuppliesTherapyService } from '../../../../business-controller/ch_supplies_therapy.Service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-entry-respiratory-therapy',
  templateUrl: './entry-respiratory-therapy.component.html',
  styleUrls: ['./entry-respiratory-therapy.component.scss'],
})
export class EntryRespiratoryTherapyComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() admissions: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() user: any = null;
  @Input() has_input: boolean = false;
  @Input() type_record_id:any;

  //@Input() vital: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  // // public chrespiratoryconsultation: any[];
  // public vitalsigns: any[];
  public physical: any[];
  public chvitsigns: any[];
  public chdiagnosis: any[];
  public nameForm: String;
  public movieForm: String;
  public teraphyRespiratory: any[];
  //public assRespiratory: any[];
  public suppliesTeraphyRespiratory: any[];
  // public has_input: any = null; // ya existe registro de ingreso
  public input_done: boolean = false; // ya se registró algo en el ingreso



  public record_id;
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;
  public int = 0;
  public signatureImage: string;
  public currentRole: any;
  public saved: any = null;
  public own_user;
  public show1 = false;
  public show2 = false;
  public show3 = false;
  public show4 = false;
  public show5 = false;
  public show6 = false;
  public show7 = false;
  public show8 = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private chrespiratoryconsultS: ChRespiratoryTherapyService,
    private chvitalSignsS: ChVitalSignsService,
    public userChangeS: UserChangeService,
    public ChOxygenTherapyS: ChOxygenTherapyService,    
    private RtSessionsS: ChRtSessionsService,    
    private SuppliesS: ChSuppliesTherapyService,
    private location: Location,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    //public AssS: ChAssessmentTherapyService,


  ) {

  }

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;
    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
      };
    }

    await this.ChOxygenTherapyS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.teraphyRespiratory = x;
    });

    await this.SuppliesS.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.suppliesTeraphyRespiratory = x;
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
      await this.ChOxygenTherapyS.Update({});      
      await this.RtSessionsS.Update({});
      await this.SuppliesS.Update({});
      // await this.AssS.Update({});
    }
  }

  public back(): void {
    this.location.back();
  }

  // close() {
  //   if (this.input_done) { // validamos si se realizó ingreso para dejar terminal la HC, de lo contrario enviamos un mensaje de alerta 
  //     this.deleteConfirmService.open(ConfirmDialogCHComponent, {
  //       context: {
  //         signature: true,
  //         title: 'Finalizar registro.',
  //         delete: this.finish.bind(this),
  //         showImage: this.showImage.bind(this),
  //         // save: this.saveSignature.bind(this),
  //         textConfirm: 'Finalizar registro'
  //       },
  //     });
  //   } else {
  //     this.toastService.warning('Debe diligenciar el ingreso', 'AVISO')
  //   }
  // }

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
        
        response = await this.chRecord.UpdateCH(formData, this.record_id).then(x => {
          this.location.back();
          this.toastService.success('', x.message);
          this.messageError = null;
          if (this.saved) {
            this.saved();
          }
          return Promise.resolve(true);
        }).catch(x => {
          this.toastService.danger('', x);
          return Promise.resolve(false);
        });
        return Promise.resolve(response);
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
     this.messageEvent.emit($event);
  }

  filterStepper($event){
    return $event.target.textContent;
  }


  goto($event) {
    let selectedStep =  this.filterStepper($event);
    if (selectedStep == '2' || selectedStep == 'Antecedentes') {
      this.show1 = true;
    } else if (selectedStep == '3' || selectedStep == 'Signos Vitales') {
      this.show2 = true;
    } else if (selectedStep == '4' || selectedStep == 'Control de oxigeno') {
      this.show3 = true;
    } else if (selectedStep == '5' || selectedStep == 'Destete de oxigeno') {
      this.show4 = true;
    } else if (selectedStep == '6' || selectedStep == 'Valoración Terapeutica') {
      this.show5 = true;
    } else if (selectedStep == '7' || selectedStep == 'Objetivos') {
      this.show6 = true;
    } else if (selectedStep == '8' || selectedStep == 'Pedido de insumos') {
      this.show7 = true;
    } else if (selectedStep == '9' || selectedStep == 'Sesiones') {
      this.show8 = true;
    }
  }
}


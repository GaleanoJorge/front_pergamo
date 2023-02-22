import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../../../services/auth.service';
import { ChRecordService } from '../../../../../business-controller/ch_record.service';
import { ConfirmDialogCHComponent } from '../../../clinic-history-list/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'ngx-assessment-therapy',
  templateUrl: './assessment-therapy.component.html',
  styleUrls: ['./assessment-therapy.component.scss']
})
export class AssessmentTherapyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Input() type_record_id: any = null;
  @Input() has_input: boolean = false;
  //@Input() input_done: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  // public has_input: any = null; // ya existe registro de ingreso
  public input_done: boolean = false; // ya se registró algo en el ingreso
 
  public own_user;
  public user;
  public signatureImage: string;
  public currentRole: any;
  public int = 0;
  public messageError = null;
  public show1 = false;
  public show2 = false;
  public show3 = false;
  public show4 = false;
  public show5 = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private chRecord: ChRecordService,
    private location: Location,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.record_id = this.route.snapshot.params.id;
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

  }

  async save() {

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
  
  inputMessage($event) {
    if ($event == true) {
      this.messageEvent.emit($event);
    }
  }

  filterStepper($event){
    return $event.target.textContent;
  }

  goto($event) {
    let selectedAccordion =  this.filterStepper($event);
    if (selectedAccordion == 'Valoración Terapéutica') {
      this.show1 = true;
    } else if (selectedAccordion == 'Inspección') {
      this.show2 = true;
    }
    else if (selectedAccordion == 'Escala de dolor') {
      this.show3 = true;
    }
    else if (selectedAccordion == 'Auscultación') {
      this.show4 = true;
    }
    else if (selectedAccordion == 'Ayudas diagnósticas') {
      this.show5 = true;
    }
}
}

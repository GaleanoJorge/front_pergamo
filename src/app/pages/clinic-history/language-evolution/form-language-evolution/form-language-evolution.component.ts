import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CifDiagnosisTlService } from '../../../../business-controller/cif-diagnosis-tl.service';
import { Location } from '@angular/common';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ConfirmDialogCHComponent } from '../../clinic-history-list/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-form-language-evolution',
  templateUrl: './form-language-evolution.component.html',
  styleUrls: ['./form-language-evolution.component.scss'],
})
export class FormLanguageEvolutionComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() record_id: any = null;
  @Input() user: any = null;
  @Input() has_input: boolean = false;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;

  public admissions_id;
  public check1;
  public cifdiagnosistl: any[];
  public saveEntry: any = 0;
  //public has_input: any = null; // ya existe registro de ingreso
  public input_done: boolean = false; // ya se registró algo en el ingreso

  public signatureImage: string;
  public currentRole: any;
  public own_user;
  public int = 0;
  public messageError = null;
  

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private CifDiagnosisTlS: CifDiagnosisTlService,
    private location: Location,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private deleteConfirmService: NbDialogService,


  ) {}

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;

    if (!this.data) {
      this.data = { 
        text:'',
      };
    }
    await this.CifDiagnosisTlS.GetCollection({ch_record_id: this.record_id,}).then((x) => {
      this.cifdiagnosistl = x;
    });

    this.form = this.formBuilder.group({
    
      //Diagnostico Cif
      text: [this.data[0] ? this.data[0].text : this.data],

    
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid && this.saveEntry) {
      this.loading = true;
      if (this.data.id) { }
      await this.CifDiagnosisTlS.Update({});
      
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

  // recibe la señal de que se realizó un registro en alguna de las tablas de ingreso
  inputMessage($event) {
    this.input_done = true;
  }
}

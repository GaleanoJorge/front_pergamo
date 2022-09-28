import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChPsParaphasiasService } from '../../../../../business-controller/ch_ps_paraphasias.service';
import { ChPsComprehensiveService } from '../../../../../business-controller/ch_ps_comprehensive.service';
import { ChPsOthersService } from '../../../../../business-controller/ch_ps_others.service';
import { ChPsLanguageService } from '../../../../../business-controller/ch-ps-language.service';
import { UserBusinessService } from '../../../../../business-controller/user-business.service';
import { ChPsExpressiveService } from '../../../../../business-controller/ch_ps_expressive.service';


@Component({
  selector: 'ngx-form-ps-language',
  templateUrl: './form-ps-language.component.html',
  styleUrls: ['./form-ps-language.component.scss']
})
export class FormPsLanguageComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: Boolean = false;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();


  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public expressive: any[] = [];
  public paraphasias: any[] = [];
  public comprehensive: any[] = [];
  public others: any[] = [];
  checked = false;


  constructor(
    // protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private userBS: UserBusinessService,
    // private statusBS: StatusBusinessService,
    private toastService: NbToastrService,
    private expressiveS: ChPsExpressiveService,
    private comprehensiveS: ChPsComprehensiveService,
    private othersS: ChPsOthersService,
    private paraphasiasS: ChPsParaphasiasService,
    private languageS: ChPsLanguageService,
  ) {
  }

  toggle(checked: boolean) {
    this.checked = checked;
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        ch_ps_expressive_id: '',
        ch_ps_paraphasias_id: '',
        ch_ps_comprehensive_id: '',
        ch_ps_others_id: '',
        observations: '',

      };
    }

    this.expressiveS.GetCollection().then(x => {
      this.expressive = x;
    });

    this.comprehensiveS.GetCollection().then(x => {
      this.paraphasias = x;
    });

    this.othersS.GetCollection().then(x => {
      this.comprehensive = x;
    });

    this.paraphasiasS.GetCollection().then(x => {
      this.others = x;
    });


    this.form = this.formBuilder.group({

      ch_ps_expressive_id: [this.data[0] ? this.data[0].ch_ps_expressive_id : this.data.ch_ps_expressive_id, Validators.compose([Validators.required])],
      ch_ps_paraphasias_id: [this.data[0] ? this.data[0].ch_ps_paraphasias_id : this.data.ch_ps_paraphasias_id, Validators.compose([Validators.required])],
      ch_ps_comprehensive_id: [this.data[0] ? this.data[0].ch_ps_comprehensive_id : this.data.ch_ps_comprehensive_id, Validators.compose([Validators.required])],
      ch_ps_others_id: [this.data[0] ? this.data[0].ch_ps_others_id : this.data.ch_ps_others_id, Validators.compose([Validators.required])],
      observations: [this.data[0] ? this.data[0].observations : this.data.observations, Validators.compose([Validators.required])],
     

    });

  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.languageS.Update({
          id: this.data.id,
          ch_ps_expressive_id: this.form.controls.ch_ps_expressive_id.value,
          ch_ps_paraphasias_id: this.form.controls.ch_ps_paraphasias_id.value,
          ch_ps_comprehensive_id: this.form.controls.ch_ps_comprehensive_id.value,
          ch_ps_others_id: this.form.controls.ch_ps_others_id.value,
          observations: this.form.controls.observations.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.languageS.Save({
          ch_ps_expressive_id: this.form.controls.ch_ps_expressive_id.value,
          ch_ps_paraphasias_id: this.form.controls.ch_ps_paraphasias_id.value,
          ch_ps_comprehensive_id: this.form.controls.ch_ps_comprehensive_id.value,
          ch_ps_others_id: this.form.controls.ch_ps_others_id.value,
          observations: this.form.controls.observations.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            ch_ps_expressive_id:'',
            ch_ps_paraphasias_id:'',
            ch_ps_comprehensive_id:'',
            ch_ps_others_id:'',
            observations:''
          });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    }
     else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }


  

  }


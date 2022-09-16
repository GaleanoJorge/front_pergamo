import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEMarchFTService } from '../../../../../../business-controller/ch_e_march_f_t.service';

@Component({
  selector: 'ngx-form-march-ft',
  templateUrl: './form-march-ft.component.html',
  styleUrls: ['./form-march-ft.component.scss']
})
export class FormMarchFTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public ch_external_cause: any[];



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChEMarchFTService: ChEMarchFTService,
  )
  {

  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {       

        independent: '',
        help: '',
        spastic: '',
        ataxic: '',
        contact: '',
        response: '',
        support_init: '',
        support_finish: '',
        prebalance: '',
        medium_balance: '',
        finish_balance: '',
        observation: '',

      };
    }

    this.form = this.formBuilder.group({
      

      independent: [this.data[0] ? this.data[0].independent : this.data.independent, Validators.compose([Validators.required])],
      help: [this.data[0] ? this.data[0].help : this.data.help, Validators.compose([Validators.required])],
      spastic: [this.data[0] ? this.data[0].spastic : this.data.spastic, Validators.compose([Validators.required])],
      ataxic: [this.data[0] ? this.data[0].ataxic : this.data.ataxic, Validators.compose([Validators.required])],
      contact: [this.data[0] ? this.data[0].contact : this.data.contact, Validators.compose([Validators.required])],
      response: [this.data[0] ? this.data[0].response : this.data.response, Validators.compose([Validators.required])],
      support_init: [this.data[0] ? this.data[0].support_init : this.data.support_init, Validators.compose([Validators.required])],
      support_finish: [this.data[0] ? this.data[0].support_finish : this.data.support_finish, Validators.compose([Validators.required])],
      prebalance: [this.data[0] ? this.data[0].prebalance : this.data.prebalance, Validators.compose([Validators.required])],
      medium_balance: [this.data[0] ? this.data[0].medium_balance : this.data.medium_balance, Validators.compose([Validators.required])],
      finish_balance: [this.data[0] ? this.data[0].finish_balance : this.data.finish_balance, Validators.compose([Validators.required])],
      observation: [this.data[0] ? this.data[0].observation : this.data.observation],

    });

    // if (this.data.illness != '') {
    //   this.form.controls.type.disable();
    //   this.form.controls.irradiated.disable();
    //   this.form.controls.located.disable();
    //   this.form.controls.intensity.disable();
    //   this.form.controls.exaccervating.disable();
    //   this.form.controls.decreated.disable();

    //   this.disabled = true;
    // } else {
    //   this.form.controls.type.enable();
    //   this.form.controls.irradiated.enable();
    //   this.form.controls.located.enable();
    //   this.form.controls.intensity.enable();
    //   this.form.controls.exaccervating.enable();
    //   this.form.controls.decreated.enable();


    //   this.disabled = false;
    // }
  }

  save() 
  {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.messageEvent.emit(true)
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
          this.ChEMarchFTService.Update({
          id: this.data.id,         
          independent: this.form.controls.independent.value,
          help: this.form.controls.help.value,
          spastic: this.form.controls.spastic.value,
          ataxic: this.form.controls.ataxic.value,
          contact: this.form.controls.contact.value,
          response: this.form.controls.response.value,
          support_init: this.form.controls.support_init.value,
          support_finish: this.form.controls.support_finish.value,
          prebalance: this.form.controls.prebalance.value,
          medium_balance: this.form.controls.medium_balance.value,
          finish_balance: this.form.controls.finish_balance.value,
          observation: this.form.controls.observation.value,

          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
          
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({independent:'',  help:'', spastic:'', ataxic:'', contact:'',
            response:'',  support_init:'',  support_finish:'',  prebalance:'',  medium_balance:'',  finish_balance:'', observation:'' });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChEMarchFTService.Save({
            independent: this.form.controls.independent.value,
            help: this.form.controls.help.value,
            spastic: this.form.controls.spastic.value,
            ataxic: this.form.controls.ataxic.value,
            contact: this.form.controls.contact.value,
            response: this.form.controls.response.value,
            support_init: this.form.controls.support_init.value,
            support_finish: this.form.controls.support_finish.value,
            prebalance: this.form.controls.prebalance.value,
            medium_balance: this.form.controls.medium_balance.value,
            finish_balance: this.form.controls.finish_balance.value,
            observation: this.form.controls.observation.value,

          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({independent:'',  help:'', spastic:'', ataxic:'', contact:'',
          response:'',  support_init:'',  support_finish:'',  prebalance:'',  medium_balance:'',  finish_balance:'', observation:'' });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {


        });
      }

    }else{
      this.toastService.danger('ingrese todos los campos solicitados');
    }
  }

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }
}

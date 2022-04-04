import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlossAmbitService } from '../../../../business-controller/gloss-ambit.service';
import { AccountReceivableService } from '../../../../business-controller/account-receivable.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { compare } from '@rxweb/reactive-form-validators';
import { StatusBillService } from '../../../../business-controller/status-bill.service';
import { CampusService } from '../../../../business-controller/campus.service';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'ngx-form-account-receivable',
  templateUrl: './form-account-receivable.component.html',
  styleUrls: ['./form-account-receivable.component.scss'],
})
export class FormAccountReceivableComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public file_payment;
  public total_value_activities;
  public observation;
  public user;
  public gloss_ambit: any[];
  public status_bill: any[];
  public campus: any[];
  


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private accountReceivableS: AccountReceivableService,
    private statusBillS: StatusBillService,
    private glossAmbitS: GlossAmbitService,
    private CampusS: CampusService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        file_payment: '',
        total_value_activities: '',
        gloss_ambit_id: '',
        status_bill_id: '',
        campus_id:'',
        observation: '',
      };
    }

    this.user = this.authService.GetUser();

    this.glossAmbitS.GetCollection({ status_id: 1 }).then(x => {
      this.gloss_ambit = x;
    });
    this.statusBillS.GetCollection().then(x => {
      this.status_bill = x;
    });
    this.CampusS.GetCollection({ status_id: 1 }).then(x => {
      this.campus = x;
    });

    this.form = this.formBuilder.group({
      file_payment: [this.data.file_payment, Validators.compose([Validators.required])],
      total_value_activities: [this.data.total_value_activities, Validators.compose([Validators.required])],
      gloss_ambit_id: [this.data.gloss_ambit_id, Validators.compose([Validators.required])],
      status_bill_id: [this.data.status_bill_id, Validators.compose([Validators.required])],
      campus_id: [this.data.campus_id, Validators.compose([Validators.required])],
      observation: [this.data.observation, Validators.compose([Validators.required])],
    });


  }

  close() {
    this.dialogRef.close();
  }
  saveValue(e) {

    // this.factureValue= +e.target.value;
    // if(this.factureValue<=0){
    //   this.factureValue=null;
    // }
    // if(this.objeted_value){
    //   this.ValueCompare(this.objeted_value);
    // }
  }
  ValueCompare(n) {
    // if(typeof(n) == 'number'){
      
    // } else {
    //   this.objeted_value = +n.target.value;
    // }
    // if(this.factureValue){
    //   if (this.factureValue >= this.objeted_value) {
    //     // this.toastService.success('', "Excelente");
    //   } else {
    //     this.toastService.warning('', "El valor objetado no puede ser mayor al valor de la factura");
    //     this.form.controls.objeted_value.setErrors({'incorrect':true})
    //     ;
    //     this.objeted_value=null;
    //   }
    // }
  }
  // public saveCode(e): void {
  //   var name = this.objetion_code.find(item => item.name == e.target.value);
  //   if (name) {
  //     this.code_id = name.id;
  //   } else {
  //     this.code_id = null;
  //   }
  // }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.accountReceivableS.Update({
          id: this.data.id,
          file_payment: this.form.controls.file_payment.value,
          total_value_activities: this.form.controls.total_value_activities.value,
          gloss_ambit_id: this.form.controls.gloss_ambit_id.value,
          status_bill_id: this.form.controls.status_bill_id.value,
          campus_id: this.form.controls.campus_id.value,
          user_id: this.user.id, 
          observation: this.form.controls.observation.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.accountReceivableS.Save({
          file_payment: this.form.controls.file_payment.value,
          total_value_activities: this.form.controls.total_value_activities.value,
          gloss_ambit_id: this.form.controls.gloss_ambit_id.value,
          status_bill_id: this.form.controls.status_bill_id.value,
          campus_id: this.form.controls.campus_id.value,
          user_id: this.user.id, 
          observation: this.form.controls.observation.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }
    }
  }
}

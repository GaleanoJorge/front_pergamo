import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {FinancialDataService} from '../../../../business-controller/financial-data.service';
import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { BankService } from '../../../../business-controller/bank.service';
import { AccountType } from '../../../../models/account-type';
import { AccountTypeService } from '../../../../business-controller/account-type.service';


@Component({
  selector: 'ngx-form-financial-data',
  templateUrl: './form-financial-data.component.html',
  styleUrls: ['./form-financial-data.component.scss']
})
export class FormFinancialDataComponent implements OnInit {

  @Input() title: string;
  @Input() data: any;


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public bank: any[];
  public account_type: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private FinancialDataS: FinancialDataService,
    private toastService: NbToastrService,
    private BankS: BankService,
    private AccountTypeS: AccountTypeService
    
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        bank_id: '',
        account_type_id: '',
        account_number:'',
        rut:'',

      };
    }
    this.BankS.GetCollection().then(x => {
      this.bank = x;
    });
    this.AccountTypeS.GetCollection().then(x => {
      this.account_type = x;
    });

    
    this.form = this.formBuilder.group({      
      bank_id: [this.data.bank_id, Validators.compose([Validators.required])],
      accont_type_id: [this.data.account_type_id, Validators.compose([Validators.required])],
      account_number: [this.data.account_number, Validators.compose([Validators.required])],
      rut: [this.data.rut, Validators.compose([Validators.required])],
    });
  }
  

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.FinancialDataS.Update({
          id: this.data.id,
          bank_id: this.data.bank_id,
          account_type_id: this.data.account_type_id,
          account_number: this.data.account_number,
          rut: this.data.rut,
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
        
        this.FinancialDataS.Save({
          bank_id: this.data.bank_id,
          account_type_id: this.data.account_type_id,
          account_number: this.data.account_number,
          rut: this.data.rut
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

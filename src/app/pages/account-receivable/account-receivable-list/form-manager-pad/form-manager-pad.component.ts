import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {FinancialDataService} from '../../../../business-controller/financial-data.service';
import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { BankService } from '../../../../business-controller/bank.service';
import { AccountType } from '../../../../models/account-type';
import { AccountTypeService } from '../../../../business-controller/account-type.service';
import { StatusBillService } from '../../../../business-controller/status-bill.service';
import { AccountReceivableService } from '../../../../business-controller/account-receivable.service';


@Component({
  selector: 'ngx-form-manager-pad',
  templateUrl: './form-manager-pad.component.html',
  styleUrls: ['./form-manager-pad.component.scss']
})
export class FormManagerPadComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public status_bill: any[];
  public observation;

  public selectedOptions: any[] = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private FinancialDataS: FinancialDataService,
    private toastService: NbToastrService,
    private BankS: BankService,
    private AccountTypeS: AccountTypeService,
    private AccountReceivableS: AccountReceivableService
    
    
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        status_bill_id: '',
        observation: '',

      };
    }
    
    this.form = this.formBuilder.group({      
      status_bill_id: [this.data.status_bill_id, Validators.compose([Validators.required])],
      observation: [this.data.observation, Validators.compose([Validators.required])],
      
    });
  }

  
  
  receiveMessage($event) {
    this.selectedOptions = $event;
    
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
          status_bill_id: this.data.status_bill_id,
          observation: this.data.observation,
          
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
          status_bill_id: this.data.status_bill_id,
          observation: this.data.observation,
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

import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService } from '../../../../business-controller/bank.service';
import { AccountTypeService } from '../../../../business-controller/account-type.service';
import { AccountReceivableService } from '../../../../business-controller/account-receivable.service';
import { SourceRetentionService } from '../../../../business-controller/source-retention.service';


@Component({
  selector: 'ngx-form-rent-relief',
  templateUrl: './form-rent-relief.component.html',
  styleUrls: ['./form-rent-relief.component.scss']
})
export class FormRentReliefComponent implements OnInit {

  @Input() title: string;
  @Input() procedence: number;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public status_bill: any[];
  public observation;
  public parentData;
  public show_table = false;

  public selectedOptions: any[] = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private SourceRetentionS: SourceRetentionService,
    private toastService: NbToastrService,
    private BankS: BankService,
    private AccountTypeS: AccountTypeService,
    private AccountReceivableS: AccountReceivableService


  ) {
  }

  ngOnInit(): void {
    if (this.procedence == 0) {
      this.parentData = {
        selectedOptions: [],
        procedence: this.procedence,
        entity: 'source_retention_type',
        customData: 'source_retention_type',
      };
      this.show_table = true;
    } else if (this.procedence == 1) {
      this.parentData = {
        selectedOptions: [],
        procedence: this.procedence,
        entity: 'source_retention?account_receivable_id=' + this.data.id,
        customData: 'source_retention',
      };
      this.show_table = true;
    }

    if (!this.data) {
      this.data = {
        status_bill_id: '',
        observation: '',
      };
    }

    this.form = this.formBuilder.group({

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
    var formData = new FormData();

    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        var i = 0;
        this.selectedOptions.forEach(element => {
          var indicator = 'file_' + i;
          if (element.file != '') {
            formData.append(indicator, element.file);
          }
          i++;
        });
        formData.append('account_receivable_id', this.data.id);
        formData.append('source_retention_type_id', JSON.stringify(this.selectedOptions));
        //   this.SourceRetentionS.Update({
        //     id: this.data.id,
        //     account_receivable_id: this.data.account_receivable_id,
        //     source_retention_type_id: JSON.stringify(this.selectedOptions),

        //   }).then(x => {
        //     this.toastService.success('', x.message);
        //     this.close();
        //     if (this.saved) {
        //       this.saved();
        //     }
        //   }).catch(x => {
        //     this.isSubmitted = false;
        //     this.loading = false;
        //   });
        // } else {

        this.SourceRetentionS.Save(formData).then(x => {
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

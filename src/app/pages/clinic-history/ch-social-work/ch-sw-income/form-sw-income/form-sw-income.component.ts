import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChSwHygieneHousingService } from '../../../../../business-controller/ch-sw-hygiene-housing.service';
import { ChSwIncomeService } from '../../../../../business-controller/ch-sw-income.service';


@Component({
  selector: 'ngx-form-sw-income',
  templateUrl: './form-sw-income.component.html',
  styleUrls: ['./form-sw-income.component.scss']
})
export class FormChSwIncomeComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public total: number = 0;
  public incomeTotal = null;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private icomeS: ChSwIncomeService,

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {

        salary: '',
        pension: '',
        donations: '',
        rent: '',
        familiar_help: '',
        none: '',
        total: ''
      };
    }

    this.form = this.formBuilder.group({

      salary: [this.data[0] ? this.data[0].salary : this.data.salary, Validators.compose([Validators.required])],
      pension: [this.data[0] ? this.data[0].pension : this.data.pension, Validators.compose([Validators.required])],
      donations: [this.data[0] ? this.data[0].donations : this.data.donations, Validators.compose([Validators.required])],
      rent: [this.data[0] ? this.data[0].rent : this.data.rent, Validators.compose([Validators.required])],
      familiar_help: [this.data[0] ? this.data[0].familiar_help : this.data.familiar_help, Validators.compose([Validators.required])],
      none: [this.data[0] ? this.data[0].none : this.data.none, Validators.compose([Validators.required])],
      total: [this.data[0] ? this.data[0].total : this.data.total],

    });
  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.icomeS.Update({
          id: this.data.id,
          salary: this.form.controls.salary.value,
          pension: this.form.controls.pension.value,
          donations: this.form.controls.donations.value,
          rent: this.form.controls.rent.value,
          familiar_help: this.form.controls.familiar_help.value,
          none: this.form.controls.none.value,
          total: this.incomeTotal,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          // this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.icomeS.Save({
          salary: this.form.controls.salary.value,
          pension: this.form.controls.pension.value,
          donations: this.form.controls.donations.value,
          rent: this.form.controls.rent.value,
          familiar_help: this.form.controls.familiar_help.value,
          none: this.form.controls.none.value,
          total: this.incomeTotal,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ salary: '', pension: '', donations: '', rent: '', familiar_help: '', none: '', total:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

  onChangesTotal(event, id) {

    if (this.form.controls.salary.value != '' || this.form.controls.pension.value != '' ||
      this.form.controls.donations.value != '' || this.form.controls.rent.value != '' ||
      this.form.controls.familiar_help.value != '' || this.form.controls.none.value != '') {
      this.incomeTotal = (this.form.controls.salary.value + this.form.controls.pension.value + this.form.controls.donations.value +
        this.form.controls.rent.value + this.form.controls.familiar_help.value + this.form.controls.familiar_help.value + this.form.controls.none.value)
    } else {
      this.incomeTotal = null;
    }
  }

}
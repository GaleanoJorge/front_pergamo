import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChSwEconomicAspectsService } from '../../../../../business-controller/ch-sw-economic-aspects.service';
import { ChSwExpensesService } from '../../../../../business-controller/ch-sw-expenses.service';
import { ChSwEconomicAspects } from '../../../../../models/ch-sw-economic-aspects';

@Component({
  selector: 'ngx-form-sw-economic-aspects',
  templateUrl: './form-sw-economic-aspects.component.html',
  styleUrls: ['./form-sw-economic-aspects.component.scss']
})
export class FormChSwEconomicAspectsComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Input() type_record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public total: number = 0;
  public expensesTotal = null;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private economicS: ChSwEconomicAspectsService,

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {

        copay: '',
       
      };
    }

    this.form = this.formBuilder.group({

      copay: [this.data[0] ? this.data[0].copay : this.data.copay, Validators.compose([Validators.required])],
     

    });
  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.economicS.Update({
          id: this.data.id,
          copay: this.form.controls.copay.value,
          type_record_id: this.type_record_id,
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
        this.economicS.Save({
          copay: this.form.controls.copay.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            copay: ''       });
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

 

}
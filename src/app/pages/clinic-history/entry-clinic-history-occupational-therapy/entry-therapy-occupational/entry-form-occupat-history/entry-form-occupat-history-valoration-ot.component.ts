import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToast, NbToastrService } from '@nebular/theme';
import { ChEOccHistoryOTService } from '../../../../../business-controller/ch_e_occ_history_o_t.service';



@Component({
  selector: 'ngx-entry-form-occupat-history-valoration-ot',
  templateUrl: './entry-form-occupat-history-valoration-ot.component.html',
  styleUrls: ['./entry-form-occupat-history-valoration-ot.component.scss']
})
export class EntryFormOccupatHistoryValorationOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() type_record_id;
  @Input() record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;


  constructor(
    private formBuilder: FormBuilder,
    private ChEOccHistoryOTServiceS: ChEOccHistoryOTService,
    private toastService: NbToastrService
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        ocupation: '',
        enterprice_employee: '',
        work_employee: '',
        shift_employee: '',
        observation_employee: '',
        work_independent: '',
        shift_independent: '',
        observation_independent: '',
        observation_home: '',
      };
    }



    this.form = this.formBuilder.group({
      ocupation: [this.data[0] ? this.data[0].ocupation : this.data.ocupation],
      enterprice_employee: [this.data[0] ? this.data[0].enterprice_employee : this.data.enterprice_employee],
      work_employee: [this.data[0] ? this.data[0].work_employee : this.data.work_employee],
      shift_employee: [this.data[0] ? this.data[0].shift_employee : this.data.shift_employee],
      observation_employee: [this.data[0] ? this.data[0].observation_employee : this.data.observation_employee,],
      work_independent: [this.data[0] ? this.data[0].work_independent : this.data.work_independent],
      shift_independent: [this.data[0] ? this.data[0].shift_independent : this.data.shift_independent],
      observation_independent: [this.data[0] ? this.data[0].observation_independent : this.data.observation_independent,],
      observation_home: [this.data[0] ? this.data[0].observation_home : this.data.observation_home],
    });

    if (this.data.ocupation != '') {
      this.form.controls.ocupation.disable();
      this.form.controls.enterprice_employee.disable();
      this.form.controls.work_employee.disable();
      this.form.controls.shift_employee.disable();
      this.form.controls.observation_employee.disable();
      this.form.controls.work_independent.disable();
      this.form.controls.shift_independent.disable();
      this.form.controls.observation_independent.disable(); 
      this.form.controls.observation_home.disable();
      this.disabled = true;
    } else {
      this.form.controls.ocupation.enable();
      this.form.controls.enterprice_employee.enable();
      this.form.controls.work_employee.enable();
      this.form.controls.shift_employee.enable();
      this.form.controls.observation_employee.enable();
      this.form.controls.work_independent.enable();
      this.form.controls.shift_independent.enable();
      this.form.controls.observation_independent.enable();
      this.form.controls.observation_home.enable();
      this.disabled = false;
    }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
          this.ChEOccHistoryOTServiceS.Update({
          id: this.data.id,
          ocupation: this.form.controls.ocupation.value,
          enterprice_employee: this.form.controls.enterprice_employee.value,
          work_employee: this.form.controls.work_employee.value,
          shift_employee: this.form.controls.shift_employee.value,
          observation_employee: this.form.controls.observation_employee.value,
          work_independent: this.form.controls.work_independent.value,
          shift_independent: this.form.controls.shift_independent.value,
          observation_independent: this.form.controls.observation_independent.value,
          observation_home: this.form.controls.observation_home.value,

          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChEOccHistoryOTServiceS.Save({
          ocupation: this.form.controls.ocupation.value,
          enterprice_employee: this.form.controls.enterprice_employee.value,
          work_employee: this.form.controls.work_employee.value,
          shift_employee: this.form.controls.shift_employee.value,
          observation_employee: this.form.controls.observation_employee.value,
          work_independent: this.form.controls.work_independent.value,
          shift_independent: this.form.controls.shift_independent.value,
          observation_independent: this.form.controls.observation_independent.value,
          observation_home: this.form.controls.observation_home.value,

          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ ocupation:'', enterprice_employee:'', work_employee:'',shift_employee:'',observation_employee:'',work_independent:'',shift_independent:'',
            observation_independent:'', observation_home:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {


        });
      }

    }
  }

}

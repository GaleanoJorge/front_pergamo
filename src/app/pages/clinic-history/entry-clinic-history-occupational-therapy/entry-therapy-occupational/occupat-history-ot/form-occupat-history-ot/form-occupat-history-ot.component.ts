import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToast, NbToastrService } from '@nebular/theme';
import { ChEOccHistoryOTService } from '../../../../../../business-controller/ch_e_occ_history_o_t.service';

@Component({
  selector: 'ngx-form-occupat-history-ot',
  templateUrl: './form-occupat-history-ot.component.html',
  styleUrls: ['./form-occupat-history-ot.component.scss']
})
export class FormOccupatHistoryOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public diagnosis: any[];
  public ch_e_valoration_o_t: any[];
  public ch_diagnosis_id;

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

    if (this.has_input) {
      this.ChEOccHistoryOTServiceS.GetCollection({ has_input: true, record_id: this.record_id }).then(x => {
        this.data = x;
        this.form = this.formBuilder.group({
          ocupation: [this.data[0] ? this.data[0].ocupation : this.data.ocupation, , Validators.compose([Validators.required])],
          enterprice_employee: [this.data[0] ? this.data[0].enterprice_employee : this.data.enterprice_employee,],
          work_employee: [this.data[0] ? this.data[0].work_employee : this.data.work_employee,],
          shift_employee: [this.data[0] ? this.data[0].shift_employee : this.data.shift_employee,],
          observation_employee: [this.data[0] ? this.data[0].observation_employee : this.data.observation_employee,],
          work_independent: [this.data[0] ? this.data[0].work_independent : this.data.work_independent,],
          shift_independent: [this.data[0] ? this.data[0].shift_independent : this.data.shift_independent,],
          observation_independent: [this.data[0] ? this.data[0].observation_independent : this.data.observation_independent,],
          observation_home: [this.data[0] ? this.data[0].observation_home : this.data.observation_home,],
        });
      });
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

    // this.diagnosisS.GetCollection().then(x => {
    //   this.diagnosis = x;
    // });
    this.ChEOccHistoryOTServiceS.GetCollection().then(x => {
      this.ch_e_valoration_o_t = x;
    });
  }

  public diagnosticConut = 0;



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
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({ocupation:'',  enterprice_employee:'', work_employee:'', shift_employee:'', observation_employee:'',
          work_independent:'',  shift_independent:'',  observation_independent:'',  observation_home:''});
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
          this.form.patchValue({ocupation:'',  enterprice_employee:'', work_employee:'', shift_employee:'', observation_employee:'',
          work_independent:'',  shift_independent:'',  observation_independent:'',  observation_home:''});
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
}

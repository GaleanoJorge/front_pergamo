import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChSwExpensesService } from '../../../../../business-controller/ch-sw-expenses.service';

@Component({
  selector: 'ngx-form-sw-expenses',
  templateUrl: './form-sw-expenses.component.html',
  styleUrls: ['./form-sw-expenses.component.scss']
})
export class FormChSwExpensesComponent implements OnInit {

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
    private expensesS: ChSwExpensesService,

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {

        feeding: '',
        gas: '',
        light: '',
        aqueduct: '',
        rent: '',
        transportation: '',
        recreation: '',
        education: '',
        medical: '',
        cell_phone: '',
        landline: '',
        total: ''
      };
    }

    this.form = this.formBuilder.group({

      feeding: [this.data[0] ? this.data[0].feeding : this.data.feeding, Validators.compose([Validators.required])],
      gas: [this.data[0] ? this.data[0].gas : this.data.gas, Validators.compose([Validators.required])],
      light: [this.data[0] ? this.data[0].light : this.data.light, Validators.compose([Validators.required])],
      aqueduct: [this.data[0] ? this.data[0].aqueduct : this.data.aqueduct, Validators.compose([Validators.required])],
      rent: [this.data[0] ? this.data[0].rent : this.data.rent, Validators.compose([Validators.required])],
      transportation: [this.data[0] ? this.data[0].transportation : this.data.transportation, Validators.compose([Validators.required])],
      recreation: [this.data[0] ? this.data[0].recreation : this.data.recreation, Validators.compose([Validators.required])],
      education: [this.data[0] ? this.data[0].education : this.data.education, Validators.compose([Validators.required])],
      medical: [this.data[0] ? this.data[0].medical : this.data.medical, Validators.compose([Validators.required])],
      cell_phone: [this.data[0] ? this.data[0].cell_phone : this.data.cell_phone, Validators.compose([Validators.required])],
      landline: [this.data[0] ? this.data[0].landline : this.data.landline, Validators.compose([Validators.required])],
      total: [this.data[0] ? this.data[0].total : this.data.total],

    });
  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.expensesS.Update({
          id: this.data.id,
          feeding: this.form.controls.feeding.value,
          gas: this.form.controls.gas.value,
          light: this.form.controls.light.value,
          aqueduct: this.form.controls.aqueduct.value,
          rent: this.form.controls.rent.value,
          transportation: this.form.controls.transportation.value,
          recreation: this.form.controls.recreation.value,
          education: this.form.controls.education.value,
          medical: this.form.controls.medical.value,
          cell_phone: this.form.controls.cell_phone.value,
          landline: this.form.controls.landline.value,
          total: this.expensesTotal,
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
        this.expensesS.Save({
          feeding: this.form.controls.feeding.value,
          gas: this.form.controls.gas.value,
          light: this.form.controls.light.value,
          aqueduct: this.form.controls.aqueduct.value,
          rent: this.form.controls.rent.value,
          transportation: this.form.controls.transportation.value,
          recreation: this.form.controls.recreation.value,
          education: this.form.controls.education.value,
          medical: this.form.controls.medical.value,
          cell_phone: this.form.controls.cell_phone.value,
          landline: this.form.controls.landline.value,
          total: this.expensesTotal,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            feeding: '', gas: '', light: '', aqueduct: '', rent: '', transportation: '',
            recreation: '', education: '', medical: '', cell_phone: '', landline: '', total: ''
          });
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

    if (this.form.controls.feeding.value != '' ||
      this.form.controls.gas.value != '' ||
      this.form.controls.light.value != '' ||
      this.form.controls.aqueduct.value != '' ||
      this.form.controls.rent.value != '' ||
      this.form.controls.transportation.value != '' ||
      this.form.controls.recreation.value != '' ||
      this.form.controls.education.value != '' ||
      this.form.controls.medical.value != '' ||
      this.form.controls.cell_phone.value != '' ||
      this.form.controls.landline.value != '') {

      this.expensesTotal = (
        this.form.controls.feeding.value +
        this.form.controls.gas.value +
        this.form.controls.light.value +
        this.form.controls.aqueduct.value +
        this.form.controls.rent.value +
        this.form.controls.transportation.value +
        this.form.controls.recreation.value +
        this.form.controls.education.value +
        this.form.controls.medical.value +
        this.form.controls.cell_phone.value +
        this.form.controls.landline.value)
    } else {
      this.expensesTotal = null;
    }
  }

}
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEValorationTherFTService } from '../../../../../../business-controller/ch_e_valoration_ther_f_t.service';

@Component({
  selector: 'ngx-form-valoration-ther-ft',
  templateUrl: './form-valoration-ther-ft.component.html',
  styleUrls: ['./form-valoration-ther-ft.component.scss']
})
export class FormValorationTherFTComponent implements OnInit {

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
    private ChEValorationTherFTService: ChEValorationTherFTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {       

        illness: '',
        sports: '',
        obsertations: '',
        days_number: '',
        minutes_number: '',

        


      };
    }

    this.form = this.formBuilder.group({
      

      illness: [this.data[0] ? this.data[0].illness : this.data.illness, Validators.compose([Validators.required])],
      sports: [this.data[0] ? this.data[0].sports : this.data.sports, Validators.compose([Validators.required])],
      obsertations: [this.data[0] ? this.data[0].obsertations : this.data.obsertations],
      days_number: [this.data[0] ? this.data[0].days_number : this.data.days_number, Validators.compose([Validators.required])],
      minutes_number: [this.data[0] ? this.data[0].minutes_number : this.data.minutes_number, Validators.compose([Validators.required])],

    });

    if (this.data.illness != '') {
      this.form.controls.illness.disable();
      this.form.controls.sports.disable();
      this.form.controls.obsertations.disable();
      this.form.controls.days_number.disable();
      this.form.controls.minutes_number.disable();

      this.disabled = true;
    } else {
      this.form.controls.illness.enable();
      this.form.controls.sports.enable();
      this.form.controls.obsertations.enable();
      this.form.controls.days_number.enable();
      this.form.controls.minutes_number.enable();


      this.disabled = false;
    }
  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
          this.ChEValorationTherFTService.Update({
          id: this.data.id,         
          illness: this.form.controls.illness.value,
          sports: this.form.controls.sports.value,
          obsertations: this.form.controls.obsertations.value,
          days_number: this.form.controls.days_number.value,
          minutes_number: this.form.controls.minutes_number.value,

          type_record_id: 1,
          ch_record_id: this.record_id,
          
        }).then(x => {
          this.messageEvent.emit(true)
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChEValorationTherFTService.Save({
            illness: this.form.controls.illness.value,
            sports: this.form.controls.sports.value,
            obsertations: this.form.controls.obsertations.value,
            days_number: this.form.controls.days_number.value,
            minutes_number: this.form.controls.minutes_number.value,

            type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true)
          this.toastService.success('', x.message);
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

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }
}

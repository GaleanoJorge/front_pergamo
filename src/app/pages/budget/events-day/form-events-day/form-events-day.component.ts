import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef, NbToastrService} from '@nebular/theme';

import {EventDayBusinessService} from '../../../../business-controller/event-day-business.service';

@Component({
  selector: 'ngx-form-events-day',
  templateUrl: './form-events-day.component.html',
  styleUrls: ['./form-events-day.component.scss'],
})
export class FormEventsDayComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() event_id: number = null;

  public form: FormGroup;
  public isSubmitted = false;
  public loading = false;
  public saved: any = null;

  constructor(
    private formBuilder: FormBuilder,
    protected dialogRef: NbDialogRef<any>,
    private eventDayBS: EventDayBusinessService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      day_number: [this.data?.day_number, Validators.compose([Validators.required])],
      date_planned: [this.data?.date_planned, Validators.compose([Validators.required])],
      description: [this.data?.description],
      event_id: [this.event_id, Validators.compose([Validators.required])],
    });
  }

  close() {
    this.dialogRef.close();
  }

  async save() {
    this.isSubmitted = true;
    if (this.form.invalid) return false;

    this.loading = true;

    try {
      let response;
      const data = {
        ...this.form.value,
      };

      if (this.data?.id) {
        response = await this.eventDayBS.Update(data, this.data.id);
      } else {
        response = await this.eventDayBS.Save(data);
      }
      if (this.saved) {
        this.saved();
      }
      this.toastService.success('', response.message);
      this.close();
    } catch (e) {
      // this.messageError = e;
    }
  }
}

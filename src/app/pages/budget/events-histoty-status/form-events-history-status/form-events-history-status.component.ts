import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventHistoryStatusBusinessService} from '../../../../business-controller/event-history-status-business.service';

@Component({
  selector: 'ngx-form-events-history-status',
  templateUrl: './form-events-history-status.component.html',
  styleUrls: ['./form-events-history-status.component.scss'],
})
export class FormEventsHistoryStatusComponent implements OnInit {
  @Input() event_id = null;
  @Input() refreshData = null;
  @Input() data = null;
  @Input() title = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public loading: boolean = false;
  public status = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private eventHistoryBD: EventHistoryStatusBusinessService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.eventHistoryBD.GetAuxiliryData().then(x => {
      this.status = x.status;
    });

    this.form = this.formBuilder.group({
      observations: [this.data?.observations],
      approved_status_id: [this.data?.approved_status_id ?? '', Validators.compose([Validators.required])],
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
        response = await this.eventHistoryBD.Update(data, this.data.id);
      } else {
        response = await this.eventHistoryBD.Save(data);
      }

      this.toastService.success('', response.message);

      if (this.refreshData) this.refreshData();

      this.close();
    } catch (e) {
      this.loading = false;
      // this.messageError = e;
    }
  }

}

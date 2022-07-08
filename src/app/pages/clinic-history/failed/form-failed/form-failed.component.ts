import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChFailedService } from '../../../../business-controller/ch-failed.service';
import { ChReasonService } from '../../../../business-controller/ch-reason.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-form-failed',
  templateUrl: './form-failed.component.html',
  styleUrls: ['./form-failed.component.scss'],
})
export class FormFailedComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public record_id;
  public admissions_id;
  public ch_reason_id: any[];
  public previewFile = null;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChFailedS: ChFailedService,
    private ChReasonS: ChReasonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;
    if (!this.data) {
      this.data = {
        descriptions: '',
        file_evidence: '',
        ch_reason_id: '',
      };
    }

    this.ChReasonS.GetCollection().then((x) => {
      this.ch_reason_id = x;
    });

    this.form = this.formBuilder.group({
      descriptions: [this.data.descriptions,Validators.compose([Validators.required]),],
      file_evidence: [this.data.file_evidence,Validators.compose([Validators.required]),],
      ch_reason_id: [this.data.ch_reason_id,Validators.compose([Validators.required]),],
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChFailedS.Update({
          id: this.data.id,
          descriptions: this.form.controls.descriptions.value,
          file_evidence: this.form.controls.file_evidence.value,
          ch_reason_id: this.form.controls.ch_reason_id.value,
          type_record_id: 9,
          ch_record_id: this.record_id,
        }).then((x) => {
            this.toastService.success('', x.message);
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.ChFailedS.Save({
          descriptions: this.form.controls.descriptions.value,
          file_evidence: this.form.controls.file_evidence.value,
          ch_reason_id: this.form.controls.ch_reason_id.value,
          type_record_id: 9,
          ch_record_id: this.record_id,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({
              descriptions: '',
              file_evidence: '',
              ch_reason_id: '',
            });
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      }
    }
  }
  async changeImage(files, option) {
    if (!files.length) return false;

    const file = await this.toBase64(files[0]);

    switch (option) {
      case 1:
        this.form.patchValue({
          file: files[0],
        });
        break;
    }
  }
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })

}

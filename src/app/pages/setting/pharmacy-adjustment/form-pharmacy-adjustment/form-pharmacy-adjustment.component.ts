import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FactoryService } from '../../../../business-controller/factory.service';
import { PharmacyAdjustmentService } from '../../../../business-controller/pharmacy-adjustment.service';

@Component({
  selector: 'ngx-form-pharmacy-adjustment',
  templateUrl: './form-pharmacy-adjustment.component.html',
  styleUrls: ['./form-pharmacy-adjustment.component.scss']
})
export class FormPharmacyAdjustmentComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public name: any[];
  public status: any[];
  public showSelect: Boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private PharmacyAdjustmentS: PharmacyAdjustmentService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        name: ''
      };
    }

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
    });

    await this.PharmacyAdjustmentS.GetCollection().then(x => {
      this.name = x;
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.PharmacyAdjustmentS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {

        this.PharmacyAdjustmentS.Save({
          name: this.form.controls.name.value,
        }).then(x => {
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

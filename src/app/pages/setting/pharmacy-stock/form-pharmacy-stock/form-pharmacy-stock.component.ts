import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampusService } from '../../../../business-controller/campus.service';
import { PharmacyStockService } from '../../../../business-controller/pharmacy-stock.service';

@Component({
  selector: 'ngx-form-pharmacy-stock',
  templateUrl: './form-pharmacy-stock.component.html',
  styleUrls: ['./form-pharmacy-stock.component.scss']
})
export class FormPharmacyStockComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public campus_id: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private sedesS: CampusService,
    private PharmacyStockS: PharmacyStockService,
    private toastService: NbToastrService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        name: '',
        campus_id: '',

      };
    }

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      campus_id: [this.data.campus_id, Validators.compose([Validators.required])],
    });

    await this.sedesS.GetCollection().then(x => {
      this.campus_id = x;
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
        this.PharmacyStockS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          campus_id: this.form.controls.campus_id.value,
          permission_pharmacy_stock_id: 1,
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

        this.PharmacyStockS.Save({
          name: this.form.controls.name.value,
          campus_id: this.form.controls.campus_id.value,
          permission_pharmacy_stock_id: 1,
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

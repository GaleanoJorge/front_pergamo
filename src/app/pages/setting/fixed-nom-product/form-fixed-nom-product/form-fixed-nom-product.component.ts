import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FixedNomProductService } from '../../../../business-controller/fixed-nom-product.service';
import { FixedTypeService } from '../../../../business-controller/fixed-type.service';
import { FixedClasificationService } from '../../../../business-controller/fixed-clasification.service';


@Component({
  selector: 'ngx-form-fixed-nom-product',
  templateUrl: './form-fixed-nom-product.component.html',
  styleUrls: ['./form-fixed-nom-product.component.scss']
})
export class FixedFormNomProductComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public fixed_clasification: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private FixedNomProductS: FixedNomProductService,
    private FixedClasificationS: FixedClasificationService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        fixed_clasification_id: '',
      };
    }

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      fixed_clasification_id: [this.data.fixed_clasification_id, Validators.compose([Validators.required])],
    });

    this.FixedClasificationS.GetCollection().then(x => {
      this.fixed_clasification = x;
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
        this.FixedNomProductS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          fixed_clasification_id: this.form.controls.fixed_clasification_id.value,
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
        this.FixedNomProductS.Save({
          name: this.form.controls.name.value,
          fixed_clasification_id: this.form.controls.fixed_clasification_id.value,
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

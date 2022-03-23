import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DietStockService } from '../../../../business-controller/diet-stock.service';
import { DietSuppliesService } from '../../../../business-controller/diet-supplies.service';
import { CompanyService } from '../../../../business-controller/company.service';


@Component({
  selector: 'ngx-form-diet-stock',
  templateUrl: './form-diet-stock.component.html',
  styleUrls: ['./form-diet-stock.component.scss']
})
export class FormDietStockComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  public diet_supplies: any[];
  public company: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private DietStockS: DietStockService,
    private toastService: NbToastrService,
    private dietSuppliesS: DietSuppliesService,
    private dietCompanyS: CompanyService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        amount: '',
        diet_supplies_id: '',
        company_id: '',
      };
    }

    this.dietSuppliesS.GetCollection().then(x => {
      this.diet_supplies = x;
    });
    this.dietCompanyS.GetCollection({ company_category_id: 2 }).then(x => {
      this.company = x;
    });

    this.form = this.formBuilder.group({
      amount: [this.data.amount, Validators.compose([Validators.required])],
      diet_supplies_id: [this.data.diet_supplies_id, Validators.compose([Validators.required])],
      company_id: [this.data.company_id, Validators.compose([Validators.required])],
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
        this.DietStockS.Update({
          id: this.data.id,
          amount: this.form.controls.amount.value,
          diet_supplies_id: this.form.controls.diet_supplies_id.value,
          company_id: this.form.controls.company_id.value,
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

        this.DietStockS.Save({
          amount: this.form.controls.amount.value,
          diet_supplies_id: this.form.controls.diet_supplies_id.value,
          company_id: this.form.controls.company_id.value,
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

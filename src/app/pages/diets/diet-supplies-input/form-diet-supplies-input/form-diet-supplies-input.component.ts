import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DietSuppliesInputService } from '../../../../business-controller/diet-supplies-input.service';
import { DietSuppliesService } from '../../../../business-controller/diet-supplies.service';
import { CompanyService } from '../../../../business-controller/company.service';
import { CampusService } from '../../../../business-controller/campus.service';


@Component({
  selector: 'ngx-form-diet-supplies-input',
  templateUrl: './form-diet-supplies-input.component.html',
  styleUrls: ['./form-diet-supplies-input.component.scss']
})
export class FormDietSuppliesInputComponent implements OnInit {

  @Input() title: string;
  @Input() data: any= null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  public diet_supplies: any[];
  public company: any[];
  public campus: any[];
  public unidad_de_medida = '';

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private DietSuppliesInputS: DietSuppliesInputService,
    private toastService: NbToastrService,
    private dietSuppliesS: DietSuppliesService,
    private dietCompanyS: CompanyService,
    private campusS: CampusService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        amount: '',
        price: '',
        diet_supplies_id: '',
        company_id: '',
        invoice_number: '',
      };
    }

    this.dietSuppliesS.GetCollection().then(x => {
      this.diet_supplies = x;
    });
    this.dietCompanyS.GetCollection({ company_category_id: 2 }).then(x => {
      this.company = x;
    });
    this.campusS.GetCollection({status_id: 1,}).then(x => {
      this.campus = x;
    });

    this.form = this.formBuilder.group({
      price: [this.data.price, Validators.compose([Validators.required])],
      amount: [this.data.amount, Validators.compose([Validators.required])],
      diet_supplies_id: [this.data.diet_supplies_id, Validators.compose([Validators.required])],
      company_id: [this.data.company_id, Validators.compose([Validators.required])],
      campus_id: [this.data.company_id, Validators.compose([Validators.required])],
      invoice_number: [this.data.invoice_number, Validators.compose([Validators.required])],
    });
  }


  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      var formData = new FormData();
      var datico = this.form.controls;
      formData.append('price', datico.price.value);
      formData.append('amount', datico.amount.value);
      formData.append('diet_supplies_id', datico.diet_supplies_id.value);
      formData.append('company_id', datico.company_id.value);
      formData.append('campus_id', datico.campus_id.value);
      formData.append('invoice_number', this.form.controls.invoice_number.value);

      if (this.data.id) {
        this.DietSuppliesInputS.Update(formData, this.data.id).then(x => {
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

        this.DietSuppliesInputS.Save(formData).then(x => {
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

  ChangeSupply(supply) {
    if (supply != '') {
      this.diet_supplies.forEach(x => {
        if (x.id == supply) {
          this.unidad_de_medida = x.measurement_units.name;
        }
      });
    } else {
      this.unidad_de_medida = '';
    }
  }

}

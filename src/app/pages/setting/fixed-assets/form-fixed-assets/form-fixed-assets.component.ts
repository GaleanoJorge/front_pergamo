import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FixedAssetsService } from '../../../../business-controller/fixed-assets.service';
import { FixedPropertyService } from '../../../../business-controller/fixed-property.service';
import { FixedTypeService } from '../../../../business-controller/fixed-type.service';
import { FixedClasificationService } from '../../../../business-controller/fixed-clasification.service';
import { FixedConditionService } from '../../../../business-controller/fixed-condition.service';
import { CompanyCategoryService } from '../../../../business-controller/company-category.service';


@Component({
  selector: 'ngx-form-fixed-assets',
  templateUrl: './form-fixed-assets.component.html',
  styleUrls: ['./form-fixed-assets.component.scss']
})
export class FormFixedAssetsComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public fixed_clasification: any[];
  public fixed_property: any[];
  public fixed_condition: any[];
  public company: any[];
  public showProv: boolean = false;
  public showCondi: boolean = false;


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private FixedAssetsS: FixedAssetsService,
    private toastService: NbToastrService,
    private FixedPropertyS: FixedPropertyService,
    private FixedTypeS: FixedTypeService,
    private CompanyCategoryS: CompanyCategoryService,
    private FixedClasificationS: FixedClasificationService,
    private FixedConditionS: FixedConditionService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        fixed_clasification_id: '',
        //    fixed_type_id: '',
        fixed_property_id: '',
        obs_property: '',
        plaque: '',
        name: '',
        model: '',
        mark: '',
        serial: '',
        description: '',
        detail_description: '',
        color: '',
        fixed_condition_id: '',
      };
    }

    this.form = this.formBuilder.group({
      fixed_clasification_id: [this.data.fixed_clasification_id, Validators.compose([Validators.required])],
      //   fixed_type_id: [this.data.fixed_type_id, Validators.compose([Validators.required])],
      fixed_property_id: [this.data.fixed_property_id, Validators.compose([Validators.required])],
      obs_property: [],
      plaque: [],
      company_id: [],
      name: [this.data.name, Validators.compose([Validators.required])],
      model: [],
      mark: [this.data.mark, Validators.compose([Validators.required])],
      serial: [],
      description: [this.data.description, Validators.compose([Validators.required])],
      detail_description: [this.data.detail_description, Validators.compose([Validators.required])],
      color: [this.data.color, Validators.compose([Validators.required])],
      fixed_condition_id: [this.data.fixed_condition_id, Validators.compose([Validators.required])],

    });

    await this.FixedPropertyS.GetCollection().then(x => {
      this.fixed_property = x;
    });
    await this.FixedClasificationS.GetCollection().then(x => {
      this.fixed_clasification = x;
    });
    await this.FixedConditionS.GetCollection().then(x => {
      this.fixed_condition = x;
    });
    await this.CompanyCategoryS.GetCollection().then(x => {
      this.company = x;
    });
    this.onChanges1();
    this.onChanges2();
  }

  onChange1(tipoId) {
    if (tipoId == 2) {
      this.showProv = true;
    } else {
      this.showProv = false;
    }
  }


  onChange2(tipoId) {
    if (tipoId == 3) {
      this.showCondi = true;
    } else {
      this.showCondi = false;
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.FixedAssetsS.Update({
          id: this.data.id,
          fixed_type_id: 1,
          name: this.form.controls.name.value,
          fixed_clasification_id: this.form.controls.fixed_clasification_id.value,
          fixed_property_id: this.form.controls.fixed_property_id.value,
          obs_property: this.form.controls.obs_property.value,
          plaque: this.form.controls.plaque.value,
          model: this.form.controls.model.value,
          mark: this.form.controls.mark.value,
          serial: this.form.controls.serial.value,
          description: this.form.controls.description.value,
          detail_description: this.form.controls.detail_description.value,
          color: this.form.controls.color.value,
          company_id: this.form.controls.company_id.value,
          fixed_condition_id: this.form.controls.fixed_condition_id.value,
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

        this.FixedAssetsS.Save({
          fixed_type_id: 1,
          name: this.form.controls.name.value,
          fixed_clasification_id: this.form.controls.fixed_clasification_id.value,
          fixed_property_id: this.form.controls.fixed_property_id.value,
          obs_property: this.form.controls.obs_property.value,
          plaque: this.form.controls.plaque.value,
          model: this.form.controls.model.value,
          mark: this.form.controls.mark.value,
          serial: this.form.controls.serial.value,
          description: this.form.controls.description.value,
          detail_description: this.form.controls.detail_description.value,
          color: this.form.controls.color.value,
          company_id: this.form.controls.company_id.value,
          fixed_condition_id: this.form.controls.fixed_condition_id.value,
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

  onChanges1() {
    this.form.get('fixed_property_id').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.fixed_property = [];
      }
    });
  }

  onChanges2() {
    this.form.get('fixed_condition_id').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.fixed_condition = [];
      }
    });
  }
}

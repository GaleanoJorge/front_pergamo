import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {CompanyService} from '../../../../business-controller/company.service';
import {IdentificationTypeBusinessService} from '../../../../business-controller/identification-type-business.service';
import { CompanyCategoryService} from '../../../../business-controller/company-category.service';
import {CompanyTypeService} from '../../../../business-controller/company-type.service';
import {CountryService} from '../../../../business-controller/country.service';
import {RegionService} from '../../../../business-controller/region.service';
import {IvaService} from '../../../../business-controller/iva.service';
import {RetinerService} from '../../../../business-controller/retiner.service';
import {CompanyKindpersonService} from '../../../../business-controller/company-kindperson.service';
import {PaymentTermsService} from '../../../../business-controller/payment-terms.service';


@Component({
  selector: 'ngx-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.scss']
})
export class FormCompanyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public identification_type: any [];
  public company_category: any [];
  public company_type: any [];
  public country: any [];
  public city: any [];
  public iva: any [];
  public retiner: any [];
  public company_kindperson: any [];
  public payment_terms: any[];
  public showSelect: Boolean = false;


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private CompanyS: CompanyService,
    private toastService: NbToastrService,
    private  IdentificationTypeS: IdentificationTypeBusinessService,
    private CompanyCategoryS: CompanyCategoryService,
    private CompanyTypeS: CompanyTypeService,
    private CountryS: CountryService,
    private RegionS: RegionService,
    private IvaS: IvaService,
    private RetinerS: RetinerService,
    private CompanyKindpersonS: CompanyKindpersonService,
    private PaymentTermsS: PaymentTermsService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        identification_type_id: '',
        identification: '',
        verification: '',
        name: '',
        company_categoty_id: '',
        company_type_id: '',
        administrator: '',
        country_id: '',
        city_id: '',
        address: '',
        phone: '',
        web: '',
        mail: '',
        repre_phone: '',
        repre_mail: '',
        representative: '',
        repre_identification: '',
        iva_id: '',
        retiner_id: '',
        company_kindperson_id: '',
        registration: '',
        opportunity: '',
        discount: '',
        payment_terms_id: '',

      };   
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      identification_type_id: [this.data.identification_type_id, Validators.compose([Validators.required])],
      identification: [this.data.identification, Validators.compose([Validators.required])],
      verification: [this.data.verification, Validators.compose([Validators.required])],
      name: [this.data.name, Validators.compose([Validators.required])],
      company_categoty_id: [this.data.company_categoty_id, Validators.compose([Validators.required])],
      company_type_id: [this.data.company_type_id, Validators.compose([Validators.required])],
      administrator: [this.data.administrator, Validators.compose([Validators.required])],
      country_id: [this.data.country_id, Validators.compose([Validators.required])],
      city_id: [this.data.city_id, Validators.compose([Validators.required])],
      address: [this.data.address, Validators.compose([Validators.required])],
      phone: [this.data.phone, Validators.compose([Validators.required])],
      web: [this.data.web, Validators.compose([Validators.required])],
      mail: [this.data.mail, Validators.compose([Validators.required])],
      repre_phone: [this.data.repre_phone, Validators.compose([Validators.required])],
      repre_mail: [this.data.repre_mail, Validators.compose([Validators.required])],
      representative: [this.data.representative, Validators.compose([Validators.required])],
      repre_identification: [this.data.repre_identification, Validators.compose([Validators.required])],
      iva_id: [this.data.iva_id, Validators.compose([Validators.required])],
      retiner_id: [this.data.retiner_id, Validators.compose([Validators.required])],
      company_kindperson_id: [this.data.company_kindperson_id, Validators.compose([Validators.required])],
      registration: [this.data.registration, Validators.compose([Validators.required])],
      opportunity: [this.data.opportunity, Validators.compose([Validators.required])],
      discount: [this.data.discount, Validators.compose([Validators.required])],
      payment_terms_id: [this.data.payment_terms_id, Validators.compose([Validators.required])],
    });

    await this.IdentificationTypeS.GetCollection().then(x => {
      this.identification_type=x;
    });
    await this.CompanyCategoryS.GetCollection().then(x => {
      this.company_category=x;
    });
    await this.CompanyTypeS.GetCollection().then(x => {
      this.company_type=x;
    });
    await this.CountryS.GetCollection().then(x => {
      this.country=x;
    });

    await this.RegionS.GetCollection().then(x => {
      this.city=x;
    });
    await this.IvaS.GetCollection().then(x => {
      this.iva=x;
    });
    await this.RetinerS.GetCollection().then(x => {
      this.retiner=x;
    });
    await this.CompanyKindpersonS.GetCollection().then(x => {
      this.company_kindperson=x;
    });
    await this.PaymentTermsS.GetCollection().then(x => {
      this.payment_terms=x;
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
        this.CompanyS.Update({
          id: this.data.id,
          identification_type_id: this.form.controls.identification_type_id.value,
          identification: this.form.controls.identification.value,
          verification: this.form.controls.verification.value,
          name: this.form.controls.name.value,
          company_category_id: this.form.controls.company_category_id.value,
          company_type_id: this.form.controls.company_type_id.value,
          administrator: this.form.controls.administrator.value,
          country_id: this.form.controls.country_id.value,
          city_id: this.form.controls.city_id.value,
          address: this.form.controls.address.value,
          phone: this.form.controls.phone.value,
          web: this.form.controls.web.value,
          mail: this.form.controls.mail.value,
          representative: this.form.controls.representative.value,
          repre_phone: this.form.controls.repre_phone.value,
          repre_mail: this.form.controls.repre_mail.value,
          repre_identification: this.form.controls.repre_identification.value,
          iva_id: this.form.controls.iva_id.value,
          retiner_id: this.form.controls.retiner_id.value,
          company_kindperson_id: this.form.controls.company_kindperson_id.value,
          registration: this.form.controls.registration.value,
          opportunity: this.form.controls.opportunity.value,
          discount: this.form.controls.discount.value,
          payment_terms_id: this.form.controls.payment_terms_id.value,

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
        
        this.CompanyS.Save({
          identification_type_id: this.form.controls.identification_type_id.value,
          identification: this.form.controls.identification.value,
          verification: this.form.controls.verification.value,
          name: this.form.controls.name.value,
          company_category_id: this.form.controls.company_category_id.value,
          company_type_id: this.form.controls.company_type_id.value,
          administrator: this.form.controls.administrator.value,
          country_id: this.form.controls.country_id.value,
          city_id: this.form.controls.city_id.value,
          address: this.form.controls.address.value,
          phone: this.form.controls.phone.value,
          web: this.form.controls.web.value,
          mail: this.form.controls.mail.value,
          representative: this.form.controls.representative.value,
          repre_phone: this.form.controls.repre_phone.value,
          repre_mail: this.form.controls.repre_mail.value,
          repre_identification: this.form.controls.repre_identification.value,
          iva_id: this.form.controls.iva_id.value,
          retiner_id: this.form.controls.retiner_id.value,
          company_kindperson_id: this.form.controls.company_kindperson_id.value,
          registration: this.form.controls.registration.value,
          opportunity: this.form.controls.opportunity.value,
          discount: this.form.controls.discount.value,
          payment_terms_id: this.form.controls.payment_terms_id.value,
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

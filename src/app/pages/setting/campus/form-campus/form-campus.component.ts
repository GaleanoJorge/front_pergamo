import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {Status} from '../../../../models/status';
import {Region} from '../../../../models/region';
import {CampusService} from '../../../../business-controller/campus.service';
import {RegionService} from '../../../../business-controller/region.service';
import { CountryService } from '../../../../business-controller/country.service';
import { LocationBusinessService } from '../../../../business-controller/location-business.service';
import { BillingPadPrefixService } from '../../../../business-controller/billing-pad-prefix.service';

@Component({
  selector: 'ngx-form-campus',
  templateUrl: './form-campus.component.html',
  styleUrls: ['./form-campus.component.scss']
})
export class FormCampusComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public country: any;
  public region: any;
  public municipality: any;
  public consulto_done = false;
  public region_changed = false;
  public billing_pad_prefix: any = null;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private campusS: CampusService,
    private countryS: CountryService,
    private regionS: RegionService,
    private toastService: NbToastrService,
    private locationBS: LocationBusinessService,
    private BillingPadPrefixS: BillingPadPrefixService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        address: '',
        enable_code: '',
        billing_pad_prefix_id: '',
        region_id: '',
        municipality_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      address: [this.data.address, Validators.compose([Validators.required])],
      enable_code: [this.data.enable_code, Validators.compose([Validators.required])],
      billing_pad_prefix_id: [this.data.billing_pad_prefix_id, Validators.compose([Validators.required])],
      country_id: ['', Validators.compose([Validators.required])],
      region_id: [this.data.region_id, Validators.compose([Validators.required])],
      municipality_id: [this.data.municipality_id, Validators.compose([Validators.required])],
    });
    this.countryS.GetCollection().then(x => {
      this.country = x;
    });
    this.BillingPadPrefixS.GetCollection().then( x => {
      this.billing_pad_prefix = x;
    });

  }

  onCountryChange(country_id) {
    if (this.consulto_done) {
      this.data.region_id = '';
      this.form.controls.region_id.setValue('');
      this.region = [];
      this.data.municipality_id = '';
      this.form.controls.municipality_id.setValue('');
      this.municipality = [];
    }
    this.locationBS.GetPublicRegionByCountry(country_id).then(x => {
      this.region = x;
    });

  }

  onRegionChange(region_id) {
    if (this.consulto_done) {
      this.data.municipality_id = '';
      this.form.controls.municipality_id.setValue('');
      this.municipality = [];
      this.region_changed = true;
    }
    this.locationBS.GetPublicMunicipalitiesByRegion(region_id).then(x => {
      this.municipality = x;
    });
  }

  onMunicipalityChange(municipality_id) {
    if (this.consulto_done && !this.region_changed) {
      // this.RefreshData();
    }
    this.region_changed = false;
    this.consulto_done = true;
  }
  

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.campusS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          address: this.form.controls.address.value,
          enable_code: this.form.controls.enable_code.value,
          billing_pad_prefix_id: this.form.controls.billing_pad_prefix_id.value,
          region_id: this.form.controls.region_id.value,
          municipality_id: this.form.controls.municipality_id.value,
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
        
        this.campusS.Save({
          name: this.form.controls.name.value,
          address: this.form.controls.address.value,
          enable_code: this.form.controls.enable_code.value,
          billing_pad_prefix_id: this.form.controls.billing_pad_prefix_id.value,
          region_id: this.form.controls.region_id.value,
          municipality_id: this.form.controls.municipality_id.value,
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

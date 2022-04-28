import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionService } from '../../../../business-controller/region.service';
import { LocationBusinessService } from '../../../../business-controller/location-business.service';
import { CountryService } from '../../../../business-controller/country.service';
import { LocalityService } from '../../../../business-controller/locality.service';
import { PadRiskService } from '../../../../business-controller/pad-risk.service';

@Component({
  selector: 'ngx-form-locality',
  templateUrl: './form-locality.component.html',
  styleUrls: ['./form-locality.component.scss'],
})
export class FormLocalityComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public pad_risk: any[];
  public municipality_id: number;
  public region_id: number;
  public municipality: any[];
  public country: any[];
  public region: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public selected_country: boolean = false;
  public selected_municipality: boolean = false;
  public selected_region: boolean = false;
  public selected_pad_risk: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private locationBS: LocationBusinessService,
    private countryS: CountryService,
    private localityS: LocalityService,
    private toastService: NbToastrService,
    private padRiskS: PadRiskService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        country_id: '',
        region_id: '',
        municipality_id: '',
        pad_risk_id: '',
      };
    } else {
      this.selected_country = true;
      this.selected_region = true;
      this.selected_municipality = true;
      this.selected_pad_risk = true;
      this.locationBS.GetPublicRegionByCountry(this.data.municipality.region.country_id).then(x => {
        this.region = x;
      });
      this.locationBS.GetPublicMunicipalitiesByRegion(this.data.municipality.region_id).then(x => {
        this.municipality = x;
      });
      this.locationBS.GetMunicipalitiesByRegion(this.data.municipality_id).then(x => {
        this.municipality = x;
      });
      this.padRiskS.GetCollection().then(x => {
        this.pad_risk = x;
      });
      this.data = {
        id: this.data.id,
        name: this.data.name,
        country_id: this.data.municipality.region.country_id,
        region_id: this.data.municipality.region_id,
        municipality_id: this.data.municipality_id,
        pad_risk_id: '',
      };
    }

    this.countryS.GetCollection().then(x => {
      this.country = x;
    });


    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      country_id: [this.data.country_id, Validators.compose([Validators.required])],
      region_id: [this.data.region_id, Validators.compose([Validators.required])],
      municipality_id: [this.data.municipality_id, Validators.compose([Validators.required])],
      pad_risk_id: [this.data.pad_risk_id],
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
        this.localityS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          municipality_id: this.form.controls.municipality_id.value,
          pad_risk_id: this.form.controls.pad_risk_id.value,
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

        this.localityS.Save({
          name: this.form.controls.name.value,
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

  onCountryChange(country_id) {
    if (country_id) {
      this.selected_country = true;
      this.municipality = [];
      this.selected_region = false;
      this.selected_municipality = false;
      this.municipality = [];
      this.locationBS.GetPublicRegionByCountry(country_id).then(x => {
        this.region = x;
      });
    } else {
      this.region = [];
      this.selected_country = false;
      this.municipality = [];
      this.selected_region = false;
      this.selected_municipality = false;
      this.municipality = [];
    }

  }

  onRegionChange(region_id) {
    if (region_id) {
      this.selected_region = true;
      this.selected_municipality = false;
      this.municipality = [];
      this.locationBS.GetPublicMunicipalitiesByRegion(region_id).then(x => {
        this.municipality = x;
      });
    } else {
      this.municipality = [];
      this.selected_region = false;
      this.selected_municipality = false;
      this.municipality = [];
    }
  }

  onMunicipalityChange(municipality_id) {
    if (municipality_id) {
      this.selected_municipality = true;
      this.locationBS.GetMunicipalitiesByRegion(municipality_id).then(x => {
        this.municipality = x;
      });
    } else {
      this.selected_municipality = false;
      this.municipality = [];
    }
  }

}

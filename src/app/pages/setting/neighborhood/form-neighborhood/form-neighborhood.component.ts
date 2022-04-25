import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Region } from '../../../../models/region';
import { RegionService } from '../../../../business-controller/region.service';
import { MunicipalityService } from '../../../../business-controller/municipality.service';
import { CountryService } from '../../../../business-controller/country.service';
import { NeighborhoodOrResidenceService } from '../../../../business-controller/neighborhood-or-residence.service';
import { LocalityService } from '../../../../business-controller/locality.service';
import { LocationBusinessService } from '../../../../business-controller/location-business.service';
import { PadRiskService } from '../../../../business-controller/pad-risk.service';

@Component({
  selector: 'ngx-form-neighborhood',
  templateUrl: './form-neighborhood.component.html',
  styleUrls: ['./form-neighborhood.component.scss'],
})
export class FormNeighborhoodOrResidenceComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  public municipality: any[];
  public country: any[];
  public region: any[];
  public locality: any[];
  public pad_risk: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public selected_country: boolean = false;
  public selected_region: boolean = false;
  public selected_municipality: boolean = false;
  public selected_locality: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private municipalityS: MunicipalityService,
    private countryS: CountryService,
    private localityS: LocalityService,
    private padRiskS: PadRiskService,
    private locationBS: LocationBusinessService,
    private neighborhoodS: NeighborhoodOrResidenceService,
    private regionS: RegionService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        pad_risk_id: '',
        country_id: '',
        region_id: '',
        municipality_id: '',
        locality_id: '',
      };
    } else {
      this.selected_country = true;
      this.selected_region = true;
      this.selected_municipality = true;
      this.selected_locality = true;

      this.locationBS.GetPublicRegionByCountry(this.data.locality.municipality.region.country_id).then(x => {
        this.region = x;
      });
      this.municipalityS.GetCollection({ region_id: this.data.locality.municipality.region_id }).then(x => {
        this.municipality = x;
      });
      this.locationBS.GetLocalityByMunicipality(this.data.locality.municipality_id).then(x => {
        this.locality = x;
      });
      this.data = {
        country_id: this.data.locality.municipality.region.country_id,
        region_id: this.data.locality.municipality.region_id,
        municipality_id: this.data.locality.municipality_id,
        locality_id: this.data.locality_id,
        pad_risk_id: this.data.pad_risk_id,
        name: this.data.name,
      };
    }

    this.countryS.GetCollection().then(x => {
      this.country = x;
    });

    this.padRiskS.GetCollection().then(x => {
      this.pad_risk = x;
    });


    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      pad_risk_id: [this.data.pad_risk_id, Validators.compose([Validators.required])],
      country_id: [this.data.country_id, Validators.compose([Validators.required])],
      region_id: [this.data.region_id, Validators.compose([Validators.required])],
      municipality_id: [this.data.municipality_id, Validators.compose([Validators.required])],
      locality_id: [this.data.locality_id, Validators.compose([Validators.required])],
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
        this.neighborhoodS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          locality_id: this.form.controls.locality_id.value,
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

        this.neighborhoodS.Save({
          name: this.form.controls.name.value,
          locality_id: this.form.controls.locality_id.value,
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
      }

    }
  }

  onCountryChange(country_id) {
    if (country_id) {
      this.selected_country = true;
      this.selected_region = false;
      this.municipality = [];
      this.selected_municipality = false;
      this.locality = [];
      this.selected_locality = false;
      this.locationBS.GetPublicRegionByCountry(country_id).then(x => {
        this.region = x;
      });
    } else {
      this.region = [];
      this.selected_country = false;
      this.selected_region = false;
      this.municipality = [];
      this.selected_municipality = false;
      this.locality = [];
      this.selected_locality = false;
    }

  }

  onRegionChange(region_id) {
    if (region_id) {
      this.selected_region = true;
      this.selected_municipality = false;
      this.locality = [];
      this.selected_locality = false;
      this.municipalityS.GetCollection({ region_id: region_id }).then(x => {
        this.municipality = x;
      });
    } else {
      this.selected_region = false;
      this.municipality = [];
      this.selected_municipality = false;
      this.locality = [];
      this.selected_locality = false;
    }
  }

  onMunicipalityChange(municipality_id) {
    if (municipality_id) {
      this.selected_municipality = true;
      this.selected_locality = false;
      this.locationBS.GetLocalityByMunicipality(municipality_id).then(x => {
        this.locality = x;
      });
    } else {
      this.selected_municipality = false;
      this.locality = [];
      this.selected_locality = false;
    }

  }
  onLocalityChange(locality_id) {
    if (locality_id) {
      this.selected_locality = true;
      // this.locationBS.GetLocalityByMunicipality(locality_id).then(x => {
      //   this.locality = x;
      // });
    } else {
      this.selected_locality = false;
      // this.locality = [];
    }
  }

}

import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { SelectWorkLocationComponent } from './select-work-location.component';
import { AmountWorkLocationComponent } from './amount-work-location.component';
import { LocationBusinessService } from '../../../../business-controller/location-business.service';
import { CountryService } from '../../../../business-controller/country.service';


@Component({
  selector: 'ngx-work-location-package',
  templateUrl: './work-location-package.component.html',
  styleUrls: ['./work-location-package.component.scss'],
})
export class WorkLocationPackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  public messageError = null;


  public form: FormGroup;
  public data: any = [];
  public title = 'Asignación de Localidad: ';
  public subtitle = 'Localidad: ';
  public headerFields: any[] = ['Nombre', 'Cantidad'];
  public routes = [];
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];
  public emit: any[] = [];
  public country;
  public region;
  public municipality;
  public entity;
  public customData;

  public component_package_id: number;
  public done = false;



  public settings = {

    columns: {
      select: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (!this.done) {
            this.selectedOptions = this.parentData.selectedOptions;
            this.emit = this.parentData.selectedOptions;
            this.parentData.selectedOptions.forEach(x => {
              this.selectedOptions2.push(x.locality_id);
            });
            this.done = true;
          }
          return {
            'data': row,
            'valid': (!this.selectedOptions2.includes(row.id)) ? false : true,
            'selection': (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: SelectWorkLocationComponent,
      },
      name: {
        title: this.headerFields[0],
        type: 'string',
      },
      amount: {
        title: this.headerFields[1],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          var amo;
          this.parentData.selectedOptions.forEach(x => {
            if (x.locality_id == row.id) {
              amo = x.PAD_base_patient_quantity;
            }
          });
          return {
            'data': row,
            'enabled': !this.selectedOptions2.includes(row.id),
            'amount': amo ? amo : '',
            'onchange': (input, row: any) => this.onAmountChange(input, row),
          };
        },
        renderComponent: AmountWorkLocationComponent,
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private countryS: CountryService,
    private locationBS: LocationBusinessService,
  ) {
  }


  ngOnInit(): void {

    this.data = {
      country_id: '',
      region_id: '',
      municipality_id: '',
    };

    this.component_package_id = this.route.snapshot.params.id;

    this.selectedOptions = this.parentData.selectedOptions;

    this.entity = `${this.parentData.entity}/0`;
    this.customData = this.parentData.customData;

    this.form = this.formBuilder.group({
      country_id: [this.data.country_id, Validators.compose([Validators.required])],
      region_id: [this.data.region_id, Validators.compose([Validators.required])],
      municipality_id: [this.data.municipality_id, Validators.compose([Validators.required])],
    });

    if (this.selectedOptions.length > 0) {
      this.data.municipality_id = this.parentData.selectedOptions[0].locality.municipality.id;
      this.form.controls.municipality_id.setValue(this.data.municipality_id);
      this.data.region_id = this.parentData.selectedOptions[0].locality.municipality.region.id;
      this.form.controls.region_id.setValue(this.data.region_id);
      this.data.country_id = this.parentData.selectedOptions[0].locality.municipality.region.country.id;
      this.form.controls.country_id.setValue(this.data.country_id);
      this.onCountryChange(this.data.country_id);
      this.onRegionChange(this.data.region_id);
      this.onMunicipalityChange(this.data.municipality_id);
    }
    this.countryS.GetCollection().then(x => {
      this.country = x;
    });



    this.routes = [
      {
        name: 'Localidad',
        route: '../../component',
      },
      {
        name: 'Paquete de Localidad',
        route: '../../contract/briefcase',
      },
    ];
  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions2.push(row.id);
      var diet = {
        locality_id: row.id,
        PAD_base_patient_quantity: 0,
      };
      this.emit.push(diet);
    } else {
      this.emit = [];
      let i = this.selectedOptions2.indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
      var j = 0;
      this.selectedOptions.forEach(element => {
        if (this.selectedOptions2.includes(element.locality_id)) {
          this.emit.push(element);
        }
        j++;
      });
    }
    this.selectedOptions = this.emit;
    this.messageEvent.emit(this.selectedOptions);
    this.RefreshData();
  }

  onAmountChange(input, row) {
    var i = 0;
    var mientras = this.selectedOptions;
    this.selectedOptions.forEach(element => {
      if (element.locality_id == row.id) {
        mientras[i].PAD_base_patient_quantity = input.target.valueAsNumber;
      }
      i++
    });
    this.selectedOptions = mientras;
    this.messageEvent.emit(this.selectedOptions);
  }

  RefreshData() {
    this.table.refresh();
  }

  onCountryChange(country_id) {
    this.locationBS.GetPublicRegionByCountry(country_id).then(x => {
      this.region = x;
    });

  }

  onRegionChange(region_id) {
    this.locationBS.GetPublicMunicipalitiesByRegion(region_id).then(x => {
      this.municipality = x;
    });
  }

  onMunicipalityChange(municipality_id) {
    this.entity = `${this.parentData.entity}/${municipality_id}`;
    this.customData = this.parentData.customData;
  }
}

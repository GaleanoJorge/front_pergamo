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
  public title = 'Asignación de Insumos: ';
  public subtitle = 'Insumos: ';
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
          // if (!this.done) {
          //   this.selectedOptions = this.parentData.selectedOptions;
          //   this.emit = this.parentData;
          //   this.selectedOptions.forEach(x => {
          //     this.selectedOptions2.push(x.diet_supplies_id);
          //   });
          //   this.done = true;
          // }
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
          // var amo;
          // this.selectedOptions.forEach(x => {
          //   if (x.diet_supplies_id == row.id) {
          //     amo = x.amount;
          //   }
          // });
          return {
            'data': row,
            'enabled': !this.selectedOptions2.includes(row.id),
            'amount':  '',
            'onchange': (input, row: any) => this.onAmountChange(input, row),
          };
        },
        renderComponent: AmountWorkLocationComponent,
      },
      measurement_units: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.code;
        },
      }
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
    
    this.component_package_id = this.route.snapshot.params.id;

    this.selectedOptions = this.parentData.selectedOptions;

    this.form = this.formBuilder.group({
      country_id: [null, Validators.compose([Validators.required])],
      region_id: [null, Validators.compose([Validators.required])],
      municipality_id: [null, Validators.compose([Validators.required])],
    });

    this.countryS.GetCollection().then(x => {
      this.country = x;
    });

    this.routes = [
      {
        name: 'Insumos',
        route: '../../component',
      },
      {
        name: 'Paquete de Insumos',
        route: '../../contract/briefcase',
      },
    ];
  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions2.push(row.id);
      var diet = {
        locality_id: row.id,
        amount: 0,
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
        mientras[i].amount = input.target.valueAsNumber;
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
    this.RefreshData();
  }
}

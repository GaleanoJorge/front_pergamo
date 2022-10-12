import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { SelectUsersCampusComponent } from './select-user-campus.component';
import { LocationBusinessService } from '../../../../business-controller/location-business.service';
import { CountryService } from '../../../../business-controller/country.service';
import { isNumeric } from 'rxjs/internal-compatibility';
import { CampusService } from '../../../../business-controller/campus.service';


@Component({
  selector: 'ngx-users-campus',
  templateUrl: './users-campus.component.html',
  styleUrls: ['./users-campus.component.scss'],
})
export class UsersCampusComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() campusData: any = [];
  public messageError = null;


  public form: FormGroup;
  public data: any = [];
  public title = 'Asignación de Sedes: ';
  public subtitle = '';
  public headerFields: any[] = ['Nombre de sede'];
  public routes = [];
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];
  public emit: any[] = [];
  public campus;
  public region;
  public municipality;
  public entity;
  public customData;
  public phone_consult_alowed = false;
  public phone_consult_alowed_amount = null;

  public component_package_id: number;
  public done = false;
  public consulto_done = false;
  public region_changed = false;



  public settings = {

    columns: {
      select: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (!this.done) {
            this.selectedOptions = this.campusData.selectedOptions;
            this.emit = this.campusData.selectedOptions;
            this.campusData.selectedOptions.forEach(x => {
              this.selectedOptions2.push(x.campus_id);
            });
            this.done = true;
          }
          return {
            'data': row,
            'valid': (!this.selectedOptions2.includes(row.id)) ? false : true,
            'selection': (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: SelectUsersCampusComponent,
      },
      name: {
        title: this.headerFields[0],
        type: 'string',
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private countryS: CountryService,
    private campusBS: CampusService,
  ) {
  }


  ngOnInit(): void {

    this.data = {
    };

    // this.component_package_id = this.route.snapshot.params.id;

    this.selectedOptions = this.campusData.selectedOptions;

    this.entity = this.campusData.entity;
    this.customData = this.campusData.customData;


    this.campusBS.GetCollection({status_id: 1,}).then(x => {
      this.campus = x;
    });



    this.routes = [
      {
        name: 'Sede',
        route: '../../component',
      },
      {
        name: 'Sede',
        route: '../../contract/briefcase',
      },
    ];
  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions2.push(row.id);
      var diet = {
        campus_id: row.id,
      };
      this.emit.push(diet);
    } else {
      this.emit = [];
      let i = this.selectedOptions2.indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
      var j = 0;
      this.selectedOptions.forEach(element => {
        if (this.selectedOptions2.includes(element.campus_id)) {
          this.emit.push(element);
        }
        j++;
      });
    }
    this.selectedOptions = this.emit;
    this.messageEvent.emit(this.selectedOptions);
  }






  RefreshData() {
    this.table.refresh();
  }

 
}

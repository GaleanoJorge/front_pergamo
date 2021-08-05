import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActionsConceptComponent} from './actions-concept.component';
import {FormConceptComponent} from './form-concept/form-concept.component';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import {ConceptBusinessService} from '../../../business-controller/concept-business.service';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {CurrencyPipe} from '@angular/common';
import {MunicipalityService} from '../../../business-controller/municipality.service';

@Component({
  selector: 'ngx-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss'],
})
export class ConceptComponent implements OnInit {
  @Input() concept_base_id: number = null;
  @Input() municipality_id: number = null;

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Ciudades';

  public municipality = null;
  public ciudades = [];
  public vigencias = [];
  public units = [];

  public ciudadActual = null;
  public loading = true;

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditConcept.bind(this),
            'delete': this.DeleteConfirmConcept.bind(this),
          };
        },
        renderComponent: ActionsConceptComponent,
      },
      ciudad: {
        title: 'Ciudad',
        type: 'string',
      },
      validity_id: {
        title: 'Vigencia',
        type: 'string',
        valuePrepareFunction(value, data) {
          return data.vigencia;
        },
        sortDirection: 'desc',
      },
      unit_value: {
        title: 'Valor',
        valuePrepareFunction: (value, data) => {
          return this.currency.transform(value);
        },
      },
    },
  };

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private conceptBS: ConceptBusinessService,
    private currency: CurrencyPipe,
    private municipalityBS: MunicipalityService,
  ) {
  }

  ngOnInit(): void {
    this.municipality_id *= 1;
    this.municipality = this.municipality_id;
    this.conceptBS.GetAuxData().then(x => {
      this.ciudades = x.cities;
      this.vigencias = x.validities;
      this.units = x.units;
      this.loading = false;
    });
  }

  OnChangeCity($event) {
    this.municipality_id = $event.value;
    this.RefreshData();
  }

  RefreshData() {
    this.table.refresh(this.queryParams);
  }

  NewConcept() {
    this.dialogFormService.open(FormConceptComponent, {
      context: {
        title: 'Crear concepto',
        saved: this.RefreshData.bind(this),
        concept_base_id: this.concept_base_id,
        municipality_id: this.municipality_id,
        ciudades: this.ciudades,
        vigencias: this.vigencias,
        units: this.units,
      },
    });
  }

  EditConcept(data) {
    this.dialogFormService.open(FormConceptComponent, {
      context: {
        title: 'Editar concepto',
        saved: this.RefreshData.bind(this),
        concept_base_id: this.concept_base_id,
        municipality_id: this.municipality_id,
        ciudades: this.ciudades,
        vigencias: this.vigencias,
        units: this.units,
        data,
      },
    });
  }

  DeleteConfirmConcept(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteConcept.bind(this),
      },
    });
  }

  DeleteConcept(data) {
    return this.conceptBS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  get queryParams() {
    return {
      municipality_id: this.municipality_id,
      concept_base_id: this.concept_base_id,
    };
  }

  async searchMunicipality(value) {
    const data = await this.municipalityBS.GetOne(value);
    return {
      value: data.id,
      label: data.name,
    };
  }
}

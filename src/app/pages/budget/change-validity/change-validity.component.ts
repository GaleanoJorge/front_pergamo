import {Component, Input, OnInit} from '@angular/core';
import {ChangeValidityBusinessService} from '../../../business-controller/change-validity-business.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-change-validity',
  templateUrl: './change-validity.component.html',
  styleUrls: ['./change-validity.component.scss'],
})
export class ChangeValidityComponent implements OnInit {
  title = 'Cambio de vigencia';
  routes = [
    {
      name: 'Cambio de vigencia',
      route: '/pages/budget/change-validity',
    },
  ];

  messageError = null;
  data = null;

  validities = [];
  cities = [];
  conceptTypes = [];
  concepts = [];
  public form: FormGroup;
  public isSubmitted: boolean = false;
  loadingConcept = false;
  isSearch = false;

  constructor(
    private changeValidityBS: ChangeValidityBusinessService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.changeValidityBS.GetAuxiliaryData().then(data => {
      this.validities = data.validities;
      this.cities = data.cities;
      this.conceptTypes = data.conceptTypes;
    });

    this.form = this.formBuilder.group({
      validity_id: ['', Validators.compose([Validators.required])],
      new_validity_id: ['', Validators.compose([Validators.required])],
      concept_type_id: [''],
      municipality_id: [''],
      increase_percentage: ['', Validators.compose([Validators.required])],
    });
  }

  async ListarConceptos() {
    this.isSearch = false;
    this.isSubmitted = true;

    if (this.form.invalid) return false;

    this.loadingConcept = true;

    const data = this.form.value;

    const params: any = {
      validity_id: data.validity_id,
      new_validity_id: data.new_validity_id,
      pagination: false,
    };

    if (data.concept_type_id) {
      params.concept_type_id = data.concept_type_id;
    }

    if (data.municipality_id) {
      params.municipality_id = data.municipality_id.value;
    }
    this.isSearch = true;
    this.changeValidityBS.GetConcepts(params).then((concepts) => {
      this.concepts = concepts;

      this.concepts.map(concept => {
        if (!concept.new_validity_unit_value) {
          concept.new_validity_unit_value = concept.unit_value
            + (concept.unit_value * (this.form.controls.increase_percentage.value / 100));
        }
      });
      this.loadingConcept = false;
    });
  }

  async Save() {
    try {
      const data = this.concepts.filter((concept) => concept.changeValidity);
      const response = await this.changeValidityBS.Save(data, this.form.controls.new_validity_id.value);

      this.toastService.success('', response.message);
    } catch (e) {
      this.messageError = e;
    }
  }

  get currentValidityName() {
    let name = '';
    if (this.form.controls.validity_id.value) {
      this.validities.map((validity) => {
        if (validity.id === this.form.controls.validity_id.value) {
          name = validity.name;
        }
      });
    }
    return name;
  }

  get currentNewValidityName() {
    let name = '';
    if (this.form.controls.new_validity_id.value) {
      this.validities.map((validity) => {
        if (validity.id === this.form.controls.new_validity_id.value) {
          name = validity.name;
        }
      });
    }
    return name;
  }

}

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {ConceptBaseBusinessService} from '../../../../business-controller/concept-base-business.service';
import {ActivatedRoute} from '@angular/router';
import {ConceptBusinessService} from '../../../../business-controller/concept-business.service';

@Component({
  selector: 'ngx-form-concept-base',
  templateUrl: './form-concept-base.component.html',
  styleUrls: ['./form-concept-base.component.scss'],
})
export class FormConceptBaseComponent implements OnInit {
  @Input() title = null;
  @Input() routes = null;
  @Input() messageError = null;
  @Input() routeBack = '/pages/budget/concepts/';
  @Input() data = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public conceptTypes = [];
  public transportTypes = [];
  public isTransporte = false;
  public municipality_id = null;
  public units = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private conceptBaseBS: ConceptBaseBusinessService,
    private conceptBS: ConceptBusinessService,
    private route: ActivatedRoute,
  ) {
  }


  ngOnInit(): void {
    this.municipality_id = this.route.snapshot.queryParams.municipality_id ?? null;

    this.conceptBS.GetAuxData().then(x => {
      this.units = x.units;
    });

    this.conceptBaseBS.GetAuxData().then(x => {
      this.conceptTypes = x.conceptType;
      this.transportTypes = x.transportType;
    });

    this.form = this.formBuilder.group({
      name: [this.data?.name, Validators.compose([Validators.required])],
      concept_type_id: [this.data?.concept_type_id ?? '', Validators.compose([Validators.required])],
      unit_id: [this.data?.unit_id ?? '', Validators.compose([Validators.required])],
      description: [this.data?.description],
      transport_type_id: [this.data?.transport_type_id ?? ''],
      origin: [this.data?.origin],
      destination: [this.data?.destination],
    });

    this.OnChangeForm();
  }

  OnChangeForm() {
    this.form.get('concept_type_id').valueChanges.subscribe(val => {
      this.form.get('transport_type_id').clearValidators();
      this.form.get('origin').clearValidators();
      this.form.get('destination').clearValidators();

      if (val === 2) {
        this.isTransporte = true;
        this.form.controls.transport_type_id.setValidators(Validators.required);
        this.form.controls.origin.setValidators(Validators.required);
        this.form.controls.destination.setValidators(Validators.required);
      } else {
        this.isTransporte = false;
      }
    });
  }

  async Save() {
    this.isSubmitted = true;

    if (this.form.invalid) return false;

    try {
      let response;
      if (this.data?.id) {
        response = await this.conceptBaseBS.Update({
          ...this.form.value,
          transport_type_id: this.form.value.transport_type_id === '' ? null : this.form.value.transport_type_id,
        }, this.data.id);
      } else {
        response = await this.conceptBaseBS.Save({
          ...this.form.value,
          transport_type_id: this.form.value.transport_type_id === '' ? null : this.form.value.transport_type_id,
        });
      }

      this.toastService.success('', response.message);
      this.data = response.data.concept;

    } catch (e) {
      this.messageError = e;
    }
  }

}

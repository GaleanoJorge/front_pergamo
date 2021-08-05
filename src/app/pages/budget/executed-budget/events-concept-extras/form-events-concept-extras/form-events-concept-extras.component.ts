import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {EventConceptBusinessService} from '../../../../../business-controller/event-concept-business.service';
import {ConceptBaseBusinessService} from '../../../../../business-controller/concept-base-business.service';

@Component({
  selector: 'ngx-form-events-concept-extras',
  templateUrl: './form-events-concept-extras.component.html',
  styleUrls: ['./form-events-concept-extras.component.scss'],
})
export class FormEventsConceptExtrasComponent implements OnInit {
  @Input() event_id: number;
  @Input() refreshData = null;
  @Input() title: string;
  @Input() data = null;
  @Input() municipality_id: number;

  conceptTypes = [];
  form: FormGroup;
  isSubmitted = false;
  loading = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private eventConceptBS: EventConceptBusinessService,
    private conceptBS: ConceptBaseBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.conceptBS.GetAuxData().then(x => {
      this.conceptTypes = x.conceptType;
    });
    this.form = this.formBuilder.group({
      concept_type_id: [this.data?.concept_type_id ?? '', Validators.compose([Validators.required])],
      concept_id: [this.data?.concept_id, Validators.compose([Validators.required])],
      real_quantity: [this.data?.real_quantity, Validators.compose([Validators.required])],
      real_unit_value: [this.data?.real_unit_value, Validators.compose([Validators.required])],
      real_date: [this.data?.real_date, Validators.compose([Validators.required])],
      evidence_path: [''],
      observations: [this.data?.observations ?? ''],
      // status_id: [this.data.status_id],
    });
  }

  paramsConceptAutocomplete() {
    return {
      concept_type_id: this.form.controls.concept_type_id.value,
      municipality_id: this.municipality_id,
    };
  }

  async initConcept(value) {
    // const data = await this.conceptBS.GetOne(value);

    return value;
  }

  close() {
    this.dialogRef.close();
  }

  uploadImage() {
    document.getElementById('url_image').click();
  }

  async changeImage(files) {
    if (!files.length) return false;

    this.form.patchValue({
      evidence_path: files[0],
    });
  }

  async save() {
    this.isSubmitted = true;
    if (this.form.invalid) return false;

    this.loading = true;

    try {
      const formData = new FormData();
      const data = this.form.value;
      data.concept_id = data.concept_id.value;
      formData.append('concept_id', data.concept_id);
      formData.append('event_id', this.event_id.toString());
      formData.append('real_date', data.real_date);
      formData.append('real_quantity', data.real_quantity);
      formData.append('real_unit_value', data.real_unit_value);
      formData.append('observations', data.observations);
      formData.append('evidence_path', data.evidence_path);

      let response;
      if (this.data?.id) {
        response = await this.eventConceptBS.Update(formData, this.data.id);
      } else {
        response = await this.eventConceptBS.Save(formData);
      }

      this.toastService.success('', response.message);
      if (this.refreshData) this.refreshData();
      this.close();
    } catch (e) {
      this.toastService.danger('', e.message);
    }
    this.loading = false;
  }

}

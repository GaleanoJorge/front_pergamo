import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ConceptBusinessService} from '../../../../business-controller/concept-business.service';

@Component({
  selector: 'ngx-form-concept',
  templateUrl: './form-concept.component.html',
  styleUrls: ['./form-concept.component.scss'],
})
export class FormConceptComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() saved: any = null;
  @Input() concept_base_id = null;
  @Input() municipality_id = null;
  @Input() ciudades = [];
  @Input() vigencias = [];
  @Input() units = [];

  public form: FormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private conceptBS: ConceptBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      concept_base_id: [this.data?.concept_base_id ?? this.concept_base_id, Validators.compose([Validators.required])],
      municipality_id: [this.data?.municipality_id ?? this.municipality_id, Validators.compose([Validators.required])],
      validity_id: [this.data?.validity_id ?? '', Validators.compose([Validators.required])],
      unit_value: [this.data?.unit_value, Validators.compose([Validators.required])],
    });
  }

  Close() {
    this.dialogRef.close();
  }

  async Save() {
    this.isSubmitted = true;
    if (this.form.invalid) return false;

    this.loading = true;

    try {
      let response;

      if (this.data?.id) {
        response = await this.conceptBS.Update(this.form.value, this.data.id);
      } else {
        response = await this.conceptBS.Save(this.form.value);
      }

      if (this.saved) {
        this.saved();
      }

      this.dialogRef.close();

      this.toastService.success('', response.message);
      this.data = response.data.survey;
    } catch (e) {
      // this.messageError = e;
    }
    this.loading = false;
  }

}

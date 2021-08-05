import {Component, OnInit, Input} from '@angular/core';
import {NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidityService} from '../../../../business-controller/validity.service';
import {Validity} from '../../../../models/validity';
import {OriginBusinessService} from '../../../../business-controller/origin-business.service';

@Component({
  selector: 'ngx-form-origin',
  templateUrl: './form-origin.component.html',
  styleUrls: ['./form-origin.component.scss'],
})
export class FormOriginComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() routes = [];
  @Input() routeBack = '/pages/educationalconfiguration/origin';

  public form: FormGroup;
  public validity: Validity[];
  public isSubmitted: boolean = false;
  public messageError: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private validityS: ValidityService,
    private originBS: OriginBusinessService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        id: null,
        name: '',
        validity_id: '',
        description: '',
      };
    }

    this.validityS.GetCollection().then(x => {
      this.validity = x;
    });

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      validity_id: [this.data.validity_id, Validators.compose([Validators.required])],
      description: [this.data.description, Validators.compose([Validators.required])],
    });
  }

  async Save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      try {
        let response;

        if (this.data.id) {
          response = await this.originBS.Update({
            id: this.data.id,
            name: this.form.controls.name.value,
            description: this.form.controls.description.value,
            validity_id: this.form.controls.validity_id.value,
          });
        } else {
          response = await this.originBS.Save({
            name: this.form.controls.name.value,
            description: this.form.controls.description.value,
            validity_id: this.form.controls.validity_id.value,
          });

          this.data.id = response.data.origin.id;
        }

        this.toastService.success('', response.message);
      } catch (e) {
        this.isSubmitted = false;
      }
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChangeValidityBusinessService} from '../../../business-controller/change-validity-business.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-reconcile-tickets',
  templateUrl: './reconcile-tickets.component.html',
  styleUrls: ['./reconcile-tickets.component.scss'],
})
export class ReconcileTicketsComponent implements OnInit {
  title = 'Conciliar tiquetes';
  routes = [
    {
      name: 'Conciliar tiquetes',
      route: '/pages/budget/reconcile-tickets',
    },

  ];
  messageError = null;
  data = null;

  validities = [];
  form: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private changeValidityBS: ChangeValidityBusinessService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.changeValidityBS.GetAuxiliaryData().then(data => {
      this.validities = data.validities;
    });
    this.form = this.formBuilder.group({
      validity_id: ['', Validators.compose([Validators.required])],
      xls_tickets: ['', Validators.compose([Validators.required])],
    });
  }

  uploadImage() {
    document.getElementById('url_image').click();

    this.form.controls.xls_tickets.markAsTouched();
  }

  async changeImage(files) {
    if (!files.length) return false;

    this.form.patchValue({
      xls_tickets: files[0],
    });
  }

  async SubirArchivo() {
    try {
      this.isSubmitted = true;
      this.form.controls.xls_tickets.markAsTouched();

      if (this.form.invalid) return false;

      const formData = new FormData();
      const data = this.form.value;

      formData.append('xls_tickets', data.xls_tickets);

      const response = await this.changeValidityBS.ConciliarTiquetes(formData, data.validity_id);

      this.toastService.success('', response.message);
    } catch (e) {
      this.messageError = e;
    }
  }

  async exportTiquetes() {
    try {
      this.isSubmitted = true;

      if (!this.form.controls.validity_id.value) return false;

      const response: any = await this.changeValidityBS.ExportarTiquetes(this.form.controls.validity_id.value);

      window.open(response.url, '_blank');
    } catch (e) {

    }
  }
}

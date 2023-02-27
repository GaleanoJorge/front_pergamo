import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ChLaboratoryService } from '../../../business-controller/ch-laboratory.service';

@Component({
  selector: 'ngx-form-change-laboratory-status',
  templateUrl: './form-change-laboratory-status.component.html',
  styleUrls: ['./form-change-laboratory-status.component.scss'],
})
export class FormChangeLaboratoryStatus implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() status: number;
  @Input() id: number;
  @Input() refreshData: any;
  public loading: boolean = false;

  public isSubmitted = false;
  public form: FormGroup

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private chLaboratoryS: ChLaboratoryService
  ) { }

  ngOnInit(): void {

    this.data = {
      observation: null,
      laboratory_file: null
    };

    this.form = this.formBuilder.group({
      observation: [
        this.data.observation,
        Validators.compose([Validators.required])
      ],
      laboratory_file: [
        this.data.laboratory_file,
      ]
    });

    if (this.status == 3) {
      this.form.controls.laboratory_file.setValidators(Validators.compose([Validators.required]));
    }

  }

  close() {
    this.dialogRef.close();
  }

  async loadFile(files) {
    if (!files.length) return false;
    this.form.patchValue({
      laboratory_file: files[0],
    });
  }

  public save() {
    this.isSubmitted = true;
    let userData = JSON.parse(localStorage.getItem('user'));

    let formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('laboratory_status_id', (this.status + 1).toString());
    formData.append('file', this.form.controls.laboratory_file.value);
    formData.append('user_id', userData.id);
    formData.append('observation', this.form.controls.observation.value);

    formData.forEach((entry, key) => {
      if (formData.get(key) == "undefined" || formData.get(key) == "null") {
        formData.delete(key);
      }
    });

    if (!this.form.invalid) {
      this.chLaboratoryS.Update(formData).then(x => {
        this.toastService.success('', x.message);
        this.loading = false;
        this.close();
        this.refreshData();
      }).catch(x => {
        this.toastService.danger(
          '', 'No se ha podido actualizar al laboratorio'
        );
        this.isSubmitted = false;
        this.loading = false;
      })
    } else {
      this.toastService.warning('', 'Debe diligenciar los campos obligatorios');
    }
  }

}

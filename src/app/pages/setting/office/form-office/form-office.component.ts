import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {Status} from '../../../../models/status';
import {OfficeService} from '../../../../business-controller/office.service';

@Component({
  selector: 'ngx-form-office',
  templateUrl: './form-office.component.html',
  styleUrls: ['./form-office.component.scss']
})
export class FormOfficeComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public status_id: number;
  public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public status_label='Activo';
  public temp=1;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private statusBS: StatusBusinessService,
    private officeS: OfficeService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        status_id: '',
      };
    }

    this.statusBS.GetCollection().then(x => {
      this.status = x;
    });

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      status_id: [this.data.status_id],
    });
  }

  close() {
    this.dialogRef.close();
  }
  ChangeLabel(){
    if (this.status_label=='Activo') {
      this.status_label='Inactivo';
      this.temp=2;
    } else {
      this.status_label='Activo';
      this.temp=1;
    }
    
  }
  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.officeS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          status_id: this.temp,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.officeS.Save({
          name: this.form.controls.name.value,
          status_id: this.temp,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    }
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {Status} from '../../../../models/status';
import {ThemesService} from '../../../../business-controller/themes.service';

@Component({
  selector: 'ngx-form-themes',
  templateUrl: './form-themes.component.html',
  styleUrls: ['./form-themes.component.scss']
})
export class FormThemesComponent implements OnInit {

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
    private themeS: ThemesService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        description: '',
        status_id: '',        
      };
    }

    this.statusBS.GetCollection().then(x => {
      this.status = x;
    });

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      status_id: [this.data.status_id],
      description: [this.data.description, Validators.compose([Validators.required])],
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
        this.themeS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          status_id: this.temp,
          description: this.form.controls.description.value,
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
        this.themeS.Save({
          name: this.form.controls.name.value,
          status_id: this.temp,
          description: this.form.controls.description.value,
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

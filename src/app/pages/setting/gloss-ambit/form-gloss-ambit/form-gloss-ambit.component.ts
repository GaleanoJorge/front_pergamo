import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { GlossAmbitService } from '../../../../business-controller/gloss-ambit.service';
import { GlossModalityService } from '../../../../business-controller/gloss-modality.service';
import { StatusBusinessService } from '../../../../business-controller/status-business.service';


@Component({
  selector: 'ngx-form-gloss-ambit',
  templateUrl: './form-gloss-ambit.component.html',
  styleUrls: ['./form-gloss-ambit.component.scss']
})
export class FormGlossAmbitComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public status: any[];
  public gloss_modality: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private GlossModalityS: GlossModalityService,
    private statusBS: StatusBusinessService,
    private GlossAmbitS: GlossAmbitService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        status_id: '',
        gloss_modality_id: ''
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });


    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      status_id: [this.data.status_id, Validators.compose([Validators.required])],
      gloss_modality_id: [this.data.gloss_modality_id, Validators.compose([Validators.required])],
    });

    this.statusBS.GetCollection().then(x => {
      this.status = x;
    });
    this.GlossModalityS.GetCollection({
      'status_id': 1,
    }).then(x => {
      this.gloss_modality = x;
    });
  }


  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.GlossAmbitS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          status_id: this.form.controls.status_id.value,
          gloss_modality_id: this.form.controls.gloss_modality_id.value,
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

        this.GlossAmbitS.Save({
          name: this.form.controls.name.value,
          status_id: this.form.controls.status_id.value,
          gloss_modality_id: this.form.controls.gloss_modality_id.value,
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

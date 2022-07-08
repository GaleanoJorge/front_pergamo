import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusBusinessService } from '../../../../business-controller/status-business.service';
import { CoverageService } from '../../../../business-controller/coverage.service';
import { ObjetionCodeResponseService } from '../../../../business-controller/objetion-code-response.service';



@Component({
  selector: 'ngx-form-objetion--response',
  templateUrl: './form-objetion-code-response.component.html',
  styleUrls: ['./form-objetion-code-response.component.scss']
})
export class FormObjetionCodeResponseComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public coverage: any[];
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private statusBS: StatusBusinessService,
    private ObjetionCodeResponseS: ObjetionCodeResponseService,
    private CoverageS: CoverageService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        code: ''
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });


    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      code: [this.data.code, Validators.compose([Validators.required])],
    });
    // this.CoverageS.GetCollection().then(x => {
    //   this.coverage = x;
    // });
  }


  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.ObjetionCodeResponseS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          code: this.form.controls.code.value,
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
        this.ObjetionCodeResponseS.Save({
          name: this.form.controls.name.value,
          code: this.form.controls.code.value,
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

import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {ProductGroupService} from '../../../../business-controller/product-group.service';
import { FixedClasificationService } from '../../../../business-controller/fixed-clasification.service';
import { FixedCodeService } from '../../../../business-controller/fixed-code.service';


@Component({
  selector: 'ngx-form-fixed-clasification',
  templateUrl: './form-fixed-clasification.component.html',
  styleUrls: ['./form-fixed-clasification.component.scss']
})
export class FormFixedClasificationComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public fixed_code:any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private FixedClasificationS: FixedClasificationService,
    private FixedCodeS: FixedCodeService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        fixed_code_id: '',
      };
    }

    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      fixed_code_id: [this.data.fixed_code_id, Validators.compose([Validators.required])],
    });

    this.FixedCodeS.GetCollection().then(x => {
      this.fixed_code=x;
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
        this.FixedClasificationS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          fixed_code_id: this.form.controls.fixed_code_id.value,
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
        this.FixedClasificationS.Save({
          name: this.form.controls.name.value,
          fixed_code_id: this.form.controls.fixed_code_id.value,
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

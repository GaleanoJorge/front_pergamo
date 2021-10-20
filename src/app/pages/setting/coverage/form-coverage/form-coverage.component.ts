import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {CoverageService} from '../../../../business-controller/coverage.service';
import {TypeBriefcaseService} from '../../../../business-controller/type-briefcase.service';


@Component({
  selector: 'ngx-form-coverage',
  templateUrl: './form-coverage.component.html',
  styleUrls: ['./form-coverage.component.scss']
})
export class FormCoverageComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public type_briefcase:any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private CoverageS: CoverageService,
    private TypeBriefcaseS: TypeBriefcaseService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        type_briefcase_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      type_briefcase_id: [this.data.type_briefcase_id, Validators.compose([Validators.required])],
    });

    this.TypeBriefcaseS.GetCollection().then(x => {
      this.type_briefcase=x;
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
        this.CoverageS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          type_briefcase_id: this.form.controls.type_briefcase_id.value,
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
        this.CoverageS.Save({
          name: this.form.controls.name.value,
          type_briefcase_id: this.form.controls.type_briefcase_id.value,
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

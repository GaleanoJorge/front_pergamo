import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {CiiuGroupService} from '../../../../business-controller/ciiu-group.service';
import {CiiuDivisionService} from '../../../../business-controller/ciiu-division.service';


@Component({
  selector: 'ngx-form-ciiu-group',
  templateUrl: './form-ciiu-group.component.html',
  styleUrls: ['./form-ciiu-group.component.scss']
})
export class FormCiiuGroupComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public cig_division:any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private CiiuGroupS: CiiuGroupService,
    private CiiuDivisionS: CiiuDivisionService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        cig_code: '',
        cig_name:'',
        cig_division:'',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      cig_code: [this.data.cig_code, Validators.compose([Validators.required])],
      cig_name: [this.data.cig_name, Validators.compose([Validators.required])],
      cig_division: [this.data.cig_division, Validators.compose([Validators.required])],
    });

    this.CiiuDivisionS.GetCollection().then(x => {
      this.cig_division=x;
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
        this.CiiuGroupS.Update({
          id: this.data.id,
          cig_code: this.form.controls.cig_code.value,
          cig_name: this.form.controls.cig_name.value,
          cig_division:this.form.controls.cig_division.value,
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
        
        this.CiiuGroupS.Save({
          cig_code: this.form.controls.cig_code.value,
          cig_name: this.form.controls.cig_name.value,
          cig_division:this.form.controls.cig_division.value,
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

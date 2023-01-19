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
  public division:any[];

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
        code: '',
        name:'',
        division_id:'',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      code: [this.data.code, Validators.compose([Validators.required])],
      name: [this.data.name, Validators.compose([Validators.required])],
      division_id: [this.data.division_id, Validators.compose([Validators.required])],
    });

    this.CiiuDivisionS.GetCollection().then(x => {
      this.division=x;
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
          code: this.form.controls.code.value,
          name: this.form.controls.name.value,
          division_id:this.form.controls.division_id.value,
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
          code: this.form.controls.code.value,
          name: this.form.controls.name.value,
          division_id:this.form.controls.division_id.value,
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

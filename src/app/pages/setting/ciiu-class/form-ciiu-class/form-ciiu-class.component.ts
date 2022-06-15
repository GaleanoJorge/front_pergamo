import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {CiiuGroupService} from '../../../../business-controller/ciiu-group.service';
import {CiiuClassService} from '../../../../business-controller/ciiu-class.service';


@Component({
  selector: 'ngx-form-ciiu-class',
  templateUrl: './form-ciiu-class.component.html',
  styleUrls: ['./form-ciiu-class.component.scss']
})
export class FormCiiuClassComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public group:any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private CiiuGroupS: CiiuGroupService,
    private CiiuClassS: CiiuClassService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        code: '',
        name:'',
        group_id:'',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      code: [this.data.code, Validators.compose([Validators.required])],
      name: [this.data.name, Validators.compose([Validators.required])],
      group_id: [this.data.group_id, Validators.compose([Validators.required])],
    });

    this.CiiuGroupS.GetCollection().then(x => {
      this.group=x;
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
        this.CiiuClassS.Update({
          id: this.data.id,
          code: this.form.controls.code.value,
          name: this.form.controls.name.value,
          group_id:this.form.controls.group_id.value,
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
        
        this.CiiuClassS.Save({
          code: this.form.controls.code.value,
          name: this.form.controls.name.value,
          group_id:this.form.controls.group_id.value,
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

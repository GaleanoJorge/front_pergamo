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
  public cic_group:any[];

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
        cic_code: '',
        cic_name:'',
        cic_group:'',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      cic_code: [this.data.cic_code, Validators.compose([Validators.required])],
      cic_name: [this.data.cic_name, Validators.compose([Validators.required])],
      cic_group: [this.data.cic_group, Validators.compose([Validators.required])],
    });

    this.CiiuGroupS.GetCollection().then(x => {
      this.cic_group=x;
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
          cic_code: this.form.controls.cic_code.value,
          cic_name: this.form.controls.cic_name.value,
          cic_group:this.form.controls.cic_group.value,
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
          cic_code: this.form.controls.cic_code.value,
          cic_name: this.form.controls.cic_name.value,
          cic_group:this.form.controls.cic_group.value,
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

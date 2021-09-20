import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {RipsTypeFileService} from '../../../../business-controller/rips-typefile.service';
import {RipsTypeService} from '../../../../business-controller/rips-type.service';


@Component({
  selector: 'ngx-form-rips-type',
  templateUrl: './form-rips-type.component.html',
  styleUrls: ['./form-rips-type.component.scss']
})
export class FormRipsTypeComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private RipsTypeS: RipsTypeService,
    private RipsTypeFileS: RipsTypeFileService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        rips_typefile_id: '',
        name: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      rips_typefile_id: [this.data.rips_typefile_id, Validators.compose([Validators.required])],
      name: [this.data.name, Validators.compose([Validators.required])],
    });

    this.RipsTypeFileS.GetCollection().then(x => {
      this.rips_typefile=x;
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
        this.RipsTypeS.Update({
          id: this.data.id,
          rips_typefile_id: this.form.controls.rips_typefile_id.value,
          name: this.form.controls.name.value,
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
        
        this.RipsTypeS.Save({
          rips_typefile_id: this.form.controls.rips_typefile_id.value,
          name: this.form.controls.name.value,
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

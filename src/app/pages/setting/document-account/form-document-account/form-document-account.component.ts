import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {DocumentAccountService} from '../../../../business-controller/document-account.service';
import {StatusBusinessService} from '../../../../business-controller/status-business.service';


@Component({
  selector: 'ngx-form-document-account',
  templateUrl: './form-document-account.component.html',
  styleUrls: ['./form-document-account.component.scss']
})
export class FormDocumentAccountComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public status: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
     private statusBS: StatusBusinessService,
    private DocumentAccountS: DocumentAccountService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        dac_name: '',
        dac_state:''
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      dac_name: [this.data.dac_name, Validators.compose([Validators.required])],
      dac_state: [this.data.dac_state, Validators.compose([Validators.required])],
    });

   this.statusBS.GetCollection().then(x => {
      this.status=x;
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
        this.DocumentAccountS.Update({
          id: this.data.id,
          dac_name: this.form.controls.dac_name.value,
          dac_state:this.form.controls.dac_state.value,
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
        
        this.DocumentAccountS.Save({
          dac_name: this.form.controls.dac_name.value,
          dac_state:this.form.controls.dac_state.value,
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

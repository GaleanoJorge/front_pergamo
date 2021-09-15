import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {DocumentService} from '../../../../business-controller/document.service';
import {StatusBusinessService} from '../../../../business-controller/status-business.service';


@Component({
  selector: 'ngx-form-document',
  templateUrl: './form-document.component.html',
  styleUrls: ['./form-document.component.scss']
})
export class FormDocumentComponent implements OnInit {

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
    private DocumentS: DocumentService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        doc_name: '',
        doc_state:''
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      doc_name: [this.data.doc_name, Validators.compose([Validators.required])],
      doc_state: [this.data.doc_state, Validators.compose([Validators.required])],
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
        this.DocumentS.Update({
          id: this.data.id,
          doc_name: this.form.controls.dac_name.value,
          doc_state:this.form.controls.dac_state.value,
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
        
        this.DocumentS.Save({
          doc_name: this.form.controls.dac_name.value,
          doc_state:this.form.controls.dac_state.value,
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

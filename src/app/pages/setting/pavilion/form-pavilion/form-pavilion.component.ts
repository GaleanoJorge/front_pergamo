import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {PavilionService} from '../../../../business-controller/pavilion.service';
import {FlatService} from '../../../../business-controller/flat.service';

 
@Component({
  selector: 'ngx-form-pavilion',
  templateUrl: './form-pavilion.component.html',
  styleUrls: ['./form-pavilion.component.scss']
})
export class FormPavilionComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public flat:any[];



  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private FlatS: FlatService,
    private PavilionS: PavilionService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        code: '',
        flat_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      code: [this.data.code, Validators.compose([Validators.required])],
      flat_id: [this.data.flat_id, Validators.compose([Validators.required])],
    });

    this.FlatS.GetCollection().then(x => {
      this.flat=x;
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
        this.PavilionS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          code: this.form.controls.code.value,
          flat_id: this.form.controls.flat_id.value,
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
        this.PavilionS.Save({
          name: this.form.controls.name.value,
          code: this.form.controls.code.value,
          flat_id: this.form.controls.flat_id.value,
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

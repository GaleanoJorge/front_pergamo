import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {SpecialFieldService} from '../../../../business-controller/special-field.service';
import {TypeProfessionalService} from '../../../../business-controller/type-professional.service';


 
@Component({
  selector: 'ngx-form-special-field',
  templateUrl: './form-special-field.component.html',
  styleUrls: ['./form-special-field.component.scss']
})
export class FormSpecialFieldComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public type_professional: any[];
 



  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private TypeProfessionalS: TypeProfessionalService,
    private SpecialFieldS: SpecialFieldService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        type_professional_id:'',

      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      type_professional_id: [this.data.type_professional_id, Validators.compose([Validators.required])],

    });

    this.TypeProfessionalS.GetCollection().then(x => {
      this.type_professional=x;
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
        this.SpecialFieldS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          type_professional_id: this.form.controls.type_professional_id.value,

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
        this.SpecialFieldS.Save({
          name: this.form.controls.name.value,
          type_professional_id: this.form.controls.type_professional_id.value,

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

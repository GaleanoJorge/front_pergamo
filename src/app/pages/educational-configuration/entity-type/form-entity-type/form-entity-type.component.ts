import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EntityType} from '../../../../models/entity-type';
import {EntityTypeService} from '../../../../business-controller/entity-type.service';

@Component({
  selector: 'ngx-form-entity-type',
  templateUrl: './form-entity-type.component.html',
  styleUrls: ['./form-entity-type.component.scss']
})
export class FormEntityTypeComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public entity:EntityType[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private entityS: EntityTypeService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        // description: '',
      };
    }    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      // description: [this.data.description, Validators.compose([Validators.required])],
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
        this.entityS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
        }).then(x => {
          console.log(x);
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
        
        this.entityS.Save({
          id: this.data.id,
          name: this.form.controls.name.value,
        }).then(x => {
          console.log(x);
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          console.log(x);
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    }
  }

}

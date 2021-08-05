import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Area} from '../../../../models/area';
import {AreaService} from '../../../../business-controller/area.service';


@Component({
  selector: 'ngx-form-area',
  templateUrl: './form-area.component.html',
  styleUrls: ['./form-area.component.scss']
})
export class FormAreaComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public area:Area[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private areaS: AreaService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        description: '',
      };
    }    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      description: [this.data.description, Validators.compose([Validators.required])],
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
        this.areaS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          description: this.form.controls.description.value,
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
        
        this.areaS.Save({
          id: this.data.id,
          name: this.form.controls.name.value,
          description: this.form.controls.description.value,
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


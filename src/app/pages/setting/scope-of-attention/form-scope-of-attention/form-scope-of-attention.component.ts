import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {ScopeOfAttentionService} from '../../../../business-controller/scope-of-attention.service';
import {AdmissionRouteService} from '../../../../business-controller/admission-route.service';

 
@Component({
  selector: 'ngx-form-scope-of-attention',
  templateUrl: './form-scope-of-attention.component.html',
  styleUrls: ['./form-scope-of-attention.component.scss']
})
export class FormScopeOfAttentionComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public admission_route:any[];



  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private AdmissionRouteS: AdmissionRouteService,
    private ScopeOfAttentionS: ScopeOfAttentionService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        admission_route_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      admission_route_id: [this.data.admission_route_id, Validators.compose([Validators.required])],
    });

    this.AdmissionRouteS.GetCollection().then(x => {
      this.admission_route=x;
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
        this.ScopeOfAttentionS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          admission_route_id: this.form.controls.admission_route_id.value,
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
        this.ScopeOfAttentionS.Save({
          name: this.form.controls.name.value,
          admission_route_id: this.form.controls.admission_route_id.value,
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

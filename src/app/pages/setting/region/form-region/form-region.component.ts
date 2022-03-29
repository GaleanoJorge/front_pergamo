import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {Status} from '../../../../models/status';
import {Country} from '../../../../models/country';
import {RegionService} from '../../../../business-controller/region.service';
import { CountryService } from '../../../../business-controller/country.service';

@Component({
  selector: 'ngx-form-region',
  templateUrl: './form-region.component.html',
  styleUrls: ['./form-region.component.scss']
})
export class FormRegionComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public code: number;
  public country_id: number;
  // public status: Status[];
  public country:Country[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private regionS: RegionService,
    private countryS: CountryService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        code: '',
        country_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      code: [this.data.code, Validators.compose([Validators.required])],
      country_id: [this.data.country_id, Validators.compose([Validators.required])],
    });
    this.countryS.GetCollection().then(x => {

      this.country=x;
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
        this.regionS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          country_id: this.form.controls.country_id.value,
          code: this.form.controls.code.value,
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
        
        this.regionS.Save({
          name: this.form.controls.name.value,
          country_id: this.form.controls.country_id.value,
          code: this.form.controls.code.value,
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

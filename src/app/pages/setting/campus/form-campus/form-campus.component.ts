import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {Status} from '../../../../models/status';
import {Region} from '../../../../models/region';
import {CampusService} from '../../../../business-controller/campus.service';
import {RegionService} from '../../../../business-controller/region.service';
import { CountryService } from '../../../../business-controller/country.service';

@Component({
  selector: 'ngx-form-campus',
  templateUrl: './form-campus.component.html',
  styleUrls: ['./form-campus.component.scss']
})
export class FormCampusComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public region:Region[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private campusS: CampusService,
    private regionS: RegionService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        address: '',
        enable_code: '',
        region_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      region_id: [this.data.region_id, Validators.compose([Validators.required])],
      address: [this.data.address, Validators.compose([Validators.required])],
      enable_code: [this.data.enable_code, Validators.compose([Validators.required])],
    });
    this.regionS.GetCollection().then(x => {

      this.region=x;
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
        this.campusS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          region_id: this.form.controls.region_id.value,
          enable_code: this.form.controls.enable_code.value,
          address: this.form.controls.address.value,
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
        
        this.campusS.Save({
          name: this.form.controls.name.value,
          region_id: this.form.controls.region_id.value,
          enable_code: this.form.controls.enable_code.value,
          address: this.form.controls.address.value,
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

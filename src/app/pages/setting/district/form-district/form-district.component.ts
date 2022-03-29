import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {Status} from '../../../../models/status';
import {SectionalCouncil} from '../../../../models/sectional-council';
import {DistrictService} from '../../../../business-controller/district.service';
import { SectionalCouncilService } from '../../../../business-controller/sectional-council.service';

@Component({
  selector: 'ngx-form-district',
  templateUrl: './form-district.component.html',
  styleUrls: ['./form-district.component.scss']
})
export class FormDistrictComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public status_id: number;
  public sectional_council_id: number;
  public status: Status[];
  public sectional:SectionalCouncil[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public status_label= 'Activo';
  public temp=1;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private statusBS: StatusBusinessService,
    private districtS: DistrictService,
    private sectionalCS: SectionalCouncilService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        status_id: 1,
        sectional_council_id: '',
      };
    }

    this.statusBS.GetCollection().then(x => {
      this.status = x;
    });
    

    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      status_id: [this.data.status_id],
      sectional_council_id: [this.data.sectional_council_id, Validators.compose([Validators.required])],
    });
    this.sectionalCS.GetByStatus(1).then(x => {

      this.sectional=x;
    });

  }
  

  close() {
    this.dialogRef.close();
  }

  ChangeLabel(){
    if (this.status_label=='Activo') {
      this.status_label='Inactivo';
      this.temp=2;
    } else {
      this.status_label='Activo';
      this.temp=1;
    }
    
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.districtS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          sectional_council_id: this.form.controls.sectional_council_id.value,
          status_id: this.temp,
          
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
        
        this.districtS.Save({
          name: this.form.controls.name.value,
          sectional_council_id: this.form.controls.sectional_council_id.value,
          status_id: this.temp,
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

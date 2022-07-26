import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {MedicalDiaryService} from '../../../../business-controller/medical-diary.service';
import {PavilionService} from '../../../../business-controller/pavilion.service';



  

@Component({
  selector: 'ngx-form-medical-diary',
  templateUrl: './form-medical-diary.component.html',
  styleUrls: ['./form-medical-diary.component.scss']
})
export class FormMedicalDiaryComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public coverage:any[];
  public status_bed:any[];
  public pavilion:any[];


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private PavilionS: PavilionService,
    private MedicalDiaryS: MedicalDiaryService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        code: '',
        status_bed_id:'',
        pavilion_id: '',
        bed_or_office:''
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      code: [this.data.code, Validators.compose([Validators.required])],
      status_bed_id: [this.data.status_bed_id, Validators.compose([Validators.required])],
      pavilion_id: [this.data.pavilion_id, Validators.compose([Validators.required])],
      bed_or_office: [this.data.bed_or_office, Validators.compose([Validators.required])],
    });


    this.PavilionS.GetCollection().then(x => {
      this.pavilion=x;
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
        this.MedicalDiaryS.Update({
          id: this.data.id,
          code: this.form.controls.code.value,
          name: this.form.controls.name.value,
          status_bed_id: this.form.controls.status_bed_id.value,
          bed_or_office: this.form.controls.bed_or_office.value,        
          pavilion_id: this.form.controls.pavilion_id.value,
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
        this.MedicalDiaryS.Save({
          code: this.form.controls.code.value,
          name: this.form.controls.name.value,
          status_bed_id: this.form.controls.status_bed_id.value,
          bed_or_office: this.form.controls.bed_or_office.value,
          pavilion_id: this.form.controls.pavilion_id.value,
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

import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {BedService} from '../../../../business-controller/bed.service';
import {StatusBedService} from '../../../../business-controller/status-bed.service';
import {PavilionService} from '../../../../business-controller/pavilion.service';
import { ProcedureService } from '../../../../business-controller/procedure.service';



  

@Component({
  selector: 'ngx-form-bed',
  templateUrl: './form-bed.component.html',
  styleUrls: ['./form-bed.component.scss']
})
export class FormBedComponent implements OnInit {

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
  public procedure_id;
  public procedure = null;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private PavilionS: PavilionService,
    private BedS: BedService,
    private ProcedureS: ProcedureService,
    private toastService: NbToastrService,
    private StatusBedS: StatusBedService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        code: '',
        status_bed_id:'',
        pavilion_id: '',
        bed_or_office:'',
        procedure_id: '',
      };
    } else {
      this.procedure_id = this.data.procedure_id;
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      code: [this.data.code, Validators.compose([Validators.required])],
      status_bed_id: [this.data.status_bed_id, Validators.compose([Validators.required])],
      pavilion_id: [this.data.pavilion_id, Validators.compose([Validators.required])],
      procedure_id: [this.data.procedure_id ],
      bed_or_office: [this.data.bed_or_office, Validators.compose([Validators.required])],
    });

    this.StatusBedS.GetCollection().then(x => {
      this.status_bed=x;
    });

    this.PavilionS.GetCollection().then(x => {
      this.pavilion=x;
    });

    this.ProcedureS.GetCollection().then(x => {
      this.procedure = x;
      if (this.data.id) {
        var localidentify = this.procedure.find(item => item.id == this.data.procedure_id);
        this.form.patchValue({
          procedure_id: localidentify.name,
        });
      }
    });
    this.onChanges();
  }

  onChanges(){

    this.form.get('bed_or_office').valueChanges.subscribe((val) => {
      if(val == 1 ){
        this.form.controls.procedure_id.setValidators(Validators.compose([Validators.required]));
      } else {
        this.form.controls.procedure_id.clearValidators();
        this.form.controls.procedure_id.setErrors(null);
      }
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
        this.BedS.Update({
          id: this.data.id,
          code: this.form.controls.code.value,
          name: this.form.controls.name.value,
          status_bed_id: this.form.controls.status_bed_id.value,
          bed_or_office: this.form.controls.bed_or_office.value,        
          pavilion_id: this.form.controls.pavilion_id.value,
          procedure_id: this.procedure_id,
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
        this.BedS.Save({
          code: this.form.controls.code.value,
          name: this.form.controls.name.value,
          status_bed_id: this.form.controls.status_bed_id.value,
          bed_or_office: this.form.controls.bed_or_office.value,
          pavilion_id: this.form.controls.pavilion_id.value,
          procedure_id: this.procedure_id,
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

  saveProcedure(e): void {
    var localidentify = this.procedure.find(item => item.name == e);

    if (localidentify) {
      this.procedure_id = localidentify.id;
      this.form.patchValue({
        procedure_id: localidentify.name,
      });
    } else {
      this.procedure_id = null;
      this.toastService.warning('', 'Debe seleccionar un procedimiento de la lista');
      this.form.controls.procedure_id.setErrors({ 'incorrect': true });
    }
  }

}

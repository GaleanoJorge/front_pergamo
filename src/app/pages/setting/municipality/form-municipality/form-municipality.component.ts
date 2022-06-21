import {Component, OnInit, Input} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CircuitService} from '../../../../business-controller/circuit.service';
import {Circuit} from '../../../../models/circuit';
import {Region} from '../../../../models/region';
import {MunicipalityService} from '../../../../business-controller/municipality.service';
import {RegionService} from '../../../../business-controller/region.service';

@Component({
  selector: 'ngx-form-municipality',
  templateUrl: './form-municipality.component.html',
  styleUrls: ['./form-municipality.component.scss'],
})
export class FormMunicipalityComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  public circuit: Circuit[];
  public region: Region[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private circuitS: CircuitService,
    private municipalityS: MunicipalityService,
    private regionS: RegionService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        circuit_id: '',
        region_id: '',
      };
    }

    const params: any = {};

    if (!this.data.id) params.status_id = 1;

    // this.circuitS.GetCollection(params).then(x => {
    //   this.circuit = x;
    // });
    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      circuit_id: [this.data.circuit_id, Validators.compose([Validators.required])],
      region_id: [this.data.region_id, Validators.compose([Validators.required])],
    });
    this.regionS.GetCollection().then(x => {

      this.region = x;
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
        this.municipalityS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          region_id: this.form.controls.region_id.value,
          circuit_id: this.form.controls.circuit_id.value,
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

        this.municipalityS.Save({
          name: this.form.controls.name.value,
          region_id: this.form.controls.region_id.value,
          circuit_id: this.form.controls.circuit_id.value,
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

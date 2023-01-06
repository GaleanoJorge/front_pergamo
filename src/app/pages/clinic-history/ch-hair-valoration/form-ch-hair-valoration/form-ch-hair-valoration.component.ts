import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEvoSoapService } from '../../../../business-controller/ch-evo-soap.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { InputMaterialsUsedTlService } from '../../../../business-controller/input-materials-used-tl.service';
import { OstomiesTlService } from '../../../../business-controller/ostomies-tl.service';
import { OstomyService } from '../../../../business-controller/ostomy.service';
import { ChOstomiesService } from '../../../../business-controller/ch-ostomies.service';
import { PatientPositionService } from '../../../../business-controller/patient-position.service';
import { ChPositionService } from '../../../../business-controller/ch_position.service';
import { ChHairValorationService } from '../../../../business-controller/ch-hair-valoration.service';

@Component({
  selector: 'ngx-form-ch-hair-valoration',
  templateUrl: './form-ch-hair-valoration.component.html',
  styleUrls: ['./form-ch-hair-valoration.component.scss'],
})
export class FormChHairValorationComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;

  public loadAuxData = true;

  constructor(

    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private patientPositionS: PatientPositionService,
    private chRecord: ChRecordService,
    private ChPositionS: ChPositionService,
    private ChHairValS: ChHairValorationService,

    private route: ActivatedRoute

  ) { }

  async ngOnInit(): Promise<void> {

    this.record_id = this.route.snapshot.params.id;

    if (!this.data || this.data.length == 0) {
      this.data = {
        hair_revision: '',
        observation: '',
      };
    }

    this.form = this.formBuilder.group({
      hair_revision: [
        this.data[0] ? this.data[0].hair_revision : this.data.hair_revision,
        Validators.compose([Validators.required])
      ],
      observation: [
        this.data[0] ? this.data[0].observation : this.data.observation,
      ],

    });

    this.loadForm(false).then();

    await Promise.all([
      this.GetAuxData(),
    ]);
    this.loadAuxData = false;
    this.loadForm();

    this.onChange();

  }

  async GetAuxData() {

    if (this.type_record == 1) {
      await this.ChHairValS.ByRecord(this.record_id, this.type_record).then(x => {
        x;
        if (x.length > 0) {
          this.data = x
          this.disabled = true;
          this.form.controls.hair_revision.disable();
          this.form.controls.observation.disable();
        }
      });
    }
    // this.onChange();
    this.loading = false;

    return Promise.resolve(true);
  }

  async loadForm(force = true) {
    if (this.loadAuxData && force) return false;

    this.form = this.formBuilder.group({
      hair_revision: [
        this.data[0] ? this.data[0].hair_revision : this.data.hair_revision,
        Validators.compose([Validators.required])
      ],
      observation: [
        this.data[0] ? this.data[0].observation : this.data.observation,
      ],

    });

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        await this.ChHairValS.Update({
          id: this.data.id,
          hair_revision: this.form.controls.hair_revision.value,
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.ChHairValS.Save({
          hair_revision: this.form.controls.hair_revision.value,
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          if (this.type_record == 1) {
            this.isSubmitted = true;
            this.disabled = true;
            this.form.controls.hair_revision.disable();
            this.form.controls.observation.disable();
          } else {
            this.form.patchValue({
              hair_revision: '',
              observation: '',
            });
          }

        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
        this.messageEvent.emit(true);
      }

    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

  onChange() {

    this.form.get('hair_revision').valueChanges.subscribe(val => {
      if (val != "CON ALTERACIÓN") {

        this.form.controls.observation.clearValidators();
        this.form.controls.observation.setErrors(null);

      } else {
        this.form.controls.observation.setValidators(Validators.compose([Validators.required]));
        this.form.patchValue({ observation: '' });

      };
    });
  }

}
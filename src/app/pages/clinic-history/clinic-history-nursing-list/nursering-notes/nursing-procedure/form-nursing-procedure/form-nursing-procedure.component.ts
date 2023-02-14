import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DiagnosisService } from '../../../../../../business-controller/diagnosis.service';
import { NursingProcedureService } from '../../../../../../business-controller/nursing-procedure.service';
import { ChNursingProcedureService } from '../../../../../../business-controller/ch-nursing-procedure.service';
import { ChFailedService } from '../../../../../../business-controller/ch-failed.service';
import { ChReasonService } from '../../../../../../business-controller/ch-reason.service';
@Component({
  selector: 'ngx-form-nursing-procedure',
  templateUrl: './form-nursing-procedure.component.html',
  styleUrls: ['./form-nursing-procedure.component.scss'],
})
export class FormNursingProcedureComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = true;
  public disabled: boolean = false;
  public showTable;
  public admissions_id;
  public ch_reason_id: any[];
  public diagnosis: any[] = [];
  public nursing_procedure: any[] = [];
  public procedure_id: any;
  public previewFile = null;
  public iconConfig: NbIconConfig = { icon: 'alert-circle-outline', pack: 'eva' };


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChFailedS: ChFailedService,
    private ChReasonS: ChReasonService,
    private route: ActivatedRoute,
    private DiagnosisS: DiagnosisService,
    private nursingProcedureS: NursingProcedureService,
    private chNursingProcedureS: ChNursingProcedureService
  ) { }

  async ngOnInit(): Promise<void> {

    if (!this.data) {
      this.data = {
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        description: '',
      };
    }

    this.nursingProcedureS.GetCollection().then(x => {
      this.nursing_procedure = x;
      this.loading = false;
    });

    this.form = this.formBuilder.group({
      check1: [
        this.data.check1,
        // Validators.compose([Validators.required]),
      ],
      check2: [
        this.data.check2,
        // Validators.compose([Validators.required]),
      ],
      check3: [
        this.data.check3,
        // Validators.compose([Validators.required]),
      ],
      check4: [
        this.data.check4,
        // Validators.compose([Validators.required]),
      ],
      check5: [
        this.data.check5,
        // Validators.compose([Validators.required]),
      ],
      description: [
        this.data.observation,
        Validators.compose([Validators.required]),
      ],
    });


    // this.ChReasonS.GetCollection().then((x) => {
    //   this.ch_reason_id = x;
    // });
    // await this.DiagnosisS.GetCollection().then(x => {
    //   this.diagnosis = x;
    // });



  }

  saveCode(event, identificator): void {
    if (event.target.checked) {
      switch (identificator) {
        case 1: {
          this.form.patchValue({
            check2: false,
            check3: false,
            check4: false,
            check5: false,
            description: '',
          });
          break;
        }
        case 2: {
          this.form.patchValue({
            check1: false,
            check3: false,
            check4: false,
            check5: false,
            description: '',
          });
          break;
        }
        case 3: {
          this.form.patchValue({
            check1: false,
            check2: false,
            check4: false,
            check5: false,
            description: '',
          });
          break;
        }
        case 4: {
          this.form.patchValue({
            check1: false,
            check2: false,
            check3: false,
            check5: false,
            description: '',
          });
          break;

        }
        case 5: {
          this.form.patchValue({
            check1: false,
            check2: false,
            check3: false,
            check4: false,
            description: '',
          });
          break;
        }
        default: {
          this.form.patchValue({
            check1: false,
            check2: false,
            check3: false,
            check4: false,
            check5: false,
            description: '',
          });
          break;
        }
      }
      var localidentify = this.nursing_procedure.find(item => item.id == identificator);
    } else {
      this.form.patchValue({
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        description: '',
      });
    }

    if (localidentify) {
      this.procedure_id = localidentify.id;
      this.form.patchValue({
        description: localidentify.description,
      })
      this.form.controls.description.setErrors({'incorrect': true})
    } else {
      this.procedure_id = null;
      this.toastService.warning('', 'Debe seleccionar un procedimiento de la lista',this.iconConfig);
      this.form.patchValue({
        description: '',
      })
      this.form.setErrors({ 'incorrect': true });
    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      // this.loading = true;
      // this.showTable = false;

      if (this.data.id) {
        await this.chNursingProcedureS.Update({
          id: this.data.id,
          // diagnosis_id: this.diagnosis_id,
          nursing_procedure_id: this.procedure_id,
          observation: this.form.controls.description.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then((x) => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.chNursingProcedureS.Save({
          // diagnosis_id: this.diagnosis_id,
          nursing_procedure_id: this.procedure_id,
          observation: this.form.controls.description.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({
              check1: false,
              check2: false,
              check3: false,
              check4: false,
              check5: false,
              description: '',
            });
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      }
    }
  }

}

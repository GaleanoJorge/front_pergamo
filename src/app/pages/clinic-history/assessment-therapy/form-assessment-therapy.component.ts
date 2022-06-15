import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChAssSignsService } from '../../../business-controller/ch_ass_signs.service';
import { ChAssessmentTherapyService } from '../../../business-controller/ch_assessment_therapy.service';
import { ChAssSwingService } from '../../../business-controller/ch_ass_swing.service';
import { ChAssFrequencyService } from '../../../business-controller/ch_ass_frequency.service';
import { ChAssModeService } from '../../../business-controller/ch_ass_mode.service';
import { ChAssCoughService } from '../../../business-controller/ch_ass_cough.service';
import { ChAssChestTypeService } from '../../../business-controller/ch_ass_chest_type.service';
import { ChAssChestSymmetryService } from '../../../business-controller/ch_ass_chest_symmetry.service';
import { ChAssPatternService } from '../../../business-controller/ch_ass_pattern.service';



@Component({
  selector: 'ngx-form-assessment-therapy',
  templateUrl: './form-assessment-therapy.component.html',
  styleUrls: ['./form-assessment-therapy.component.scss']
})
export class FormAssessmentTherapyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public ch_ass_pattern: any[];
  public ch_ass_swing: any[];
  public ch_ass_frequency: any[];
  public ch_ass_mode: any[];
  public ch_ass_cough: any[];
  public ch_ass_chest_type: any[];
  public ch_ass_symmetry: any[];


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private AssS: ChAssessmentTherapyService,
    private PatternS: ChAssPatternService,
    private SwingS: ChAssSwingService,
    private FrequencyS: ChAssFrequencyService,
    private ModeS: ChAssModeService,
    private CoughS: ChAssCoughService,
    private TypeS: ChAssChestTypeService,
    private SymetryS: ChAssChestSymmetryService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        ch_ass_pattern_id: '',
        ch_ass_swing_id: '',
        ch_ass_frequency_id: '',
        ch_ass_mode_id: '',
        ch_ass_cough_id: '',
        ch_ass_chest_type_id: '',
        ch_ass_symmetry_id: '',
      };
    }
    this.form = this.formBuilder.group({
      ch_ass_pattern_id: [this.data[0] ? this.data[0].ch_ass_pattern_id : this.data.ch_ass_pattern_id,],
      ch_ass_swing_id: [this.data[0] ? this.data[0].ch_ass_swing_id : this.data.ch_ass_swing_id,],
      ch_ass_frequency_id: [this.data[0] ? this.data[0].ch_ass_frequency_id : this.data.ch_ass_frequency_id,],
      ch_ass_mode_id: [this.data[0] ? this.data[0].ch_ass_mode_id : this.data.ch_ass_mode_id,],
      ch_ass_cough_id: [this.data[0] ? this.data[0].ch_ass_cough_id : this.data.ch_ass_cough_id,],
      ch_ass_chest_type_id: [this.data[0] ? this.data[0].ch_ass_chest_type_id : this.data.ch_ass_chest_type_id,],
      ch_ass_symmetry_id: [this.data[0] ? this.data[0].ch_ass_symmetry_id : this.data.ch_ass_symmetry_id,],
    });


    this.PatternS.GetCollection().then(x => {
      this.ch_ass_pattern = x;
    });

    this.SwingS.GetCollection().then(x => {
      this.ch_ass_swing = x;
    });

    this.FrequencyS.GetCollection().then(x => {
      this.ch_ass_frequency = x;
    });

    this.ModeS.GetCollection().then(x => {
      this.ch_ass_mode = x;
    });

    this.CoughS.GetCollection().then(x => {
      this.ch_ass_cough = x;
    });

    this.TypeS.GetCollection().then(x => {
      this.ch_ass_chest_type = x;
    });

    this.SymetryS.GetCollection().then(x => {
      this.ch_ass_symmetry = x;
    });

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.AssS.Update({
          id: this.data.id,
          ch_ass_pattern_id: this.form.controls.ch_ass_pattern_id.value,
          ch_ass_swing_id: this.form.controls.ch_ass_swing_id.value,
          ch_ass_frequency_id: this.form.controls.ch_ass_frequency_id.value,
          ch_ass_mode_id: this.form.controls.ch_ass_mode_id.value,
          ch_ass_cough_id: this.form.controls.ch_ass_cough_id.value,
          ch_ass_chest_type_id: this.form.controls.ch_ass_chest_type_id.value,
          ch_ass_symmetry_id: this.form.controls.ch_ass_symmetry_id.value,
          type_record_id: 1,
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
        await this.AssS.Save({
          ch_ass_pattern_id: this.form.controls.ch_ass_pattern_id.value,
          ch_ass_swing_id: this.form.controls.ch_ass_swing_id.value,
          ch_ass_frequency_id: this.form.controls.ch_ass_frequency_id.value,
          ch_ass_mode_id: this.form.controls.ch_ass_mode_id.value,
          ch_ass_cough_id: this.form.controls.ch_ass_cough_id.value,
          ch_ass_chest_type_id: this.form.controls.ch_ass_chest_type_id.value,
          ch_ass_symmetry_id: this.form.controls.ch_ass_symmetry_id.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ ch_ass_pattern_id: '', ch_ass_swing_id: '', ch_ass_frequency_id:'', ch_ass_mode_id:'', ch_ass_cough_id:'', ch_ass_chest_type_id:'',
           ch_ass_symmetry_id:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          if (this.form.controls.has_caregiver.value == true) {
            this.isSubmitted = true;
            this.loading = true;
          } else {
            this.isSubmitted = false;
            this.loading = false;
          }

        });
      }

    }
  }

}

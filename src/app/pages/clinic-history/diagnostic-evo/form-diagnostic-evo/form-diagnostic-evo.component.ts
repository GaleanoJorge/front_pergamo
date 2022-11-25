import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChDiagnosisTypeService } from '../../../../business-controller/ch-diagnosis-type.service';
import { ChDiagnosisClassService } from '../../../../business-controller/ch-diagnosis-class.service';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { ChDiagnosisService } from '../../../../business-controller/ch-diagnosis.service';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'ngx-form-diagnostic-evo',
  templateUrl: './form-diagnostic-evo.component.html',
  styleUrls: ['./form-diagnostic-evo.component.scss'],
})
export class FormDiagnosticEvoComponent implements OnInit {
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
  public diagnosis_id;
  public diagnosis: any[]= [];
  public diagnosis_type: any[];
  public diagnosis_class: any[];
  public filteredProductOptions$: Observable<string[]>;



  constructor(
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private chDiagnosisS: ChDiagnosisService,
    private DiagnosisS: DiagnosisService,
    private diagnosisTypeS: ChDiagnosisTypeService,
    private diagnosisClassS: ChDiagnosisClassService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {
        ch_diagnosis_type_id: '',
        ch_diagnosis_class_id: '',
        diagnosis_id: '',
        diagnosis_observation: '',
      };
    };

    // this.diagnosisS.GetCollection().then(x => {
    //   this.diagnosis = x;
    // });
    this.diagnosisTypeS.GetCollection().then(x => {
      this.diagnosis_type = x;
    });
    this.diagnosisClassS.GetCollection().then(x => {
      this.diagnosis_class = x;
    });

    this.DiagnosisS.GetCollection({all:1}).then(x => {
      this.diagnosis = x;
      this.filteredProductOptions$ = of(this.diagnosis);
      this.onFilter();
    });

    this.form = this.formBuilder.group({
      diagnosis_id: [this.data.diagnosis_id, Validators.compose([Validators.required])],
      ch_diagnosis_type_id: [this.data.ch_diagnosis_type_id, Validators.compose([Validators.required])],
      ch_diagnosis_class_id: [this.data.ch_diagnosis_class_id, Validators.compose([Validators.required])],
      diagnosis_observation: [this.data.diagnosis_observation,],
    });
  }

  public diagnosticConut = 0;

  searchDiagnostic($event) {
    this.diagnosticConut++;
    if (this.diagnosticConut == 3) {
      this.diagnosticConut = 0;
      if ($event.length >= 3) {
        this.DiagnosisS.GetCollection({
          search: $event,
        }).then(x => {
          this.diagnosis = x;
        });
      } else {
        this.DiagnosisS.GetCollection({
          search: '',
        }).then(x => {
          this.diagnosis = x;
        });
      }
    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.chDiagnosisS.Update({
          diagnosis_id: this.diagnosis_id,
          id: this.data.id,
          ch_diagnosis_type_id: this.form.controls.ch_diagnosis_type_id.value,
          ch_diagnosis_class_id: this.form.controls.ch_diagnosis_class_id.value,
          diagnosis_observation: this.form.controls.diagnosis_observation.value,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ diagnosis: '', ch_diagnosis_type: '', ch_diagnosis_class:'',diagnosis_observation:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.chDiagnosisS.Save({
          diagnosis_id: this.diagnosis_id,
          ch_diagnosis_type_id: this.form.controls.ch_diagnosis_type_id.value,
          ch_diagnosis_class_id: this.form.controls.ch_diagnosis_class_id.value,
          diagnosis_observation: this.form.controls.diagnosis_observation.value,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ diagnosis_id: '', ch_diagnosis_type_id: '', ch_diagnosis_class_id: '', diagnosis_observation: '' });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
        });
      }
    } else{
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
    
  }

  onFilter() {
    this.filteredProductOptions$ = this.form
      .get('diagnosis_id')
      .valueChanges.pipe(
        startWith(''),
        map((filterString) => this.filter(filterString))
      );
    }

    private filter(value: string): string[] {
      const filterValue = value?.toUpperCase();
      return this.diagnosis.filter((optionValue) =>
        optionValue.description.includes(filterValue)
      );
      }


  saveCode(e): void {
    var localidentify = this.diagnosis.find(item => item.name == e);

    if (localidentify) {
      this.diagnosis_id = localidentify.id;
    } else {
      this.diagnosis_id = null;
      this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
      this.form.controls.diagnosis_id.setErrors({ 'incorrect': true });
    }
  }
}
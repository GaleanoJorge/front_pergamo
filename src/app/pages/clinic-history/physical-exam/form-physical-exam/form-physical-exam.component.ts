import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChTypePhysicalExamService } from '../../../../business-controller/ch_type_physical_exam.service';
import { ChPhysicalExamService } from '../../../../business-controller/ch_physical_exam.service';
import { PhysicalExamComponent } from '../physical-exam.component';

@Component({
  selector: 'ngx-form-physical-exam',
  templateUrl: './form-physical-exam.component.html',
  styleUrls: ['./form-physical-exam.component.scss'],
})
export class FormPhysicalExamComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() type_record_id: any;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = true;
  public disabled: boolean = false;
  public showTable;

  public type_ch_physical_exam: any[];
  public ch_physical_exams: any[];
  public ArrayforSaving = [];
  public loadAuxData = true;


  constructor(
    private formBuilder: FormBuilder,
    private ChTypePhysicalExamS: ChTypePhysicalExamService,
    private PhysicalExamS: ChPhysicalExamService,
    private toastService: NbToastrService,
   
  ) { }

  //comentariado el funcionamiento de arrayform
  // form = this.formBuilder.group({
  //   physical_exam: this.formBuilder.array([])
  // });

  // get physicals_exams() {
  //   return this.form.controls['physical_exam'] as FormArray;
  // }

  // addForms() {
  //   const examsForms = this.formBuilder.group({
  //     revision: [
  //       '',
  //       Validators.compose([Validators.required])
  //     ],
  //     description: [
  //       '',
  //       Validators.compose([Validators.required])
  //     ]
  //   });
  //   this.physicals_exams.push(examsForms);
  // }

  async ngOnInit() {
    // if (!this.data) {
    //   this.data = {
    //     revision: '',
    //     type_ch_physical_exam_id: '',
    //   };
    // }
    if (!this.data) {
      this.data = {
        revision1: '',
        description1: '',
        revision2: '',
        description2: '',
        revision3: '',
        description3: '',
        revision4: '',
        description4: '',
        revision5: '',
        description5: '',
        revision6: '',
        description6: '',
        revision7: '',
        description7: '',

      };
    }

    this.loadForm(false).then();
    await Promise.all([
      this.GetAuxData(),
    ]);
    this.loadAuxData = false;
    this.loadForm();
    // this.form = this.formBuilder.group({
    //   nursing_physical_exam: this.formBuilder.array([]),

    // });

  }

  // disabledFormularies(Data){
  //   console.log('adentro');
  //   this.form.patchValue({
  //     revision1: '',
  //     description1: '',
  //     revision2: '',
  //     description2: '',
  //     revision3: '',
  //     description3: '',
  //     revision4: '',    
  //     description4: '',
  //     revision5: '',
  //     description5: '',
  //     revision6: '',
  //     description6: '',
  //     revision7: '',
  //     description7: '',
  //   });
  // }

  async GetAuxData() {
    await this.ChTypePhysicalExamS.GetCollection().then((x) => {
      this.type_ch_physical_exam = x;
      this.loading = false;
      // this.type_ch_physical_exam.forEach(element => {
      //   this.addForms();

      // });
    });

    await this.PhysicalExamS.ByRecord(this.record_id, this.type_record_id).then(x => { 
      x;
      if(x.length > 0){
        this.data = x
        this.disabled = true
      }
    });

    return Promise.resolve(true);
  }

  async loadForm(force = true){
    if (this.loadAuxData && force) return false;

    this.form = this.formBuilder.group({
      revision1: [
        this.data[0] ? this.data[0].revision : this.data.revision1,
        Validators.compose([Validators.required])],
      description1: [
        this.data[0] ? this.data[0].description : this.data.description1,
        Validators.compose([Validators.required])],
      revision2: [
        this.data[1] ? this.data[1].revision : this.data.revision2,
        Validators.compose([Validators.required])],
      description2: [
        this.data[1] ? this.data[1].description : this.data.description2,
        Validators.compose([Validators.required])],
      revision3: [
        this.data[2] ? this.data[2].revision : this.data.revision3,
        Validators.compose([Validators.required])],
      description3: [
        this.data[2] ? this.data[2].description : this.data.description3,
        Validators.compose([Validators.required])],
      revision4: [
        this.data[3] ? this.data[3].revision : this.data.revision4,
        Validators.compose([Validators.required])],
      description4: [
        this.data[3] ? this.data[3].description : this.data.description4,
        Validators.compose([Validators.required])],
      revision5: [
        this.data[4] ? this.data[4].revision : this.data.revision5,
        Validators.compose([Validators.required])],
      description5: [
        this.data[4] ? this.data[4].description : this.data.description5,
        Validators.compose([Validators.required])],
      revision6: [
        this.data[5] ? this.data[5].revision : this.data.revision6,
        Validators.compose([Validators.required])],
      description6: [
        this.data[5] ? this.data[5].description : this.data.description6,
        Validators.compose([Validators.required])],
      revision7: [
        this.data[6] ? this.data[6].revision : this.data.revision7,
        Validators.compose([Validators.required])],
      description7: [
        this.data[6] ? this.data[6].description : this.data.description7,
        Validators.compose([Validators.required])],
    });

    this.onChanges();

  }

  async save() {
    var contador = 0
    var err = 0;
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.makeArray();
      this.loading = true;
      // this.showTable = false;
      if (this.data.id) {
        await this.PhysicalExamS.Update({
          id: this.data.id,
          revision: this.form.controls.revision.value,
          type_ch_physical_exam_id: this.form.controls.type_ch_physical_exam_id.value,
          description: this.form.controls.description.value,
          type_record_id: 1,
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
        this.ArrayforSaving.forEach(async element => {
          await this.PhysicalExamS.Save({
            type_ch_physical_exam_id: element.id,
            revision: element.revision,
            description: element.description,
            type_record_id: 1,
            ch_record_id: this.record_id,
          }).then((x) => {
            contador++;
            this.toastService.success('', x.message);
          }).catch((x) => {
            err++;
          });
        });
        this.disabled = true;
        this.loading = false;
        this.messageEvent.emit(true);
      }
    }
  }

  makeArray() {
    this.ArrayforSaving = [];
    this.ArrayforSaving = [
      {
        id: 1,
        revision: this.form.controls.revision1.value,
        description: this.form.controls.description1.value,
      },
      {
        id: 2,
        revision: this.form.controls.revision2.value,
        description: this.form.controls.description2.value,
      },
      {
        id: 3,
        revision: this.form.controls.revision3.value,
        description: this.form.controls.description3.value,
      },
      {
        id: 4,
        revision: this.form.controls.revision4.value,
        description: this.form.controls.description4.value,
      },
      {
        id: 5,
        revision: this.form.controls.revision5.value,
        description: this.form.controls.description5.value,
      },
      {
        id: 6,
        revision: this.form.controls.revision6.value,
        description: this.form.controls.description6.value,
      },
      {
        id: 7,
        revision: this.form.controls.revision7.value,
        description: this.form.controls.description7.value,
      },
    ]
  }

  onDescriptionChange(event) {

    var localIdentify = this.type_ch_physical_exam.find(item => item.id == event);
    if (localIdentify) {
      this.form.patchValue({
        description: localIdentify.description
      })
    } else {
      this.toastService.warning('', 'invalido');
      this.form.controls.type_ch_physical_exam_id.setErrors({ 'incorrect': true });
    }

  }


  /* onChanges1() {
    this.form.get('revision').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.revision = [];
      }
      if (val == "0") {
        this.showrevision = true;
      } else {
        this.showrevision = false;
      }
    });
  }*/

  onChanges() {

    this.form.get('revision1').valueChanges.subscribe(val => {
      if (val == 'NORMAL') {
        this.form.patchValue({
          description1: this.type_ch_physical_exam[0].observation
        });
      } else {
        this.form.patchValue({
          description1: ''
        });
        this.form.controls.description1.setErrors({ 'incorrect': true });
      }
    });

    this.form.get('revision2').valueChanges.subscribe(val => {
      if (val == 'NORMAL') {
        this.form.patchValue({
          description2: this.type_ch_physical_exam[1].observation
        });
      } else {
        this.form.patchValue({
          description2: ''
        });
        this.form.controls.description2.setErrors({ 'incorrect': true });
      }
    });

    this.form.get('revision3').valueChanges.subscribe(val => {
      if (val == 'NORMAL') {
        this.form.patchValue({
          description3: this.type_ch_physical_exam[2].observation
        });
      } else {
        this.form.patchValue({
          description3: ''
        });
        this.form.controls.description3.setErrors({ 'incorrect': true });
      }
    });

    this.form.get('revision4').valueChanges.subscribe(val => {
      if (val == 'NORMAL') {
        this.form.patchValue({
          description4: this.type_ch_physical_exam[3].observation
        });
      } else {
        this.form.patchValue({
          description4: ''
        });
        this.form.controls.description4.setErrors({ 'incorrect': true });
      }
    });

    this.form.get('revision5').valueChanges.subscribe(val => {
      if (val == 'NORMAL') {
        this.form.patchValue({
          description5: this.type_ch_physical_exam[4].observation
        });
      } else {
        this.form.patchValue({
          description5: ''
        });
        this.form.controls.description5.setErrors({ 'incorrect': true });
      }
    });

    this.form.get('revision6').valueChanges.subscribe(val => {
      if (val == 'NORMAL') {
        this.form.patchValue({
          description6: this.type_ch_physical_exam[5].observation
        });
      } else {
        this.form.patchValue({
          description6: ''
        });
        this.form.controls.description6.setErrors({ 'incorrect': true });
      }
    });

    this.form.get('revision7').valueChanges.subscribe(val => {
      if (val == 'NORMAL') {
        this.form.patchValue({
          description7: this.type_ch_physical_exam[6].observation
        });
      } else {
        this.form.patchValue({
          description7: ''
        });
        this.form.controls.description7.setErrors({ 'incorrect': true });
      }
    });
  }
}

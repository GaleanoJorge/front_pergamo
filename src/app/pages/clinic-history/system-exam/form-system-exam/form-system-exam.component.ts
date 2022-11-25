import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChTypeSystemExamService } from '../../../../business-controller/ch_type_system_exam.service';
import { ChSystemExamService } from '../../../../business-controller/ch_system_exam.service';
import { SystemExamComponent } from '../system-exam.component';




@Component({
  selector: 'ngx-form-system-exam',
  templateUrl: './form-system-exam.component.html',
  styleUrls: ['./form-system-exam.component.scss']
})

export class FormSystemExamComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() block: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: any;
  @Output() messageEvent = new EventEmitter<any>();


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public ArrayforSaving = [];
  public type_ch_system_exam: any[];
  public loadAuxData = true;


  constructor(
    private formBuilder: FormBuilder,
    private typeChSystem: ChTypeSystemExamService,
    private SystemExamS: ChSystemExamService,
    private toastService: NbToastrService,
    private system: SystemExamComponent,
  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
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
        revision8: '',
        description8: '',
      };
    }

    this.typeChSystem.GetCollection({ status_id: 1 }).then(x => {
      this.type_ch_system_exam = x;
    });

    this.loadForm(false).then();
    await Promise.all([
      this.GetAuxData(),
    ]);
    this.loadAuxData = false;
    this.loadForm();

    
    await this.SystemExamS.GetCollection({
      ch_record_id: this.record_id,
      type_record_id: this.record_id
    }).then((x) => {
      this.loading = false;
      if (x.length > 0) {
        this.data = x
        this.disabled = true;
        this.messageEvent.emit(true);
      }
    });
  }

  async GetAuxData() {
      await this.SystemExamS.GetCollection({
        ch_record_id: this.record_id,
      type_record_id: this.record_id
      }).then((x) => {
        this.type_ch_system_exam = x;
        this.loading = false;
        // this.type_ch_physical_exam.forEach(element => {
        //   this.addForms();
  
        // });
        if (x.length > 0) {
          this.data = x
          this.disabled = true;
          this.messageEvent.emit(true);
        }
      });


    await this.SystemExamS.ByRecord(this.record_id, this.type_record_id).then(x => {
      x;
      if (x.length > 0) {
        this.data = x
        this.disabled = true;
        this.messageEvent.emit(true);
      }
    });

    return Promise.resolve(true);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.block){
      this.disabled = true;
    }
  }



  async loadForm(force = true) {
    if (this.loadAuxData && force) return false;

    this.form = this.formBuilder.group({
      revision1: [
        this.data[0] ? this.data[0].revision : this.data.revision1,
        Validators.compose([Validators.required])],
      description1: [
        this.data[0] ? this.data[0].description : this.data.description1,],
      revision2: [
        this.data[1] ? this.data[1].revision : this.data.revision2,
        Validators.compose([Validators.required])],
      description2: [
        this.data[1] ? this.data[1].description : this.data.description2,],
      revision3: [
        this.data[2] ? this.data[2].revision : this.data.revision3,
        Validators.compose([Validators.required])],
      description3: [
        this.data[2] ? this.data[2].description : this.data.description3,],
      revision4: [
        this.data[3] ? this.data[3].revision : this.data.revision4,
        Validators.compose([Validators.required])],
      description4: [
        this.data[3] ? this.data[3].description : this.data.description4,],
      revision5: [
        this.data[4] ? this.data[4].revision : this.data.revision5,
        Validators.compose([Validators.required])],
      description5: [
        this.data[4] ? this.data[4].description : this.data.description5,],
      revision6: [
        this.data[5] ? this.data[5].revision : this.data.revision6,
        Validators.compose([Validators.required])],
      description6: [
        this.data[5] ? this.data[5].description : this.data.description6,],
      revision7: [
        this.data[6] ? this.data[6].revision : this.data.revision7,
        Validators.compose([Validators.required])],
      description7: [
        this.data[6] ? this.data[6].description : this.data.description7,],
      revision8: [
        this.data[7] ? this.data[7].revision : this.data.revision8,
        Validators.compose([Validators.required])],
      description8: [
        this.data[7] ? this.data[7].description : this.data.description8,],
     
    });

  }



  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      this.makeArray();
      if (this.data.id) {
        await this.SystemExamS.Update({
          id: this.data.id,
          revision: this.form.controls.revision.value,
          observation: this.form.controls.observation.value,
          type_ch_system_exam_id: this.form.controls.type_ch_system_exam_id.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,

        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.SystemExamS.Save({
          type_ch_system_exam_id: JSON.stringify(this.ArrayforSaving),
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.disabled = true;
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }
      }else{
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
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
        {
          id: 8,
          revision: this.form.controls.revision8.value,
          description: this.form.controls.description8.value,
        },
      ]
    }
  
  }
  



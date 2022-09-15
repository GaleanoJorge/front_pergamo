import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChTypeBackgroundService } from '../../../../../business-controller/ch_type_background.service';
import { ChBackgroundService } from '../../../../../business-controller/ch_background.service';


@Component({
  selector: 'ngx-form-background',
  templateUrl: './form-background.component.html',
  styleUrls: ['./form-background.component.scss']
})

export class FormBackgroundComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: any;
  @Output() messageEvent = new EventEmitter<any>();



  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public ch_type_background: any[];
  public ArrayforSaving = [];
  public loadAuxData = true;
  public form: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private ChTypeBackgroundS: ChTypeBackgroundService,
    private BackgroundS: ChBackgroundService,
    private toastService: NbToastrService,

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
        revision9: '',
        description9: '',
        revision10: '',
        description10: '',
      };
    }

    this.ChTypeBackgroundS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_type_background = x;
    });


    this.loadForm(false).then();
    await Promise.all([
      this.GetAuxData(),
    ]);
    this.loadAuxData = false;
    this.loadForm();

  }

  async GetAuxData() {
    await this.BackgroundS.GetCollection().then((x) => {
      this.ch_type_background = x;
      this.loading = false;
      // this.type_ch_physical_exam.forEach(element => {
      //   this.addForms();

      // });
    });

    await this.BackgroundS.ByRecord(this.record_id, this.type_record_id).then(x => {
      x;
      if (x.length > 0) {
        this.data = x
        this.disabled = true
      }
    });

    return Promise.resolve(true);
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
      revision9: [
        this.data[8] ? this.data[8].revision : this.data.revision9,
        Validators.compose([Validators.required])],
      description9: [
        this.data[8] ? this.data[8].description : this.data.description9,],
      revision10: [
        this.data[9] ? this.data[9].revision : this.data.revision10,
        Validators.compose([Validators.required])],
      description10: [
        this.data[9] ? this.data[9].description : this.data.description10,],
    });

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      this.makeArray();
      if (this.data.id) {
        await this.BackgroundS.Update({
          id: this.data.id,
          revision: this.form.controls.revision.value,
          observation: this.form.controls.observation.value,
          ch_type_background_id: this.form.controls.ch_type_background_id.value,
          type_record_id: this.type_record_id,
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
        this.BackgroundS.Save({
          ch_type_background_id: JSON.stringify(this.ArrayforSaving),
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
      {
        id: 9,
        revision: this.form.controls.revision9.value,
        description: this.form.controls.description9.value,
      },
      {
        id: 10,
        revision: this.form.controls.revision10.value,
        description: this.form.controls.description10.value,
      },
    ]
  }



}





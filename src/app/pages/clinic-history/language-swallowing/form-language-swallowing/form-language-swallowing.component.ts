import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { SwallowingDisordersTlService } from '../../../../business-controller/swallowing-disorders-tl.service';

@Component({
  selector: 'ngx-form-language-swallowing',
  templateUrl: './form-language-swallowing.component.html',
  styleUrls: ['./form-language-swallowing.component.scss'],
})
export class FormLanguageSwallowingComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public admissions_id;


  constructor(

    private formBuilder: FormBuilder,
    private SwallowingDisordersTlS: SwallowingDisordersTlService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
   
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });
    if (!this.data || this.data.length == 0) {
      this.data = {
        solid_dysphagia: '', 
        clear_liquid_dysphagia: '', 
        thick_liquid_dysphagia: '', 
        nasogastric_tube: '', 
        gastrostomy: '', 
        nothing_orally: '', 
        observations: '', 

      };
    }

    if (this.has_input) {
      this.SwallowingDisordersTlS.GetCollection({ has_input: true, record_id: this.record_id }).then(x => {
        this.data = x;
        this.form = this.formBuilder.group({
          solid_dysphagia: [this.data[0] ? this.data[0].solid_dysphagia : this.data.solid_dysphagia,Validators.compose([Validators.required]),],
          clear_liquid_dysphagia: [this.data[0] ? this.data[0].clear_liquid_dysphagia : this.data.clear_liquid_dysphagia,Validators.compose([Validators.required]),],
          thick_liquid_dysphagia: [this.data[0] ? this.data[0].thick_liquid_dysphagia : this.data.thick_liquid_dysphagia,Validators.compose([Validators.required]),],
          nasogastric_tube: [this.data[0] ? this.data[0].nasogastric_tube : this.data.nasogastric_tube,Validators.compose([Validators.required]),],
          gastrostomy: [this.data[0] ? this.data[0].gastrostomy : this.data.gastrostomy,Validators.compose([Validators.required]),],
          nothing_orally: [this.data[0] ? this.data[0].nothing_orally : this.data.nothing_orally,Validators.compose([Validators.required]),],
          observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
        });
      });
    }

    this.form = this.formBuilder.group({
      solid_dysphagia: [this.data[0] ? this.data[0].solid_dysphagia : this.data.solid_dysphagia,Validators.compose([Validators.required]),],
      clear_liquid_dysphagia: [this.data[0] ? this.data[0].clear_liquid_dysphagia : this.data.clear_liquid_dysphagia,Validators.compose([Validators.required]),],
      thick_liquid_dysphagia: [this.data[0] ? this.data[0].thick_liquid_dysphagia : this.data.thick_liquid_dysphagia,Validators.compose([Validators.required]),],
      nasogastric_tube: [this.data[0] ? this.data[0].nasogastric_tube : this.data.nasogastric_tube,Validators.compose([Validators.required]),],
      gastrostomy: [this.data[0] ? this.data[0].gastrostomy : this.data.gastrostomy,Validators.compose([Validators.required]),],
      nothing_orally: [this.data[0] ? this.data[0].nothing_orally : this.data.nothing_orally,Validators.compose([Validators.required]),],
      observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
    });    

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      
      if (this.data.id) {
        await this.SwallowingDisordersTlS.Update({
          id: this.data.id,
          solid_dysphagia: this.form.controls.solid_dysphagia.value,
          clear_liquid_dysphagia: this.form.controls.clear_liquid_dysphagia.value,
          thick_liquid_dysphagia: this.form.controls.thick_liquid_dysphagia.value,
          nasogastric_tube: this.form.controls.nasogastric_tube.value,
          gastrostomy: this.form.controls.gastrostomy.value,
          nothing_orally: this.form.controls.nothing_orally.value,
          observations: this.form.controls.observations.value,
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
        await this.SwallowingDisordersTlS.Save({
          solid_dysphagia: this.form.controls.solid_dysphagia.value,
          clear_liquid_dysphagia: this.form.controls.clear_liquid_dysphagia.value,
          thick_liquid_dysphagia: this.form.controls.thick_liquid_dysphagia.value,
          nasogastric_tube: this.form.controls.nasogastric_tube.value,
          gastrostomy: this.form.controls.gastrostomy.value,
          nothing_orally: this.form.controls.nothing_orally.value,
          observations: this.form.controls.observations.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ solid_dysphagia:'', clear_liquid_dysphagia:'', thick_liquid_dysphagia:'', nasogastric_tube:'',
          gastrostomy:'', nothing_orally:'', observations:'' });
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
    else{
      this.toastService.warning('', 'Debe diligenciar los campos obligatorios');
    }
  }

}
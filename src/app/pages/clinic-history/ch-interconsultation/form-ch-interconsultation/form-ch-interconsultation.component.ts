import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEvoSoapService } from '../../../../business-controller/ch-evo-soap.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { SpecialFieldService } from '../../../../business-controller/special-field.service';
import { ChInterconsultationService } from '../../../../business-controller/ch-interconsultation.service';
import { SpecialtyService } from '../../../../business-controller/specialty.service';
import { FrequencyService } from '../../../../business-controller/frequency.service';
import { DbPwaService } from '../../../../services/authPouch.service';
import PouchDB from 'pouchdb-browser';


@Component({
  selector: 'ngx-form-ch-interconsultation',
  templateUrl: './form-ch-interconsultation.component.html',
  styleUrls: ['./form-ch-interconsultation.component.scss'],
})
export class FormChInterconsultationComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();


  
  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public record_id;
  public admissions_id;
  public specialty_id;
  public frequency_id: any[];
  public specialty: any[];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private route: ActivatedRoute,
    private FrequencyS: FrequencyService,
    private SpecialtyS: SpecialtyService,
    private ChInterconsultationS: ChInterconsultationService,
    private DbPounch: DbPwaService,
  ) {}

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });

    if (!this.data) {
      this.data = {
        specialty_id: '',
        amount: '',
        frequency_id: '',
        observations: '',
      };
    };
    
    if (!navigator.onLine) {
    this.SpecialtyS.GetCollection().then(x => {
      this.specialty= x;
      this.DbPounch.saveSelects(this.specialty, 'specialty');
    });
    this.FrequencyS.GetCollection().then(x => {
      this.frequency_id = x;
      this.DbPounch.saveSelects(this.frequency_id, 'frequency_id');
    });
  } else {
    if ('specialty') {
      let dataTable = new PouchDB('specialty');
      dataTable.get('specialty').then(x => {
        this.specialty = x.type;
        return Promise.resolve(true);
      });
    } 
    if ('frequency_id') {
      let dataTable = new PouchDB('frequency_id');
      dataTable.get('frequency_id').then(x => {
        this.frequency_id = x.type;
        return Promise.resolve(true);
      });
    } 
  }

    this.form = this.formBuilder.group({
      specialty_id: [this.data[0] ? this.data[0].specialty_id : this.data.specialty_id,],
      amount: [this.data.amount],
      frequency_id: [this.data.frequency_id],
      observations: [this.data.observations],

    });
    
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChInterconsultationS.Update({
            id: this.data.id,
            specialty_id: this.specialty_id,
            amount: this.form.controls.amount.value,
            frequency_id: this.form.controls.frequency_id.value,
            observations: this.form.controls.observations.value,
            type_record_id: 6,
            ch_record_id: this.record_id,
          })
          .then((x) => {
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
        await this.ChInterconsultationS
          .Save({
            specialty_id: this.specialty_id,
            amount: this.form.controls.amount.value,
            frequency_id: this.form.controls.frequency_id.value,
            observations: this.form.controls.observations.value,
            type_record_id: 6,
            ch_record_id: this.record_id,

          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({ specialty_id: '', amount: '', frequency_id: '', observations:'' });
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
          this.messageEvent.emit(true);
      }
    } else{
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
    
  }
  returnCode(specialty_id){
    var localName = this.specialty.find(item => item.id == specialty_id);
    var nombre_specialty
    if(localName){
      nombre_specialty = localName.name;
    } else {
      nombre_specialty = ''
    }
    return nombre_specialty;
  }

  saveCode(e): void {
    var localidentify = this.specialty.find(item => item.name == e);

    if (localidentify) {
      this.specialty_id = localidentify.id;
    } else {
      this.specialty_id = null;
    }
  }
}

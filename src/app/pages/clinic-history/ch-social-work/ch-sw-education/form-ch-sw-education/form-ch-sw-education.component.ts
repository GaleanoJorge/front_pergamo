import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { SwEducationService } from '../../../../../business-controller/sw-education.service';
import { SwRightsDutiesService } from '../../../../../business-controller/sw-rights-duties.service';

@Component({
  selector: 'ngx-form-ch-sw-education',
  templateUrl: './form-ch-sw-education.component.html',
  styleUrls: ['./form-ch-sw-education.component.scss']
})
export class FormChSwEducationComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Input() type_record_id;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public total: number = 0;
  public expensesTotal = null;

  public rightsDuties: any[] = [];
  public rightsDutiesForSave: any[] = [];
  public rights = [];
  public duties = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private rightsDutiesS: SwRightsDutiesService,
    private educationS: SwEducationService,

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {
        sw_rights_duties_id: [],

      };
    }

    
    
    this.form = this.formBuilder.group({
      rights_duties: [],
      
      
    });

    this.rightsDutiesS.GetCollection().then(x => {
      this.rightsDuties = x;

      this.rights = this.rightsDuties.filter((item) => item.code == 1);
      this.duties = this.rightsDuties.filter((item) => item.code == 2);

    });
  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.educationS.Update({
          id: this.data.id,
          sw_rights_duties_id: JSON.stringify(this.rightsDutiesForSave),
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
        await this.educationS.Save({
          sw_rights_duties_id: JSON.stringify(this.rightsDutiesForSave),
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ clock:'',
          sw_rights_duties_id:[],});
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

    } else{
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  
  }

  fetchSelectedItems($event, id) {
    
    var local = this.rightsDuties.find((e) => e.id == id);
    if ($event.target.checked) {

      this.rightsDutiesForSave.push(local);
    }else {
      this.rightsDutiesForSave = this.rightsDutiesForSave.filter((item) => item != local);
    }
  }

  receiveMessage($event) {
    if ($event == true) {
      this.messageEvent.emit($event);
    }
  }
}
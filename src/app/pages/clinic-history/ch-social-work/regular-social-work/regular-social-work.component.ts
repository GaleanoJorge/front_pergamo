import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-regular-social-work',
  templateUrl: './regular-social-work.component.html',
  styleUrls: ['./regular-social-work.component.scss'],
})
export class RegularSocialWorkComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() type_record: any = null;
  @Input() type_record_id: any = null;

  //@Input() vital: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public chrespiratoryconsultation: any[];
  public physical: any[];
  public chvitsigns: any[];
  public chdiagnosis: any[];
  public nameForm: String;
  public movieForm: String;


  public record_id;
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;
  public show1 = false;
  public show2 = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public userChangeS: UserChangeService,


  ) {

  }

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id1;
    if (!this.data) {
      this.data = {
      };
    }



  }
  async save() {
  }

  filterStepper($event) {
    return $event.target.textContent;
  }


  goto($event) {
    let selectedStep = this.filterStepper($event);
    if (selectedStep == '2' || selectedStep == 'Intervención') {
      this.show1 = true;
    } else if (selectedStep == '3' || selectedStep == 'Recomendaciones / Educación') {
      this.show2 = true;
    }
  }

}

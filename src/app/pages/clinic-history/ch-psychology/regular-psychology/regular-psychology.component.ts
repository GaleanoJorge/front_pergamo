import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-regular-psychology',
  templateUrl: './regular-psychology.component.html',
  styleUrls: ['./regular-psychology.component.scss'],
})
export class RegularPsychologyComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() type_record_id: Boolean = false;

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
}



import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ViewCell } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GlossResponseService } from '../../../business-controller/gloss-response.service';
import { ObjetionCodeResponseService } from '../../../business-controller/objetion-code-response.service';
import { ObjetionResponseService } from '../../../business-controller/objetion-response.service';
import { CurrencyPipe } from '@angular/common';
import { GlossRadicationService } from '../../../business-controller/gloss-radication.service';
import { GlossService } from '../../../business-controller/gloss.service';
import { date } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../../services/auth.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { ChTypeService } from '../../../business-controller/ch-type.service';

@Component({
  template: `
  <div class="d-flex justify-content-center">
      <!-- <button nbTooltip="Registro de Historia Clínica" nbTooltipPlacement="top" nbTooltipStatus="primary"
          nbButton ghost (click)="ShowPreBilling(AssignedTable, value.data.id)">
          <nb-icon icon="menu-outline"></nb-icon>
      </button> -->

      <button *ngIf="this.value.route == 1" nbTooltip="Registros" nbTooltipPlacement="top"
          nbTooltipStatus="primary" nbButton ghost
          [routerLink]="'/pages/pah/interconsultation/' + admissions_id + '/' + ch_interconsultation_id + '/' + type_of_attention">
          <nb-icon icon="menu-outline"></nb-icon>
      </button>

      <button *ngIf="this.value.route == 2" nbTooltip="Intersonsultas" nbTooltipPlacement="top"
          nbTooltipStatus="primary" nbButton ghost (click)="closeDialog()"
          [routerLink]="'/pages/pah/instance-admission/' + value.data.admissions[value.data.admissions.length - 1].id">
          <nb-icon icon="menu-outline"></nb-icon>
      </button>
  </div>
  `,
  styleUrls: ['./pah-list.component.scss'],
})
export class Actions2Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public form: FormGroup;
  public management_id;
  public user_id;
  public admissions_id;
  public ch_interconsultation_id;
  public type_of_attention;
  public dialog;
  public management_plan_id = null;
  public own_user;
  public ch_record;
  public ch_type;

  constructor(
    private formBuilder: FormBuilder,
    private dialogFormService: NbDialogService,
    private authService: AuthService,
    private chRecordS: ChRecordService,
    private ChTypeS: ChTypeService,
    private router: Router,
    private toastService: NbToastrService,
  ) {
  }

  async ngOnInit() {
    this.user_id = this.value.user.id;
    this.own_user = this.authService.GetUser();
    var a = this.value.data.admissions[this.value.data.admissions.length - 1].ch_interconsultation;
    var b;
    var c;
    a.forEach(element => {
      if (element.ch_record_id == null) {
        b = element.id;
        c = element.type_of_attention_id != null ? element.type_of_attention_id : -1;
      }
    });
    this.admissions_id = this.value.data.admissions[this.value.data.admissions.length - 1].id;
    this.ch_interconsultation_id = b;
    this.type_of_attention = c;
  }

}

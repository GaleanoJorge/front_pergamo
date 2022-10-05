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

      <button nbTooltip="Instancias" nbTooltipPlacement="top"
          nbTooltipStatus="primary" nbButton ghost (click)="closeDialog()"
          [routerLink]="'/pages/pah/instance-admission/' + value.data.id">
          <nb-icon icon="menu-outline"></nb-icon>
      </button>
  </div>

  <ng-template #AssignedTable>
  <form [formGroup]="form" (ngSubmit)="save()">
  <nb-card style="width: 100%;height: auto;overflow: auto;">
    <nb-card-header>
    Registro de Historia Clínica
    </nb-card-header>
    <nb-card-body>
        <div class="col-12 col-sm-12 col-md-12">
          <label for="ch_type" class="form-text text-muted font-weight-bold">ELEGIR TIPO DE HISTORIA CLÍNICA:</label>
          <nb-select formControlName="ch_type_id"
            id="ch_type_id" fullWidth
            status="{{ isSubmitted && form.controls.ch_type_id.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}">
            <nb-option value="">Seleccione...</nb-option>
            <nb-option *ngFor="let item of ch_type"
              [value]="item.id">
              {{ item.name.toUpperCase() }}</nb-option>
          </nb-select>
        </div>
    </nb-card-body>

    <nb-card-footer class="d-flex justify-content-end">
      <button nbButton (click)="closeDialog()" type="button">Cerrar</button>
      <button nbButton (click)="closeDialog()" type="button" status="danger">Crear</button>
    </nb-card-footer>
  </nb-card>
  </form>
</ng-template>
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

    this.ChTypeS.GetCollection().then(x => {
      this.ch_type = x;
    });

    this.form = this.formBuilder.group({
      ch_type_id: ['', Validators.compose([Validators.required])],
    });
  }

  ShowPreBilling(dialog: TemplateRef<any>, id) {
    this.admissions_id = id;
    this.dialog = this.dialogFormService.open(dialog);
  }

  closeDialog() {
    if (this.dialog) {
      this.dialog.close();
    }
  }

  RefreshData() {
    this.table.refresh();
  }

  async NewChRecord(data) {
    await this.chRecordS.Save({
      status: 'ACTIVO',
      admissions_id: data.management_plan.admissions_id,
      assigned_management_plan: data.id,
      user_id: data.user_id,
      ch_type_id: this.form.controls.ch_type_id.value,
    }).then(x => {
      this.ch_record = x.data.ch_record.id;
      this.closeDialog();
      this.router.navigateByUrl('/pages/clinic-history/clinic-history-nursing-list/' + this.ch_record + '/' + data.id);
      this.toastService.success('', x.message);
      this.RefreshData();

    }).catch(x => {
      // this.isSubmitted = false;
      // this.loading = false;
    });

  }

  save(){

  }

}

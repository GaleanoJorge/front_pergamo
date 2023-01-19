import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { AuthStatusService } from '../../../business-controller/auth-status.service';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <div nbTooltip="Facturas pendientes: {{this.value.data.created_billings}}" *ngIf="this.value.data.created_billings > 0" class = "cuadro" 
      [style]="this.semaphore == 0 ? 'background-color: #581845;' : 
      this.semaphore == 1 ? 'background-color: #44E431;' : 
      this.semaphore == 2 ? 'background-color: #FFC300;' : 
      this.semaphore == 3 ? 'background-color: #C70039;' : 'background-color: #C70039' "
      >
      </div>
    </div>
  `,
  styleUrls: ['./billing-admissions-pad-list.component.scss'],
})
export class ActionsSemaphoreAdmissionsListComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public semaphore: any;

  public dialog;
  public auth_status: any[] = [];


  constructor(
    private dialogService: NbDialogService,
    private authStatusS: AuthStatusService,

  ) {
  }

  async ngOnInit() {
    this.semaphore = 10;
  }

  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
    this.GetResponseParam()
  }

  GetResponseParam() {

  }

}

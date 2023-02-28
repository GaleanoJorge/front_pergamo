import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { AuthStatusService } from '../../../business-controller/auth-status.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <div class = "cuadro" 
      [style]="'background-color: '+this.color+';'"
      nbTooltip={{tooltip}} nbTooltipPlacement="top" nbTooltipStatus="primary">
      </div>
    </div>
  `,
  styleUrls: ['./billing-pad-all.component.scss'],
})
export class ActionsSemaphoreAllComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object


  public dialog;
  public curr;
  public auth_status: any[] = [];
  public tooltip: string;
  public color: string;
  public colors = {
    amarillo: '#FFFF00',
    pergamo: '#54BCC1',
    naranja: '#FF7000',
    azul: '#0000FF',
    verde: '#28B463',
    rojo: '#FF0000',
    morado: '#7A39BB',
  };


  constructor(
    private dialogService: NbDialogService,
    private authStatusS: AuthStatusService,
    private authService: AuthService,

  ) {
  }

  async ngOnInit() {
    this.curr = this.authService.GetRole();

    var dat = this.value.data;

    if (dat.billing_pad_status_id == 2 && dat.credit_note_consecutive == '') {
      this.color = this.colors.verde;
      this.tooltip = dat.billing_pad_status.name;
    } else if (dat.billing_pad_status_id == 2 && dat.credit_note_consecutive != '') {
      this.color = this.colors.azul;
      this.tooltip = 'NOTA CRÉDITO - ' + dat.billing_pad_status.name;
    } else if (dat.billing_pad_status_id == 3) {
      this.color = this.colors.pergamo;
      this.tooltip = dat.billing_pad_status.name;
    } else if (dat.billing_pad_status_id == 4) {
      this.color = this.colors.rojo;
      this.tooltip = dat.billing_pad_status.name;
    }
  }

  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
    this.GetResponseParam()
  }

  GetResponseParam() {

  }

}

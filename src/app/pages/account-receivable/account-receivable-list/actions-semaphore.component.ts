import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';


@Component({
  template: `
  <div class="d-flex justify-content-center" >
    <div class = "cuadro" nbTooltip="{{this.tooltip}}"
     [style]="this.semaphore == 0 ? 'background-color: #581845;' : 
     this.semaphore == 1 ? 'background-color: #44E431;' : 
     this.semaphore == 2 ? 'background-color: #FFC300;' : 
     this.semaphore == 3 ? 'background-color: #C70039;' : 'background-color: #C70039' "
     >
    </div>
  </div>
  `,
  styleUrls: ['./account-receivable-list.component.scss'],
})
export class ActionsSemaphoreComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public semaphore: any;
  public tooltip: any;

  constructor(
  ) {
  }

  async ngOnInit() {
    if (this.value.data.pendientes == "0") {
      this.semaphore = 1;
      this.tooltip = 'Sin Pendientes';
    } else {
      this.semaphore = 3;
      this.tooltip = 'Pendientes: ' + this.value.data.pendientes;
    }
  }
  
}

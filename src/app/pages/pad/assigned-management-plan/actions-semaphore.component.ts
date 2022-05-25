import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';


@Component({
  template: `
  <div class="d-flex justify-content-center">
    <div class = "cuadro" 
     [style]="this.semaphore == 1 ? 'background-color: #F1C40F;' : 
     this.semaphore == 2 ? 'background-color: #D35400;' : 
     this.semaphore == 3 ? 'background-color: #28B463;' : 
     this.semaphore == 4 ? 'background-color: #C70039;' : 'background-color: #C70039'"
     nbTooltip="{{description}}" nbTooltipPlacement="top" nbTooltipStatus="primary">
    </div>
  </div>
  `,
  styleUrls: ['./assigned-management-plan.component.scss'],
})
export class ActionsSemaphoreComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public semaphore: any;
  public today;
  public status;
  public description;

  constructor(
  ) {
  }

  async ngOnInit() {

    this.semaphore = this.value.getDate(this.value.data);
    if (this.semaphore == 1) {
      this.description = "Agendado";
    }else if (this.semaphore == 2) {
      this.description = "Proximo a vencer";
    }else if (this.semaphore == 3) {
      this.description = "Atendida";
    }else if (this.semaphore == 4) {
      this.description = "Incumplida";
    }

  }

}

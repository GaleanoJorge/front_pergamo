import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';


@Component({
  template: `
  <div class="d-flex justify-content-center" >
    <div class = "cuadro" nbTooltip="{{this.tooltip}}"
     [style]="
     this.semaphore == 1 ? 'background-color:red;' : 
     this.semaphore == 2 ? 'background-color: yellow;' :
     'background-color: #green' ">
    </div>
  </div>
  `,
  styleUrls: ['./prod-shipping-patient-package.component.scss'],
})
export class ActionSemaphoComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public semaphore: any;
  public tooltip: any;

  constructor(
  ) {
  }

  async ngOnInit() {
    if (this.value.data.expiration_date <= "2025-01-01") {
      this.semaphore = 1;
      this.tooltip = 'proximo a vencer';
    } else
      this.semaphore = 2;
    this.tooltip = 'lejos de vencer';
  }

}
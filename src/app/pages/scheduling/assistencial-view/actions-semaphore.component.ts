import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { VALUE } from '@syncfusion/ej2-angular-filemanager';
import { color } from 'd3-color';
import { ViewCell } from 'ng2-smart-table';


@Component({
  template: `
  <div class="d-flex justify-content-center">
    <div *ngIf="value.data.ch_record_count == 0" class = "cuadro" 
     [style]="'background-color: '+this.color+';'"
     nbTooltip={{tooltip}} nbTooltipPlacement="top" nbTooltipStatus="primary">
    </div>
    <div *ngIf="value.data.ch_record_count > 0" class = "cuadro" 
     [style]="'background-color: '+this.color2+';'"
     nbTooltip={{tooltip2}} nbTooltipPlacement="top" nbTooltipStatus="primary">
    </div>
  </div>
  `,
  styleUrls: ['./assistencial-view.component.scss'],
})
export class ActionsSemaphoreComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object


  public colors = {
    amarillo: '#FFFF00',
    pergamo: '#54BCC1',
    naranja: '#FF7000',
    azul: '#0000FF',
    verde: '#28B463',
    rojo: '#FF0000',
    morado: '#7A39BB',
  };

  public color: string;
  public color2: string;

  public semaphore: any;
  public tooltip: string;
  public tooltip2: string;
  public today;
  public status;
  public description;

  constructor(
  ) {
  }

  async ngOnInit() {

    this.color = this.colors.naranja;
    this.tooltip = 'Con historia clínica';

    this.color2 = this.colors.verde;
    this.tooltip2 = 'Sin historia clínica';

  }

}

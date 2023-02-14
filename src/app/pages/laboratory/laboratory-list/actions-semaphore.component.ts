import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { VALUE } from '@syncfusion/ej2-angular-filemanager';
import { color } from 'd3-color';
import { ViewCell } from 'ng2-smart-table';


@Component({
  template: `
  <div class="d-flex justify-content-center">
    <div *ngIf="value.data.laboratory_status_id == 1" class = "cuadro" 
     [style]="'background-color: '+this.color+';'"
     nbTooltip={{tooltip}} nbTooltipPlacement="top" nbTooltipStatus="primary">
    </div>
    <div *ngIf="value.data.laboratory_status_id == 2" class = "cuadro" 
     [style]="'background-color: '+this.color2+';'"
     nbTooltip={{tooltip}} nbTooltipPlacement="top" nbTooltipStatus="primary">
    </div>
    <div *ngIf="value.data.laboratory_status_id == 3" class = "cuadro" 
     [style]="'background-color: '+this.color3+';'"
     nbTooltip={{tooltip}} nbTooltipPlacement="top" nbTooltipStatus="primary">
    </div>
    <div *ngIf="value.data.laboratory_status_id == 4" class = "cuadro" 
     [style]="'background-color: '+this.color4+';'"
     nbTooltip={{tooltip}} nbTooltipPlacement="top" nbTooltipStatus="primary">
    </div>
    <div *ngIf="value.data.laboratory_status_id == 5" class = "cuadro" 
     [style]="'background-color: '+this.color5+';'"
     nbTooltip={{tooltip}} nbTooltipPlacement="top" nbTooltipStatus="primary">
    </div>
    <div *ngIf="value.data.laboratory_status_id == 6" class = "cuadro" 
     [style]="'background-color: '+this.color6+';'"
     nbTooltip={{tooltip}} nbTooltipPlacement="top" nbTooltipStatus="primary">
    </div>
  </div>
  `,
  styleUrls: ['./laboratory-list.component.scss'],
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
  public color3: string;
  public color4: string;
  public color5: string;
  public color6: string;

  public semaphore: any;
  public tooltip: string;
  public tooltip2: string;
  public tooltip3: string;
  public today;
  public status;
  public description;

  constructor(
  ) {
  }

  async ngOnInit() {

    this.color = this.colors.naranja;
    this.tooltip = 'Laboratorio ordenado';

    this.color2 = this.colors.amarillo;
    this.tooltip2 = 'Laboratorio tomado';

    this.color3 = this.colors.morado;
    this.tooltip3 = 'Laboratorio enviado';

    this.color4 = this.colors.azul;
    this.tooltip3 = 'Laboratorio recibido';

    this.color5 = this.colors.verde;
    this.tooltip3 = 'Laboratorio interpretado';

    this.color6 = this.colors.rojo;
    this.tooltip3 = 'Laboratorio cancelado';

  }

}

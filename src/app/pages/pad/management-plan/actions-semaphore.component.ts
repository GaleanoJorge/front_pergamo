import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { VALUE } from '@syncfusion/ej2-angular-filemanager';
import { color } from 'd3-color';
import { ViewCell } from 'ng2-smart-table';


@Component({
  template: `
  <div class="d-flex justify-content-center">
    <div *ngIf="value.currentRole == 1" class = "cuadro" 
     [style]="'background-color: '+this.color+';'"
     nbTooltip={{tooltip}} nbTooltipPlacement="top" nbTooltipStatus="primary">
    </div>
    <div *ngIf="value.currentRole == 2" class = "cuadro" 
     [style]="'background-color: '+this.color2+';'"
     nbTooltip={{tooltip2}} nbTooltipPlacement="top" nbTooltipStatus="primary">
    </div>
  </div>
  `,
  styleUrls: ['./management-plan.component.scss'],
})
export class ActionsSemaphore2Component implements ViewCell {
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
    var dat = this.value.data;
    
    if (dat.ingreso == 0) {
      this.color = this.colors.verde;
      this.tooltip = 'Cumplido';
    } else if (dat.ingreso == 1) {
      this.color = this.colors.pergamo;
      this.tooltip = 'Admisión creada';
    } else if (dat.ingreso == 2) {
      this.color = this.colors.rojo;
      this.tooltip = 'Sin agendar';
    } else if (dat.ingreso == 3) {
      this.color = this.colors.amarillo;
      this.tooltip = 'Sin asignar profesional';
    } else if (dat.ingreso == 4) {
      this.color = this.colors.morado;
      this.tooltip = 'Por subsanar';
    } else if (dat.ingreso == 5) {
      this.color = this.colors.naranja;
      this.tooltip = 'Pendiente por ejecutar: ' + dat.incumplidas;
    } else if (dat.ingreso == 6) {
      this.color = this.colors.azul;
      this.tooltip = 'Proyección creada';
    }


    if (dat.por_ejecutar == 0) {
      this.color2 = this.colors.verde;
      this.tooltip2 = 'Sin pendientes';
    } else {
      this.color2 = this.colors.rojo;
      this.tooltip2 = 'Pendiente por ejecutar:' + dat.por_ejecutar;
    }


  }

}

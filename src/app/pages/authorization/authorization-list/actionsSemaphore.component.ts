import { Component, Input, TemplateRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <div class="d-flex justify-content-center">
  <div class = "cuadro" 
  [style]="'background-color: '+this.color+';'"
  nbTooltip={{tooltip}} nbTooltipPlacement="top" nbTooltipStatus="primary">
 </div>
  </div>
  
  `,
  styleUrls: ['./authorization-list.component.scss'],

})
export class ActionsSemaphoreComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public colors = {
    amarillo: '#FFFF00',
    pergamo: '#54BCC1',
    naranja: '#FF7000',
    Paquete: '#B500C7',
    verde: '#28B463',
    rojo: '#FF0000',
    morado: '#B500C7',
  };

  public tooltip;
  public color: string;


  constructor(
  ) {
  }
  ngOnInit() {

    // console.log('algo')
    if(!this.rowData.assigned_management_plan && !this.rowData.product_com_id && !this.rowData.fixed_add){
      this.color = this.colors.amarillo;
      this.tooltip = "Paquete";
    } else if(!this.rowData.assigned_management_plan && !this.rowData.product_com_id && this.rowData.fixed_add){
      this.color = this.colors.pergamo;
      this.tooltip = "Activo Fijo";
    }else if(!this.rowData.assigned_management_plan && this.rowData.product_com_id && !this.rowData.fixed_add){
      this.color = this.colors.morado;
      this.tooltip = "Insumo";
    }else if(this.rowData.medical_diary_days){
      this.rowData.medical_diary_days.ch_record.forEach((x) => {
        if (x.status == 'CERRADO') {
          this.color = this.colors.verde;
          this.tooltip = "Ejecutado";
        }
      });
      if(this.tooltip != "Ejecutado"){
        this.color = this.colors.rojo;
        this.tooltip = "Sin ejecutar";
      }
    }
     else if(this.rowData.assigned_management_plan && !this.rowData.fixed_add){
      if(this.rowData.assigned_management_plan.execution_date == '0000-00-00 00:00:00'){
        this.color = this.colors.rojo;
        this.tooltip = "Sin ejecutar";
      } else if(this.rowData.assigned_management_plan.execution_date != '0000-00-00 00:00:00') {
        this.color = this.colors.verde;
        this.tooltip = "Ejecutado";
      }
    }

  }


}

import { Component, Input, TemplateRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { BedService } from '../../../business-controller/bed.service';
import { FlatService } from '../../../business-controller/flat.service';
import { PavilionService } from '../../../business-controller/pavilion.service';
import { ProgramService } from '../../../business-controller/program.service';
import { ScopeOfAttentionService } from '../../../business-controller/scope-of-attention.service';
import { AdmissionRouteService } from '../../../business-controller/admission-route.service';
import { LocationService } from '../../../business-controller/location.service';

@Component({
  template: `
  <div class="d-flex justify-content-center">
    <a *ngIf="!this.rowData.assigned_management_plan_id" nbTooltip="editar paquete" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.edit(value.data, packagingTemplate)">
        <nb-icon icon="edit-2-outline"></nb-icon>
    </a>
    <button *ngIf="!this.rowData.assigned_management_plan_id"  nbTooltip="Ver contenido de paquete" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.view(value.data)">
        <nb-icon icon="eye-outline"></nb-icon>
    </button>
    <button *ngIf="!this.rowData.assigned_management_plan_id"  nbTooltip="eliminar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
    </button>
  </div>
  
  `,
})
export class ActionsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object



  constructor(
  ) {
  }
  ngOnInit() {
    
    console.log(this.value);
    console.log(this.rowData);

  }


}

import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <div class="col-md-12">
          <nb-select formControlName="status" id="status" fullWidth>
            <nb-option value="">Seleccione...</nb-option>
            <nb-option  value="0">ACEPTADO</nb-option>
            <nb-option  value="0">DEVOLVER</nb-option>
            <nb-option  value="1">NOVEDAD</nb-option>
          </nb-select>
        </div>

  `,
})
export class StatusComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;
}

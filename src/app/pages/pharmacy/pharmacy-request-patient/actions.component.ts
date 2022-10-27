import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbTooltip="DESPACHO" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.edit(value.data)">
        <nb-icon icon="arrowhead-up-outline"></nb-icon>
      </button>
     <!-- <button nbTooltip="ELIMINAR" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button> -->
    </div>


    <ng-template #userChangeAction>
    <div class="container-fluid">
        <nb-card style="width: 430px;">
            <nb-card-header>
                Asociar cuentas de usuario
            </nb-card-header>
            <nb-card-body>
                <form [formGroup]="UserChangeForm" (ngSubmit)="SaveChange()">
                    <div>
                        <!-- <div class="col-md-12">
                          <label for="right_user" class="form-text text-muted font-weight-bold">Usuario correcto:</label>
                          <input id="data-list" fullWidth type="text" list="codes" class="data-list"
                          (change)="idFilter($event)" placeholder="Ingrese ID del paciente" required />
                                <datalist id="codes">
                                <nb-option *ngFor="let item of right_user" [value]="item.identification">{{item.identification}} - {{item.firstname}} {{item.lastname}}
                                </nb-option>
                              </datalist>
                        </div>-->

                        <div class="col-12">
                            <label class="form-text text-muted font-weight-bold">Usuario correcto:</label>
                            <input id="data-list" type="text" fullWidth nbInput list="codes" class="data-list"
                                (change)="saveCode($event)" required>
                            <datalist id="codes">
                                <option *ngFor="let item of right_user" [value]="item.identification">
                                    {{item.identification}} - {{ item.firstname}} </option>
                            </datalist>
                        </div>

                        <div class="col-md-12">
                            <label for="observation_novelty" class="form-text text-muted font-weight-bold">Tipo de
                                novedad:</label>
                            <nb-select fullWidth placeholder="Seleccione..." formControlName="observation_novelty_id">
                                <nb-option value="">Seleccione...</nb-option>
                                <nb-option *ngFor="let item of observations" [value]="item.id">{{ item.name }}
                                </nb-option>
                            </nb-select>
                        </div>
                        <div class="div-send">
                            <label></label>
                            <button type="submit" nbButton status="success">Agregar</button>
                        </div>
                    </div>
                </form>
            </nb-card-body>
        </nb-card>
    </div>
</ng-template>
  `,
})
export class ActionsSendPatientComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

}

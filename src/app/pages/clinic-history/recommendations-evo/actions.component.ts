import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">

    <button *ngIf="this.value.isNutrition" nbTooltip="Detalle Recomendación" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="ConfirmAction(confirmAction)"> 
      <nb-icon icon="eye-outline"></nb-icon>
    </button>


    <ng-template #confirmAction>
  <div class="container-fluid" fullWidth>
  <nb-card style="width: 100%">
    <nb-card-header>Detalle Recomendación</nb-card-header>
      <nb-card-body>

          <div class="row justify-content-md-center">
            <div class="col-md-8 col-lg-8">
              <div class="form-group">      
              <textarea id="observation" nbInput fullWidth formControlName="observation" observation
                onpaste="return false" cols="150" rows="20" disabled> {{this.value.data.observations}} </textarea>
            </div>
            </div>
          </div>

          
        </nb-card-body>
        
        <nb-card-footer class="d-flex justify-content-end">
        <div class="row">
          <div class="col-md-12">
            <div class="div-send">
              <button nbButton (click)="close()" type="button" class="button ml-1">Volver</button>
            </div>
          </div>
        </div>
      </nb-card-footer>



</nb-card>
</div>
</ng-template>

    </div>
    `,
  //<nb-checkbox [checked]="value.valid" (checkedChange)="value.selection($event, value.data)" ></nb-checkbox>
})
export class Actions15Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public dialog;

  constructor(
    private dialogService: NbDialogService,
  ) { }

  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }
  close() {
    this.dialog.close();
  }




}

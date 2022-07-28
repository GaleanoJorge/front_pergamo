import { Component, Input, Optional, TemplateRef } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { HumanTalentRequestService } from '../../../business-controller/human-talent-request.service';


@Component({
  template: `
  <div class="d-flex justify-content-center">
  <button *ngIf="value.status==0 || value.status==1" nbTooltip="Aprobar" nbTooltipPlacement="top" nbTooltipStatus="primary"   nbButton ghost (click)=" this.value.status == 0 ? value.update(value.data, 'Aprobada PAD') : value.new(value.data)">
  <nb-icon icon="checkmark-outline"></nb-icon>
</button>

<button *ngIf="value.status==0 || value.status==1" nbTooltip="Rechazar" nbTooltipPlacement="top" nbTooltipStatus="primary" (click)="ConfirmAction(confirmAction)"  nbButton ghost>
<nb-icon icon="close-outline"></nb-icon>
</button>
  </div>
  <ng-template #confirmAction>
  <div class="container-fluid">
      <nb-card style="width: 430px;">
          <nb-card-header>Rechazar solicitud de personal</nb-card-header>
          <nb-card-body>
              <form [formGroup]="Form" (ngSubmit)="saveGroup()">
                  <div>
                      <div class="col-md-12">
                      <label for="observation" class="form-text text-muted font-weight-bold">Observación:</label>
                          <input type="text" nbInput fullWidth id="observation" formControlName="observation" observation
                              status="{{ isSubmitted && Form.controls.observation.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}" />
                      </div>
                  </div>
                  <div class="div-send">
                      <button type="submit" nbButton status="success">Agregar</button>
                  </div>
              </form>
          </nb-card-body>
      </nb-card>
  </div>
</ng-template>

  
  `,
  styleUrls: ['./human-talent-request-list.component.scss'],
})
export class Actions2Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public Form: FormGroup;
  public loading: boolean = true;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public dialog;




  constructor(
    private humanTalentRequestS: HumanTalentRequestService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastService: NbToastrService,
    
  ) {
  }

  async ngOnInit() {
console.log(this.value.status);

    this.Form = this.formBuilder.group({
      observation: [, Validators.compose([Validators.required])],        
    });

  }


  ConfirmAction(dialog: TemplateRef<any>, status?, id?) {

    this.dialog = this.dialogService.open(dialog);
   
    }

  

    saveGroup() {
  
      this.isSubmitted = true;
      if (!this.Form.invalid) {
        this.loading = true;
        this.humanTalentRequestS.Update({
          id: this.value.data.id,
          observation: this.Form.controls.observation.value,
          status: this.value.status == 0 ? 'Rechazada PAD' : 'Rechazada TH',
        }).then(x => {
          this.toastService.success('', x.message);
          this.dialog.close();
         this.value.saved();
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }
    }
}
